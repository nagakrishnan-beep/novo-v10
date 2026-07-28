/**
 * Downloads every remote WordPress image referenced by the site into
 * public/images/** so nothing is hot-linked at runtime.
 *
 * Writes src/lib/wp-media.generated.json: a map of remote URL -> local path.
 * Fully defensive: any failure leaves the existing map in place.
 */
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const WP_JSON = resolve(ROOT, "src/lib/wp-content.generated.json");
const OUT = resolve(ROOT, "src/lib/wp-media.generated.json");
const PUB = resolve(ROOT, "public/images");

const U = "https://novoreperio.com/wp-content/uploads/2026/07/";
const EXTRA_URLS = [
  ...[
    "3D-Rendering-balcony-view-scaled.webp",
    "3D-Rendering-common-area-scaled.webp",
    "3D-Rendering-entrance-sunset-scaled.webp",
    "3D-Rendering-exterior-facade-scaled.jpeg",
    "3D-Rendering-exterior-facade2-scaled.webp",
    "3D-Rendering-facade-klcc-scaled.webp",
    "3D-Rendering-liftlobby-scaled.webp",
    "3D-Rendering-piazza-scaled.webp",
    "3D-Rendering-pool-facade-scaled.webp",
    "3D-Rendering-pool-nightview.jpeg",
    "Interior-Photography-1-scaled.webp",
    "Interior-Photography-2-scaled.webp",
    "Interior-Photography-3-scaled.webp",
    "Interior-Photography-4-scaled.webp",
    "Interior-Photography-5-scaled.webp",
  ].map((f) => `${U}${f}`),
];


function collect() {
  const urls = new Set();
  try {
    const d = JSON.parse(readFileSync(WP_JSON, "utf8"));
    for (const group of ["posts", "portfolio"]) {
      for (const rec of Object.values(d[group] || {})) {
        if (rec?.image) urls.add(rec.image);
      }
    }
  } catch {
    /* ignore */
  }
  // logos + team portraits declared in source
  for (const file of ["src/lib/logos.ts", "src/routes/about.tsx"]) {
    try {
      const txt = readFileSync(resolve(ROOT, file), "utf8");
      if (file.endsWith("logos.ts")) {
        for (const m of txt.matchAll(/wp\("([^"]+)"\)/g)) {
          urls.add(`https://novoreperio.com/wp-content/uploads/${m[1]}`);
        }
      } else {
        for (const m of txt.matchAll(/\$\{WP_MEDIA\}([A-Za-z0-9._-]+)/g)) {
          urls.add(`https://novoreperio.com/wp-content/uploads/2026/07/${m[1]}`);
        }
      }
    } catch {
      /* ignore */
    }
  }
  for (const u of EXTRA_URLS) urls.add(u);
  return [...urls];
}

function folderFor(url) {
  if (/wp-content\/uploads\/(2022|2023)\/.*(logo|mmc|glomac|klcc|mahsing|maxis|mhub|yamaha|uem|setia|prop|mdec|ceb)/i.test(url))
    return "logos";
  return "media";
}

function nameFor(url) {
  const base = decodeURIComponent(url.split("/").pop() || "asset");
  const ext = extname(base) || ".jpg";
  const stem = base
    .slice(0, base.length - ext.length)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
  return `${stem || "asset"}${ext.toLowerCase()}`;
}

async function main() {
  const urls = collect();
  if (urls.length === 0) {
    console.warn("[wp-media] no urls found, skipping.");
    return;
  }

  let map = {};
  if (existsSync(OUT)) {
    try {
      map = JSON.parse(readFileSync(OUT, "utf8")).files || {};
    } catch {
      map = {};
    }
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const url of urls) {
    const folder = folderFor(url);
    const name = nameFor(url);
    const rel = `/images/${folder}/${name}`;
    const dest = resolve(ROOT, `public${rel}`);
    if (existsSync(dest)) {
      map[url] = rel;
      skipped++;
      continue;
    }
    try {
      const res = await fetch(url, { headers: { "User-Agent": "novo-build-sync" } });
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) throw new Error("empty");
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, buf);
      map[url] = rel;
      downloaded++;
    } catch (e) {
      failed++;
      console.warn(`[wp-media] failed ${url}: ${e?.message}`);
    }
  }

  mkdirSync(PUB, { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ generatedAt: new Date().toISOString(), files: map }, null, 2),
  );
  console.log(
    `[wp-media] ${downloaded} downloaded, ${skipped} cached, ${failed} failed, ${Object.keys(map).length} mapped.`,
  );
}

main().catch((e) => console.warn("[wp-media] non-fatal:", e?.message));
