# ✅ Checklist: Implementação Google Forms + Make.com

Use este checklist para acompanhar seu progresso na configuração.

---

## 📋 FASE 1: Google Forms (10 minutos)

### Criar Formulário
- [ ] Acesso [forms.google.com](https://forms.google.com)
- [ ] Criar novo formulário nomeado "Ofertas do Dia - Preco Amigo"
- [ ] **Campo 1:** "Título do Produto" (Texto curto, obrigatório)
- [ ] **Campo 2:** "Preço anterior" (Texto curto, opcional)
- [ ] **Campo 3:** "Preço atual" (Texto curto, obrigatório)
- [ ] **Campo 4:** "Link Mercado Livre" (URL, obrigatório)
- [ ] **Campo 5:** "Nome da Imagem" (Texto curto, obrigatório)
- [ ] Clique "Enviar" no próprio form para testar

### Configurar Respostas
- [ ] Clique em "Respostas" (aba superior)
- [ ] Clique em "📊" (ícone de planilha)
- [ ] Clique "Criar nova planilha" (nome: "Ofertas - Respostas")
- [ ] **Planilha Google Sheets criada e conectada**
- [ ] Preencha o formulário COM DADOS DE TESTE
- [ ] Verifique que dados aparecem na planilha

### Copiar IDs
- [ ] **ID Formulário:** https://forms.google.com/u/0/d/**[COPIE-ISTO]**/viewform
- [ ] **ID Planilha:** https://docs.google.com/spreadsheets/d/**[COPIE-ISTO]**/edit
- [ ] Copie o link de compartilhamento do formulário

---

## 📋 FASE 2: Conta Make.com (5 minutos)

### Criar Conta
- [ ] Acesso [make.com](https://www.make.com)
- [ ] Clique "Sign Up"
- [ ] Email, senha, verificação
- [ ] **Conta criada e verificada**

### Dashboard
- [ ] Verifique plano (Gratuito = 1.000 operações/mês ✅)
- [ ] Faça tour rápido para entender interface

---

## 📋 FASE 3: Conectar Google Sheets (5 minutos)

### Criar Scenario
- [ ] Clique "+ Create"
- [ ] Nomeie: "Ofertas do Dia - Preco Amigo"
- [ ] Clique "Create Scenario"

### Adicionar Trigger
- [ ] Clique no canvas para adicionar módulo
- [ ] Busque "Google Sheets"
- [ ] Selecione **"Watch for Rows"**
- [ ] Clique "Connection" > "Add"
- [ ] Autorize sua conta Google
- [ ] Selecione:
  - Spreadsheet: "Ofertas - Respostas"
  - Worksheet: "Form Responses 1"
  - Limit: 1
  - ✅ "Return new rows only" = ON

### Testar Trigger
- [ ] Clique "Run Once"
- [ ] Volte ao Google Form e preencha com dados de teste
- [ ] Aguarde 30 segundos e clique "Run Once" novamente
- [ ] Verifique se os dados aparecem no trigger

---

## 📋 FASE 4: Conectar GitHub (5 minutos)

### Adicionar Módulo GitHub
- [ ] Clique "+" após trigger
- [ ] Busque "GitHub"
- [ ] Selecione **"Create a File"**
- [ ] Clique "Connection" > "Add"
- [ ] Autorize sua conta GitHub no Make.com

### Configurar Arquivo
- [ ] Repository: "precoamigo-site"
- [ ] Branch: "main"
- [ ] File Path: `src/content/ofertas/{{sanitizeFilename(Title)}}.md`
- [ ] File Content: *(copie o frontmatter abaixo)*

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

- [ ] Commit Message: `Oferta adicionada: {{Title}}`

---

## 📋 FASE 5: Teste Completo (5 minutos)

### Executar Scenario Completo
- [ ] Make.com > Clique "Run Once"
- [ ] Verifique se tudo foi executado sem erros
- [ ] Se tiver erro ❌, consulte [TROUBLESHOOTING-MAKE-FORMS.md](TROUBLESHOOTING-MAKE-FORMS.md)

### Verificar Resultado
- [ ] Arquivo foi criado em `src/content/ofertas/`?
  ```bash
  # Terminal no repo:
  ls src/content/ofertas/
  ```
- [ ] Arquivo tem conteúdo correto?
  ```bash
  cat src/content/ofertas/[seu-arquivo].md
  ```
- [ ] Git commit foi feito?
  ```bash
  git log --oneline | head -3
  ```

### Testar no Blog
- [ ] Build local: `npm run build`
- [ ] Verifique se oferta aparece em "Ofertas do Dia"
- [ ] Clique no card e verifique dados

---

## 📋 FASE 6: Configuração Extra (Opcional)

### Email de Confirmação (Opcional)
- [ ] Clique "+" após GitHub
- [ ] Busque "Gmail"
- [ ] Selecione "Send an Email"
- [ ] Configure:
  - To: seu@email.com
  - Subject: ✅ Oferta Postada: {{Title}}
  - Body: Criada em {{now}}
- [ ] Teste enviando uma oferta

### Vercel Auto-Deploy (Opcional)
- [ ] Acesse Vercel > Settings > Deploy Hooks
- [ ] Crie novo hook (nome: "ofertas-update")
- [ ] **Copie URL do webhook**
- [ ] No Make.com, adicione módulo "Webhooks" após GitHub
- [ ] Cole URL do webhook

---

## 📋 FASE 7: Produção (Ongoing)

### Usar Formulário
- [ ] **Bookmark** o link do formulário
- [ ] Preencha quando tiver nova oferta
- [ ] Aguarde 30 segundos
- [ ] Verifique se apareceu no blog

### Monitorar
- [ ] Verifique erros em Make.com regularmente
- [ ] Logs em GitHub (git log)
- [ ] Feedback de conversões de ofertas

### Manutenção
- [ ] Se erro persistir, consulte troubleshooting
- [ ] Atualize order manualmente se precisar de ajustes
- [ ] Revise descrição automática (pode customizar)

---

## 📊 Status Final

**Quando tudo estiver completo:**

```
✅ Google Form: Funcional
✅ Google Sheets: Conectada
✅ Make.com: Scenario ativo
✅ GitHub: Autorizado
✅ Primeiro teste: SUCESSO
✅ Blog: Mostrando oferta
```

**Você pode agora:**
- 🎉 Postar ofertas via formulário
- ⏱️ Processo: ~1 minuto por oferta
- 💰 Custo: Totalmente gratuito
- 🚀 Próximo: Integrar WhatsApp (opcional)

---

## 🔗 Links Úteis

| Item | URL |
|------|-----|
| Google Forms | https://forms.google.com |
| Make.com Dashboard | https://www.make.com/en/scenarios |
| GitHub Repo | https://github.com/precoamigoofertas-max/precoamigo-site |
| Blog do Preco Amigo | [seu-domain.com] |
| Formulário (após criar) | [COPIE-AQUI] |

---

## 📞 Próximos Passos

Após completar este checklist:

1. **Opção A:** Use o sistema dia a dia e colha dados
2. **Opção B:** Integre WhatsApp (Twilio) para automação ainda maior
3. **Opção C:** Customize descrição com IA (integrar OpenAI no Make.com)

---

**Questões?** Leia [SETUP-MAKE-GOOGLE-FORMS.md](SETUP-MAKE-GOOGLE-FORMS.md) ou [TROUBLESHOOTING-MAKE-FORMS.md](TROUBLESHOOTING-MAKE-FORMS.md)

