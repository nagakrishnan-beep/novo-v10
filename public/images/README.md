# Local image assets

Every image referenced by the site now points at a local path under this
folder (self-hosted, no cross-origin references). Drop the corresponding
source files here:

- `works/` — one file per case study, filename matches the slug + extension
  (see `src/lib/works.ts` `image` field).
- `team/` — team portraits used on `/about`. See `src/routes/about.tsx`.
- `logos/` — client / partner logos. See `src/lib/logos.ts`.
- `insights/` — article featured images. See `src/lib/insights.ts`.

Until a file is provided the site shows a graceful `alt` label or a
`MediaSlot` placeholder — nothing breaks.
