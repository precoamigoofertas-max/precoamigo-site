# 🔧 Configuração: Google Forms + Make.com

Guia completo para automatizar postagem de ofertas via formulário.

---

## ⏱️ Tempo Total: ~30 minutos

---

## PARTE 1️⃣: Criar Google Form

### Passo 1: Acessar Google Forms

1. Abra [forms.google.com](https://forms.google.com)
2. Clique em **"Criar"** (botão azul + novo formulário)
3. Nomeie: **"Ofertas do Dia - Preco Amigo"**
4. Descrição (opcional): *"Formulário para adicionar novas ofertas no blog"*

### Passo 2: Criar os Campos

**Campo 1: Título do Produto**
- Clique em **"+"** (adicionar pergunta)
- Tipo: **Texto curto**
- Pergunta: `Título do Produto`
- Marque: ✅ **Obrigatório**

**Campo 2: Preço de (Opcional)**
- Tipo: **Texto curto**
- Pergunta: `Preço anterior (opcional, ex: 140,00)`
- Marque: ❌ Não obrigatório

**Campo 3: Preço Por**
- Tipo: **Texto curto**
- Pergunta: `Preço atual (ex: 74,00)`
- Marque: ✅ **Obrigatório**

**Campo 4: Link Mercado Livre**
- Tipo: **URL**
- Pergunta: `Link do Mercado Livre`
- Marque: ✅ **Obrigatório**

**Campo 5: Nome da Imagem**
- Tipo: **Texto curto**
- Pergunta: `Nome da imagem (sem .png, ex: fantasia-dino)`
- Marque: ✅ **Obrigatório**
- Ajuda: *"Arquivo deve estar em /public/ do site"*

### Passo 3: Configurar Respostas

1. Clique em **"Respostas"** (aba superior)
2. Clique em **"📊"** (ícone de planilha)
3. Clique em **"Criar nova planilha"**
4. Nome: `Ofertas - Respostas`
5. **Pronto!** As respostas serão salvas automaticamente

### Passo 4: Copiar Link do Formulário

1. Clique em **"Compartilhar"** (botão superior direito)
2. Clique em **"Link"** (ícone de corrente)
3. **Copie o link** - você usará isso no Make.com

**Exemplo:** `https://forms.google.com/u/0/d/1abc123xyz/viewform`

### Passo 5: Encontrar ID da Planilha Google Sheets

Quando criou a planilha de respostas no Passo 3:
1. Abra a planilha (clique no link gerado)
2. Copie o ID da URL: `https://docs.google.com/spreadsheets/d/1abc123xyz456/edit`
3. **ID = `1abc123xyz456`** ← guarde isso

---

## PARTE 2️⃣: Configurar Make.com

### Passo 1: Criar Conta Make.com

1. Acesse [make.com](https://www.make.com)
2. Clique em **"Sign Up"**
3. Crie conta com email e senha
4. **Plano gratuito é suficiente!** (1.000 operações/mês)

### Passo 2: Criar Novo Scenario

1. No painel, clique em **"+ Create"**
2. Nome: `Ofertas do Dia - Preco Amigo`
3. Clique em **"Create Scenario"**

### Passo 3: Adicionar Trigger (Google Forms)

#### 3.1: Buscar módulo Google Forms

1. No canvas vazio, clique para adicionar módulo
2. Busque **"Google Sheets"** (não Forms - vamos usar Sheets como trigger)
3. Selecione: **"Watch for Rows"**

#### 3.2: Conectar Google Account

1. Clique em **"Connection"**
2. Clique em **"Add"**
3. Autorize sua conta Google
4. Permita acesso ao Make.com

#### 3.3: Configurar o Trigger

| Campo | Valor |
|-------|-------|
| **Spreadsheet** | Selecione a planilha criada (Ofertas - Respostas) |
| **Worksheet** | Form Responses 1 |
| **Limit** | 1 |
| **Return new rows only** | ✅ Sim |

**Clique "OK"**

### Passo 4: Adicionar Módulo de Processamento

1. Clique em **"+"** (adicionar módulo após trigger)
2. Busque: **"Set Multiple Variables"**
3. Configure (para formatar os dados):

```
Variable 1:
Name: Title
Value: {{1.`Título do Produto`}}

Variable 2:
Name: Price
Value: {{1.`Preço atual (ex: 74,00)`}}

Variable 3:
Name: Link
Value: {{1.`Link do Mercado Livre`}}

Variable 4:
Name: Image
Value: {{1.`Nome da imagem (sem .png, ex: fantasia-dino)`}}

Variable 5:
Name: PriceOld
Value: {{1.`Preço anterior (opcional, ex: 140,00)`}}
```

**Clique "OK"**

### Passo 5: Adicionar Módulo GitHub (Criar Arquivo)

1. Clique em **"+"** após o módulo anterior
2. Busque: **"GitHub"**
3. Selecione: **"Create a File"**

#### 5.1: Conectar GitHub

1. Clique em **"Connection"**
2. Clique em **"Add"**
3. Autorize sua conta GitHub no Make.com

#### 5.2: Configurar Criação de Arquivo

| Campo | Valor |
|-------|-------|
| **Repository** | precoamigo-site |
| **Branch** | main |
| **File Path** | `src/content/ofertas/{{sanitizeFilename(Title)}}.md` |
| **File Content** | *(veja abaixo)* |
| **Commit Message** | `Oferta adicionada: {{Title}}` |

#### 5.3: Conteúdo do Arquivo (Frontmatter)

No campo **File Content**, cole:

```markdown
---
title: "{{Title}}"
description: "{{Title}} em promoção — aproveita o preço especial de hoje!"
image: "/{{Image}}.png"
price: "R$ {{Price}}"
link: "{{Link}}"
featured: true
order: 0
---
```

**Clique "OK"**

### Passo 6: Adicionar Módulo de Notificação (Opcional)

Para receber confirmação quando uma oferta é postada:

1. Clique em **"+"** após GitHub
2. Busque: **"Gmail"** (ou outro email)
3. Selecione: **"Send an Email"**
4. Configure:

| Campo | Valor |
|-------|-------|
| **To** | seu@email.com |
| **Subject** | ✅ Oferta Postada: {{Title}} |
| **Body** | Oferta criada em: {{now}} |

### Passo 7: Salvar e Testar

1. Clique em **"Save"** (canto superior esquerdo)
2. Clique em **"Run Once"** para testar
3. Preencha o Google Form com dados de teste
4. **Verifique:**
   - ✅ Arquivo foi criado em `src/content/ofertas/`?
   - ✅ Email de confirmação recebido?
   - ✅ Arquivo tem os dados corretos?

---

## PARTE 3️⃣: Usar no Dia a Dia

### Para Adicionar uma Oferta:

1. **Abra o Google Form:**
   ```
   https://forms.google.com/u/0/d/[ID]/viewform
   ```

2. **Preencha os campos:**
   - Título: `Fantasia Infantil Dino Verde`
   - Preço anterior: `140,00` (opcional)
   - Preço atual: `74,00`
   - Link: `https://meli.la/28Fjvd4`
   - Imagem: `fantasia-dino`

3. **Clique "Enviar"**

4. **Resultado em ~30 segundos:**
   - ✅ Arquivo criado em `src/content/ofertas/`
   - ✅ Commit feito no Git
   - ✅ Email confirmação recebido
   - ✅ Post visível no blog (próxima build do Vercel)

---

## 🔄 Automação Extra (Opcional)

### Incrementar `order` Automaticamente

Atualmente, todas as ofertas começam com `order: 0`. Para incrementar:

1. **Adicionar módulo "HTTP"** para buscar ofertas existentes
2. **Usar "Router"** para comparar orders
3. **Calcular** o próximo order

*(Isso é mais avançado - é preciso?)*

### Trigger Automático via Vercel

Se quiser rebuild automático após criar oferta:

1. Adicione módulo **"Webhooks"** ao final do scenario
2. **URL do Webhook Vercel:** (você encontra em Vercel > Deploy Hooks)
3. Configure Make para chamar o webhook após sucesso

---

## 🆘 Troubleshooting

### "Conexão GitHub não funciona"

**Solução:**
1. Vá em Make.com > Connections
2. Encontre GitHub
3. Clique em "Refresh"
4. Recrie o módulo GitHub

### "Form Responses não aparece no trigger"

**Solução:**
1. Volte ao Google Form
2. Preencha UMA resposta no formulário
3. Aguarde 30 segundos
4. Atualize Make.com (F5)
5. Tente novamente

### "Arquivo foi criado mas com order: 0 sempre"

**Normal!** Para fixar ordem específica:

```markdown
order: 0  # Destaque principal
order: 1  # Segundo destaque
```

Ajuste manualmente no editor se precisar.

---

## 📋 Checklist Final

- ✅ Google Form criado com 5 campos
- ✅ Planilha Google Sheets conectada
- ✅ Conta Make.com criada
- ✅ Scenario criado e conectado
- ✅ GitHub autorizado no Make.com
- ✅ Email opcional (opcional)
- ✅ Teste completo feito
- ✅ Link do formulário guardado

**Tudo pronto para começar a postar ofertas automaticamente!** 🚀
