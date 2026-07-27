import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ALL_INSIGHTS, INSIGHT_CATEGORIES } from "@/lib/insights";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";

const TITLE = "Insights: Digital Twin, LiDAR & Virtual Tour Articles | Novo Reperio";
const DESCRIPTION =
  "Practical articles on digital twins, virtual tours, LiDAR scanning, Scan to BIM, and spatial presentation for properties, venues, and facilities.";
const CANONICAL = `${BASE_URL}/insights`;

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          webPageJsonLd({ title: TITLE, url: CANONICAL, description: DESCRIPTION }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
          ]),
        ),
      },
    ],
  }),
  component: InsightsIndex,
});

const PAGE_SIZE = 12;

function InsightsIndex() {
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState<number>(PAGE_SIZE);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = cat === "All" ? ALL_INSIGHTS : ALL_INSIGHTS.filter((p) => p.category === cat);
    if (q) {
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
      );
    }
    return list;
  }, [cat, q]);
  const visible = filtered.slice(0, count);
  const hasMore = filtered.length > count;

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="insights" />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-12 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Insights" }]} />
          <div className="mt-6 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-emerald-400">Insights</div>
              <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
                Insights for clearer project decisions.
              </h1>
              <p className="mt-5 text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
                {DESCRIPTION}
              </p>
              <div className="mt-5 text-xs font-mono text-neutral-500">
                {ALL_INSIGHTS.length} articles · By Naga R. Krishnan · Novo Reperio
              </div>
            </div>
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCount(PAGE_SIZE);
                }}
                placeholder="Search insights"
                aria-label="Search insights"
                className="w-full rounded-full bg-black/40 border border-white/10 pl-11 pr-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-emerald-400/50"
              />
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="px-6 md:px-24 pt-8">
          <div className="flex flex-wrap gap-2">
            {(["All", ...INSIGHT_CATEGORIES] as const).map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    setCount(PAGE_SIZE);
                  }}
                  className={
                    "text-xs font-mono uppercase tracking-wider rounded-full px-4 py-2 border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 " +
                    (active
                      ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300"
                      : "border-white/15 text-neutral-300 hover:border-emerald-400/40")
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* Title-forward list */}
        <section className="px-6 md:px-24 py-10">
          {visible.length === 0 && (
            <p className="text-sm text-neutral-400 font-light">
              No insights match your search.{" "}
              <button
                onClick={() => {
                  setQuery("");
                  setCat("All");
                }}
                className="text-emerald-300 hover:text-emerald-200"
              >
                Clear filters
              </button>
            </p>
          )}

          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {visible.map((post) => (
              <Link
                key={post.slug}
                to="/insights/$slug"
                params={{ slug: post.slug }}
                className="group flex gap-4 md:gap-7 py-5 md:py-6 focus-visible:outline-none"
              >
                <div className="w-24 h-16 md:w-40 md:h-24 shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-white/5">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                  />
                </div>
                <div className="min-w-0 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-widest text-emerald-400/80">
                    <span>{post.category}</span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-neutral-500">{post.date}</span>
                  </div>
                  <h2 className="mt-2 text-xl md:text-3xl font-light leading-snug text-white group-hover:text-emerald-200 transition">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm md:text-[15px] text-neutral-400 leading-relaxed line-clamp-2 max-w-3xl">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-emerald-300">
                    Read <ArrowRight size={12} className="group-hover:translate-x-0.5 transition" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setCount((n) => n + PAGE_SIZE)}
                className="px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm font-mono uppercase tracking-widest hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                Load more insights
              </button>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
