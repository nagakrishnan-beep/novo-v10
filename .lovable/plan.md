## Goal

Make the homepage line up with every other page: full-width sections with `px-6 md:px-24` gutters, no narrower centered column.

## Changes (only `src/routes/index.tsx`)

1. **Remove the inner width caps.** Every `max-w-7xl mx-auto` and `max-w-5xl mx-auto` wrapper inside homepage sections (lines ~254, 572, 764, 843, 873, 902, 961, 1027, 1061, 1092) becomes a plain container that keeps its `space-y-*` / `grid` classes but no longer caps or centers the column.

2. **Normalize the hero padding.** The hero uses `px-6 md:px-16 lg:px-24`; change to `px-6 md:px-24` so its left edge matches the sections below it and the header/footer.

3. **Keep intentional text measures.** Paragraph-level constraints like `max-w-3xl` / `max-w-4xl` on headlines and lead copy stay as-is: those control reading line-length, not page alignment, and the rest of the site uses the same pattern.

## Out of scope

No copy, imagery, section-order, typography, or spacing-rhythm changes. No edits to other routes.

## Verification

Headless pass at 1440, 1362, 1024 and 390 px comparing the left content edge of `/` against `/works` and `/services` to confirm they match, plus a visual check that no section looks overly wide on large screens.
