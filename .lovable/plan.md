## Goal

1. Single global nav (top pill bar).
2. Right-side rail = hero-only "quick links" strip: **ABOUT · WORK · SERVICES · CONTACT**.
3. Add `/services` (+ slugs) and `/contact` routes sourced from development.novoreperio.com.
4. Replace cursor with a multi-stage spring laser trail engine (emerald→cyan hover morph + live coordinate telemetry).

## 1. Consolidate nav

Top nav (CAPTURE · OUTCOMES · SECTORS · SERVICES · CLIENT WORK · INSIGHTS · ABOUT · SCOPE · WHATSAPP) stays as the only persistent global menu.

Rail changes in `src/routes/index.tsx`:
- Eyebrow label `QUICK LINKS //` (mono, small, muted) above the rail.
- Items:
  - `ABOUT` → `/about`
  - `WORK` → `/works`
  - `SERVICES` → `/services`
  - `CONTACT` → `/contact`
- Hero-only: `useTransform(scrollY, [0, vh*0.8, vh], [1, 1, 0])` opacity fade + `pointer-events: none` at 0.
- Restyled as a subtle vertical strip (thin cyan tick, lower default opacity that lifts on hover) — reads as a shortcut affordance, not a duplicate menu.
- Mobile: hidden.

## 2. New `/services` route + slugs

`src/lib/services.ts` — curated from source:
- Core: `spatial-capture-digital-twins`, `immersive-visualization`, `aerial-context-intelligence`.
- Supporting: `web-development`, `3d-walkthroughs`, `3d-visualisation`, `3d-360-rendering`, `commercial-photography`.
- Also `COMBINATIONS` (Venue Marketing / Property Launch / Facilities Presentation) and `APPROACH` (3 steps).

Each entry: `slug`, `title`, `tier`, `tagline`, `description`, `bestFor`, `benefits[]`, `image` (absolute URL from source), optional `exampleUrl`.

- `src/routes/services.tsx` — hero, core grid, supporting grid, Approach, Combinations, industries strip, CTAs (Contact + Works).
- `src/routes/services.$slug.tsx` — nameplate header, hero image, benefits, "Request Quote" → `/contact`, "View Example" → source works URL, "Next service" footer. Standard `notFoundComponent` / `errorComponent`. Dynamic `head()` with og:image = entry image.
- Top nav `Services` item: change to `to="/services"` (internal Link).

## 3. New `/contact` route

`src/routes/contact.tsx`:
- Hero: "Tell us about your space, not just the deliverable." + subhead.
- Two primary CTAs: `mailto:hello@novoreperio.com`, WhatsApp `https://wa.me/60172029996`.
- Three contact method cards: Email, WhatsApp, Studio Base (Solaris Mont Kiara, links to Google Maps).
- "Start your project in five simple steps" — 5-step block (Tell us the space / Explain the audience / Describe the decision / Share the timing / Add references).
- "Example first brief" — 5-field summary card (Space / Audience / Decision / Timing / References).
- "Need examples first?" — CTAs to `/works` and `/about`.
- `head()`: unique title/description; no og:image on this route.

## 4. Laser light trail engine

`src/components/laser-trail.tsx`:
- `TargetContext` + `useTargetHover()` hook returning spreadable `{ onPointerEnter, onPointerLeave }`.
- `<LaserTrail />`: two `useSpring` motion values — fast focus node (`damping: 28, stiffness: 180, mass: 0.6`) and slower elastic glow (`damping: 40, stiffness: 140, mass: 0.8`).
- Focus ring 24px border + inner dot; emerald default → cyan + 1.5× scale on hover.
- Glow: 176px radial blur emerald/cyan blend on the slower spring.
- Telemetry chip 20px off the ring: `LDR_IDX // X:… Y:…` using live `clientX+scrollX / clientY+scrollY`.
- Skips on `(pointer: coarse)` and `prefers-reduced-motion`.

Wiring — mount `<LaserTrail />` once (replaces `<LiquidCursor />`) in every route: `index`, `about`, `insights`, `insights.$slug`, `works`, `works.$slug`, `services`, `services.$slug`, `contact`.
Spread `useTargetHover()` on: top nav pills, WhatsApp CTA, rail items, hero CTAs, every `MagneticCard`, client logos, service cards, works cards, insight cards, contact-method cards.

`chrono.tsx`: keep `IntensityProvider`, `AuroraBackdrop`, kinetic typography, `MagneticCard`, `Reveal`. Remove `<LiquidCursor />` mounts (delete the component; no other consumers).

## Metadata

- `/services`: unique title/description/og.
- `/services/$slug`: dynamic title/description; og:image = entry image (leaf-only).
- `/contact`: unique title/description; no og:image.

## Out of scope

- No backend, no CMS, no form submission wiring (contact CTAs are mailto/WhatsApp/maps links only).
- No changes to existing hash sections on `/`, aurora palette, or kinetic typography behavior.
- Not adopting the pasted Index.jsx wholesale — only the trail engine + hover-target pattern from it.
