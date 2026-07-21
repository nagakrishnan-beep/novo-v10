import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { getInsight, INSIGHTS } from "@/lib/insights";

const WHATSAPP_URL = "https://wa.me/60172029996";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getInsight(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Insight not found — Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const title = `${post.title} — Novo Reperio`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: post.image },
      ],
      links: [{ rel: "canonical", href: `/insights/${post.slug}` }],
    };
  },
  component: InsightDetail,
  notFoundComponent: InsightNotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div>
        <h1 className="text-2xl mb-2">Something went wrong.</h1>
        <p className="text-neutral-500 text-sm">{error.message}</p>
        <Link to="/insights" className="text-cyan-400 text-sm mt-4 inline-block">
          ← Back to Insights
        </Link>
      </div>
    </div>
  ),
});

function InsightNotFound() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div className="text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-3">
          404
        </div>
        <h1 className="text-3xl font-light mb-4">Insight not found</h1>
        <Link to="/insights" className="text-cyan-400 text-sm">
          ← Back to Insights
        </Link>
      </div>
    </div>
  );
}

function InsightDetail() {
  const { post } = Route.useLoaderData();
  const idx = INSIGHTS.findIndex((p) => p.slug === post.slug);
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/novo-logo.png" alt="Novo Reperio" className="h-8 w-auto" />
            <span className="sr-only">Novo Reperio</span>
          </Link>
          <Link
            to="/insights"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-cyan-400 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> All Insights
          </Link>
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

      <article className="px-6 md:px-24 pt-16 pb-24 max-w-5xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400 mb-4">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-white leading-[1.1]">
          {post.title}
        </h1>
        <div className="mt-4 text-[11px] font-mono text-neutral-500">
          {post.date} · By Novo Reperio
        </div>

        <div className="mt-10 rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <p className="mt-10 text-lg text-neutral-300 leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>

        {post.relatedService && (
          <div className="mt-8 max-w-3xl border border-emerald-500/20 bg-emerald-500/[0.03] rounded-lg p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
              Related service
            </div>
            <Link
              to="/services/$slug"
              params={{ slug: post.relatedService }}
              className="text-white text-base font-light hover:text-emerald-300 inline-flex items-center gap-2"
            >
              {post.relatedServiceLabel ?? post.relatedService} <ArrowRight size={14} />
            </Link>
          </div>
        )}

        <div className="mt-10 border-t border-white/5 pt-8">
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            Read the full article on novoreperio.com{" "}
            <ExternalLink size={14} />
          </a>
          <p className="mt-4 text-neutral-500 text-xs max-w-2xl">
            The complete article, illustrations, and updates are published on
            the original Novo Reperio blog.
          </p>
        </div>
      </article>

      {/* Next insight */}
      <section className="px-6 md:px-24 py-16 border-t border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-500 mb-4">
          Next insight
        </div>
        <Link
          to="/insights/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between gap-6 border border-white/10 rounded-lg p-6 hover:border-cyan-400/40 transition"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-2">
              {next.category}
            </div>
            <div className="text-white text-xl font-light group-hover:text-cyan-200">
              {next.title}
            </div>
          </div>
          <ArrowRight
            size={20}
            className="text-neutral-500 group-hover:text-cyan-300 shrink-0"
          />
        </Link>
      </section>

      <footer className="px-6 md:px-24 py-10 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-900">
        <div className="flex items-center gap-3">
          <img src="/novo-logo.png" alt="Novo Reperio" className="h-7 w-auto opacity-70" />
          <span>© {new Date().getFullYear()} Novo Reperio Sdn Bhd</span>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-300">
          WhatsApp +60 17-202 9996
        </a>
      </footer>
    </div>
  );
}
