# Development workflow

How this starter is turned into a product — one task at a time, with a
single human inspection gate.

**Canonical** for user loop + main-agent implement. Roster tables:
`AGENTS.md` / `.cursor/ROSTER.md`. Always-on main brief:
`.cursor/rules/main-agent.mdc`.

## Docs vs tasks

| Location | Contents |
|----------|----------|
| `.cursor/docs/` | Business requirements, technical overview, this workflow |
| `.cursor/tasks/` | Task files + `status.md` |
| `.cursor/memory/` | Main-agent lessons (`lessons.md`; Planning / Backend / Frontend areas) |

Read `000-business-requirements.md` and `002-technical-overview.md`
before implementing any task. Task files implement that spec; they do
not redefine product rules. Per-route API contracts live on the task
(`## Contract`), not in the overview.

## First action after clone / reuse

1. `/init` — rename from folder, prereqs, Cloudflare, deploy, GitHub
2. `/requirements` — deep problem analysis; confirm + commit backlog +
   technical overview
3. Plan mode for the first unblocked `todo` before coding (freeze
   `## Contract` when API is involved)

## Ongoing loop (user-facing)

Only when **every** task in `status.md` is `done`:

1. `/plan-next` — next slice; confirm + commit
2. Plan mode for the first new unblocked `todo`
3. Implement → verify → `ready-for-qa` → `/next-step`
4. Repeat `/plan-next` when that batch is all `done` again

Teardown: `/delete`. Users do not call role agents.

## Task files

- **Naming:** `NNN-short-slug.md`
- **Never rename** for status
- **Contents:** title, goal, `## Subtasks` (max 5); `## Contract` when
  API is involved; no status/code/checkboxes
- **Order:** numeric; respect `Blocked by` in `status.md`

## Status board

Only place for status: `.cursor/tasks/status.md`.

| Status | Meaning |
|--------|---------|
| `todo` | Not started or actively implementing |
| `ready-for-qa` | Validated; waiting for human inspection |
| `done` | Approved via `/next-step` |

Rules:

- **Main agent alone** updates `status.md` (including `ready-for-qa`)
- Role agents verify and **propose** handoff; they do not flip the board
- One active non-`done` task; blockers must be `done`
- `/next-step` approve → `done` + commit that task’s work (no push)

## Proof before `ready-for-qa`

Do not set `ready-for-qa` until proof passes. Main agent sets the status
after the role agent reports green. Incomplete or failing FE↔BE proof =
do not flip the board. Human inspection is product/taste only — never
the place FE↔BE wiring breaks are found.

| Area | Proof |
|------|--------|
| API edits | `backend-verify` (curl) |
| UI / FE↔BE | `frontend-verify` (browser click + console + HTTP) |
| Web task | + production browser smoke |
| API-only task | + production curl smoke |

Never destructive checks in production.

## Main agent implement

1. Pick active task (lowest unblocked non-`done`)
2. Skim `.cursor/memory/lessons.md` (Planning / Backend / Frontend)
3. Plan mode — freeze `## Contract` (or mark N/A for FE-only / BE-only);
   no feature code until confirmed
4. Delegate `backend` and/or `frontend` (checklist in
   `.cursor/rules/main-agent.mdc`). They never talk to each other; you
   relay contracts and repros.
   - **Contract frozen** → parallel implement (one turn, two Tasks;
     named titles; cheaper models OK for implement)
   - **Contract fuzzy** → backend first, then frontend
5. Collect BE curl proof; if red, fix BE before FE verify
6. FE `frontend-verify` (resume FE if it already implemented against the
   contract). On FE↔BE fail: re-delegate BE and/or FE with the repro;
   repeat until green
7. Only then set `ready-for-qa`; summarize what to inspect (product /
   taste) and tell the user to run `/next-step` to approve (or say
   what's wrong to reject)

### Human QA reject

1. Set `todo` (do not mark `done`)
2. **Write memory** (required if substantive) — main agent appends to the
   right area of `lessons.md`: UI → `## Frontend`, API → `## Backend`,
   plan → `## Planning` (see `.cursor/memory/README.md`)
3. Re-delegate → verify → you set `ready-for-qa` again

## Agent memory

Lessons live in `.cursor/memory/lessons.md`, owned by the **main agent
only** (role agents report lessons back; they never read or write it).
Self-found optional; **QA rejects required** when substantive. Prune when
noisy (incl. a `/plan-next` sweep). Details: `.cursor/memory/README.md`.
Memory never overrides conversation, code, or platform docs.

## Slash commands

| Command | Purpose |
|---------|---------|
| `/init` | Rename from folder, prereqs, Cloudflare, first deploy, private GitHub |
| `/requirements` | Deep problem analysis → confirm + commit requirements, tech overview, backlog |
| `/plan-next` | Next slice problem analysis → confirm + commit |
| `/deploy` | Optional ad-hoc deploy + prod smoke |
| `/delete` | Tear down Cloudflare + GitHub |
| `/next-step` | Approve `ready-for-qa` → `done`, or reject path, or plan next `todo` |

## Planning with Plan mode

- First product: `/init` → `/requirements`, then Plan for first `todo`
- Next slice: `/plan-next` only when every task is `done`
- Each task: Plan before Agent coding (freeze contract when API)
- After `/next-step` → `done`, Plan the next `todo` (or `/plan-next` if
  backlog complete)
