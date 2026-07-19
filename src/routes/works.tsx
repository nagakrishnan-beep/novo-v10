import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WORKS, SPACE_TYPES } from "@/lib/works";

const TITLE = "Selected Projects — Novo Reperio";
const DESCRIPTION =
  "Immersive work for venues, ballrooms, showrooms, destinations, and workplaces. Explore Novo Reperio's Matterport, 360°, CGI, and visualisation projects.";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/works" }],
  }),
  component: WorksPage,
});

const WHATSAPP_URL = "https://wa.me/60172029996";

function WorksPage() {
  const [filter, setFilter] = useState<string>("All Spaces");

  const filtered = useMemo(() => {
    if (filter === "All Spaces") return WORKS;
    return WORKS.filter((w) => w.spaceType === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            to="/"
            className="text-sm tracking-[0.3em] uppercase text-emerald-400"
          >
            Novo Reperio
          </Link>
          <nav className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-neutral-500">
            <Link to="/" hash="capture" className="hover:text-emerald-400">
              Capture
            </Link>
            <Link to="/" hash="outcomes" className="hover:text-emerald-400">
              Outcomes
            </Link>
            <Link to="/works" className="text-emerald-400">
              Client Work
            </Link>
            <Link to="/" hash="pricing" className="hover:text-emerald-400">
              Scope
            </Link>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/10"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-6">
          Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl">
          Immersive work for venues, ballrooms, showrooms, destinations,
          workplaces.
        </h1>
        <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">
          Explore how Novo Reperio helps venue teams, property marketers, and
          commercial brands make scale, flow, and atmosphere legible before the
          first visit happens.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/works/$slug"
            params={{ slug: "hyatt-kuantan-ballroom" }}
            className="px-6 py-3 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 inline-flex items-center gap-2"
          >
            View Featured Project <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-neutral-800 text-neutral-300 text-sm hover:bg-neutral-900"
          >
            Request Quote
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-24 pt-16">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
          <h2 className="text-2xl font-light">Selected Projects</h2>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
            Space Type
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {SPACE_TYPES.map((type) => {
            const active = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
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
      <section className="px-6 md:px-24 pb-24">
        {filtered.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No projects match this filter yet. Try another category to explore
            more of Novo Reperio's work.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <Link
                key={w.slug}
                to="/works/$slug"
                params={{ slug: w.slug }}
                className="group border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950 hover:border-emerald-500/40 transition"
              >
                <div
                  className="aspect-[4/3] bg-neutral-900 bg-cover bg-center"
                  style={{ backgroundImage: `url(${w.image})` }}
                />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[10px] tracking-widest uppercase text-emerald-400">
                      {w.format}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-neutral-500">
                      {w.categories.join(" · ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-light mb-2 group-hover:text-emerald-300">
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
        )}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-24 py-20 border-t border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-4">
          Next Step
        </div>
        <h2 className="text-3xl md:text-4xl font-light max-w-3xl">
          Ready to showcase your space like this?
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Novo Reperio can help you choose the right virtual tour, visual
          format, and presentation flow for your venue, property, office,
          showroom, or destination.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400"
        >
          <MessageCircle size={14} /> Request a Quote
        </a>
      </section>
    </div>
  );
}
