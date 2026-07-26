import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { getWork, getRelatedWorks } from "@/lib/works";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { PointCloudHero } from "@/components/point-cloud-hero";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { TourEmbed } from "@/components/tour-embed";

/** Per-work YouTube features. */
const WORK_VIDEOS: Record<string, { videoId: string; title: string }> = {
  "royal-lexis": { videoId: "3XjFnvJUWMo", title: "Royal Lexis 360° virtual tour walkthrough" },
  "confetti-kuala-lumpur": { videoId: "CpHh3ENsXhQ", title: "Confetti Kuala Lumpur immersive venue tour" },
  "worq-kl-sentral": { videoId: "CypbA0e-hSU", title: "WORQ KL Sentral workspace digital twin" },
};

import { abs, WHATSAPP_URL, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

const GRID =
  "linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)";

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
  const hasImage = /^https?:\/\//.test(work.image);
  const video = WORK_VIDEOS[work.slug];

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="works" />

      <div className="px-6 md:px-24 pt-8">
        <BreadcrumbNav items={[{ label: "Works", to: "/works" }, { label: work.title }]} />
      </div>

      {/* Hero */}
      <section id="tour" className="px-6 md:px-24 pt-6 scroll-mt-24">
        {work.slug === "private-jet-falcon-7x" ? (
          <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10">
            <PointCloudHero className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent" />
          </div>
        ) : work.tourUrl ? (
          <TourEmbed
            url={work.tourUrl}
            title={`${work.title} interactive tour`}
            poster={hasImage ? work.image : undefined}
          />
        ) : hasImage ? (
          <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 aspect-video md:aspect-auto md:h-[60vh] md:min-h-[420px]">
            <img
              src={work.image}
              alt={`${work.title}, ${work.format}`}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#04060a] aspect-video md:aspect-auto md:h-[52vh] md:min-h-[360px]">
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundImage: GRID, backgroundSize: "48px 48px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <span className="text-lg md:text-2xl font-light text-neutral-300">{work.title}</span>
            </div>
          </div>
        )}
      </section>

      {/* Title block */}
      <section className="px-6 md:px-24 pt-10 pb-8">
        <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-emerald-300 mb-5">
          {work.format} · {work.categories.join(" · ")}
        </div>
        <h1
          className="font-light leading-[1.06] max-w-4xl text-white"
          style={{ fontSize: "clamp(30px, 5.2vw, 56px)" }}
        >
          {work.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-neutral-400">
          {work.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#tour"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-xs font-mono uppercase tracking-widest text-black transition hover:bg-emerald-300"
          >
            Explore the interactive tour <ArrowRight size={14} />
          </a>
          {video && (
            <a
              href="#watch"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-mono uppercase tracking-widest text-neutral-300 transition hover:border-emerald-400/50 hover:text-emerald-300"
            >
              Watch the walkthrough
            </a>
          )}
        </div>
      </section>

      {/* Fact band */}
      <section className="px-6 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y divide-x divide-white/10 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <Fact label="Format" value={work.format} />
          <Fact label="Sector" value={work.categories.join(", ")} />
          <Fact label="Space type" value={work.spaceType} />
          {work.relatedServiceLabel && (
            <Fact label="Related service" value={work.relatedServiceLabel} />
          )}
          <Fact label="Verification" value="Scan-verified geometry" accent />
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-24 py-20 md:py-24 grid gap-12 md:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-light mb-4 text-white">How it helps</h2>
            <p className="text-[15px] md:text-base leading-relaxed text-neutral-400">{work.helps}</p>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-4 text-white">The project</h2>
            <p className="text-[15px] md:text-base leading-relaxed text-neutral-400 whitespace-pre-line">
              {work.body}
            </p>
          </div>

          <blockquote className="border-l-2 border-emerald-400/60 pl-6 py-1">
            <div className="text-[11px] font-mono uppercase tracking-[0.35em] text-emerald-300 mb-3">
              Impact
            </div>
            <p className="text-xl md:text-2xl font-light leading-snug text-neutral-100">
              {work.impact}
            </p>
          </blockquote>

          <div>
            <h2 className="text-2xl font-light mb-4 text-white">What's included</h2>
            <ul className="space-y-3">
              {work.features.map((b: string) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                  <Check size={16} className="mt-1 shrink-0 text-cyan-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit md:sticky md:top-24 space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 mb-2">
            Project meta
          </div>
          <MetaRow label="Format" value={work.format} />
          <MetaRow label="Sector" value={work.categories.join(", ")} />
          <MetaRow label="Space type" value={work.spaceType} />
          {work.relatedService && work.relatedServiceLabel && (
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Service
              </div>
              <Link
                to="/services/$slug"
                params={{ slug: work.relatedService }}
                className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-300 transition hover:text-emerald-200"
              >
                {work.relatedServiceLabel} <ArrowRight size={12} />
              </Link>
            </div>
          )}
          <Link
            to="/contact"
            className="mt-4 w-full inline-flex justify-center items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
          >
            Book a scoping call
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-neutral-300 transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <MessageCircle size={14} /> WhatsApp us
          </a>
        </aside>
      </section>

      {/* Video */}
      {video && (
        <section id="watch" className="px-6 md:px-24 pb-16 scroll-mt-24">
          <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-emerald-300 mb-4">
            Watch
          </div>
          <YouTubeEmbed videoId={video.videoId} title={video.title} description={work.summary} />
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-t border-neutral-900">
          <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-emerald-300 mb-6">
            Related work
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r: any) => (
              <Link
                key={r.slug}
                to="/works/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-2xl border border-neutral-900 transition hover:border-emerald-400/50"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[#04060a]">
                  {/^https?:\/\//.test(r.image) ? (
                    <img
                      src={r.image}
                      alt={`${r.title}, ${r.format}`}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{ backgroundImage: GRID, backgroundSize: "40px 40px" }}
                    />
                  )}
                  {r.tourUrl && (
                    <span className="absolute left-3 top-3 rounded-full border border-emerald-400/40 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300">
                      Live 360° tour
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    {r.format}
                  </div>
                  <h3 className="text-xl font-light text-white transition group-hover:text-emerald-300">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400">{r.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

function Fact({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
        {label}
      </div>
      <div
        className={`mt-2 text-sm ${accent ? "text-emerald-300" : "text-emerald-200/90"}`}
      >
        {value}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">{label}</div>
      <div className="mt-1 text-sm text-neutral-200">{value}</div>
    </div>
  );
}
