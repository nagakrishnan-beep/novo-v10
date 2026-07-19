import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { INSIGHTS } from "@/lib/insights";

const WHATSAPP_URL = "https://wa.me/60172029996";
const TITLE = "Insights — Novo Reperio";
const DESCRIPTION =
  "Practical articles on digital twins, virtual tours, LiDAR scanning, Scan to BIM, and spatial presentation for properties, venues, and facilities.";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/insights" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Insights
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          Insights for clearer project decisions.
        </h1>
        <p className="mt-8 text-neutral-400 max-w-2xl leading-relaxed">
          Practical articles on digital twins, virtual tours, LiDAR scanning,
          Scan to BIM, and spatial presentation for properties, venues, and
          facilities.
        </p>
        <div className="mt-6 flex items-center gap-4 text-[11px] font-mono text-neutral-500">
          <span>{INSIGHTS.length} posts</span>
          <a
            href="https://novoreperio.com/blog/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300 underline underline-offset-4"
          >
            Original Blog ↗
          </a>
        </div>
      </section>

      <section className="px-6 md:px-24 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((post) => (
            <Link
              key={post.slug}
              to="/insights/$slug"
              params={{ slug: post.slug }}
              className="group border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:border-cyan-400/40 transition flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-3">
                  {post.category}
                </div>
                <h2 className="text-lg text-white font-light leading-snug group-hover:text-cyan-200">
                  {post.title}
                </h2>
                <p className="mt-3 text-neutral-400 text-sm leading-relaxed grow">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-cyan-300">
                    Read insight <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/novo-logo.png" alt="Novo Reperio" className="h-8 w-auto" />
          <span className="sr-only">Novo Reperio</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-neutral-500">
          <Link to="/works" className="hover:text-cyan-300">Work</Link>
          <Link to="/services" className="hover:text-cyan-300">Services</Link>
          <Link to="/about" className="hover:text-cyan-300">About</Link>
          <Link to="/insights" className="text-cyan-300">Insights</Link>
          <Link to="/contact" className="hover:text-cyan-300">Contact</Link>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-500/10"
        >
          <MessageCircle size={14} /> WhatsApp Us
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="px-6 md:px-24 py-10 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900">
      <div className="flex items-center gap-3">
        <img src="/novo-logo.png" alt="Novo Reperio" className="h-7 w-auto opacity-70" />
        <span>© {new Date().getFullYear()} Novo Reperio Sdn Bhd</span>
      </div>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-300">
        WhatsApp +60 17-202 9996
      </a>
    </footer>
  );
}
