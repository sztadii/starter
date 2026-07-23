# Agent memory

Project-specific scars. Plain Markdown — not mem0. **One file, owned by
the main agent only:** `.cursor/memory/lessons.md`.

Role agents never read or write memory. The main agent reads `lessons.md`
and passes the relevant bullets when delegating (see
`.cursor/rules/main-agent.mdc`).

## Organization

`lessons.md` is grouped by area so the main agent can surface the right
bullets: `## Planning`, `## Backend`, `## Frontend`. Newest entry at the
bottom of each section.

## Checklist

1. **When to write:** reusable gotcha, failed approach here, subtle
   verify/taste miss, FE↔BE seam, deploy quirk, sequencing miss. **QA
   reject (wrong / broken / dislike) = required** before rework.
2. **When to skip:** already in a skill/rule; status/`done`; secrets;
   stack dumps; one-off typos; “looks good” approve path.
3. **Shape** (newest at bottom of its area section):

```markdown
## YYYY-MM-DD — <short title>

- **Context:** <task id or situation>
- **Mistake / friction:** <what went wrong>
- **Do instead:** <rule for next time>
- **Do not:** <anti-pattern>
```

Max ~5 bullets. No essays, secrets, or chat dumps.

4. **Graduate:** if re-read every task → move into skill/rule; leave a
   one-line pointer or delete the soft entry.
5. **Prune:** the main agent deletes or merges stale entries. Memory that
   fights itself is worse than empty.
   - **On write** — while adding a lesson, drop any that are now
     obsolete/graduated.
   - **Standalone sweep** — independent of any write, prune at `/plan-next`
     (slice boundary) and whenever an area section exceeds **~15 entries**.
     The cap is a hard backstop, not gated on writing a new lesson.
   - **Order:** delete obsolete/graduated entries first (code/task they
     reference is gone); when still over the cap, **delete oldest-first** —
     entries live newest-at-bottom, so trim from the **top** and keep the
     most recent lessons.

## QA reject

1. `ready-for-qa` → set `todo`
2. Main agent appends a lesson to the right area section (paraphrase user
   → Do instead / Do not)
3. Main agent re-delegates → verify → sets `ready-for-qa`

## Good vs bad

**Good**

```markdown
## 2026-07-23 — Curl used wrong host

- **Context:** Task 002 auth smoke
- **Mistake / friction:** `127.0.0.1:4000` while worker answered on `localhost`
- **Do instead:** Prefer `http://localhost:4000`; re-check `/health` after restart
- **Do not:** Assume IPv4 loopback always works
```

```markdown
## 2026-07-25 — QA: empty state felt generic

- **Context:** Task 004 ready-for-qa; user dislike
- **Mistake / friction:** User: “looks like every other SaaS empty state — bland”
- **Do instead:** Stronger product voice; reuse best empty pattern before handoff
- **Do not:** Ship template placeholder copy to QA
```

**Bad** — vague diary, secrets, re-stating code-style, status changelog,
pasted stacks, “user unhappy / will fix” with no do/don’t.

## Short examples by area

- **Backend:** SQL in controller → provider only; don’t import `env.DB`
  from controllers.
- **Frontend:** screenshot OK but console error → re-check console +
  network after each click.
- **Planning:** FE before stable response shape → plan needs JSON examples;
  don’t parallelize fuzzy contracts.
