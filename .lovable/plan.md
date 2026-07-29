## Objective
Keep one `/terms-and-conditions` page, but let visitors switch between the English and Bahasa Malaysia versions with a toggle.

## Steps

1. **Pull the Bahasa content**
   - Re-fetch `https://novoreperio.com/terms-and-conditions-to-use-m/` and transcribe the full Bahasa text for both parts (Matterport 3D Showcase, and 3D rendering services), keeping the original casual tone exactly as written.

2. **Restructure the route data**
   - In `src/routes/terms-and-conditions.tsx`, move the existing English arrays into an `en` object and add a parallel `ms` object with the same `{ title, items }` shape.
   - Localize the page chrome too: eyebrow, H1, intro paragraph, group headings, and the closing "Need more information?" block.

3. **Add the toggle**
   - A small pill switch (`English` / `Bahasa Malaysia`) placed under the H1, styled with the emerald accent used site-wide.
   - Client-side `useState` only, no route change, no reload. Default = English.
   - Set `lang="ms"` on the Bahasa content wrapper for accessibility and correct search-engine language detection.

4. **SEO handling**
   - Keep the canonical at `/terms-and-conditions` and the English `head()` metadata unchanged, since English stays the default rendered version.
   - No separate BM route, so no hreflang tags needed.

5. **Verify**
   - Toggle works on desktop and mobile, no layout shift, no build or type errors.
   - No em-dashes introduced in the new copy.

## Notes
- No new dependencies, no backend, no changes to the footer link.
- The Bahasa version is content-equivalent but not a literal translation; both are shown as authored on the original site.
