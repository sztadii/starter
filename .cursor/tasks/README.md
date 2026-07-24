# Tasks (implementation backlog)

Incremental build units for this product. Each file is a **task** with up
to 5 **subtasks** — no code, no checkboxes, no status field.

Product requirements and the development workflow live in `.cursor/docs/`:

- `000-business-requirements.md` — what we build
- `001-development-workflow.md` — statuses, Plan mode, human gate, commands
- `002-technical-overview.md` — light tech direction (no endpoint JSON)

## Status and blockers

**Only** [status.md](status.md) holds status and dependencies.
Never rename task files for status changes.

| Status | Meaning |
|--------|---------|
| `todo` | Not started or actively implementing |
| `ready-for-qa` | Main agent set after role-agent proof; waiting for your inspection |
| `done` | Approved via `/next-step` (also commits that task’s work) |

`Blocked by` lists dependency file name(s). Do not start a task until
every blocker is `done`.

## Naming

`NNN-short-slug.md`

Example: `001-data-model.md`

## Shape

```md
# Task 001 — Short title

One-sentence goal.

## Subtasks

1. …
2. …

## Contract

`METHOD /path` — auth …

Request:
{ ... }

Response 200:
{ ... }

Errors: 401 / 404 / …
```

Max 5 subtasks. Optional notes / acceptance hints below.

**`## Contract`:** required when the task touches the API. Freeze in Plan
mode before coding (method, path, auth, request/response examples,
important errors). FE-only / BE-only tasks omit it and note N/A. Do not
put endpoint JSON in `002-technical-overview.md`.

## Creating the backlog

- First clone: `/init` → `/requirements` — interview, then confirm task
  files + `status.md` before writing them.
- Later slices: `/plan-next` — same interview style; append new `NNN`
  tasks and requirement deltas (do not wipe `done` history).

See `.cursor/docs/001-development-workflow.md`.

## What does not override

See `.cursor/rules/source-of-truth.mdc`. Conversation and code beat older
tasks.
