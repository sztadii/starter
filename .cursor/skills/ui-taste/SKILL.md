---
name: ui-taste
description: >-
  Build cool, minimal React UI in the spirit of Linear / Cloudflare /
  Warp — shadcn New York, calm density, strong hierarchy. Use for any
  apps/web UI work. Non-negotiable before claiming UI done.
---

# UI taste (cool · minimal · product-grade)

Work in `apps/web`. Prefer existing primitives in `src/components/ui`
(shadcn **new-york**, Lucide, CSS variables in `globals.css`).

**North-star sites (study the feel, do not copy assets/brand):**
[Linear](https://linear.app/), [Cloudflare](https://www.cloudflare.com/),
[Warp](https://www.warp.dev/). Target that bar: quiet confidence,
tight type, lots of air, one clear focal point — not “SaaS template”
or generic AI chrome.

## Guarantee (fail the task if any break)

UI is not done until all of these hold:

1. **One job per view** — first viewport reads as one composition, not a
   dashboard dump (unless the screen *is* a dashboard).
2. **Hierarchy is obvious in a screenshot** — brand/product can lead;
   one headline, one short support line, one primary CTA group. Nothing
   competes with that.
3. **Calm density** — generous whitespace; short copy; no pill clusters,
   stat strips, icon rows, or boxed promo clutter.
4. **Real materials** — CSS variables + subtle atmosphere (soft gradient,
   grain, or restrained pattern). Flat single-fill voids and rainbow
   glow stacks both fail.
5. **Type with a voice** — project fonts (`--font-sans`, `--font-display`);
   never Inter / Roboto / Arial / system as the design voice.
6. **Motion with purpose** — 2–3 intentional transitions (enter / focus /
   hover). No bouncing noise, infinite shimmer walls, or decorative
   parallax.
7. **Cards earn their keep** — default: no cards. Cards only when they
   contain a user interaction. Never cards in a hero. If removing border /
   shadow / radius does not hurt understanding, remove it.
8. **Passes the brand test** — if you strip the nav and the first
   viewport could belong to any other product, branding is too weak
   (on branded/marketing surfaces).
9. **Looks expensive at rest** — alignment, contrast, and spacing feel
   intentional when idle, not only when filled with data.

If a layout feels “fine but generic,” redesign before handoff. Pretty
is a requirement, not polish later.

## Design direction (Linear / Cloudflare / Warp cues)

| Cue | Do this |
|-----|---------|
| Restraint | Fewer elements; let space and type do the work |
| Sharp focus | One primary action; secondary actions quiet |
| Surfaces | Soft depth via borders/opacity, not heavy shadows |
| Color | One accent used sparingly; neutrals carry the UI |
| Marketing hero | Full-bleed visual plane when the page is promotional; no inset media cards or floating sticker overlays |
| Product UI | Clean canvas, dense-but-readable lists/tables, clear empty states |

## Avoid (instant fail — AI-slop defaults)

- Purple-on-white / purple–indigo gradient themes
- Warm cream + terracotta “editorial” kit unless the product asks for it
- Dense broadsheet / hairline-newspaper layouts
- Glow stacks, rounded-full pill clusters, multi-layer shadows, emoji
  decoration
- Card-everything; floating badges/stickers over hero media
- Dashboard chrome on a simple flow (sidebar + widgets “because SaaS”)
- Stock-illustration soup or abstract blobs as the only visual idea
- Long marketing paragraphs above the fold

## Implementation habits

- Compose shadcn `Button`, `Input`, `Label`, etc.; add primitives via
  shadcn CLI when needed (match `components.json`)
- Split long Tailwind with `cn(...)`
- Loading / error / empty / data via `renderBody` (or named helpers),
  not nested ternaries
- Forms: Label + Input + clear primary Button; validate before submit;
  show field errors inline
- Atmosphere via CSS variables in `globals.css` — extend tokens; avoid
  one-off hex soup in components
- Responsive: first viewport must work on mobile and desktop
- Match existing module layout under `src/modules/<feature>/`

## Self-check before `frontend-verify`

Take a mental (or browser) screenshot of the first viewport and ask:

- Would this feel at home next to Linear / Cloudflare / Warp — or next
  to a generic template?
- Can I remove anything without losing the job of the screen?
- Is there one clear place the eye should go?

Only then run `frontend-verify`.
