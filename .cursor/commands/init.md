---
description: First setup — prereqs, rename, Cloudflare, deploy, private GitHub
argument-hint: [kebab-case-prefix]
---

# Init

First setup after clone: check tooling, rename `starter` branding,
install deps, create Cloudflare resources, first deploy + smoke, private
GitHub. Business requirements come next via `/requirements`.

## Flow position

See `.cursor/docs/001-development-workflow.md` § First action.

`/init` → `/requirements` → plan → implement (main agent) → `/next-step`

## Resolve `<prefix>`

Kebab-case package name from root `package.json` `name`.

If it is still `starter`, ask once for the new prefix. If `$ARGUMENTS`
is provided, use that instead. If `name` is already not `starter`,
confirm before re-renaming / re-creating resources.

## Naming map

| Kind | Pattern (`thai-restaurant`) |
| --- | --- |
| package / D1 / R2 | `thai-restaurant` |
| Workers | `thai-restaurant-server`, `thai-restaurant-web` |
| KV title | `thai-restaurant-cache` |
| migrate scripts | `apply thai-restaurant` |
| `TOKEN_KEY` | `thai_restaurant_token` |
| init user / password | `thai-restaurant` / `thai-restaurant` |
| UI / README display | `Thai Restaurant` |

## 1. Hard gate — local tooling

Stop until every check passes. On failure: fix, re-run, then continue.

| Check | Pass |
| --- | --- |
| `node -v` | Node `>=22.12` |
| `pnpm -v` | pnpm present (else `corepack enable && corepack prepare pnpm@10.5.2 --activate`) |

## 2. Rename starter branding

1. Search the repo for `starter` and `Starter` (config, env examples,
   web brand, health fallback, SQL seed, docs, migrate scripts).
2. Rename every hit using the naming map — including init-user SQL seed
   and `INIT_USERNAME` / `INIT_PASSWORD` (both = `<prefix>`; never
   `init` / `password`). Leave `preview_database_id` as `local`.
3. Update copied/local `.env*` if present the same way.

## 3. Install deps

```bash
pnpm install
```

Must exit 0 (`postinstall` links env files).

## 4. Hard gate — remote tooling

No Cloudflare/git work until every probe passes. On failure: fix,
re-run all probes, then continue.

| Check | Pass |
| --- | --- |
| `cd apps/server && pnpm exec wrangler whoami` | logged-in account |
| `cd apps/server && pnpm exec wrangler d1 list` | API OK (empty OK) |
| `gh --version` | installed (cli.github.com if missing) |
| `gh auth status` | `repo` and `delete_repo` scopes |
| `gh api user --jq .login` | username printed |

Fixes: `wrangler login` / `gh auth login`. Default `gh` login omits
`delete_repo`; if missing:
`gh auth refresh -h github.com -s delete_repo`.

## 5. Create Cloudflare bindings

Paste remote ids into wrangler config only; keep
`preview_database_id: local`.

```bash
cd apps/server
pnpm exec wrangler d1 create <prefix>
pnpm exec wrangler kv namespace create <prefix>-cache
pnpm exec wrangler r2 bucket create <prefix>
```

## 6. Env + first deploy

1. `.env.production`: real `JWT_SECRET`, `SERVER_NAME=<prefix>-server`.
   Leave `VITE_API_URL` until after server deploy.
2. Execute the full checklist in `.cursor/commands/deploy.md`
   (server → sync `VITE_API_URL` → web → production smoke).
   Smoke 200s only (no full lint/typecheck unless something fails).
3. Optional local smoke: see README “Local run”
   (`<prefix>` / `<prefix>`).

## 7. Private GitHub

1. Commit uncommitted init changes. This command is an explicit commit
   request — do not ask again when the scope is clean. Follow
   `.cursor/rules/commits.mdc`; do not push yet. Stop if unrelated
   changes or possible secrets are present.
2. `gh repo create <prefix> --private --source=. --remote=origin --push`
   (replace template `origin`; do not push to `starter`)
3. Confirm `gh repo view --json isPrivate -q .isPrivate` is `true`,
   else `gh repo edit --visibility private`

## After init

Suggest `/requirements` next (Plan mode). Do not invent product
requirements or start feature work here.

Teardown later: `/delete`.

## Do not

- Write business requirements or task backlog (that is `/requirements`)
- Skip Node / pnpm or wrangler / `gh` gates
- Run destructive production checks
