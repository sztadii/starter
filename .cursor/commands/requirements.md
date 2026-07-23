---
description: Interview for business requirements until complete; deep problem analysis first
---

# Requirements interview

Run a structured requirements interview for this product. Do not write
feature code. Prefer **Plan mode** for the interview and confirmation.

## Flow position

See `.cursor/docs/001-development-workflow.md` § First action.
Run `/init` first when root `package.json` `name` is still `starter`.

## Goal

Keep interviewing until requirements are complete enough to build v1
without guessing — and surface problems as early as possible. **Deep
problem analysis comes before features.**

## Interview agenda

Cover every section in order; ask follow-ups until each is clear.

### 0. Deep problem analysis (required first)

Do not discuss features, screens, or backlog until this section is
solid. Interview until you can restate the problem in the user’s words
and they agree.

1. **Problem statement** — what hurts today, in one crisp paragraph
2. **Who feels it** — primary sufferer; secondary stakeholders
3. **When / where it shows up** — triggers, frequency, context
4. **Current workarounds** — how they cope now (tools, spreadsheets,
   tribal process, doing nothing)
5. **Cost of the status quo** — time, money, risk, missed opportunity
   (qualitative is fine if numbers are unknown)
6. **Why now** — what changed; what happens if we wait
7. **Success looks like** — observable outcomes for v1 (not feature
   lists). Prefer “user can X without Y” over “we built Z”
8. **Failure modes** — ways a v1 could “ship” and still not solve the
   problem
9. **Constraints that shape the problem** — regs, existing systems,
   data they must keep, non-negotiable workflows
10. **Sharpest cut** — the smallest product that would prove the
    problem is solvable; what can wait

Challenge vague answers (“make it easier”, “AI for X”). Ask for a
concrete recent example of the pain. If the problem is unclear or
multiple unrelated problems are mixed, force a priority order before
continuing.

### 1–7. Product shape (after problem is clear)

1. **Name / prefix** — confirm root `package.json` `name` (set by
   `/init`). If the user wants a different prefix, stop and re-run
   `/init` before writing requirements
2. **One-line pitch** — what it does (must map to the problem)
3. **Users** — who and why (tie to who feels the pain)
4. **Core flows** — primary happy path + secondary flows that
   directly attack the problem
5. **Platforms** — web / server API as needed
6. **Constraints** — auth, data, AI, compliance, performance,
   integrations
7. **Out of scope** — explicit non-goals for v1 (including problem
   facets deferred from §0)

## Find problems early

While interviewing, actively probe for:

- Ambiguous or conflicting goals; multiple products hiding as one
- Solutions proposed without a validated problem
- Missing actors or auth roles
- Data that has no owner or lifecycle
- Flows that need offline, realtime, payments, email, maps, etc.
- Scope that is too large for a first backlog
- Assumptions that would be expensive to reverse later
- Success metrics that cannot be observed after ship
- “Nice to have” features that do not reduce the stated pain

Call these out as **open risks** before proposing the backlog. Do not
paper over gaps — ask until resolved or explicitly deferred to out of
scope.

## Output (present for confirmation)

In the Plan, present:

1. Draft `.cursor/docs/000-business-requirements.md` (remove the
   `TEMPLATE — unfilled` banner once filled). Include a filled
   **Problem analysis** section — not a stub.
2. Proposed `.cursor/tasks/NNN-*.md` titles + subtasks (max 5 each).
   Each task should clearly advance the problem’s sharpest cut.
3. Proposed `.cursor/tasks/status.md` table (`todo` / blockers)

Wait for explicit confirmation. Only then switch to Agent mode and:

1. Write the confirmed requirements doc, task files, and `status.md`
   (still no feature code).
2. Review the diff and commit only those confirmed requirements/backlog
   files. This command is an explicit commit request — do not ask again
   when the scope is clean. Follow `.cursor/rules/commits.mdc`; do not
   push. Stop if unrelated changes or possible secrets are present.

## After confirmation

After the requirements commit succeeds, Plan mode for the first
unblocked `todo` before coding.

## Do not

- Invent product requirements or a backlog without confirmation
- Skip deep problem analysis or treat it as optional fluff
- Jump to features/screens before the problem is agreed
- Rename branding, deploy, or implement features in this command
  (setup is `/init`)
- Skip open risks without user acknowledgment
