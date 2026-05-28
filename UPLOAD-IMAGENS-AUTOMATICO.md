# 📸 Upload de Imagens Automático: Google Forms + Make.com

Guia para adicionar imagens diretamente pelo formulário.

---

## PARTE 1️⃣: Adicionar Campo de Upload no Google Form

### Passo 1: Abrir o Formulário

1. Acesse seu Google Form: "Ofertas do Dia - Preco Amigo"
2. Clique em **"+"** para adicionar nova pergunta
3. Configure como abaixo:

### Passo 2: Criar Campo de Upload

| Campo | Valor |
|-------|-------|
| **Pergunta** | `Imagem do Produto` |
| **Tipo** | **Arquivo (File Upload)** |
| **Descrição** | `Envie a imagem em PNG ou JPG (max 10MB)` |
| **Obrigatório** | ✅ Sim |

**Resultado:** Campo com botão "Escolher arquivo"

### Passo 3: Reordenar Campos (Opcional)

Ordem recomendada:
1. Título do Produto
2. Preço anterior
3. Preço atual
4. Link Mercado Livre
5. **Imagem do Produto** ← novo
6. ~~Nome da Imagem~~ (delete este - não precisa mais)

---

## PARTE 2️⃣: Configurar Make.com para Upload

### Passo 1: Adicionar Módulo Google Drive (Download)

No seu Scenario no Make.com:

1. **Após o trigger "Watch for Rows"**, clique "+"
2. Busque: **"Google Drive"**
3. Selecione: **"Download a File"**

#### Configurar:

| Campo | Valor |
|-------|-------|
| **Connection** | Sua conta Google |
| **File ID** | `{{1.`Imagem do Produto`}}` |

**Salve:** "OK"

---

### Passo 2: Adicionar Módulo para Extrair Nome do Arquivo

1. Clique "+" após Google Drive
2. Busque: **"Tools"**
3. Selecione: **"Set Multiple Variables"**

#### Configurar:

```
Variable 1:
Name: ImageFileName
Value: {{regex(1.`Imagem do Produto`; "([^/]+)$")}}

Variable 2:
Name: ImageFileWithoutExt
Value: {{replace(ImageFileName; "\.[^.]*$"; "")}}
```

**Explicação:**
- Extrai o nome do arquivo da URL
- Remove a extensão para usar depois

**Salve:** "OK"

---

### Passo 3: Adicionar Módulo GitHub (Upload Imagem)

1. Clique "+" após Tools
2. Busque: **"GitHub"**
3. Selecione: **"Create a File"**

#### Configurar:

| Campo | Valor |
|-------|-------|
| **Repository** | precoamigo-site |
| **Branch** | main |
| **File Path** | `public/{{ImageFileWithoutExt}}` |
| **File Content** | `{{1.`Imagem do Produto`}}` |
| **Commit Message** | `Imagem adicionada: {{ImageFileWithoutExt}}` |

**IMPORTANTE:** No campo "File Content", clique no ícone de dados (📊) à direita e selecione **"Binary Data"**

**Salve:** "OK"

---

### Passo 4: Atualizar Módulo GitHub (Arquivo MD)

Encontre o módulo que cria o arquivo `.md` (já existe no seu scenario) e atualize:

#### Mudar:
```markdown
image: "/{{Image}}.png"
```

#### Para:
```markdown
image: "/{{ImageFileWithoutExt}}"
```

**Explicação:** Agora usa o nome real do arquivo enviado, sem adicionar .png

---

### Passo 5: Deletar Campo "Nome da Imagem"

No seu Google Form:

1. Abra o formulário
2. Encontre a pergunta: "Nome da imagem (sem .png, ex: fantasia-dino)"
3. Clique no "🗑️" para deletar
4. **Confirme**

---

## ⚙️ Fluxo Final do Make.com

```
1️⃣ Google Sheets Trigger
   ↓ recebe linha com arquivo
   
2️⃣ Google Drive Download
   ↓ baixa arquivo enviado
   
3️⃣ Tools - Set Variables
   ↓ extrai nome do arquivo
   
4️⃣ GitHub - Create File (Imagem)
   ↓ upload para /public/
   
5️⃣ GitHub - Create File (MD)
   ↓ cria oferta com link da imagem
   
6️⃣ Gmail (opcional)
   ↓ confirmação por email
```

---

## 📋 Campos do Formulário Agora

| # | Campo | Tipo | Obrigatório |
|---|-------|------|-------------|
| 1 | Título do Produto | Texto | ✅ |
| 2 | Preço anterior | Texto | ❌ |
| 3 | Preço atual | Texto | ✅ |
| 4 | Link Mercado Livre | URL | ✅ |
| 5 | Imagem do Produto | **Arquivo** | ✅ |

---

## 🧪 Testar o Upload

### Passo 1: Preparar Imagem de Teste

1. Salve uma imagem localmente (PNG ou JPG)
2. Nomeie: `teste-imagem.png`

### Passo 2: Preencher Formulário

1. Abra o Google Form
2. Preencha com dados de teste
3. **Clique "Escolher arquivo"** e selecione `teste-imagem.png`
4. Clique "Enviar"

### Passo 3: Verificar em Make.com

1. Acesse Make.com > Seu Scenario
2. Clique **"Run Once"**
3. Observe execução:
   - ✅ Google Drive faz download?
   - ✅ GitHub upload imagem para `/public/`?
   - ✅ GitHub cria arquivo `.md`?

### Passo 4: Verificar Resultado

```bash
# No terminal, seu repositório:
ls public/teste*
# Deve aparecer: teste-imagem.png

cat src/content/ofertas/[oferta-teste].md
# Deve ter: image: "/teste-imagem.png"
```

---

## 🎯 Uso Final (Dia a Dia)

1. **Preencha o formulário:**
   - Título: `Fantasia Infantil Dino Verde`
   - Preço: `74,00`
   - Link: `https://meli.la/28Fjvd4`
   - **Imagem:** Clique em "Escolher arquivo" → selecione `fantasia-dino.png`

2. **Clique "Enviar"**

3. **Aguarde 30 segundos:**
   - ✅ Imagem faz upload para `/public/`
   - ✅ Post criado com imagem automática
   - ✅ Tudo no blog!

---

## 🔧 Troubleshooting

### "Arquivo não foi criado em /public/"

**Problema:** Google Drive download falhou

**Solução:**
1. Volte ao Google Form
2. Preencha novamente
3. Verifique em Make.com > execução
4. Se erro, clique na bola vermelha X
5. Leia mensagem de erro

### "Imagem criada mas MD não usa o nome correto"

**Problema:** Variável `ImageFileWithoutExt` incorreta

**Solução:**
1. Make.com > Módulo "Tools - Set Variables"
2. Verifique se está configurado corretamente
3. Execute novamente

### "Imagem muito grande - erro no upload"

**Solução:**
1. Google Form > Configurações
2. Limite máximo: Reduzir para 5MB
3. Comprimir imagens antes de enviar

---

## 💡 Dicas

✅ **Formatos recomendados:** PNG, JPG, WEBP
✅ **Tamanho máximo:** 5-10MB
✅ **Resolução ideal:** 800x600 pixels (para web)
✅ **Nome do arquivo:** Automático (não precisa pensar)

---

## 📊 Estrutura Final de Arquivos

```
precoamigo-site/
├── public/
│   ├── multivitaminico.png          ✅ (upload anterior)
│   ├── fantasia-dino.png            ✅ (novo upload)
│   ├── teste-imagem.png             ✅ (novo upload)
│   └── ...
│
├── src/content/ofertas/
│   ├── multivitaminico-growth.md    (manual)
│   ├── fantasia-infantil-dino.md    (automático + imagem)
│   └── ...
```

---

## ✅ Próximos Passos

1. **Adicione campo de upload** no Google Form
2. **Configure Make.com** (3 novos módulos)
3. **Delete campo** "Nome da Imagem" do formulário
4. **Teste com imagem** de teste
5. **Use no dia a dia!**

Pronto? Quer que eu crie um guia atualizado do Make.com completo com todos os passos?

