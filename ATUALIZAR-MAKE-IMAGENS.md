# 🔄 Atualizar Make.com: Adicionar Upload de Imagens

Guia para modificar seu Scenario existente e adicionar upload automático.

---

## ⚠️ Antes de Começar

**Salve o estado atual:**
1. Acesse Make.com > Seu Scenario
2. Screenshot ou anotação do "File Content" do módulo GitHub (arquivo .md)
3. Copie o conteúdo exatamente como está

**Exemplo do que você tem agora:**
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

---

## PASSO 1️⃣: Adicionar Módulo Google Drive

### Localização no Scenario

```
[Google Sheets Trigger]
         ↓
[NEW: Google Drive Download] ← AQUI
         ↓
[Set Multiple Variables]
         ↓
[GitHub Create File (MD)]
```

### Como Adicionar

1. Clique **entre** o trigger e o módulo "Set Multiple Variables"
2. Clique no **"+"** (sinal de mais)
3. Busque: **"Google Drive"**
4. Selecione: **"Download a File"**

### Preencher Campos

| Campo | Valor |
|-------|-------|
| **Connection** | Sua conta Google (já autorizada) |
| **File ID** | `{{1.Imagem do Produto}}` |

**IMPORTANTE:** O nome exato do campo deve ser como aparece no Google Form

**Clique:** "OK"

---

## PASSO 2️⃣: Atualizar "Set Multiple Variables"

Encontre este módulo no seu scenario e **atualize** (não delete, atualize):

### Campos Existentes (Manter Como Estão)

```
Name: Title
Value: {{1.Título do Produto}}

Name: Price
Value: {{1.Preço atual (ex: 74,00)}}

Name: Link
Value: {{1.Link do Mercado Livre}}

Name: Image
Value: {{1.Nome da imagem (sem .png, ex: fantasia-dino)}}
```

### ⚠️ AGORA DELETE O CAMPO "Image"

Clique no "🗑️" próximo a este:
```
Name: Image
Value: {{1.Nome da imagem (sem .png, ex: fantasia-dino)}}
```

### ✅ ADICIONE DOIS NOVOS CAMPOS

**Campo 1: Extrair Nome do Arquivo**
```
Name: ImageFileName
Value: {{regex(1.Imagem do Produto; "([^/]+)$")}}
```

**Campo 2: Remover Extensão**
```
Name: ImageFileWithoutExt
Value: {{replace(ImageFileName; "\.[^.]*$"; "")}}
```

**Resultado final no módulo:**
```
Name: Title
Value: {{1.Título do Produto}}

Name: Price
Value: {{1.Preço atual (ex: 74,00)}}

Name: Link
Value: {{1.Link do Mercado Livre}}

Name: ImageFileName
Value: {{regex(1.Imagem do Produto; "([^/]+)$")}}

Name: ImageFileWithoutExt
Value: {{replace(ImageFileName; "\.[^.]*$"; "")}}
```

**Clique:** "OK"

---

## PASSO 3️⃣: Adicionar Módulo GitHub (Upload Imagem)

### Localização

```
[Google Sheets Trigger]
         ↓
[Google Drive Download]
         ↓
[Set Multiple Variables]
         ↓
[NEW: GitHub Create File (Imagem)] ← AQUI (NOVO)
         ↓
[GitHub Create File (MD)]
         ↓
[Gmail - opcional]
```

### Como Adicionar

1. Clique entre "Set Multiple Variables" e o módulo GitHub (arquivo .md)
2. Clique no **"+"**
3. Busque: **"GitHub"**
4. Selecione: **"Create a File"**

### Preencher Campos

| Campo | Valor |
|-------|-------|
| **Repository** | precoamigo-site |
| **Branch** | main |
| **File Path** | `public/{{ImageFileWithoutExt}}` |
| **File Content** | `{{1.Imagem do Produto}}` |
| **Commit Message** | `Imagem adicionada: {{ImageFileWithoutExt}}` |

**IMPORTANTE:** 
- Deixe exatamente como está: `public/` (sem barra no final)
- No campo "File Content", clique no ícone **"📊"** à direita
- Selecione **"Binary Data"** (não texto)

**Clique:** "OK"

---

## PASSO 4️⃣: Atualizar Módulo GitHub (Arquivo MD)

Encontre o módulo GitHub que **já existe** criando o arquivo `.md` (arquivo de oferta).

### Campo a Modificar: "File Content"

**Encontre esta linha:**
```markdown
image: "/{{Image}}.png"
```

**Substitua por:**
```markdown
image: "/{{ImageFileWithoutExt}}"
```

**Resto do conteúdo permanece igual:**
```markdown
---
title: "{{Title}}"
description: "{{Title}} em promoção — aproveita o preço especial de hoje!"
image: "/{{ImageFileWithoutExt}}"
price: "R$ {{Price}}"
link: "{{Link}}"
featured: true
order: 0
---
```

**Clique:** "OK"

---

## PASSO 5️⃣: Testar o Novo Fluxo

### Antes de Testar: Atualizar Google Form

1. Abra seu Google Form: "Ofertas do Dia - Preco Amigo"
2. **Delete o campo:** "Nome da imagem (sem .png, ex: fantasia-dino)"
   - Clique no campo
   - Clique no "🗑️"
   - Confirme
3. **Adicione novo campo:** "Imagem do Produto"
   - Tipo: **Arquivo (File Upload)**
   - Obrigatório: ✅ Sim
   - Descrição: "Envie a imagem em PNG ou JPG"
4. **Salve o formulário**

### Teste no Make.com

1. Prepare uma **imagem teste local** (PNG ou JPG)
   - Nome: `teste-imagem.png`
2. Acesse o **Google Form**
3. Preencha com dados de teste:
   - Título: `Teste Upload Imagem`
   - Preço: `99,90`
   - Link: `https://meli.la/test`
   - **Imagem:** Clique "Escolher arquivo" → `teste-imagem.png`
4. Clique "Enviar"
5. Volte ao **Make.com**
6. Clique **"Run Once"**
7. **Observe execução** - se tudo verde ✅, perfeito!

### Verificar Resultado

```bash
# Terminal no repositório:

# 1. Imagem foi criada?
ls public/teste-imagem.png

# 2. Arquivo MD foi criado?
ls src/content/ofertas/teste-upload-imagem.md

# 3. Conteúdo correto?
cat src/content/ofertas/teste-upload-imagem.md
# Deve mostrar: image: "/teste-imagem.png"
```

---

## 🆘 Se Algo Deu Errado

### "Google Drive Download falhou"

**Verificar:**
1. Campo está se chamando "Imagem do Produto"? (nome exato)
2. Arquivo é PNG ou JPG?
3. Arquivo é menor que 25MB?

**Solução:**
- Vá em Make.com > Módulo Google Drive
- Clique em "Refresh" 
- Reconecte a conta Google

### "Arquivo criado mas não em /public/"

**Problema:** File Path incorreto

**Solução:**
1. Make.com > Módulo GitHub (o novo)
2. Verifique File Path: `public/{{ImageFileWithoutExt}}`
3. Sem barra final, sem `src/`

### "Imagem não aparece no blog"

**Verificar:**
1. Arquivo está em `/public/`?
2. Arquivo `.md` tem nome correto?
3. Campo `image:` está correto?
4. Rebuild o site: `npm run build`

---

## ✅ Checklist Final

- [ ] Google Drive Download adicionado
- [ ] Set Multiple Variables atualizado
- [ ] GitHub (Imagem) novo módulo adicionado
- [ ] GitHub (MD) linha `image:` atualizada
- [ ] Google Form atualizado (campo upload)
- [ ] Campo "Nome da imagem" deletado do Form
- [ ] Teste com imagem feito
- [ ] Resultado verificado em `/public/`
- [ ] Post criado com imagem correta

---

## 🎉 Resultado Final

Agora quando preencher o formulário:

1. ✅ Upload de imagem no Forms
2. ✅ Make.com faz download
3. ✅ Make.com faz upload para `/public/`
4. ✅ Post criado com imagem automática
5. ✅ Tudo pronto no blog!

**Tempo por oferta: ~1 minuto** (incluindo upload)

---

## 📌 Resumo das Mudanças

| O que mudou | Antes | Depois |
|------------|-------|--------|
| **Upload imagem** | Manual no /public/ | Pelo formulário |
| **Campo Form** | Nome da imagem (texto) | Arquivo (upload) |
| **Módulos Make** | 3 módulos | 5 módulos |
| **Tempo setup** | 30 min | +15 min |
| **Tempo/oferta** | 1 min | 1 min |

Tudo certo? 🚀

