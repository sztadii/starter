---
name: backend-verify
description: >-
  Validate apps/server with typecheck/lint/format and curl API smoke.
  Use after editing Hono/server code before handing off.
---

# Backend verify

Run from `apps/server` after API changes. Fix failures before claiming
done. **API smoke uses curl** (no browser).

## 1. Static pass

```bash
cd apps/server && pnpm typecheck && pnpm lint && pnpm format
```

All must exit 0. (Root `pnpm check` runs format + lint + typecheck across
the whole workspace when you want a one-shot pass.)

## 2. Dev server

```bash
cd apps/server && pnpm dev
```

API on `:4000` (applies local D1 migrations).

## 3. Curl smoke (required)

```bash
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4000/health
# expect 200
```

For each new/changed endpoint, non-destructive curl as the seeded init
user. Credentials from `.env.development`: `INIT_USERNAME` /
`INIT_PASSWORD` are both the kebab-case package `name` (same as SQL
seed). Never `init` / `password`. Keep env + seed in sync.

Example login:

```bash
curl -sS -X POST http://127.0.0.1:4000/auth/login \
  -H 'content-type: application/json' \
  -d "{\"username\":\"$INIT_USERNAME\",\"password\":\"$INIT_PASSWORD\"}"
```

Assert success JSON / token; then curl authenticated routes with that
token. Prefer local first; production via `$VITE_API_URL` only for
non-destructive checks. Never destructive checks in production.

## Scope

- Only verify server. Do not contact the frontend agent — report API
  gaps to the main agent.
- Do not deploy unless asked or the task workflow requires `/deploy`.
- Do not edit `.cursor/tasks/status.md`; propose handoff to the main
  agent when proof is green.

## Report

- Commands run + pass/fail
- Curl endpoints + status codes (and brief body notes)
- Migration notes (if any)
- Handoff proposal for main agent (if closing an API-only task)
