# Agent roster

Skill allowlists for role agents. **Canonical flow** lives in
[`.cursor/docs/001-development-workflow.md`](docs/001-development-workflow.md).
Main agent brief: [`.cursor/rules/main-agent.mdc`](rules/main-agent.mdc).

Users do not invoke these agents. The main agent delegates. `backend` and
`frontend` never communicate with each other.

| Agent | Owns | Skills |
|-------|------|--------|
| `backend` | `apps/server` (curl) | `api-hono`, `backend-verify` |
| `frontend` | `apps/web` + browser FE↔BE | `ui-taste`, `frontend-verify` |

Memory: single file `.cursor/memory/lessons.md`, owned by the **main
agent only**. Role agents never read or write it — the main agent passes
relevant bullets on delegation.

## Skill paths

| Skill | Path |
|-------|------|
| `ui-taste` | `.cursor/skills/ui-taste/SKILL.md` |
| `frontend-verify` | `.cursor/skills/frontend-verify/SKILL.md` |
| `api-hono` | `.cursor/skills/api-hono/SKILL.md` |
| `backend-verify` | `.cursor/skills/backend-verify/SKILL.md` |

## Handoff

Role agents **verify and propose** (proof + inspect notes). The **main
agent** alone updates `status.md` (`ready-for-qa` / `todo`). Memory rules:
`.cursor/memory/README.md`.
