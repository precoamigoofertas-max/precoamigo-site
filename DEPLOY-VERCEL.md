# Deploy — Preco Amigo (Vercel + GitHub)

## Fluxo automático

1. Faça commit e push na branch conectada ao projeto Vercel (geralmente `main`).
2. A Vercel detecta o push, roda `npm run build` e publica a pasta `dist/`.

## Configuração na Vercel (painel)

| Campo | Valor |
|--------|--------|
| **Framework Preset** | Astro |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | 22.x (projeto exige `>=22.12.0`) |

## Variáveis de ambiente

Em **Project → Settings → Environment Variables**, adicione:

| Nome | Valor | Ambientes |
|------|--------|-----------|
| `SITE_URL` | `https://precoamigo.com` | Production, Preview |

Sem isso, previews podem usar o fallback do `astro.config.mjs` (já é `precoamigo.com`).

## Domínio

1. **Settings → Domains** → confirme `precoamigo.com` (e `www` se usar).
2. DNS no registrador apontando para a Vercel (registros que a Vercel indicar).
3. Aguarde SSL automático (HTTPS).

## Checklist antes de cada push importante

- [ ] Imagens em `public/` commitadas (`logo.png`, produtos, etc.)
- [ ] `npm run build` local sem erro
- [ ] Novos artigos com `category:` no frontmatter (`casa`, `tecnologia`, `achadinhos`, `automotivo`)
- [ ] Ofertas em `src/content/ofertas/` com links `meli.la` válidos
- [ ] Preços com texto de referência / data quando aplicável

## Após o deploy

1. Abra `https://precoamigo.com` e teste home, categorias e um artigo.
2. **Google Search Console** → envie `https://precoamigo.com/sitemap-index.xml`
3. Teste redirect antigo: `/blog/controle-ps4/` → deve ir para `/categorias/tecnologia/controle-ps4/`

## URLs de artigos

| Antes | Agora |
|--------|--------|
| `/blog/controle-ps4/` | `/categorias/tecnologia/controle-ps4/` |

Redirects 301 permanecem em `/blog/*` para não perder SEO (configurados em `vercel.json`).

**Novo artigo:** ao publicar, adicione uma entrada em `vercel.json` de `/blog/slug` → `/categorias/categoria/slug/` (ou peça para automatizarmos isso no build).

## Problemas comuns

| Problema | Solução |
|----------|---------|
| Build falha na Vercel | Ver logs; conferir Node 22 e `npm run build` local |
| Site sem estilo | Output Directory deve ser `dist`, não `.astro` |
| Domínio não abre | Revisar DNS e domínio na Vercel |
| Imagens 404 | Arquivos faltando em `public/` no repositório |
| Variável de ambiente ignorada | Redeploy após salvar `SITE_URL` |

## Arquivo `.env` local

O `.env` **não** vai para o Git (está no `.gitignore`). Na Vercel use **Environment Variables**, não o arquivo `.env` do PC.
