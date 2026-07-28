# Visual enrichment plan for Novo Reperio

## Confirmed direction
- **Image source:** pull from the existing WordPress site first, supplement with AI-generated imagery only where gaps remain.
- **Visual style:** photorealistic imagery for hero/thumbnail slots, plus an iconographic layer (simple line icons with emerald accents) for structural and explanatory content.

## Current-state finding
`public/images/works/`, `public/images/services/`, and `public/images/insights/` are all empty, so every `image` field in `src/lib/works.ts`, `services.ts`, and `insights.ts` resolves to nothing. Live visuals today are only the point-cloud hero, hot-linked WordPress team photos, hot-linked client logos, and YouTube embeds. Everything else is text on flat dark backgrounds.

No routes, copy, or IA change in this plan.

---

## Step 1 — Fill the empty image folders (biggest gain)
- Extend `scripts/sync-wp-content.mjs` to download, not just map, WordPress media into `public/images/works/`, `public/images/insights/`, and `public/images/logos/`.
- Convert client and affiliation logos in `src/lib/logos.ts` from hot-linked WP URLs to local files (removes 404/CORS risk).
- Cache the five team portraits from `src/routes/about.tsx` locally.
- Add a `MediaSlot` fallback component: any still-empty slot renders a branded emerald-accented placeholder tile instead of a broken image.

## Step 2 — Fill remaining gaps with AI-generated photorealistic imagery
For slots WordPress cannot cover:
- **Service pages** (~18): one photoreal hero each, matched to the service (LiDAR scanner on a tripod in a ballroom, drone over a development, BIM model overlay on a site, training environment, etc.).
- **Industry pages** (8): one sector-appropriate photoreal hero each.
- **Insights**: featured images for articles with no WP thumbnail.
- All generated at a consistent dark, cinematic, low-key grade so they sit naturally on `#020203` and never look stocky.

## Step 3 — Iconographic layer (line icons + emerald accents)
- **Four outcome doors** (Sell / Build / Operate / Plan): one custom line icon each, emerald-300 stroke.
- **Eight industries**: a line icon per sector on hub cards and detail headers.
- **Process / workflow strips** (Capture → Process → Create → Act, and the Define/Engineer/Launch scope steps): numbered line-icon nodes connected by a thin emerald rule.
- **Benefit and feature bullets** across services, solutions, digital-twins, reality-capture: replace plain bullets with small `lucide-react` icons in emerald.
- **Estimator steps**: icon per step in the 5-step assessment.

## Step 4 — Ambient graphics (no new content)
- Faint technical grid / dot texture behind hero and major section breaks, at very low opacity.
- Thin emerald hairline dividers replacing some plain neutral borders, used sparingly.
- Hover treatment on work and insight cards: subtle image zoom plus emerald border, consistent sitewide.

---

## Technical notes
- Images stored in `public/images/**` and referenced by the existing `img()` helpers in `works.ts`, `services.ts`, `insights.ts`, so no data-shape changes are needed.
- Large generated images externalized through the Lovable assets CDN where appropriate to keep the repo light.
- All images get `loading="lazy"`, explicit dimensions, and descriptive `alt` text for SEO and CLS.
- Icons come from `lucide-react` (already a dependency) with emerald-300/400 stroke, so no new icon package.
- No changes to routes, navigation, copy, schema, or the point-cloud hero.

## Delivery order
1. Step 1 (WordPress download + local logos + MediaSlot fallback)
2. Step 3 (icon layer, purely presentational, immediate visible lift)
3. Step 2 (AI-generated photoreal heroes for services, industries, insights)
4. Step 4 (ambient texture and hover polish)