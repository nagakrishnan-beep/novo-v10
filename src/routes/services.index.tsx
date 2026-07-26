import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Ruler, GraduationCap, Map, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { LaserTrail } from "@/components/laser-trail";
import { ScopeEstimator } from "@/components/scope-estimator";
import {
  PricingBands,
  VerifiedByScanStrip,
  FreeOpenLayer,
} from "@/components/service-extras";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import {
  SERVICES,
  APPROACH,
  COMBINATIONS,
  SERVICE_INDUSTRIES,
  SERVICES_HUB_FAQ,
  type ServiceCluster,
} from "@/lib/services";

const TITLE = "Services — Novo Reperio | Market It · Build It · Train In It · Plan It";
const DESCRIPTION =
  "Four service tracks — market it (property marketing & CGI), build it (Scan-to-BIM, progress capture, FM twins), train in it (immersive training), plan it (urban digital twins).";
const URL = abs("/services");

const DOORS: {
  key: ServiceCluster;
  label: string;
  outcome: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  anchor: string;
}[] = [
  { key: "market", label: "MARKET IT", outcome: "Property marketing, hospitality, staging, CGI, video, launch microsites.", href: "#market", anchor: "market", icon: Building2 },
  { key: "build", label: "BUILD IT", outcome: "Scan-to-BIM, construction progress capture, facilities operations twins.", href: "#build", anchor: "build", icon: Ruler },
  { key: "train", label: "TRAIN IN IT", outcome: "360° interactive, gamified and simulation training environments.", href: "/services/immersive-training", anchor: "train", icon: GraduationCap },
  { key: "plan", label: "PLAN IT", outcome: "City & masterplan-scale digital twins with data overlay for planning.", href: "/services/urban-digital-twins", anchor: "plan", icon: Map },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: BASE_URL },
        { name: "Services", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(SERVICES_HUB_FAQ)) },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const market = SERVICES.filter((s) => s.cluster === "market");
  const build = SERVICES.filter((s) => s.cluster === "build");
  const supporting = SERVICES.filter((s) => s.cluster === "supporting");

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <LaserTrail />
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          Services
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          Four ways to put your space to work.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Novo Reperio delivers across four outcome tracks — from marketing an
          existing space to planning an entire city. Pick the door that matches
          the job.
        </p>
      </section>

      {/* Four-door router */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOORS.map((d) => {
            const Icon = d.icon;
            const isRoute = d.href.startsWith("/");
            const inner = (
              <div className="h-full border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:border-emerald-400/40 transition flex flex-col group">
                <Icon className="text-emerald-300" size={22} />
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-300">
                  {d.label}
                </div>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed flex-1">
                  {d.outcome}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white group-hover:text-emerald-300">
                  Open <ArrowRight size={12} />
                </div>
              </div>
            );
            return isRoute ? (
              <Link key={d.key} to={d.href as any} className="block h-full">{inner}</Link>
            ) : (
              <a key={d.key} href={d.href} className="block h-full">{inner}</a>
            );
          })}
        </div>
      </section>

      {/* Verified-by-scan explainer strip */}
      <VerifiedByScanStrip />

      {/* Instant scope estimator */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <ScopeEstimator />
      </section>

      {/* MARKET IT */}
      <section id="market" className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 scroll-mt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          MARKET IT · Track A + B
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          For property, venues and brands that need to sell a space.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {market.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/services/property-visualization"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
          >
            Property Visualization <ArrowRight size={12} />
          </Link>
          <Link
            to="/services/hospitality-digital-twins"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
          >
            Hospitality Digital Twins <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* BUILD IT */}
      <section id="build" className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 scroll-mt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          BUILD IT
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          For architects, engineers, contractors and facility owners.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {build.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </section>

      {/* TRAIN IN IT */}
      <section id="train" className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 scroll-mt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          TRAIN IN IT
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Turn workplaces into hands-on training environments.
        </h2>
        <div className="mt-8">
          <Link
            to="/services/immersive-training"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Open Immersive Training <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* PLAN IT */}
      <section id="plan" className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 scroll-mt-24">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          PLAN IT
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Planning at township, city and state scale.
        </h2>
        <div className="mt-8">
          <Link
            to="/services/urban-digital-twins"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Open Urban Digital Twins <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Supporting */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Supporting services
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Add-ons that complete a launch or engagement.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {supporting.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Our approach
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {APPROACH.map((a) => (
            <div key={a.step} className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <div className="font-mono text-emerald-300 text-xs tracking-widest">STEP {a.step}</div>
              <h3 className="mt-3 text-white text-xl font-light leading-snug">{a.title}</h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Combinations */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Popular combinations
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {COMBINATIONS.map((c) => (
            <div key={c.title} className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <h3 className="text-white text-xl font-light">{c.title}</h3>
              <div className="mt-2 font-mono text-xs text-neutral-300">{c.stack}</div>
              <p className="mt-4 text-sm text-neutral-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Sectors we serve
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          {SERVICE_INDUSTRIES.map((i) => (
            <div key={i} className="border border-white/10 rounded px-3 py-3 text-neutral-300">
              {i}
            </div>
          ))}
        </div>
      </section>

      {/* Published pricing bands */}
      <PricingBands />

      {/* Always free layer */}
      <FreeOpenLayer />


      {/* FAQ */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">Common questions</h2>
        <div className="space-y-6 max-w-4xl">
          {SERVICES_HUB_FAQ.map((f) => (
            <div key={f.q} className="border-t border-white/10 pt-4">
              <h3 className="text-white text-base font-light">{f.q}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-24 py-20 md:py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Looking for the right presentation for your space?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
            >
              Start a project <ArrowRight size={14} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-emerald-400/40 transition flex flex-col h-full"
    >
      <div className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
        {s.tier === "flagship" ? "Flagship" : s.tier === "core" ? "Core" : "Supporting"}
      </div>
      <h3 className="text-white text-base font-light mt-2 leading-snug">{s.title}</h3>
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed flex-1">{s.tagline}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-widest">
        Explore <ArrowRight size={12} />
      </div>
    </Link>
  );
}
