## Goal

Align the current Spatial Taxonomy Dashboard (`/`) with the naming and content shown on `https://development.novoreperio.com/`, while keeping the enterprise HUD visual language (dark `#020203`, emerald accent, framer-motion chrono-adaptive hero, command-center overlay, live-stream panel) already built.

Yes — doable, no backend or new routes needed. It's a copy/IA swap on the same single-page index route.

## Menu / navigation IA (from the reference)

Replace the current pill selector (Digital Twin Platform / Reality Capture / Building Intelligence) and the "OPEN INDEX Matrix //" overlay's sections with the reference site's six anchors, in this exact order and wording:

1. Capture → `#capture`
2. Outcomes → `#outcomes`
3. Sectors → `#industries`
4. Services → `#integrations`
5. Client Work → `#stories`
6. Scope → `#pricing`

Plus a persistent right-side CTA: **WhatsApp Us** → `https://wa.me/60172029996` (replaces the "OPEN INDEX Matrix //" button; the overlay is removed since the top nav now carries the same links).

Hash links scroll smoothly to the matching `<section id="…">`; no route files are added — the reference uses the same single-page pattern.

## Section content (URL content mapping)

Each section keeps the HUD styling (mono eyebrows, emerald accents, neutral-900 cards) but the copy is rewritten from the reference:

- **Hero** — headline "Turn Your Space Into a 24/7 Sales Engine", supporting paragraph from the reference, two CTAs: "Get a Project Quote" (`#demo`) and "See Our Work" (`#stories`). Eyebrow: "SPACE CAPTURE STUDIO". Three trust bullets (10+ Years / Reduce Sales Cycles / Trusted by Global Brands) rendered as the mono stat strip.
- **#capture** — "Let people walk through your venue before they even arrive." Three feature cards: LiDAR-Powered Accuracy, Pro-Level Fidelity, Frictionless Integration.
- **#outcomes** — "Your space isn't just a location. It's your best sales tool." Five bullets: Anytime Anywhere, Optimized For Web, Spatial Digital Twins, Brand-First 360° Tours, Omnichannel Delivery.
- **#industries** — "Strategy-First Capture" with sector chips: Hospitality, Venues, Property, Facilities & More.
- **#integrations** (Services) — "One capture, many ways to use it." Workflow row uses Capture → Package → Publish, with support-layer cards for Matterport + 360, 360 Tours, Drone & Aerial, Project Websites. This replaces the existing generic workflow strip.
- **#stories** (Client Work) — three case cards: Hyatt Kuantan (Kempas & Prefunction Hall), WTCKL venue sales, Maxis facilities review. Each links to the corresponding `novoreperio.com/…` URL from the reference.
- **#pricing** (Scope) — three numbered steps: 01 Define the Objective, 02 Engineer the Experience, 03 Seamless Launch, with the reference's sub-bullets. Closes with "Stop letting geography limit your sales." CTA block.
- **Trust strip** — client + affiliation logos, using the reference's WordPress-hosted image URLs directly (Mahkota, Matterport, Glomac, KLCC, Mah Sing, Maxis, MHUB, Hong Leong, UEM, SP Setia; affiliations: PropTech, MDEC, MHTC, PCEB, MyCEB).
- **Google reviews** — four testimonial cards (Joyce Chong, Kammy Parkland, Low Lap Sheng, Nur Aiman) from the reference.
- **FAQ** — kept, rewritten so the two questions reflect the new positioning ("What does a Novo Reperio capture include?" / "Can existing spaces be digitized?").

Every `[cite: …]` fragment stays stripped. All external links open in a new tab.

## Files touched

- `src/routes/index.tsx` — rewrite the component (keep the route wrapper, `head()`, and framer-motion scroll setup untouched). Update `<title>`/description to "Novo Reperio — Turn Your Space Into a 24/7 Sales Engine" to match the new hero.
- No new files, no new routes, no dependency changes.

## Explicit non-goals

- Not embedding the Matterport iframe / 360 player from the reference (heavy third-party). The "Live Twin Stream" panel keeps its placeholder video card, relabelled "Live Matterport Preview".
- Not building `/works`, `/portfolio-item/…`, or any of the deep novoreperio.com pages — case-study cards link out to the live site.
- Keeping the existing dark HUD aesthetic; not adopting the reference's light theme.
