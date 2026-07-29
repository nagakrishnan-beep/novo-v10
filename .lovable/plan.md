## Objective
Create a new internal `/terms-and-conditions` route on the novo-v10 site, migrate the content from the existing WordPress page, and add a link in the footer.

## Steps

1. **Fetch source content**
   - Pull the existing page at `https://novoreperio.com/terms-and-conditions/` to capture the terms text and section structure.

2. **Create the route**
   - Add `src/routes/terms-and-conditions.tsx` with a dark-brand editorial layout consistent with `/faq` and `/about`.
   - Use sentence-case headings, `font-light` hierarchy, and `px-6 md:px-24` gutters.
   - Preserve the original legal copy; replace any em-dashes if present.
   - Add route-specific `head()` metadata (title, description, og:title, og:description, og:type, twitter:card).

3. **Wire the footer**
   - Add `{ key: "terms", label: "Terms & Conditions", to: "/terms-and-conditions" }` to `FOOTER_NAV` in `src/components/site-chrome.tsx`.
   - Place it after FAQ in the Explore column.

4. **Verify**
   - Confirm the route resolves and the footer link renders on desktop and mobile.
   - Confirm no build/type errors.

## Notes
- No new dependencies required.
- No changes to the top navigation; this is footer-only discovery.
- Keep the page static (no forms or server functions).