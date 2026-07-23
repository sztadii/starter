---
description: Interview for the next slice of work; update requirements + task backlog
---

# Plan next

Continue the product after the current backlog is fully done. Same
interview discipline as `/requirements`, but for ongoing development —
not first-time clone setup.

Prefer **Plan mode**. Do not write feature code.

## When to use

Only when **every** row in `.cursor/tasks/status.md` is `done` (no
`todo` or `ready-for-qa` left). If any task is still open, refuse and
point at `/next-step` or finishing the active task instead.

Do **not** use this for first clone setup — that is `/init` →
`/requirements`.

## Preconditions

1. Every task in `status.md` is `done`.
2. `.cursor/docs/000-business-requirements.md` is filled (not still the
   template banner).
3. Read current requirements, `.cursor/tasks/status.md`, and existing
   task files so the next slice builds on what already shipped.
4. **Prune memory** — standalone sweep of `.cursor/memory/lessons.md`:
   drop entries whose code/task is shipped or gone, and trim any area
   section over ~15 entries oldest-first (see `.cursor/memory/README.md`).

## Interview agenda

Cover every section for the **next slice** (not a blank-slate product).
Ask follow-ups until clear. **Problem analysis for the slice comes
before features.**

### 0. Deep problem analysis (this slice)

1. **Problem / opportunity** — what still hurts or what new job we are
   taking on (one crisp paragraph)
2. **Who feels it** — affected users; how this differs from v1 pain
3. **Evidence** — what we learned from shipping so far (usage, feedback,
   support) or a concrete recent example
4. **Current workaround** — how they cope without this slice
5. **Success looks like** — observable outcomes for this slice
6. **Failure modes** — ways we could ship and still miss the need
7. **Sharpest cut** — smallest change that proves value; what can wait

Do not invent a parallel product. Tie the slice back to
`000-business-requirements.md` Problem analysis (amend it if the
understanding of the problem changed).

### 1–7. Slice shape

1. **Goal of this slice** — what we are adding or changing now
2. **Users** — who is affected (new or existing)
3. **Flows** — happy path + secondary flows for this slice
4. **Platforms** — web / server API as needed
5. **Constraints** — auth, data, AI, compliance, performance, integrations
6. **Out of scope** — explicit non-goals for this slice
7. **Requirements deltas** — what to add/change in
   `000-business-requirements.md` (keep prior truth; amend, don’t invent
   a parallel product)

Reuse the product name / prefix unless the user is renaming on purpose.

## Find problems early

Probe for:

- Conflicts with what already shipped
- Solutions that do not reduce the stated slice pain
- Missing actors or auth roles
- Data with no owner or lifecycle
- Flows that need realtime, payments, email, etc.
- Scope too large for one backlog batch
- Expensive assumptions
- Success metrics that cannot be observed after ship

Call these out as **open risks** before proposing tasks. Ask until
resolved or explicitly deferred to out of scope.

## Output (present for confirmation)

In the Plan, present:

1. Proposed edits to `.cursor/docs/000-business-requirements.md`
   (deltas only — show what changes). Include Problem analysis updates
   when the slice reframes or extends the problem.
2. Proposed new `.cursor/tasks/NNN-*.md` files (continue numbering after
   the highest existing `NNN`; max 5 subtasks each). Each task should
   advance this slice’s sharpest cut.
3. Proposed `status.md` rows for those new tasks (`todo` + blockers).
   Do not rewrite history of `done` rows unless correcting a mistake.

Wait for explicit confirmation. Only then switch to Agent mode and:

1. Write the confirmed requirements deltas, new task files, and
   `status.md` rows (still no feature code).
2. Review the diff and commit only those confirmed requirements/backlog
   files. This command is an explicit commit request — do not ask again
   when the scope is clean. Follow `.cursor/rules/commits.mdc`; do not
   push. Stop if unrelated changes or possible secrets are present.

## After confirmation

After the requirements commit succeeds, **switch to Plan mode** for the
lowest unblocked new `todo` and design implementation — same as after
`/next-step` when a next task exists. Do not run `/init` again unless
the user is starting a new product from scratch.

## Do not

- Invent requirements or a backlog without confirmation
- Skip slice problem analysis or jump straight to feature lists
- Wipe or renumber existing `done` tasks
- Rename branding, deploy, or implement features in this command
- Skip open risks without user acknowledgment
