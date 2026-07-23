---
name: frontend-verify
description: >-
  Validate apps/web plus FE↔BE integration via browser MCP: click the UI,
  then check screenshots, console, and HTTP. Use after UI work or when
  confirming the client works against the running API.
---

# Frontend verify

Last agent check for UI. Prove the page works **against the real
backend** — not mocks. **Browser MCP required** (`cursor-ide-browser`);
curl alone is not enough for web.

Backend only proves its API with curl (`backend-verify`). You
**use the product in the browser**: click through the changed flows,
then fail on unexpected UI / console / HTTP problems.

## 1. Static pass (web)

```bash
cd apps/web && pnpm typecheck && pnpm lint && pnpm format
```

All must exit 0. (Root `pnpm check` runs format + lint + typecheck across
the whole workspace when you want a one-shot pass.) If you also edited
server this session, require `backend-verify` to have passed (or run it)
before browser QA.

## 2. Dev servers

1. API up: `apps/server` on `:4000` (real local D1 — not a stub).
2. Curl sanity: `http://127.0.0.1:4000/health` → `200`.
3. Web: `cd apps/web && pnpm dev` — `:4001` (reuse an existing terminal
   if already running). Prefer `http://localhost:4001` (Vite may bind
   IPv6-only; `127.0.0.1` can fail while `localhost` works).

## 3. Browser QA (required)

Lock order (never lock before a tab exists):

1. `browser_tabs` (list)
2. `browser_navigate` → `http://localhost:4001/<route>`
   (if a tab already exists: `browser_lock` → lock **first**, then navigate)
3. `browser_lock` → `lock`
4. Run the checks below
5. `browser_lock` → `unlock` when fully done

### A. Interact first

For every changed flow, **click the UI** — do not only load the page.

- Prefer `browser_snapshot` for refs, then `browser_click` /
  `browser_fill` / `browser_type` for primary actions (open, save,
  submit, create, toggle, navigate).
- Auth: init user from `.env.development` (`INIT_*` = package `name`).
- After each primary action, re-check visual + console + network.

### B. Visual (read every screenshot)

- `browser_take_screenshot` after load and after each primary action
  (full page when useful). **Look at the image** — do not only trust
  the accessibility snapshot.
- Fail on unexpected on-page errors (toasts, banners, inline red copy,
  error boundaries) even if the rest of the layout still looks fine.
- Also fail on: layout breaks, missing content, wrong colors, overflow,
  misaligned controls, empty states that should have data.
- **Taste bar (required):** apply `.cursor/skills/ui-taste/SKILL.md`
  Guarantee. Fail if the UI reads as generic AI/SaaS chrome, cluttered
  first viewport, card-everything, purple-glow slop, or weak hierarchy
  vs the Linear / Cloudflare / Warp north star. “Works but ugly” is
  fail — redesign before handoff.
- Optional responsive: narrow + wide viewport via CDP
  `Emulation.setDeviceMetricsOverride` (e.g. 390×844 and 1280×800),
  screenshot each, then clear override.

### C. Console

Prefer `browser_console_messages` if available; else CDP
`Log.enable` / `Runtime.enable`.

Fail on unexpected console errors (e.g. `TypeError`, `ReferenceError`,
failed imports, hydration mismatches, uncaught rejections, failed
network logged to console). Noise-only warnings may be noted without
failing.

### D. Network (HTTP)

Prefer `browser_network_requests` if available; else CDP
`Network.enable`. Inspect after load and after each primary action.

Fail on **unexpected** failed requests to the API / app:

- 4xx / 5xx (unless that status is the intended UX for the action)
- Requests with no HTTP status (`(failed)` / status `0`, blocked, etc.)

Happy-path actions must succeed end-to-end against `:4000`. Expected
error cases (e.g. validation 400) are OK when you are testing that path
on purpose. Note wasteful duplicate calls when clearly wrong.

API/interop bugs → fix client or send the **main agent** a clear
repro (do not contact the backend agent).

If browser MCP is unavailable, say so and **do not** claim verified.

## 4. Before proposing `ready-for-qa` (task includes web)

1. `/deploy` (or its checklist) for touched apps
2. Repeat the same browser QA against the **deployed** web URL
   (non-destructive): click primary actions, then visual / console /
   HTTP again
3. **Propose** `ready-for-qa` to the main agent with what to inspect —
   do **not** edit `.cursor/tasks/status.md` (main agent flips the board)

API-only tasks: backend proposes handoff after `backend-verify` + deploy;
main agent sets status.

## Report

| Area | Pass/fail | Notes |
|------|-----------|-------|
| Static | | commands |
| Interact | | flows clicked |
| Visual | | screenshot findings |
| Console | | unexpected errors or clean |
| Network | | unexpected failed HTTP or clean |

Also: propose status if proof is green (main agent updates `status.md`).
