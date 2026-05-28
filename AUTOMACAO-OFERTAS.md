# 🤖 Automação de Ofertas do Dia

Sistema para automatizar a criação de posts de ofertas usando Google Forms + Make.com (ou localmente).

---

## 📋 Opção 1: Script Local (Teste Rápido)

### Como usar:

1. **Edite `ofertas-queue.json`** com suas ofertas:

```json
[
  {
    "title": "Fantasia Infantil Dino Verde",
    "price": "74,00",
    "link": "https://meli.la/28Fjvd4",
    "image": "fantasia-dino.png"
  },
  {
    "title": "Multivitamínico Growth 120 Cáps",
    "price": "49,90",
    "link": "https://meli.la/1Z8NSf7",
    "image": "multivitaminico.png"
  }
]
```

**Campos obrigatórios:**
- `title` - Nome do produto
- `price` - Preço (com ou sem R$)
- `link` - URL do Mercado Livre
- `image` - Nome do arquivo (deve estar em `/public/`)

2. **Execute o script:**

```bash
npm run add-ofertas
```

3. **Resultado:**
   - ✅ Arquivos `.md` criados em `src/content/ofertas/`
   - ✅ `order` incrementado automaticamente
   - ✅ Descrição gerada automaticamente
   - ✅ Commit + push no Git

---

## 🌐 Opção 2: Google Forms + Make.com (Recomendado)

### Passo 1: Criar o Google Form

1. Acesse [forms.google.com](https://forms.google.com)
2. Crie um novo formulário com estes campos:

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Título do Produto | Texto curto | ✅ |
| Preço | Texto curto | ✅ |
| Link Mercado Livre | URL | ✅ |
| Imagem (nome arquivo) | Texto curto | ❌ (padrão: "oferta.png") |

3. **Copie o ID do formulário** (está na URL: `forms.google.com/u/0/d/{ID}/edit`)

### Passo 2: Configurar Make.com

1. **Criar conta em [make.com](https://www.make.com)** (gratuito)

2. **Criar novo Scenario:**

#### Bloco 1: Google Forms Trigger
- Módulo: `Google Forms` > `Watch Form Responses`
- Selecione o formulário criado
- Mapear campos

#### Bloco 2: Router (Validação)
- Verifique se todos os campos estão preenchidos
- Se faltar algo, envie email de aviso

#### Bloco 3: Transformação de Dados
```
Use "Set Multiple Variables" para formatar:
- Title: {{Título do Produto}}
- Price: {{Preço}}
- Link: {{Link}}
- Image: {{Imagem}} (ou "oferta.png" se vazio)
```

#### Bloco 4: GitHub API (Criar Arquivo)

**Configuração:**
- Módulo: `GitHub` > `Create a File`
- **Authentication**: Conecte sua conta GitHub
- **Repository**: precoamigo-site
- **File Path**: 
  ```
  src/content/ofertas/{{sanitize(Title)}}.md
  ```
- **Content** (o frontmatter):
  ```markdown
  ---
  title: "{{Title}}"
  description: "{{Title}} em promoção — aproveita o preço especial de hoje!"
  image: "/{{Image}}"
  price: "R$ {{Price}}"
  link: "{{Link}}"
  featured: true
  order: 0
  ---
  ```

#### Bloco 5: Incrementar Order (Opcional)
- Use webhooks para buscar ofertas existentes
- Calcule o próximo order
- Atualize o arquivo

#### Bloco 6: Trigger Build (Vercel - Opcional)
- Se usar Vercel, dispare um webhook para rebuild

---

## 📱 Como Usar no Dia a Dia

### Com Script Local:
```bash
# Editar ofertas-queue.json
nano ofertas-queue.json

# Processar
npm run add-ofertas
```

### Com Google Forms + Make.com:
1. Abra o link do formulário
2. Preencha os campos
3. Clique "Enviar"
4. **Pronto!** Post criado automaticamente em segundos

---

## 🔧 Troubleshooting

### Script retorna erro de Git

**Solução:**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Arquivo `.md` já existe

Script pula automaticamente. Delete o arquivo se quiser recrear:
```bash
rm src/content/ofertas/nome-do-arquivo.md
```

### Make.com não conecta ao GitHub

1. Vá em Make.com > Connections
2. Autorize aplicação GitHub novamente
3. Recrie o módulo

---

## 📊 Formato Final dos Arquivos

Cada oferta gera um arquivo assim:

```markdown
---
title: "Fantasia Infantil Dino Verde"
description: "Fantasia infantil com desconto imperdível — confira a oferta completa."
image: "/fantasia-dino.png"
price: "R$ 74,00"
link: "https://meli.la/28Fjvd4"
featured: true
order: 4
---
```

---

## 💡 Dicas

- ✅ Descrição é **gerada automaticamente** (varia entre 4 opções)
- ✅ Imagem deve estar em `/public/` antes de criar a oferta
- ✅ `order: 0` é sempre o destaque principal
- ✅ Ofertas antigas podem ter `order` decrementado manualmente se quiser remover do destaque

---

## 📞 Próximos Passos

1. **Testar script local** com ofertas-queue.json
2. **Se funcionar**, migrar para Google Forms + Make.com
3. **Depois**, conectar ao WhatsApp (Twilio) se quiser totalmente automático

