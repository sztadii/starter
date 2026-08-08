---
description: Deploy server and web to Cloudflare with env sync and smoke checks
---

# Deploy

Deploy both Cloudflare apps correctly — migrations, secrets, URL sync,
and production smoke. Do not skip steps.

**User-triggered only.** Task verification and `ready-for-qa` stay
local; do not run this command as part of the implement → QA loop
unless the user asked to ship.

Use `pnpm run deploy` (never `pnpm deploy`). First-time rename,
D1/KV/R2 create, and private GitHub belong to `/init`. This command
assumes bindings already exist with real remote ids.

## Preconditions (stop on failure)

1. Resolve `<prefix>` from root `package.json` `name` (not still
   `starter` unless that is intentional).
2. Root `.env.production` exists and is linked into apps
   (`pnpm env:link` if needed).
3. Confirm `.env.production`:
   - `SERVER_NAME=<prefix>-server`
   - `JWT_SECRET` is set and not a placeholder (`replace-me*`)
   - `INIT_USERNAME` / `INIT_PASSWORD` both equal `<prefix>`
   - `VITE_API_URL` may be stale until after server deploy
4. Wrangler configs have real remote ids (not all-zero placeholders):
   - `apps/server/wrangler.jsonc` — `database_id`, KV `id`, R2 bucket
   - `preview_database_id` stays `local`
5. Custom domains (required — no `workers.dev`):
   - `workers_dev` and `preview_urls` are `false` in both apps
   - Web route: `<prefix>.sztadii.dev` (`custom_domain: true`)
   - Server route: `<prefix>-server.sztadii.dev` (`custom_domain: true`)
6. Auth probes:
   - `cd apps/server && pnpm exec wrangler whoami`
   - `gh` not required for deploy

## Deploy order (always this order)

### 1. Server (migrations + Worker + secrets)

```bash
cd apps/server && pnpm run deploy
```

This runs remote D1 migrations, then
`wrangler deploy --secrets-file .env.production`.

Server URL is always `https://<prefix>-server.sztadii.dev` (not
workers.dev).

### 2. Sync `VITE_API_URL`

Set root `.env.production` `VITE_API_URL` to
`https://<prefix>-server.sztadii.dev` (no trailing slash). Re-run
`pnpm env:link` if app links are missing. Web build reads this at build
time — must be correct **before** web deploy.

### 3. Web (build + Worker assets)

```bash
cd apps/web && pnpm run deploy
```

This runs production build + prerender, then `wrangler deploy`.
Web URL is always `https://<prefix>.sztadii.dev` (no `-web` in the
hostname; Worker name may still be `<prefix>-web`).

## Production smoke (required)

Do not claim success until these pass. Non-destructive only.

| Check | Expect |
| --- | --- |
| `curl -sS -o /dev/null -w "%{http_code}" "$VITE_API_URL/health"` | `200` |
| `curl -sS -o /dev/null -w "%{http_code}" "https://<prefix>.sztadii.dev/"` | `200` |
| Init-user login against `$VITE_API_URL` using `INIT_*` from `.env.production` | success (curl; same as `backend-verify`) |

If any check fails: fix, redeploy the affected app, re-smoke. Do not
claim success as deployed.

For web UI, also run a short production browser smoke via
`frontend-verify` against the deployed URL (click primary flows; fail
on unexpected console/HTTP/UI errors). Curl alone is not enough for web.

## Report

Summarize:

- Server URL + web URL (`*.sztadii.dev`)
- Whether `VITE_API_URL` was updated
- Smoke results (health, web, login; browser if web)
- Any skipped/missing resources

## After deploy

`/deploy` is ad-hoc and does not change the board. It is independent of
`ready-for-qa` / `/next-step`.

## Do not

- Deploy only one app when both need shipping (unless user explicitly
  scopes to one app — then still sync URL if server changed)
- Use placeholder JWT or any `workers.dev` URLs in production env
- Enable `workers_dev` / preview URLs for production apps
- Run destructive production checks
- Create D1/KV/R2 or rename branding (that is `/init`)
