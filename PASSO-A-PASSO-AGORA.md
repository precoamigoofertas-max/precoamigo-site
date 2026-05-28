# ✅ Passo a Passo Prático: Configurar Forms + Make com Upload

Execute AGORA, item por item.

---

## 📋 PARTE 1: Google Form (5 minutos)

### 1️⃣ Abrir o Formulário

Acesse: [forms.google.com](https://forms.google.com)

Clique em seu formulário: **"Ofertas do Dia - Preco Amigo"**

---

### 2️⃣ Deletar Campo "Nome da Imagem"

1. Procure a pergunta: **"Nome da imagem (sem .png, ex: fantasia-dino)"**
2. Clique no **"⋮"** (três pontos) ou passe mouse e clique em **"🗑️ Deletar"**
3. **Confirme**

✅ Pronto - campo deletado

---

### 3️⃣ Adicionar Campo de Upload de Arquivo

1. Clique no **"+"** (adicionar pergunta)
2. Preencha:

| Campo | Valor |
|-------|-------|
| Pergunta | `Imagem do Produto` |
| Tipo | **Arquivo** (na dropdown) |
| Descrição | `Envie PNG ou JPG - max 10MB` |
| Obrigatório | ✅ (marque o checkbox) |

3. Clique **"✓"** para salvar

✅ Pronto - campo de upload criado

---

### 4️⃣ Testar o Formulário

1. Clique no **"👁️ Visualizar"** (ícone de olho)
2. Veja se aparece o novo campo "Imagem do Produto"
3. Volte editando: clique **"Editar"**

✅ Pronto - formulário atualizado

---

## 🔧 PARTE 2: Make.com (10 minutos)

### 1️⃣ Acessar seu Scenario

Vá em: [make.com/en/scenarios](https://make.com/en/scenarios)

Clique em: **"Ofertas do Dia - Preco Amigo"**

---

### 2️⃣ Adicionar Módulo Google Drive (NOVO)

**Localização:** Entre o trigger (Google Sheets) e o módulo "Set Multiple Variables"

1. Clique no **"+"** (sinal de mais) entre os dois módulos
2. Na busca, digite: **"Google Drive"**
3. Selecione: **"Download a File"**
4. Clique **"Save"**

#### Configurar o Módulo:

| Campo | Valor |
|-------|-------|
| **Connection** | [Sua conta Google - já autorizada] |
| **File ID** | `{{1.Imagem do Produto}}` |

5. Clique **"OK"**

✅ Pronto - Google Drive adicionado

---

### 3️⃣ Atualizar "Set Multiple Variables" (EXISTENTE)

Clique no módulo que já existe "Set Multiple Variables"

#### A) DELETE este campo:
```
Name: Image
Value: {{1.Nome da imagem (sem .png, ex: fantasia-dino)}}
```

Clique no **"🗑️"** ao lado dele

#### B) ATUALIZE ou verifique campos existentes:

```
Variable 1:
Name: Title
Value: {{1.Título do Produto}}

Variable 2:
Name: Price
Value: {{1.Preço atual (ex: 74,00)}}

Variable 3:
Name: Link
Value: {{1.Link do Mercado Livre}}
```

#### C) ADICIONE dois novos campos:

**Campo novo 1:**
```
Name: ImageFileName
Value: {{regex(1.Imagem do Produto; "([^/]+)$")}}
```

**Campo novo 2:**
```
Name: ImageFileWithoutExt
Value: {{replace(ImageFileName; "\.[^.]*$"; "")}}
```

**Resultado final (copie):**
```
Title: {{1.Título do Produto}}
Price: {{1.Preço atual (ex: 74,00)}}
Link: {{1.Link do Mercado Livre}}
ImageFileName: {{regex(1.Imagem do Produto; "([^/]+)$")}}
ImageFileWithoutExt: {{replace(ImageFileName; "\.[^.]*$"; "")}}
```

5. Clique **"OK"**

✅ Pronto - variáveis atualizadas

---

### 4️⃣ Adicionar Módulo GitHub para Upload de Imagem (NOVO)

**Localização:** Entre "Set Multiple Variables" e o módulo GitHub que cria o `.md`

1. Clique no **"+"**
2. Busque: **"GitHub"**
3. Selecione: **"Create a File"**
4. Clique **"Save"**

#### Configurar:

| Campo | Valor |
|-------|-------|
| **Repository** | precoamigo-site |
| **Branch** | main |
| **File Path** | `public/{{ImageFileWithoutExt}}` |
| **File Content** | `{{1.Imagem do Produto}}` |
| **Commit Message** | `Imagem adicionada: {{ImageFileWithoutExt}}` |

#### ⚠️ IMPORTANTE - "File Content" em Binary:

- Clique no campo "File Content"
- À direita do campo, clique no ícone **"📊"** (data)
- Selecione **"Binary Data"**
- Confirme

5. Clique **"OK"**

✅ Pronto - GitHub upload de imagem criado

---

### 5️⃣ Atualizar Módulo GitHub para Arquivo .md (EXISTENTE)

Clique no módulo GitHub que cria o arquivo da oferta (tem `src/content/ofertas/` no File Path)

#### Campo a Mudar: "File Content"

**Procure esta linha:**
```markdown
image: "/{{Image}}.png"
```

**Substitua por:**
```markdown
image: "/{{ImageFileWithoutExt}}"
```

**Exemplo completo do que deve estar:**
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

6. Clique **"OK"**

✅ Pronto - arquivo .md atualizado

---

## 🧪 PARTE 3: Fazer o Primeiro Teste (5 minutos)

### 1️⃣ Preparar Imagem de Teste

1. Pегу uma imagem (PNG ou JPG) no seu PC
2. Nome simples: `teste-imagem.png`

---

### 2️⃣ Preencher o Formulário

1. Abra seu Google Form (modo visualização)
2. Preencha com dados de teste:

| Campo | Valor |
|-------|-------|
| Título do Produto | `Teste Upload Imagem` |
| Preço anterior | (deixe em branco) |
| Preço atual | `99,90` |
| Link Mercado Livre | `https://meli.la/teste123` |
| **Imagem do Produto** | **Clique "Escolher arquivo" → selecione `teste-imagem.png`** |

3. Clique **"Enviar"**

✅ Formulário enviado

---

### 3️⃣ Executar Make.com

1. Acesse [make.com](https://make.com)
2. Abra seu Scenario: **"Ofertas do Dia - Preco Amigo"**
3. Clique no botão **"Run Once"** (canto superior esquerdo)
4. **Observe a execução** - espere completar

---

### 4️⃣ Verificar Resultados

Abra o **Terminal** (VS Code ou seu terminal):

```bash
# Ir para a pasta do projeto
cd d:\precoamigo-site\precoamigo-site

# Verificar se imagem foi criada em /public/
dir public/teste*

# Deve aparecer: teste-imagem.png
```

Se aparecer, ✅ **Imagem foi uploadada com sucesso!**

---

### 5️⃣ Verificar Arquivo da Oferta

```bash
# Listar arquivos de ofertas
dir src\content\ofertas\*teste*

# Deve aparecer: teste-upload-imagem.md
```

Se aparecer, ✅ **Arquivo foi criado com sucesso!**

---

### 6️⃣ Verificar Conteúdo do Arquivo

```bash
# Ver conteúdo
type src\content\ofertas\teste-upload-imagem.md
```

**Deve mostrar algo assim:**
```markdown
---
title: "Teste Upload Imagem"
description: "Teste Upload Imagem em promoção — aproveita o preço especial de hoje!"
image: "/teste-imagem.png"
price: "R$ 99,90"
link: "https://meli.la/teste123"
featured: true
order: X
---
```

✅ **Tudo perfeito!**

---

## ✅ Checklist de Conclusão

- [ ] Campo "Nome da imagem" deletado do Form
- [ ] Campo "Imagem do Produto" (upload) adicionado ao Form
- [ ] Google Drive Download adicionado em Make.com
- [ ] Set Multiple Variables atualizado (ImageFileName + ImageFileWithoutExt)
- [ ] GitHub Create File (imagem) novo módulo adicionado
- [ ] GitHub Create File (MD) - linha `image:` atualizada
- [ ] Teste com imagem feito
- [ ] Imagem criada em `/public/`
- [ ] Arquivo `.md` criado em `/ofertas/`
- [ ] Conteúdo do arquivo correto

---

## 🎉 Resultado Final

Agora você pode:

1. Preencher o formulário com título, preço, link
2. **Selecionar uma imagem**
3. Clique enviar
4. **Em 30 segundos:**
   - ✅ Imagem faz upload para `/public/`
   - ✅ Post criado com link da imagem automático
   - ✅ Tudo no blog!

---

## 🆘 Se Algo Deu Errado

### "Imagem não apareceu em /public/"

**Verificar em Make.com:**
1. Clique no Scenario
2. Clique "Run Once" novamente
3. Procure a bola ❌ vermelha (erro)
4. Clique nela para ver a mensagem
5. **Copie a mensagem de erro**

**Problema comum:**
- Campo não se chama exatamente "Imagem do Produto"?
- Arquivo é PNG/JPG?
- Arquivo é maior que 25MB?

### "Arquivo .md criado mas sem imagem"

**Verificar:**
1. No arquivo `.md`, aparece `image: "/teste-imagem.png"`?
2. Se aparecer `{{ImageFileWithoutExt}}`, significa variável não foi substituída
3. Vá em Make.com > Set Multiple Variables e verifique

### "Make.com mostra erro ao executar"

1. Clique na bola ❌ vermelha
2. Leia a mensagem de erro
3. Se for GitHub: reconecte em Connections
4. Se for Google Drive: reconecte em Connections

---

**Pronto para começar?** Qual é o seu primeiro passo? 🚀

