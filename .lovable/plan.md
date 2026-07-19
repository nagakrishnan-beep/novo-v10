# Spatial Taxonomy Dashboard — Index Route

Faithful port of the provided React component into this TanStack Start project. Only the home route is touched.

## Scope
- Replace `src/routes/index.tsx` (currently the blank-app placeholder) with the Spatial Taxonomy Dashboard.
- No new routes, no backend, no schema changes. Sub-links (Digital Twin Platform, Reality Capture, etc.) render as visual items only — they don't navigate anywhere yet.
- Strip all `[cite: …]` markers from visible copy. Keep every other string, class, and interaction as authored.

## Changes

1. **Install dependency**
   - `bun add framer-motion` (project doesn't have it yet).

2. **Rewrite `src/routes/index.tsx`**
   - Keep the existing `createFileRoute("/")` wrapper.
   - Add route-level `head()` with real title / description / og / twitter metadata reflecting the positioning line "Transforming Physical Spaces into Intelligent Digital Assets" — replaces the current default `Lovable App` metadata inherited from `__root.tsx`.
   - Port the pasted `Index` component verbatim as the route `component`, converted to TypeScript:
     - Typed `pillars` record (`Record<'platform'|'capture'|'intelligence', Pillar>`).
     - `useState<'platform'|'capture'|'intelligence'>('platform')`.
     - `useRef<HTMLDivElement>(null)`.
     - `scrollVelocity.onChange` → `scrollVelocity.on('change', …)` (current framer-motion API) with proper cleanup from `useEffect`.
     - Remove unused lucide imports (`Building2`, `Scan`, `Activity`, `Cpu`, `ShieldCheck`, `CpuZap`, `Layers`, `Network`) — keep only the ones actually rendered (`Database`, `HelpCircle`, `ArrowRight`, `Play`, `ChevronRight`).
     - Keep the `#020203` / emerald / neutral palette, framer-motion transforms, sticky chrono-adaptive hero, command-center overlay, workflow pipeline, live-stream simulator panel, and FAQ section exactly as designed.
     - Strip `[cite: …]` fragments from all strings.
   - `isFastScrolling` state is preserved as authored (kept even though not read in JSX — matches the spec's intent for future hooks).

3. **Verification**
   - Typecheck the new route.
   - Open the preview, confirm the hero, pill selector, "OPEN INDEX Matrix //" overlay, workflow row, right-hand stream dashboard, and FAQ render on `/`, and that scrolling drives the chrono-adaptive transform.

## Out of scope (explicit)
- `/digital-twin-platform`, industry pages, and other multi-dimensional matrix targets — not created this pass.
- No design tokens added to `src/styles.css`; the component uses arbitrary Tailwind values as written.
- No changes to `__root.tsx` other than nothing (route-level `head()` overrides title/description per-route).
