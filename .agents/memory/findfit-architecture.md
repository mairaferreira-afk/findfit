---
name: FindFit full-stack architecture
description: Stack, routing, data model, and constraints for the FindFit/FindIt fashion discovery app
---

## Stack
- Frontend: React + Vite + wouter, port 19465, preview path `/`
- API: Express 5 + Drizzle ORM, port 8080, all routes under `/api`
- DB: PostgreSQL via @workspace/db; tables: categories, stores, products, searches, favorites
- Design system: @workspace/findfit-ds — import via `@import "@workspace/findfit-ds/styles.css"` in index.css; components from `@workspace/findfit-ds/components/ui/*`
- API codegen: `pnpm --filter @workspace/api-spec run codegen` — spec at `lib/api-spec/openapi.yaml`
- Seed: `pnpm --filter @workspace/api-server run seed` (after build)

## Key constraints
**Why:** `z.int()` doesn't exist in this workspace's Zod version. Use `type: number` (not `type: integer`) for all fields in openapi.yaml to avoid codegen errors.
**How to apply:** Any future spec edit must use `type: number` not `type: integer`.

## Data
- 15 fashion products seeded (vestidos, tops, saias, conjuntos) in white/ivory/champagne palette
- 8 stores seeded (Zara, Mango, Farm Rio, COS, Le Lis Blanc, Renner, AMARO, H&M)
- 6 categories: todos, vestido, top, saia, conjunto, calca
- Product images at `artifacts/findit-app/public/images/products/product-01.jpg` … `product-15.jpg`

## Pages
- `/` — Home: upload foto + texto search → createSearch → navigate to /resultados/:searchId
- `/resultados/:searchId` — grid com filtros de categoria
- `/produto/:productId` — detalhe com similar products
- `/lojas` — lojas próximas com distância simulada
- `/favoritos` — peças salvas (CRUD)

## API route order
`/produtos/destaque` must be registered BEFORE `/produtos/:productId` in Express 5 to avoid param matching.
