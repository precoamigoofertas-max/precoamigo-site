# 🚀 Quick Start: Upload de Imagens (2 Minutos)

Você já tem Make.com configurado? Siga isso:

---

## 👀 Escolha Seu Cenário

### Cenário A: Já Tenho Make.com Funcionando ✅
**Vai levar ~10 minutos para atualizar**

→ Leia: [ATUALIZAR-MAKE-IMAGENS.md](ATUALIZAR-MAKE-IMAGENS.md)

**Passos rápidos:**
1. Adicione Google Drive Download no Make
2. Atualize campos de variáveis
3. Adicione GitHub para upload de imagem
4. Atualize linha `image:` no MD
5. Delete campo "Nome da Imagem" do Form
6. Teste!

---

### Cenário B: Ainda Não Configurei Make.com ❌
**Vai levar ~45 minutos total (setup + imagens)**

→ Leia: [SETUP-MAKE-GOOGLE-FORMS.md](SETUP-MAKE-GOOGLE-FORMS.md)
→ Depois: [UPLOAD-IMAGENS-AUTOMATICO.md](UPLOAD-IMAGENS-AUTOMATICO.md)

**Passos:**
1. Criar Google Form (com campo de upload)
2. Configurar Make.com (5 módulos, incluindo upload)
3. Testar tudo junto

---

## ⚡ Fluxo Final (Com Upload)

```
1. Preencher Formulário
   ├─ Título: "Fantasia Dino"
   ├─ Preço: 74,00
   ├─ Link: https://meli.la/abc
   └─ IMAGEM: Clique e selecione arquivo PNG/JPG

2. Clique "Enviar"

3. Em ~30 segundos:
   ✅ Imagem faz upload para /public/
   ✅ Post criado com imagem automática
   ✅ Tudo no blog!
```

---

## 📋 Campos do Formulário (Final)

| Campo | Tipo | Obrigatório |
|-------|------|------------|
| Título do Produto | Texto | ✅ |
| Preço anterior | Texto | ❌ |
| Preço atual | Texto | ✅ |
| Link Mercado Livre | URL | ✅ |
| **Imagem do Produto** | **Arquivo** | ✅ |

---

## 📞 Qual Doc Ler?

```
├─ Já tem Make.com?
│  └─ ATUALIZAR-MAKE-IMAGENS.md
│
└─ Não tem nada ainda?
   ├─ SETUP-MAKE-GOOGLE-FORMS.md (1º)
   └─ UPLOAD-IMAGENS-AUTOMATICO.md (2º)
```

---

**Qual é seu cenário?** Vou ajudar com o documento correto! 🎯

