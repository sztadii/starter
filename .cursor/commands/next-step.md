---
description: Approve ready-for-qa task as done, or plan the next unblocked todo
---

# Next step

Advance the task board after human QA (or start planning the next task).

## Approve vs reject

- **Approve** — user is happy with the `ready-for-qa` task → mark `done`
  (actions below).
- **Reject** — user says something was wrong, broken, or they did not
  like it → do **not** mark `done`. Main agent sets `todo`, **writes
  memory** (required when substantive; see `.cursor/memory/README.md`),
  re-delegates role agents (they never talk to each other) → verify →
  main agent sets `ready-for-qa` again.

## Actions (approve path)

1. Read `.cursor/tasks/status.md`.
2. If the active task (lowest non-`done` that is not blocked) is
   `ready-for-qa` **and** the user is approving:
   - Set its status to `done` in `status.md` only (never rename files).
   - **Commit** all uncommitted work for that task (including the
     `status.md` update). This command is an explicit commit request —
     do not ask again. Follow commit user rules + `.cursor/rules/commits.mdc`.
     Do not push. Skip the commit only if the working tree is already clean.
   - If a next unblocked `todo` exists → **switch to Plan mode** for that
     task; do not implement until the plan is confirmed.
3. Else if there is a next unblocked `todo` (previous work already
   `done`, or nothing in QA):
   - **Switch to Plan mode** for that task; do not implement until
     confirmed.
4. If every task is `done`, say the backlog is complete and suggest
   `/plan-next` to interview the next slice of work.

See `.cursor/docs/001-development-workflow.md`.
