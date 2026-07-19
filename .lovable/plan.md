## Scope

Add `/about` and `/insights` (with `/insights/$slug` detail routes), extend the main nav, and rename the hero right-rail to **WORK · ABOUT · INSIGHTS · CONTACT**. Content mirrors development.novoreperio.com/about + /insights, with post content sourced from novoreperio.com/blog (curated static list).

## New routes

### `src/routes/about.tsx`
Mirrors the dev site `/about` page, in the current dark HUD aesthetic:
- Hero: "A focused team for spatial clarity, immersive capture, stronger presentation, commercial confidence." + CTAs (View Selected Work → `/works`, Start a Conversation → WhatsApp).
- Trust logos strip (reuses the existing `CLIENT_LOGOS` from `src/routes/index.tsx`, extracted to `src/lib/logos.ts`).
- "Our story" — studio origin (2014, Kuala Lumpur, immersive capture direction).
- "How Novo works" — three cards: **Capture**, **Clarify**, **Present**.
- "Studio trajectory" — timeline: 2014 Foundation → 2014–2018 Immersive capture → 2019–2021 Expanded output → 2022–2023 Category platforms.
- Team grid — 5 members (Naga, Kasthuri, Kairudin, Tatasha, Shobak) with role text; portrait images referenced by absolute URL from development.novoreperio.com (no downloads).
- "Next step" contact block — email `hello@novoreperio.com`, WhatsApp, Solaris Mont Kiara address.
- `head()` with unique title/description/og tags. Reuses existing `Reveal` / `MagneticCard` / `Kinetic*` primitives from `src/components/chrono.tsx`.

### `src/routes/insights.tsx`
- Hero: "Insights for clearer project decisions." + subhead about digital twins, virtual tours, LiDAR, Scan-to-BIM.
- Grid of cards from a new `src/lib/insights.ts` — curated array of ~12 posts drawn from novoreperio.com/blog. Each entry: `slug`, `title`, `excerpt`, `date`, `category`, `image` (WP featured-image URL), `sourceUrl` (original novoreperio.com post).
- Card links to internal `/insights/$slug`.
- `head()` with insights-specific meta.

### `src/routes/insights.$slug.tsx`
- Detail layout matching `works.$slug.tsx`: header (breadcrumb back to `/insights`), title, category chip, date, featured image, excerpt, plus a "Read the full article on novoreperio.com" outbound button pointing at the WP post.
- `notFoundComponent` and `errorComponent` as required by the TanStack rules.
- Dynamic `head()` from loader/params using the entry's title/excerpt/image (og:image at leaf only).
- "Next insight" footer link.

### `src/lib/insights.ts`
Static array of 12 posts curated from the WP feed (verified from the fetched blog page):
- best-tools-for-digital-twins
- 3d-rendering-for-pre-sales
- bim-ready-point-cloud-workflow-existing-buildings
- can-virtual-tours-increase-bookings
- digital-twin-for-facility-management
- matterport-virtual-tour-for-real-estate
- lidar-scanning-for-buildings-that-pays-off
- plus 5 more topical entries filling the same 4 WP categories (Digital Twins & Matterport, 3D Rendering & Visualisation, LiDAR/Scan/BIM, Virtual Tours).

Slugs match the WP post URLs so the outbound "read full article" links are correct.

### `src/lib/logos.ts`
Extract the existing `CLIENT_LOGOS` array (currently inline in `src/routes/index.tsx`) so `/about` and `/` share one source.

## Edits to existing files

### `src/routes/index.tsx`
- Extend `NAV` with `{ label: "About", href: "/about", to: "/about" }` and `{ label: "Insights", href: "/insights", to: "/insights" }` (rendered as `<Link to>` for internal routes, `<a href>` for hash anchors — same split as the existing Client Work item).
- Rename the right-rail `RAIL` constant to:
  - `WORK` → `/works`
  - `ABOUT` → `/about`
  - `INSIGHTS` → `/insights`
  - `CONTACT` → WhatsApp URL (external `<a>` opens in new tab)
- Update the rail render so entries can be internal routes (`<Link to>`), external URLs (`<a target="_blank">`), or in-page hash anchors, since the current implementation assumes hash only.
- Replace the inline `CLIENT_LOGOS` with the import from `src/lib/logos.ts`.

### `src/routes/works.tsx` and `src/routes/works.$slug.tsx`
- Add matching header nav links to `About` and `Insights` alongside the existing items so the shared chrome stays consistent.

## Metadata & SEO

- Each new route sets its own `title`, `description`, `og:title`, `og:description`, `og:url`, `canonical` (leaf-only).
- `og:image` only on `insights.$slug.tsx` (uses the post featured image URL). No og:image on `/about` or `/insights` index.

## Out of scope

- No new backend, no WP REST fetching (per your pick).
- No changes to the visual language, colour tokens, or hero motion behavior — only the rail labels/targets and nav items change.
- Existing hash-anchor sections (`#capture`, `#outcomes`, etc.) stay as they are.
