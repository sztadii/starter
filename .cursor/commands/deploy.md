---
description: Deploy server and web to Cloudflare with env sync and smoke checks
---

# Deploy

Deploy both Cloudflare apps correctly — migrations, secrets, URL sync,
and production smoke. Do not skip steps.

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
5. Auth probes:
   - `cd apps/server && pnpm exec wrangler whoami`
   - `gh` not required for deploy

## Deploy order (always this order)

### 1. Server (migrations + Worker + secrets)

```bash
cd apps/server && pnpm run deploy
```

This runs remote D1 migrations, then
`wrangler deploy --secrets-file .env.production`.

Capture the workers.dev URL from deploy output
(e.g. `https://<prefix>-server.<account>.workers.dev`).

### 2. Sync `VITE_API_URL`

Set root `.env.production` `VITE_API_URL` to that exact server URL
(no trailing slash). Re-run `pnpm env:link` if app links are missing.
Web build reads this at build time — must be correct **before** web
deploy.

### 3. Web (build + Worker assets)

```bash
cd apps/web && pnpm run deploy
```

This runs production build + prerender, then `wrangler deploy`.
Capture the web workers.dev URL.

## Production smoke (required)

Do not claim success until these pass. Non-destructive only.

| Check | Expect |
| --- | --- |
| `curl -sS -o /dev/null -w "%{http_code}" "$VITE_API_URL/health"` | `200` |
| `curl -sS -o /dev/null -w "%{http_code}" "https://<prefix>-web.<account>.workers.dev/"` | `200` |
| Init-user login against `$VITE_API_URL` using `INIT_*` from `.env.production` | success (curl; same as `backend-verify`) |

If any check fails: fix, redeploy the affected app, re-smoke. Do not
hand off as deployed.

Tasks with web UI still need production browser QA via
`frontend-verify` (click the UI; fail on unexpected console/HTTP/UI
errors). Curl alone is not enough.

## Report

Summarize:

- Server URL + web URL
- Whether `VITE_API_URL` was updated
- Smoke results (health, web, login)
- Any skipped/missing resources

## After deploy

`/deploy` is ad-hoc and does not change the board. Return to the active
task; when its proof is complete the main agent sets `ready-for-qa` and
the user runs `/next-step`.

## Do not

- Deploy only one app when both need shipping (unless user explicitly
  scopes to one app — then still sync URL if server changed)
- Use placeholder JWT or example workers.dev URLs in production env
- Run destructive production checks
- Create D1/KV/R2 or rename branding (that is `/init`)
