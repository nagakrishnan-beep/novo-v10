import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getInsight, ALL_INSIGHTS } from "@/lib/insights";
import { SiteHeader, SiteFooter, BreadcrumbNav, MediaSlot } from "@/components/site-chrome";
import { BASE_URL } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/schema";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getInsight(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Insight not found — Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const url = `${BASE_URL}/insights/${post.slug}`;
    const title = `${post.title} — Novo Reperio`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "author", content: "Naga R. Krishnan" },
        { property: "article:author", content: "Naga R. Krishnan" },
        { property: "article:published_time", content: post.datePublished },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              image: post.image,
              datePublished: post.datePublished,
              dateModified: new Date().toISOString().slice(0, 10),
              url: `/insights/${post.slug}`,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            webPageJsonLd({
              title,
              url: `/insights/${post.slug}`,
              description: post.excerpt,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Insights", url: "/insights" },
              { name: post.title, url: `/insights/${post.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  component: InsightDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div className="text-center">
        <h1 className="text-3xl font-light mb-4">Insight not found</h1>
        <Link to="/insights" className="text-emerald-400 text-sm">
          ← All insights
        </Link>
      </div>
    </div>
  ),
});

function InsightDetail() {
  const { post } = Route.useLoaderData() as { post: (typeof ALL_INSIGHTS)[number] };
  const idx = ALL_INSIGHTS.findIndex((p) => p.slug === post.slug);
  const next = ALL_INSIGHTS[(idx + 1) % ALL_INSIGHTS.length];
  const paras = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="insights" />

      <main>
        <article className="px-6 md:px-24 pt-16 pb-16 max-w-5xl">
          <BreadcrumbNav
            items={[
              { label: "Home", to: "/" },
              { label: "Insights", to: "/insights" },
              { label: post.title },
            ]}
          />
          <div className="mt-6 text-xs font-mono uppercase tracking-[0.35em] text-emerald-400">
            {post.category}
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-light text-white leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-4 text-xs font-mono text-neutral-400">
            By Naga R. Krishnan · Novo Reperio · {post.date}
          </div>

          <div className="mt-10">
            <MediaSlot label={post.slug.toUpperCase()} />
          </div>

          <div className="mt-10 space-y-6 max-w-3xl">
            {paras.map((p, i) => (
              <p key={i} className="text-base text-neutral-300 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {post.keyPoints?.length > 0 && (
            <div className="mt-12 max-w-3xl border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                Key points
              </div>
              <ul className="mt-4 space-y-2">
                {post.keyPoints.map((k, i) => (
                  <li key={i} className="text-sm text-neutral-300 flex gap-2">
                    <span className="text-emerald-400">·</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(post.relatedService || post.relatedWork) && (
            <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-3xl">
              {post.relatedService && (
                <div className="border border-emerald-500/20 bg-emerald-500/[0.03] rounded-lg p-5">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
                    Related service
                  </div>
                  <Link
                    to="/services/$slug"
                    params={{ slug: post.relatedService }}
                    className="text-white text-base font-light hover:text-emerald-300 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    {post.relatedServiceLabel ?? post.relatedService} <ArrowRight size={14} />
                  </Link>
                </div>
              )}
              {post.relatedWork && (
                <div className="border border-white/10 bg-white/[0.02] rounded-lg p-5">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-2">
                    Related project
                  </div>
                  <Link
                    to="/works/$slug"
                    params={{ slug: post.relatedWork }}
                    className="text-white text-base font-light hover:text-emerald-300 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    {post.relatedWorkLabel ?? post.relatedWork} <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 border-t border-white/5 pt-8 max-w-3xl">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              Read the original article <ExternalLink size={14} />
            </a>
          </div>
        </article>

        <section className="px-6 md:px-24 py-20 md:py-24 border-t border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-neutral-400 mb-4">
            Next insight
          </div>
          <Link
            to="/insights/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-between gap-6 border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-2">
                {next.category}
              </div>
              <div className="text-white text-xl font-light group-hover:text-emerald-200">
                {next.title}
              </div>
            </div>
            <ArrowRight
              size={20}
              className="text-neutral-400 group-hover:text-emerald-300 shrink-0"
            />
          </Link>

          <div className="mt-6 text-xs font-mono text-neutral-400 flex items-center gap-2">
            <ArrowLeft size={12} />
            <Link to="/insights" className="hover:text-emerald-300">
              All insights
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
