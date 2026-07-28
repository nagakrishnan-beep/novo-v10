import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { VerifiedByScanStrip } from "@/components/service-extras";
import { INDUSTRIES } from "@/lib/industries";
import { industryIcon } from "@/lib/industry-icons";

import { BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";

const TITLE =
  "Industries We Serve | Digital Twins & Virtual Tours Malaysia | Novo Reperio";
const DESCRIPTION =
  "Novo Reperio delivers digital twins, virtual tours and reality capture across eight industries in Malaysia and Southeast Asia: property, construction, hospitality, events, facilities, manufacturing, healthcare and government.";
const CANONICAL = `${BASE_URL}/industries`;

export const Route = createFileRoute("/industries/")({
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
            { name: "Industries", url: "/industries" },
          ]),
        ),
      },
    ],
  }),
  component: IndustriesHub,
});

function IndustriesHub() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-14 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Industries" }]} />
          <div className="mt-6 text-xs tracking-[0.4em] uppercase text-emerald-400">
            Industries
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
            Built for every industry that runs on space.
          </h1>
          <p className="mt-6 text-neutral-400 max-w-3xl text-sm md:text-base leading-relaxed">
            Novo Reperio delivers digital twins, virtual tours and reality
            capture across eight industries in Malaysia and Southeast Asia, from
            property launches and hotel bookings to construction documentation,
            facilities operations and government planning.
          </p>
        </section>

        <VerifiedByScanStrip />

        <section className="px-6 md:px-24 py-20 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => {
              const Icon = industryIcon(ind.slug);
              return (
              <Link
                key={ind.slug}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-emerald-400/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300 group-hover:border-emerald-400/50 transition">
                  <Icon size={20} strokeWidth={1.25} />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                  {ind.name}
                </div>

                <h2 className="mt-3 text-xl text-white font-light leading-snug group-hover:text-emerald-200">
                  {ind.h1}
                </h2>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {ind.intro}
                </p>
                <div className="mt-6 flex items-center gap-1 text-xs font-mono text-emerald-300">
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
              );
            })}

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
