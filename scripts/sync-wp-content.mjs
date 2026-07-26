/**
 * Build-time WordPress content sync. Pulls featured images (posts + portfolio)
 * and tour-embed URLs (portfolio) from the live WP REST API and writes
 * src/lib/wp-content.generated.json. Runs before vite build. Fully defensive:
 * on any failure it keeps the existing file so the build never breaks.
 */
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/lib/wp-content.generated.json");
const BASE = "https://novoreperio.com/wp-json/wp/v2";
const TOUR_RE = /(https:\/\/my\.matterport\.com\/show\/\?m=[A-Za-z0-9]+|https:\/\/novoreperio\.com\/360tour\/[^\s"'<)]+)/;

async function fetchType(type) {
  const map = {};
  for (let page = 1; page <= 5; page++) {
    let res;
    try { res = await fetch(`${BASE}/${type}?per_page=100&page=${page}&_embed`, { headers: { "User-Agent": "novo-build-sync" } }); }
    catch { break; }
    if (!res.ok) break;
    let items;
    try { items = await res.json(); } catch { break; }
    if (!Array.isArray(items) || items.length === 0) break;
    for (const it of items) {
      const slug = it?.slug; if (!slug) continue;
      const image = it?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      const alt = it?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || "";
      const rec = {};
      if (image) rec.image = image;
      if (alt) rec.alt = alt;
      if (type === "portfolio") { const m = (it?.content?.rendered || "").match(TOUR_RE); if (m) rec.tourUrl = m[1]; }
      if (Object.keys(rec).length) map[slug] = rec;
    }
    if (items.length < 100) break;
  }
  return map;
}

async function main() {
  let posts = {}, portfolio = {};
  try { posts = await fetchType("posts"); } catch {}
  try { portfolio = await fetchType("portfolio"); } catch {}
  const fetched = Object.keys(posts).length + Object.keys(portfolio).length;
  if (fetched === 0 && existsSync(OUT)) { console.warn("[wp-sync] nothing fetched — keeping existing file."); return; }
  writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), posts, portfolio }, null, 2));
  console.log(`[wp-sync] wrote ${Object.keys(posts).length} posts, ${Object.keys(portfolio).length} portfolio items.`);
}
main().catch((e) => console.warn("[wp-sync] non-fatal:", e?.message));
