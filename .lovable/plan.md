## What's actually wrong

Verified against the running site:

- **Homepage renders no photography.** Of 23 image tags, only the logo and one YouTube poster load. The four-track cards, definitions, by-the-numbers and FAQ sections are pure text on a dark gradient. The previous pass edited works, insights, services and industries, but never `src/routes/index.tsx`.
- **A large empty gap sits under the hero** (roughly 600px of blank canvas between the proof line and "By the numbers").
- **Roughly a third of `/works` cards are still blank.** MAEPS, Majlis Bandaraya Seremban and Peel Lane render the branded grid placeholder because no local image is mapped to their slugs, even though 148 images are downloaded and serving correctly.

## Plan

### 1. Homepage visual layer (`src/routes/index.tsx`)

- **Featured work strip.** Insert a horizontal 3-up (desktop) / scroll-snap (mobile) band of real project photography after the four-track section, pulled from the existing works library via `SmartImage`. Each tile: image, project name, one-line outcome, link to the detail page.
- **Four-track cards get imagery.** Each of SELL / BUILD / OPERATE / PLAN gets a representative photo as a dimmed background layer behind the existing icon and copy, so the grid reads as a visual choice rather than four text boxes.
- **Client logo wall.** The logos already downloaded to `public/images/logos` (KLCC, Maxis, Mah Sing, Glomac, Setia, UEM, Yamaha, MMC and more) become a quiet monochrome strip under the proof line, brightening on hover.
- **Close the hero gap.** Tighten the spacing so the point-cloud canvas and the following section sit at the standard `py-20 md:py-24` rhythm instead of leaving a void.
- **Definition cards get a visual anchor** — a small emerald line icon each, matching the industry icon treatment already shipped.

### 2. Fill the blank work thumbnails (`src/lib/wp-content.ts`)

- Enumerate every work slug that currently resolves to no image, then map each to the closest correct photo already downloaded. Where the WordPress archive genuinely has nothing for a project, map to a representative image from the same space type rather than leaving a placeholder.
- Re-verify with a headless pass that every card on `/works` renders a real photo at every filter setting.

### 3. Methodology page icons (`src/routes/methodology.tsx`)

Add the emerald line-icon treatment to the process steps, finishing the iconographic layer started on `/industries`.

## Out of scope

No copy changes, no new routes, no typography or navigation changes. Purely additive imagery and spacing within the existing structure.

## Technical notes

Uses the already-built `SmartImage` component (graceful fallback to the branded `MediaSlot`), the `localMedia` helper in `src/lib/wp-content.ts`, and the 148 images already downloaded to `public/images/`. No new downloads or AI-generated assets required for this pass. Verification via headless Chromium counting loaded vs. total images per route.
