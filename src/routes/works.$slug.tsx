import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { getWork, getRelatedWorks } from "@/lib/works";
import { SiteHeader, SiteFooter, BreadcrumbNav, MediaSlot } from "@/components/site-chrome";
import { PointCloudHero } from "@/components/point-cloud-hero";
import { abs, WHATSAPP_URL, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    const related = getRelatedWorks(params.slug, 2);
    return { work, related };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { work } = loaderData;
    const title = `${work.title} — Novo Reperio`;
    const url = abs(`/works/${params.slug}`);
    const img = abs(work.image);
    return {
      meta: [
        { title },
        { name: "description", content: work.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: work.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: BASE_URL },
              { name: "Works", url: abs("/works") },
              { name: work.title, url },
            ])
          ),
        },
        ...(work.tourUrl
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "CreativeWork",
                  name: work.title,
                  url,
                  subjectOf: {
                    "@type": "3DModel",
                    url: work.tourUrl,
                    name: `${work.title} digital twin`,
                  },
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: WorkDetail,
});

function WorkDetail() {
  const { work, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="works" />

      <div className="px-6 md:px-24 pt-8">
        <BreadcrumbNav
          items={[
            { label: "Works", to: "/works" },
            { label: work.title },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-24 pt-8 pb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          {work.format} · {work.categories.join(" · ")}
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
          {work.title}
        </h1>
        <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">
          {work.summary}
        </p>
      </section>

      {/* Image or MediaSlot placeholder */}
      <section className="px-6 md:px-24">
        <MediaSlot
          ratio="16/9"
          label={
            work.tourUrl
              ? "Scan-verified capture — explore the real geometry"
              : `Cover · ${work.title}`
          }
        />
      </section>

      {/* Body content */}
      <section className="px-6 md:px-24 py-16 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-light mb-4 text-white">How it helps</h2>
            <p className="text-neutral-400 leading-relaxed">{work.helps}</p>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-4 text-white">The project</h2>
            <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
              {work.body}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-4 text-white">What's included</h2>
            <ul className="space-y-3">
              {work.features.map((b: string) => (
                <li key={b} className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-cyan-400 mt-1">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-cyan-400/40 pl-4">
            <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-2">Impact</div>
            <p className="text-neutral-200 leading-relaxed">{work.impact}</p>
          </div>

          {work.tourUrl && (
            <a
              href={work.tourUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
            >
              <ExternalLink size={14} /> Walk the measured space
            </a>
          )}
        </div>

        <aside className="border border-neutral-900 rounded-xl p-6 bg-neutral-950 h-fit space-y-4">
          <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-500 mb-2">
            Project Meta
          </div>
          <MetaRow label="Format" value={work.format} />
          <MetaRow label="Sector" value={work.categories.join(", ")} />
          <MetaRow label="Space Type" value={work.spaceType} />
          {work.relatedService && work.relatedServiceLabel && (
            <div>
              <div className="text-neutral-500 text-xs uppercase tracking-widest">Service</div>
              <Link
                to="/services/$slug"
                params={{ slug: work.relatedService }}
                className="text-cyan-300 text-sm mt-1 inline-flex items-center gap-1 hover:text-cyan-200"
              >
                {work.relatedServiceLabel} <ArrowRight size={12} />
              </Link>
            </div>
          )}
          <Link
            to="/contact"
            className="mt-4 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-sm font-medium hover:bg-cyan-300"
          >
            Request Similar Project
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-neutral-300 text-sm hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 md:px-24 py-16 border-t border-neutral-900">
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
            Related work
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r: any) => (
              <Link
                key={r.slug}
                to="/works/$slug"
                params={{ slug: r.slug }}
                className="group border border-neutral-900 rounded-xl p-6 hover:border-cyan-500/40 transition"
              >
                <div className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
                  {r.format}
                </div>
                <h3 className="text-xl font-light text-white group-hover:text-cyan-300">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">{r.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-neutral-500 text-xs uppercase tracking-widest">{label}</div>
      <div className="text-neutral-200 mt-1 text-sm">{value}</div>
    </div>
  );
}
