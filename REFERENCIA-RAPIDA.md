# 📌 Referência Rápida: Google Forms + Make.com

## Links Importantes

**Adicionar nova oferta:**
- Preencha o formulário em: [LINK-DO-SEU-FORMULARIO]
- Copie após configurar: `https://forms.google.com/u/0/d/[ID]/viewform`

**Acompanhar Make.com:**
- Dashboard: https://www.make.com/en/scenarios
- Seu Scenario: `Ofertas do Dia - Preco Amigo`

---

## Campos do Formulário

| # | Campo | Obrigatório | Exemplo |
|---|-------|-------------|---------|
| 1 | Título do Produto | ✅ | Fantasia Infantil Dino Verde |
| 2 | Preço anterior | ❌ | 140,00 |
| 3 | Preço atual | ✅ | 74,00 |
| 4 | Link Mercado Livre | ✅ | https://meli.la/28Fjvd4 |
| 5 | Nome da Imagem | ✅ | fantasia-dino |

---

## Fluxo Make.com

```
1️⃣ Google Sheets (Trigger)
   ↓ nova linha na planilha
2️⃣ Set Multiple Variables
   ↓ formata dados
3️⃣ GitHub (Create File)
   ↓ cria arquivo .md
4️⃣ Gmail (opcional)
   ↓ envia confirmação
```

---

## IDs Necessários

| Item | ID | Onde Copiar |
|------|----|----|
| Spreadsheet Google | `1abc...` | URL da planilha de respostas |
| Repositório GitHub | `precoamigo-site` | Seu GitHub |
| Branch | `main` | Git |

---

## Teste Rápido

1. Preencha formulário com dados de teste
2. Aguarde 30 segundos
3. Verifique:
   - [ ] Arquivo criado em `src/content/ofertas/`
   - [ ] Commit feito no Git (veja histórico)
   - [ ] Email recebido (opcional)

---

## Problemas Comuns

| Problema | Solução |
|----------|---------|
| Arquivo não criado | Atualize trigger Google Sheets em Make |
| GitHub não autorizado | Reconecte em Make > Connections |
| Email não chega | Verifique spam/autorização Gmail |
| Ordem sempre 0 | Normal - ajuste manualmente se precisar |

---

## Próximos Passos

- [ ] Configurar Google Form
- [ ] Criar Spreadsheet de respostas
- [ ] Criar conta Make.com
- [ ] Conectar Google Sheets
- [ ] Conectar GitHub
- [ ] Testar com formulário
- [ ] Guardar link do formulário

**Dúvidas?** Veja [SETUP-MAKE-GOOGLE-FORMS.md](SETUP-MAKE-GOOGLE-FORMS.md)
