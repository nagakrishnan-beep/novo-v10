import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ALL_INSIGHTS, INSIGHT_CATEGORIES } from "@/lib/insights";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";

const TITLE = "Insights — Digital Twin, LiDAR & Virtual Tour Articles | Novo Reperio";
const DESCRIPTION =
  "Practical articles on digital twins, virtual tours, LiDAR scanning, Scan to BIM, and spatial presentation for properties, venues, and facilities.";
const CANONICAL = `${BASE_URL}/insights`;

export const Route = createFileRoute("/insights")({
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
  const [count, setCount] = useState<number>(PAGE_SIZE);

  const filtered = useMemo(
    () => (cat === "All" ? ALL_INSIGHTS : ALL_INSIGHTS.filter((p) => p.category === cat)),
    [cat],
  );
  const visible = filtered.slice(0, count);
  const hasMore = filtered.length > count;

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="insights" />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-14 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Insights" }]} />
          <div className="mt-6 text-xs tracking-[0.4em] uppercase text-emerald-400">
            Insights
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
            Insights for clearer project decisions.
          </h1>
          <p className="mt-6 text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            {DESCRIPTION}
          </p>
          <div className="mt-6 text-xs font-mono text-neutral-400">
            {ALL_INSIGHTS.length} articles · By Naga R. Krishnan · Novo Reperio
          </div>
        </section>

        {/* Filter chips */}
        <section className="px-6 md:px-24 pt-10">
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

        <section className="px-6 md:px-24 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((post) => (
              <Link
                key={post.slug}
                to="/insights/$slug"
                params={{ slug: post.slug }}
                className="group border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:border-emerald-400/40 transition flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-3">
                    {post.category}
                  </div>
                  <h2 className="text-lg text-white font-light leading-snug group-hover:text-emerald-200">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>By Naga R. Krishnan · {post.date}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
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
