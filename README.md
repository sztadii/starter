# Starter

Cloudflare Workers template: Hono API + Vite React SPA (independent apps).

```
apps/
  server/   # http://localhost:4000
  web/      # http://localhost:4001
```

**Needs:** Cursor, Node `>=22.12`, pnpm `10.5.2`. For `/init`:
`wrangler login` + `gh` (`delete_repo` scope).

## Local run

```bash
pnpm install
```

Then start each app in its own terminal (both `dev` servers block):

```bash
cd apps/server && pnpm dev   # terminal 1 — :4000
```

```bash
cd apps/web && pnpm dev      # terminal 2 — :4001
```

Check everything (format + lint + typecheck across the workspace):

```bash
pnpm check
```

Default login before `/init`: `starter` / `starter`.

## New project

In Cursor: `/init` → `/requirements` → plan first `todo` → implement →
inspect → `/next-step`. When every task is `done` → `/plan-next`.

Details: [`.cursor/docs/001-development-workflow.md`](.cursor/docs/001-development-workflow.md)
