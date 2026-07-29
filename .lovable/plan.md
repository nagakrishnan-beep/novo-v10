# Plan: Static zip now, dev subdomain via DNS later

Two stages. Stage 1 gives you a downloadable zip to upload to `development.novoreperio.com` today. Stage 2 sets up the same subdomain properly through Lovable for full-fidelity testing.

---

## Stage 1 — Static zip

### 1. Audit what needs a server
Review `src/start.ts`, `src/server.ts`, and any `createServerFn` usage to list features that will not work as flat files. Expected findings:
- Contact / estimate forms post directly to Web3Forms from the browser, so they should still work.
- Analytics (GA4, Meta Pixel) are client scripts, so they still work.
- Anything server-rendered on demand becomes a pre-rendered snapshot.

### 2. Pre-render every route
Build a static export covering all current routes:
`/`, `/about`, `/contact`, `/estimate`, `/faq`, `/methodology`, `/terms-and-conditions`, `/digital-twins`, `/reality-capture`, `/solutions`, `/services` + all service detail pages, `/industries` + all 8 industry pages, `/works` + all work slugs, `/insights` + all article slugs.

### 3. Make it work as plain files on Hostinger
- Emit each route as its own `index.html` in a folder (`/about/index.html`) so Apache serves clean URLs without rewrite rules.
- Add an `.htaccess` fallback so unknown deep links still resolve instead of 404ing.
- Confirm every asset path is root-relative and images resolve.

### 4. Verify before handing it over
- Serve the built output locally and click through the main routes.
- Check mobile widths and confirm no broken images.
- Confirm the contact form still submits.

### 5. Deliver
Zip the output with `index.html` at the root of the archive and save it to `/mnt/documents/` for download, plus short upload instructions for the Hostinger file manager (upload into the `development` subdomain folder, extract, done).

### Known limitation
The zip is a frozen snapshot. Future content edits in Lovable will not appear until a new zip is exported. That is fine for a review pass.

---

## Stage 2 — DNS-point the dev subdomain (after you have seen the zip)

1. In Lovable, publish the project and add `development.novoreperio.com` as a custom domain.
2. In Hostinger DNS, change only the `development` record to the value Lovable shows. Root `@`, `www`, and any tour subdomains or folders stay untouched, so the live site and 360 tours are unaffected.
3. Wait for verification and automatic SSL.
4. From then on, the dev subdomain always shows the latest build with all server-side features intact, and no more zips are needed.

---

## Technical notes
- Stack is TanStack Start on Vite, so the static export is a pre-render pass, not a normal SPA dump.
- If any route turns out to depend on a server function at request time, I will flag it explicitly rather than shipping a silently broken page.
- No changes to the live WordPress site or root domain in either stage.

## What I need from you
Nothing to proceed with Stage 1. For Stage 2, I will need access to the Hostinger DNS panel for the `development` record when you are ready.