---
name: api-hono
description: >-
  Design and implement Hono API on Cloudflare Workers (D1, KV, R2).
  Use when adding or changing apps/server endpoints, services, or providers.
---

# API (Hono + Cloudflare)

Work in `apps/server`. Follow `.cursor/rules/code-style.mdc`.

## Layering

| Layer | Where | Rule |
| --- | --- | --- |
| Route | `createControllers.ts` | Thin; wire controller |
| Controller | `controllers/*.controller.ts` | One request; take `context` |
| Service | `services/*.service.ts` | Domain logic; named exports |
| Provider | `providers/<name>/` | Infra only; default export + typed contract |

Do not put SQL or Cloudflare binding details in controllers.

## Endpoints

- Validate input (Zod or equivalent) before side effects
- Stable JSON error shapes; map domain errors to HTTP status
- Auth routes use existing middleware patterns (`authMiddleware`)
- New tables: SQL migration under `migrations/` (reviewable SQL)

## Bindings

Use wrangler bindings (`DB`, `CACHE`, `STORAGE`, `AI`, `EMAIL`) via
providers — never invent parallel clients.

## Init user

Seeded init credentials = kebab-case package `name` in env + SQL seed.
Never `init` / `password`. Keep seed and `.env*` in sync.

## Done when

Endpoint is wired end-to-end and ready for `backend-verify` (curl smoke
as init user).
