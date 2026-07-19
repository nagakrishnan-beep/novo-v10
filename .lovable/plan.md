# Chrono-Adaptive Canvas — Home Redesign

The current `src/routes/index.tsx` uses framer-motion for a single scroll-velocity headline blur and static sections below. It looks static because 95% of the page is plain markup — the "kinetic" idea only touches one line. This plan rebuilds the home around three genuine motion systems, all implemented with the already-installed `framer-motion` (no Three.js, no GSAP, no new deps).

Scope: `/` only. `/works`, `/works/$slug`, and section copy stay untouched.

## 1. Velocity-Based Kinetic Micro-Morphing

A global `useScroll` + `useVelocity` + `useSpring` pipeline exposes a single normalized `intensity` motion value (0 = still, 1 = fast scroll). Every hero and section header subscribes to it via `useTransform`:

- **Headline** — as intensity rises, letter-spacing tightens, font-weight interpolates from 300 → 700, line-height compresses, and secondary words fade to reveal a compact glyph row (icon substitutes for "Space", "Sales", "Engine"). When scroll stops, a spring unfurls them back into full editorial typography.
- **Body copy** — opacity dips to ~0.35 and blurs 4px during fast scroll so the reader isn't fighting motion-smear; snaps back on stop.
- **Background** — page background interpolates `#020203` → `#000` and a subtle vignette darkens at high velocity to reduce perceived motion blur.
- **Section labels** — the `[10px] tracking-[0.4em]` eyebrows expand tracking further and shift accent hue toward cyan as velocity climbs.

One shared `useMotionValue` drives all of this, so the whole page breathes in sync rather than each component animating independently.

## 2. Intent-Driven Liquid Navigation

- Desktop: a custom cursor (a 12px cyan disc + trailing 40px soft aurora blob) tracks pointer position with a lagging spring. When the pointer nears the right edge (last 15% of viewport width), the side nav rail (`Experience / Innovation / Vision / Studio`) skews +2° and scales 1.05 toward the cursor, and the next context block soft-preloads (opacity 0 → 0.15 preview underneath current section).
- Cards and CTA buttons apply a magnetic pull: on hover-proximity (not just hover), the element translates up to 8px toward the cursor using a `useMotionValue` distance calc.
- Mobile: a floating thumb-zone bubble in the bottom-right acts as the same gravity well; dragging it warps the nearest section header.

Native cursor is hidden only on desktop (`pointer: fine` media query) so touch and accessibility flows are unaffected.

## 3. Chrono-Adaptive Canvas Backdrop

- A full-viewport fixed layer renders an aurora gradient using two blurred, animated radial gradients (pure CSS + framer-motion `animate` loops) — no canvas, no WebGL. Hue slowly cycles based on local time-of-day (`new Date().getHours()` bucketed into dawn/day/dusk/night palettes, computed in `useEffect` after hydration to stay SSR-safe).
- Scroll progress shifts the aurora vertically and rotates it 15° across the full page, giving the sense of a single evolving canvas rather than discrete sections.
- Grain overlay (SVG noise, 3% opacity) prevents banding on the gradients.

## 4. Hero Rebuild (matches the reference mockup)

New composition:

```text
┌────────────────────────────────────────────────┐
│ logo                                     ☰ menu│
│                                                │
│   CHRONO-ADAPTIVE CANVAS  (eyebrow)            │
│   TURN YOUR SPACE                              │
│   INTO A 24/7                          EXPERIENCE│
│   SALES ENGINE.                        INNOVATION│
│                                        VISION   │
│   Genuine spatial intelligence         STUDIO   │
│   for venues and brands.                        │
│                                                │
│  ┌───────────────┐ ┌───────────────┐  ┌──────┐ │
│  │ KINETIC       │ │ FLUID         │  │START │ │
│  │ MORPHING      │ │ NAVIGATION    │  │ THE  │ │
│  │ TYPOGRAPHY    │ │               │  │EXPER.│ │
│  └───────────────┘ └───────────────┘  └──────┘ │
│                                                │
│  VELOCITY LAYOUTS │ CONTEXTUAL UI │ ORGANIC TX │
└────────────────────────────────────────────────┘
```

- Right-rail vertical nav with an active-indicator that slides on scroll (spring), replacing the top pill nav on the hero. The existing top pill nav returns from section 2 onward.
- Two "feature preview" cards (`Kinetic Morphing Typography`, `Fluid Navigation`) — each shows a live micro-demo of the effect it names (the typography card literally morphs its own label as you scroll).
- CTA slab (`START THE EXPERIENCE`) with a cyan glow that pulses in rhythm with the velocity signal.

## 5. Downstream section polish

Existing sections (Capture, Outcomes, Sectors, Services, Client Work teaser, Scope, Reviews, WhatsApp CTA) keep their copy and IA. Motion additions only:

- Section headers use the shared intensity signal (tracking + hue).
- Cards fade + rise on enter using `whileInView` with staggered children (60ms stagger).
- Sector chips have magnetic hover.
- The `#stories` teaser row auto-marquees at ~15s loop; pauses on hover; speeds up when overall scroll velocity is high.

## Technical notes

- All new motion lives in framer-motion primitives already in the dep tree: `useScroll`, `useVelocity`, `useSpring`, `useMotionValue`, `useTransform`, `useMotionValueEvent`, `motion.*`, `AnimatePresence`.
- Time-of-day palette read is client-only (`useEffect` after `useHydrated`) — avoids SSR hydration mismatch per the execution-model rules.
- Custom cursor and aurora backdrop are wrapped in `<ClientOnly>` so SSR HTML stays clean.
- `prefers-reduced-motion` short-circuits the velocity pipeline (intensity pinned at 0), disables the aurora animation loop, and hides the custom cursor.
- No changes to route metadata, `/works`, `/works/$slug`, or `src/lib/works.ts`.
- No new npm packages.

## Deliverables

1. Rewrite `src/routes/index.tsx` around the shared intensity signal and new hero composition.
2. Add `src/components/chrono/AuroraBackdrop.tsx`, `LiquidCursor.tsx`, `KineticText.tsx`, `MagneticCard.tsx` — small, focused components that each subscribe to the shared signal via a context.
3. Add `src/components/chrono/IntensityProvider.tsx` — one `useScroll`/`useVelocity` instance shared through React context, so the page doesn't spin up N scroll listeners.

## Open question

The vertical right-rail nav in the mockup (`Experience / Innovation / Vision / Studio`) is a different IA than the current hash nav (`Capture / Outcomes / Sectors / Services / Client Work / Scope`). I'll keep the current IA labels but present them in the mockup's vertical rail style on the hero, then swap to the horizontal pill nav from section 2 down. Tell me if you'd rather actually rename the sections to `Experience / Innovation / Vision / Studio`.
