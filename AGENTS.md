# Agents

Role subagents: `.cursor/agents/`. Skills: `.cursor/skills/`.
Memory: `.cursor/memory/`. Roster details: [`.cursor/ROSTER.md`](.cursor/ROSTER.md).

**Canonical flow:** [`.cursor/docs/001-development-workflow.md`](.cursor/docs/001-development-workflow.md)
(user loop, main-agent implement, status, memory). Always-on brief:
[`.cursor/rules/main-agent.mdc`](.cursor/rules/main-agent.mdc).

## Who does what

| Who | Role |
|-----|------|
| Human | Lifecycle commands + inspect QA (product/taste — not FE↔BE wiring) |
| Main agent (this chat) | Plan, freeze contracts, delegate, own `status.md` + `memory/lessons.md`, relay BE↔FE |
| `backend` | API only; curl verify; report to main agent |
| `frontend` | UI + browser FE↔BE verify (owns integration until green); report to main agent |

Users never invoke role agents. `backend` and `frontend` **never talk to
each other** — only to the main agent. When the API contract is frozen,
main may launch both in parallel for implement; FE↔BE verify still runs
after BE curl is green.

## Roster

| Agent | Skills |
|-------|--------|
| `backend` | `api-hono`, `backend-verify` |
| `frontend` | `ui-taste`, `frontend-verify` |

Memory: one file [`.cursor/memory/lessons.md`](.cursor/memory/lessons.md),
owned by the **main agent only**. Role agents never read or write it.

## User lifecycle

`/init` → `/requirements` → plan → implement (main agent) → inspect →
`/next-step` → `/plan-next` when every task is `done`. `/deploy` optional.
