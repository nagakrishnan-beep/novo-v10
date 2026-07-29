## Goal
Remove the "Capacity standards" section from `/methodology` because it feels out of place on the page.

## Change
- Delete the entire `<section>` containing the "Capacity standards" heading and explanatory paragraph from `src/routes/methodology.tsx`.
- The section sits between the scan-verified principles list and the bottom dual-CTA strip.

## Verification
- Run a build/typecheck.
- Visually verify `/methodology` at desktop and mobile widths to confirm the page still flows cleanly from principles to CTAs.
- Confirm no orphaned imports or spacing issues remain.

## Files to edit
- `src/routes/methodology.tsx`

## Out of scope
- No copy changes to remaining sections.
- No navigation or footer changes.
- No new imagery or components.