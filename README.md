# VestuDiretório

Diretório de fornecedores de vestuário atacadista (Brás, Bom Retiro, 25 de Março).

## Stack

- **Frontend:** Astro (SSG)
- **Backend:** Supabase (PostgreSQL + API)
- **Deploy:** Netlify (MVP) → Vercel (Produção)
- **DNS:** Cloudflare (vestu.elofirme.com.br)

## Setup

### 1. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a **URL** e a **Anon Key**

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:

```
PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 3. Criar schema no Supabase

1. Acesse o **SQL Editor** no Supabase
2. Execute o conteúdo de `squads/diretorio-b2b/output/schema.sql`
3. Execute o conteúdo de `squads/diretorio-b2b/output/seed.sql`

### 4. Instalar dependências

```bash
npm install
```

### 5. Rodar localmente

```bash
npm run dev
```

Acesse http://localhost:4321

## Deploy

### Netlify (MVP)

1. Conecte o repositório ao Netlify
2. Configure as variáveis de ambiente no painel
3. Deploy automático a cada push

### Vercel (Produção)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Configure o domínio vestu.elofirme.com.br

## Estrutura

```
src/
├── layouts/
│   └── Layout.astro
├── lib/
│   └── supabase.ts
└── pages/
    └── index.astro
```

## Funcionalidades

- [x] Filtros por polo (Brás, Bom Retiro, 25 de Março)
- [x] Filtro por MOQ (Pedido Mínimo)
- [x] Filtro por aceita CPF
- [x] Filtro por tipo de produto
- [x] Filtro por faixa de preço
- [x] Busca textual
- [x] Cards de fornecedores
- [x] Link WhatsApp direto
- [ ] Página de detalhe do fornecedor
- [ ] Analytics
- [ ] Monetização (afiliados, ads)

## Métricas

| Métrica | Meta |
|---------|------|
| Lighthouse | 100 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

---

**Departamento:** Diretório B2B — Genesis
