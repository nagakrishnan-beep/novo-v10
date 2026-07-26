import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  SiteHeader,
  SiteFooter,
  BreadcrumbNav,
  MediaSlot,
} from "@/components/site-chrome";
import { YouTubeEmbed, YouTubeReel } from "@/components/youtube-embed";
import { getIndustry, INDUSTRIES, type Industry } from "@/lib/industries";
import { getWork } from "@/lib/works";
import { getInsight } from "@/lib/insights";
import { BASE_URL, WHATSAPP_URL } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/schema";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Industry not found | Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { industry } = loaderData;
    const url = `${BASE_URL}/industries/${industry.slug}`;
    return {
      meta: [
        { title: industry.metaTitle },
        { name: "description", content: industry.metaDesc },
        { property: "og:title", content: industry.metaTitle },
        { property: "og:description", content: industry.metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            webPageJsonLd({
              title: industry.metaTitle,
              url: `/industries/${industry.slug}`,
              description: industry.metaDesc,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            serviceJsonLd({
              name: `${industry.name} digital twin & virtual tour solutions`,
              description: industry.metaDesc,
              url: `/industries/${industry.slug}`,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Industries", url: "/industries" },
              { name: industry.name, url: `/industries/${industry.slug}` },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqPageJsonLd(industry.faqs)),
        },
      ],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div className="text-center">
        <h1 className="text-3xl font-light mb-4">Industry not found</h1>
        <Link to="/industries" className="text-emerald-400 text-sm">
          ← All industries
        </Link>
      </div>
    </div>
  ),
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData() as { industry: Industry };
  const works = industry.workSlugs
    .map((s: string) => getWork(s))
    .filter((w): w is NonNullable<ReturnType<typeof getWork>> => Boolean(w));
  const insights = industry.insightSlugs
    .map((s: string) => getInsight(s))
    .filter((i): i is NonNullable<ReturnType<typeof getInsight>> => Boolean(i));

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-24 pt-16 pb-14 border-b border-neutral-900">
          <BreadcrumbNav
            items={[
              { label: "Home", to: "/" },
              { label: "Industries", to: "/industries" },
              { label: industry.name },
            ]}
          />
          <div className="mt-6 text-xs tracking-[0.4em] uppercase text-emerald-400">
            {industry.name}
          </div>
          <h1 className="mt-4 text-[clamp(30px,5vw,56px)] font-light leading-[1.05] max-w-4xl text-white">
            {industry.h1}
          </h1>
          <p className="mt-6 text-[15px] md:text-base text-neutral-300 max-w-3xl leading-relaxed">
            {industry.intro}
          </p>
          {industry.note && (
            <p className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-400/60">
              Note: {industry.note}
            </p>
          )}
        </section>

        {/* Problems */}
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
            The problem
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl">
            Where {industry.name.toLowerCase()} teams lose time and trust today.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {industry.problems.map((p) => (
              <div
                key={p.title}
                className="border border-white/10 rounded-xl p-6 bg-white/[0.02]"
              >
                <AlertTriangle size={16} className="text-emerald-300/70 mb-3" />
                <div className="text-lg md:text-xl font-medium text-white">{p.title}</div>
                <p className="mt-3 text-[15px] md:text-base text-neutral-400 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
            The solution
          </div>

          <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl">
            What changes when {industry.name.toLowerCase()} runs on a spatial record.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {industry.benefits.map((b) => (
              <div
                key={b.title}
                className="border border-emerald-500/20 rounded-xl p-6 bg-emerald-500/[0.03]"
              >
                <CheckCircle2 size={16} className="text-emerald-300 mb-3" />
                <div className="text-lg md:text-xl font-medium text-white">{b.title}</div>
                <p className="mt-3 text-[15px] md:text-base text-neutral-300 leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech row */}
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
            Technology we deploy
          </div>
          <div className="flex flex-wrap gap-2">
            {industry.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono uppercase tracking-wider border border-white/15 rounded-full px-4 py-2 text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Case studies */}
        {works.length > 0 && (
          <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
              Related case studies
            </div>
            <h2 className="text-2xl md:text-4xl font-light text-white">
              Projects we've delivered in this space.
            </h2>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {works.map((w) => (
                <Link
                  key={w.slug}
                  to="/works/$slug"
                  params={{ slug: w.slug }}
                  className="group border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:border-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  <MediaSlot label={w.slug.toUpperCase()} />
                  <div className="p-5">
                    <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/70">
                      {w.format}
                    </div>
                    <div className="mt-2 text-white font-light group-hover:text-emerald-200">
                      {w.title}
                    </div>
                    <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                      {w.helps}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Industry video / showcase reel */}
        {industry.slug === "events-venues" && (
          <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-6">
              Watch
            </div>
            <div className="max-w-4xl">
              <YouTubeEmbed
                videoId="OPXZbLjafEs"
                title="EventSpace 360: event venues explored remotely"
                description="How EventSpace 360 lets organisers walk a venue and plan a layout without travelling."
                caption="EventSpace 360"
              />
            </div>
          </section>
        )}

        {industry.slug === "property-development" && (
          <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-2">
              Showcase reel
            </div>
            <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl">
              Residential launches we've visualised.
            </h2>
            <YouTubeReel
              className="mt-10"
              videos={[
                {
                  videoId: "NlxXBjDPOrI",
                  title: "M Nova, Kepong: Mah Sing",
                  caption: "M Nova, Kepong · Mah Sing",
                },
                {
                  videoId: "S9gs7AQ6zNg",
                  title: "Queensberry, Mahkota Hills: UMLand, Semenyih",
                  caption: "Queensberry, Mahkota Hills · UMLand, Semenyih",
                },
                {
                  videoId: "yO6OCFnb12c",
                  title: "Mahogany Residences, Kota Damansara",
                  caption: "Mahogany Residences · Kota Damansara",
                },
              ]}
            />
          </section>
        )}

        {/* Related services */}

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
            Related services
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {industry.serviceSlugs.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <div className="text-white text-base font-light group-hover:text-emerald-200">
                  {s.label}
                </div>
                <div className="mt-4 text-xs font-mono text-emerald-300 inline-flex items-center gap-1">
                  Explore service <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related insights */}
        {insights.length > 0 && (
          <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
              Related insights
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {insights.map((i) => (
                <Link
                  key={i.slug}
                  to="/insights/$slug"
                  params={{ slug: i.slug }}
                  className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/70">
                    {i.category}
                  </div>
                  <div className="mt-3 text-white text-lg font-light group-hover:text-emerald-200">
                    {i.title}
                  </div>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {i.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
            FAQ
          </div>
          <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl">
            Questions {industry.name.toLowerCase()} teams ask before they engage.
          </h2>
          <div className="mt-10 space-y-6 max-w-3xl">
            {industry.faqs.map((f) => (
              <div key={f.q}>
                <div className="text-white font-light">{f.q}</div>
                <p className="mt-2 text-[15px] md:text-base text-neutral-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-24 py-20 md:py-24">
          <div className="border border-emerald-500/25 rounded-xl p-8 md:p-12 bg-emerald-500/[0.04]">
            <h2 className="text-2xl md:text-4xl font-light text-white max-w-2xl">
              Book a scoping consultation.
            </h2>
            <p className="mt-3 text-[15px] md:text-base text-neutral-300 max-w-2xl leading-relaxed">
              We'll map your {industry.name.toLowerCase()} outcomes to the right
              capture technology, timeline and deliverable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-black text-sm font-mono uppercase tracking-widest hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                Contact us <ArrowRight size={14} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm font-mono uppercase tracking-widest hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

// Ensure lint sees INDUSTRIES export used at build time (for prerender)
export const _industryCount = INDUSTRIES.length;
