import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WORKS, SPACE_TYPES, WORK_CATEGORIES, type Work } from "@/lib/works";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WHATSAPP_URL, abs } from "@/lib/site";

const TITLE = "Selected Projects | Novo Reperio";
const DESCRIPTION =
  "Immersive work for venues, ballrooms, showrooms, destinations and workplaces. Matterport, 360°, CGI and UE5 visualisation projects across Malaysia and beyond.";

const INITIAL_COUNT = 12;
const HERO_SLUG = "hyatt-kuantan-ballroom";

export const Route = createFileRoute("/works/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: abs("/works") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: abs("/works") }],
  }),
  component: WorksPage,
});

function WorksPage() {
  const [filter, setFilter] = useState<string>("All Spaces");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);

  const hero = useMemo(() => WORKS.find((w) => w.slug === HERO_SLUG), []);

  const filtered = useMemo(() => {
    const rest = WORKS.filter((w) => w.slug !== HERO_SLUG);
    if (filter === "All Spaces") return rest;
    return rest.filter((w) => w.spaceType === filter);
  }, [filter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="works" />

      {/* Hero */}
      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          Immersive work for venues, ballrooms, showrooms, destinations, workplaces.
        </h1>
        <p className="mt-6 max-w-2xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Explore how Novo Reperio helps venue teams, property marketers and
          commercial brands make scale, flow and atmosphere legible before the
          first visit happens.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/works/$slug"
            params={{ slug: HERO_SLUG }}
            className="px-6 py-3 rounded-full bg-emerald-400 text-black text-sm font-medium hover:bg-emerald-300 inline-flex items-center gap-2"
          >
            View Featured Project <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-neutral-800 text-neutral-300 text-sm hover:bg-neutral-900 inline-flex items-center gap-2"
          >
            <MessageCircle size={14} /> Request Quote
          </a>
        </div>
      </section>

      {/* Featured hero project */}
      {hero && (
        <section className="px-6 md:px-24 pt-20 md:pt-24">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
            Featured project
          </div>
          <Link
            to="/works/$slug"
            params={{ slug: hero.slug }}
            className="group block border border-neutral-900 rounded-2xl overflow-hidden bg-neutral-950 hover:border-emerald-500/40 transition"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <WorkThumb work={hero} />
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs tracking-widest uppercase text-emerald-300 font-mono">
                    {hero.format}
                  </span>
                  <span className="text-xs tracking-widest uppercase text-neutral-500 font-mono">
                    {hero.categories.join(" · ")}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-emerald-300 text-white leading-tight">
                  {hero.title}
                </h2>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-4">
                  {hero.summary}
                </p>
                <div className="text-sm text-neutral-400">
                  <span className="text-neutral-300">How it helps · </span>
                  {hero.helps}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-widest">
                  Open case study <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category pillars - primary browse path */}
      <section className="px-6 md:px-24 pt-20 md:pt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Browse by category
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.values(WORK_CATEGORIES).map((c) => (
            <Link
              key={c.slug}
              to="/works/category/$cat"
              params={{ cat: c.slug }}
              className="group border border-white/10 rounded-xl p-5 bg-white/[0.02] hover:border-emerald-400/50 hover:bg-emerald-500/[0.03] transition flex flex-col justify-between min-h-[120px]"
            >
              <div className="text-sm text-neutral-100 group-hover:text-emerald-300 font-light leading-tight">
                {c.title}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 group-hover:text-emerald-300">
                Browse <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-24 pt-20 md:pt-24">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
          <h2 className="text-2xl font-light">Selected Projects</h2>
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500 font-mono">
            Space Type
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {SPACE_TYPES.map((type) => {
            const active = filter === type;
            return (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`px-4 py-2 rounded-full border text-xs transition ${
                  active
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-24 py-20 md:py-24">
        {filtered.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No projects match this filter yet. Try another category.
          </p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((w) => (
                <Link
                  key={w.slug}
                  to="/works/$slug"
                  params={{ slug: w.slug }}
                  className="group border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950 hover:border-emerald-500/40 transition"
                >
                  <WorkThumb work={w} />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs tracking-widest uppercase text-emerald-300 font-mono">
                        {w.format}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-neutral-500 font-mono">
                        {w.categories.join(" · ")}
                      </span>
                    </div>
                    <h3 className="text-lg font-light mb-2 group-hover:text-emerald-300 text-white">
                      {w.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      {w.summary}
                    </p>
                    <div className="text-xs text-neutral-500">
                      <span className="text-neutral-400">How it helps · </span>
                      {w.helps}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((n) => n + INITIAL_COUNT)}
                  className="px-6 py-3 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/10 inline-flex items-center gap-2"
                >
                  Load more projects <ArrowRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

/** Thumbnail: real image when we have one, else a branded placeholder card. */
function WorkThumb({ work }: { work: Work }) {
  const hasImage = /^(https?:\/\/|\/images\/)/.test(work.image);
  if (hasImage) {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <img
          src={work.image}
          alt={`${work.title}: ${work.categories.join(", ")}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 flex flex-col justify-end p-6">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,211,153,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative">
        <div className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-500">
          {work.categories.join(" · ")}
        </div>
        <div className="mt-2 text-lg font-light leading-tight text-white">
          {work.title}
        </div>
        {work.tourUrl && (
          <span className="mt-4 inline-block rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-emerald-300">
            Live 360° Tour
          </span>
        )}
      </div>
    </div>
  );
}
