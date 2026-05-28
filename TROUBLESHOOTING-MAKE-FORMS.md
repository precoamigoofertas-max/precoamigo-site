# 🔧 Troubleshooting: Google Forms + Make.com

## Problema: Arquivo Não é Criado

### ❌ Sintomas
- Preenchi o formulário, mas nada aconteceu
- Nenhum arquivo em `src/content/ofertas/`
- Make.com não mostra atividade

### ✅ Solução Passo a Passo

**1. Verifique o Trigger no Make.com:**
```
Make.com > Seu Scenario > Clique no módulo "Watch for Rows"
```
- Spreadsheet está selecionada?
- Worksheet é "Form Responses 1"?
- "Return new rows only" está ON?

**2. Teste o Trigger:**
```
1. Clique no botão "Refresh"
2. Volte ao Google Form e preencha UMA linha
3. Aguarde 1 minuto
4. Clique "Execute once" no Make
5. Verifique se a linha aparece
```

**3. Se ainda não funcionar:**

Reinicie tudo:
```
a) Make.com > Clique "Run once" (canto superior esquerdo)
b) Observe execução
c) Se erro, clique na bola vermelha X para ver detalhes
d) Copie a mensagem de erro
```

---

## Problema: GitHub Não Conecta

### ❌ Sintomas
- "Connection failed" ou "Unauthorized"
- Módulo GitHub fica vermelho

### ✅ Solução

**Opção 1: Reconectar GitHub**

1. Make.com > Clique no ícone de conta (canto superior direito)
2. **"Connections"** ou **"Webhooks"**
3. Procure "GitHub"
4. Clique em **"Delete"** ou **"Disconnect"**
5. No módulo GitHub, clique **"Connection"** > **"Add"**
6. Autorize novamente

**Opção 2: Verificar Token de Acesso**

Se tiver erro `422 - Validation Failed`:

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. Procure token do Make.com
3. Verifique permissões: `repo` (acesso completo)
4. Se expirou, delete e crie novo em Make.com

**Opção 3: Verifique Permissões do Repositório**

```bash
# No terminal, dentro do repo:
git config user.email
# Deve ser o mesmo email da sua conta GitHub
```

---

## Problema: "Invalid File Path"

### ❌ Sintomas
- Erro: `422 - Validation Failed - file path`
- Arquivo não tem nome válido

### ✅ Solução

**Verifique o nome no formulário:**

Campo "Nome da Imagem" deve ter **APENAS** letras, números e hífens:

❌ Errado:
```
fantasia infantil  (espaços)
fantasia@dino      (caracteres especiais)
fantasia_2024      (pode falhar)
```

✅ Correto:
```
fantasia-dino
fantasia-infantil-2024
dino-verde
```

**Se ainda não funcionar:**

No módulo Make "Set Multiple Variables", adicione um novo:

```
Name: SafeTitle
Value: {{lower(regexReplace(Title; "[^a-z0-9]+"; "-"); ""))}}
```

Depois, em GitHub, use `{{SafeTitle}}.md` em vez de `{{Title}}.md`

---

## Problema: Descrição Não Aparece Correta

### ❌ Sintomas
- Arquivo criado, mas descrição está vazia
- Descrição tem caracteres estranhos

### ✅ Solução

**No módulo GitHub, arquivo content:**

Substitua:
```markdown
description: "{{Title}} em promoção — aproveita o preço especial de hoje!"
```

Por:
```markdown
description: "{{Title | stripWhitespace}} em promoção — aproveita o preço especial de hoje!"
```

---

## Problema: Email Não Chega

### ❌ Sintomas
- Make.com mostra sucesso
- Arquivo criado corretamente
- Mas email de confirmação não chega

### ✅ Solução

**1. Verifique spam/lixo eletrônico**

2. **Verifique autorização Gmail:**
   - Make.com > Connections
   - Procure Gmail
   - Clique "Refresh" ou "Reconnect"

3. **Teste email manualmente:**
   - Make.com > Scenario > Clique em "Gmail" (módulo)
   - Clique no "play" junto ao módulo
   - Deixe as variáveis com valores teste
   - Clique "Execute"

4. **Se erro:**
   - Pode ser que Gmail bloqueou
   - Vá em [myaccount.google.com](https://myaccount.google.com)
   - Segurança > Apps de terceiros > Autorizar Make.com

---

## Problema: Arquivo Criado com order: 0 Sempre

### ❌ Sintomas
- Primeiro arquivo: order 0 ✅
- Segundo arquivo: order 0 ❌ (deveria ser 1)
- Todos têm a mesma ordem

### ✅ Solução (Avançada)

Adicionar cálculo automático de order:

**1. Adicione novo módulo "HTTP" ANTES do GitHub:**

```
Module: HTTP > Make a request

Method: GET
URL: https://api.github.com/repos/[SEU-USER]/precoamigo-site/contents/src/content/ofertas

Headers:
- Accept: application/vnd.github.v3+json
- Authorization: Bearer {{githubToken}}
```

**2. Parse a resposta para encontrar maior order**

**3. Calcule: nextOrder = maxOrder + 1**

*(Isso é bem técnico - prefere fazer manual ou quer ajuda?)*

---

## Problema: "Spreadsheet Not Found"

### ❌ Sintomas
- Erro ao testar trigger
- "Spreadsheet does not exist"

### ✅ Solução

1. **Verifique Google Sheets:**
   - Planilha "Ofertas - Respostas" ainda existe?
   - Está em seu Google Drive?

2. **Reconecte Google:**
   - Make.com > Connections > Google Sheets
   - Clique "Refresh"
   - Tente novamente

3. **Recrie trigger:**
   - Delete módulo "Watch for Rows"
   - Adicione novo
   - Selecione spreadsheet novamente

---

## Problema: Arquivo Criado Duplicado

### ❌ Sintomas
- Mesma oferta criada 2-3 vezes
- Múltiplas linhas no Git com mesmo arquivo

### ✅ Solução

**1. Verifique "Return new rows only":**

No módulo "Watch for Rows":
```
✅ "Return new rows only" DEVE estar ON
```

**2. Verifique duplicatas no formulário:**

Se preencheu e enviou 2x, vai criar 2x 😄

**3. Pause o Scenario:**

Se está testando muito:
- Make.com > Scenario > Clique em "..."
- **"Pause"** para desativar

---

## Problema: "Commit failed"

### ❌ Sintomas
- Arquivo criado no GitHub
- Mas Git commit deu erro
- Histórico Git vazio

### ✅ Solução

**Provavelmente permissões:**

1. **Verifique token GitHub:**
   - Make.com > Connections > GitHub
   - Delete e reconecte

2. **Branch está correta?**
   - Module GitHub > Verifique campo "Branch"
   - Deve ser `main`

3. **Arquivo path está correto?**
   - Não pode ter `//` duplo
   - Não pode ter espaços
   - Exemplo correto: `src/content/ofertas/titulo-produto.md`

---

## Problema: "Rate Limit Exceeded"

### ❌ Sintomas
- Erro após enviar muitas ofertas
- "API rate limit reached"

### ✅ Solução

**Normal após 60+ requisições/hora no GitHub**

Opções:
1. **Aguarde 1 hora** - o limite reseta
2. **Use token com permissões maiores** - pode fazer + requisições
3. **Configure delays** - adicione `Sleep` module entre requisições

*(Não deve acontecer com seu uso 5 ofertas/dia)*

---

## Checklist de Debug

Se nada funciona, teste em ordem:

```
[ ] Google Form preenche normalmente?
[ ] Respostas aparecem na planilha Google Sheets?
[ ] Make.com conecta ao Google Sheets?
[ ] Make.com conecta ao GitHub?
[ ] Testar trigger: "Execute once" funciona?
[ ] GitHub recebeu permissões?
[ ] Repositório está público ou privado correto?
[ ] Branch existe (main)?
```

---

## Contato / Ajuda

Se ainda tiver problema:
1. Abra o Scenario em Make.com
2. Clique "Run once"
3. Observe a execução
4. Clique no "X" vermelho de erro
5. **Copie mensagem de erro completa**
6. Compartilhe comigo para diagnóstico

