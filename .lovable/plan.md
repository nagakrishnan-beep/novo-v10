## Goal
Turn /methodology from a half-finished support page into a polished trust page that justifies its footer link and reinforces the "Verified by scan" positioning.

## Current issues to fix
1. The capacity-standards table contains `[PENDING: client capacity standards]` placeholders, which makes the page look incomplete.
2. No visual explanation of the capture-to-deliverable workflow; it is text-heavy.
3. The bottom CTA still says "Get an instant scope estimate", but the estimator was repositioned as a "Project Assessment".
4. The page has no imagery or media at all.

## Proposed changes

### 1. Remove or replace the unfinished table
- Option A: Drop the capacity-standards table entirely and replace it with a short paragraph explaining that capacity is derived from measured area + the client's chosen layout standard.
- Option B: Replace the placeholders with commonly referenced Malaysian / international standards (e.g., 1.5–1.8 sqm standing, 1.0–1.2 sqm theatre, etc.) clearly labelled as "illustrative industry references" and sourced to the venue operator's final standard.

Recommended: Option A for safety, unless you can provide confirmed standards.

### 2. Add a visual process diagram
- Build a 4-step horizontal process strip at the top of the page (or after the intro):
  1. Capture (Matterport Pro3 LiDAR / survey-grade LiDAR)
  2. Register (point-cloud alignment)
  3. Measure (dimensions extracted from real geometry)
  4. Deliver (twin, floorplan, BIM-ready data)
- Use existing Lucide icons and the emerald accent. Keep it lightweight; no new dependencies.

### 3. Add a single hero media slot
- Use a real scan/hero image if available, or a branded `MediaSlot` fallback labelled "LiDAR point cloud".
- Keep the current dark blueprint aesthetic.

### 4. Tighten copy and update CTA
- Shorten the intro paragraph.
- Update the final CTA to "Get a project assessment" and link to `/estimate`.
- Add a secondary "See works" link to `/works` for social proof.

### 5. Keep navigation links
- Retain the footer link under Studio.
- Retain the mobile drawer link under More.
- No change to sitemap or llms.txt needed because the URL already exists.

## Verification
- Run a build/typecheck.
- Visually verify the page at desktop (1440), tablet (768), and mobile (390) widths.
- Confirm no `[PENDING]` text remains on the page.

## Files to edit
- `src/routes/methodology.tsx` (primary rewrite)
- `src/components/site-chrome.tsx` (only if CTA wording in footer needs alignment; not expected)

## Out of scope
- Adding new routes.
- Changing the main navigation.
- Rewriting service pages.