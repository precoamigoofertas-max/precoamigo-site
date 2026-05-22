# Futuro: GA4 + banner de cookies

Use este guia quando for ativar medição e Google Ads. Até lá, a política de privacidade já declara que **não** há essas ferramentas.

## Checklist

1. [ ] Criar propriedade GA4 em https://analytics.google.com
2. [ ] Adicionar `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX` na Vercel (Environment Variables)
3. [ ] Implementar componente `CookieConsent.astro` (bloquear scripts até aceitar)
4. [ ] Carregar gtag só após consentimento (Consent Mode v2: `analytics_storage`, `ad_storage`)
5. [ ] Descomentar seção em `src/pages/privacidade.astro` (bloco HTML `FUTURO — GA4`)
6. [ ] Adicionar link "Gerenciar cookies" no `Footer.astro`
7. [ ] Atualizar data em "Última atualização" na privacidade
8. [ ] Testar: recusar cookies → GA não dispara; aceitar → page_view registrado

## Eventos sugeridos (afiliado)

```javascript
// Exemplo após consentimento analytics
gtag('event', 'click_affiliate', {
  link_url: 'https://meli.la/...',
  page_path: window.location.pathname,
});
```

## Referência de implementação (esboço)

```astro
---
// src/components/CookieConsent.astro — criar quando ativar
---
<!-- Banner fixo no rodapé até escolha do usuário -->
<!-- localStorage: precoamigo_consent = granted | denied -->
```

```html
<!-- BaseHead.astro — só se consent === granted -->
<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
```

Não commitar ID de medição em repositório público se preferir; use variável de ambiente na Vercel.
