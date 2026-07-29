## Goal

Make Novo Reperio feel like a spatial technology experience, not a corporate site, without touching the information architecture, routes, copy hierarchy or SEO structure already in place.

Scope: homepage (`/`) plus `/digital-twins`, `/reality-capture`, `/solutions` and the works detail template. Everything else keeps its current look and inherits only the shared primitives.

## Shared foundation (built first)

A small set of reusable primitives so the language is consistent and cheap to reuse later:

- **HudLabel** — the technical caption pair (`CAPTURE / MATTERPORT PRO3`). Mono, emerald, small, used sparingly.
- **Reveal** — one scroll-reveal wrapper (opacity + 12px rise, once, IntersectionObserver). Replaces ad-hoc motion props.
- **CountUp** — number counter that runs once on entry, renders the final value in the DOM immediately so crawlers and no-JS users see it.
- **CompareSlider** — draggable before/after with keyboard support and a static side-by-side fallback under `prefers-reduced-motion`.
- **TrackContext** — a lightweight provider holding the active track (SELL/BUILD/OPERATE/PLAN) and emitting `novo:track`, `novo:tech`, `novo:intent` DOM events. This is the YAL-E hook layer: no chatbot, just the event surface and a documented contract.

Every one of these respects `prefers-reduced-motion` and degrades to plain static content.

## Homepage

Sections are re-skinned in place. No section is removed, no route changes.

1. **Hero** — keep the three.js Falcon point cloud as the backdrop. Layer a lightweight SVG pipeline rail on top: REAL SPACE → CAPTURE → POINT CLOUD → DIGITAL TWIN → INTELLIGENCE, with the active node advancing on a slow timer and on scroll. H1 stays `Capture reality. Build digital intelligence.` Three CTAs: Explore the work / Talk to a specialist / Get an assessment. The point cloud stays behind a `ClientOnly` boundary so it never blocks LCP.
2. **Reality → Digital Twin sequence** — a new scroll-driven strip below the hero. Five pinned-feel stages using CSS masks and a scroll-linked clip reveal over existing archive imagery. No new WebGL. Mobile falls back to a stacked, non-pinned version.
3. **Four tracks** — the existing four doors become an interactive selector. Selecting a track expands it to dominant width and reveals use cases, technology, outputs, linked projects and CTA. All four panels stay in the DOM (crawlable), collapsed ones are visually reduced rather than removed.
4. **Measured reality** — signature dark section around "This is measured reality," using the Falcon scan. Point density and size subtly track scroll. Metadata rail: 77,399 points · scan-verified geometry · LiDAR · cm-grade accuracy.
5. **Technology switcher** — Matterport / 360° / LiDAR / Drone / Digital Twin as tabs. Each reveals what it captures, what it produces, who uses it, business outcome. Tabs are real buttons with `aria-selected`; all panel text ships in the HTML.
6. **Portfolio** — WTCKL, KLCC, Porsche Ara Damansara, Hyatt Kuantan, Lexis Hibiscus, Royal Lexis as immersive cards: hover depth, slow image zoom, metadata overlay (industry, capture tech, scale, outcome) and a per-card CTA.
7. **Before/after** — two comparisons: reality → digital, and without twin → with twin. Since no matched photo pairs were supplied, I'll build these from existing archive assets (photo vs point-cloud/twin frames) and mark any pair that needs a real replacement, so swapping in proper pairs later is a one-line change.
8. **Metrics** — 12+ years, 400+ projects, 350,000+ sqft, 8,000+ twin visits, 60% Skylon units sold, animated once on entry.

## Pillar pages

`/digital-twins`, `/reality-capture`, `/solutions` and the works detail template get the same primitives applied to their existing structure: HUD labels on section headers, Reveal on blocks, the technology switcher on the two capture pillars, and the immersive card treatment on any project grids. Their copy and metadata are untouched.

## Guardrails

- No new gradients beyond what exists; no glassmorphism; brand emerald accent only.
- Every interactive panel's content exists in the server-rendered HTML — tabs and accordions hide with CSS/attributes, never by unmounting.
- Existing `head()` metadata, JSON-LD (Organization, FAQ, Service), heading hierarchy, alt text and internal links stay exactly as they are.
- Animation is transform/opacity only, no layout thrash, and all scroll listeners are passive and rAF-batched.
- Images stay lazy except the hero LCP candidate.

## Technical notes

- New files: `src/components/spatial/` holding `hud-label.tsx`, `reveal.tsx`, `count-up.tsx`, `compare-slider.tsx`, `pipeline-rail.tsx`, `track-context.tsx`, `tech-switcher.tsx`, `immersive-project-card.tsx`.
- The `novo:*` custom events carry `{ track, tech, intent, source }` so a future YAL-E assistant can subscribe without any refactor. Documented in a short comment block in `track-context.tsx`.
- Verification: production build, then Playwright passes at 390 / 768 / 1440 px checking for broken images, console errors, single H1 per page and presence of tab-panel text in the raw HTML.
