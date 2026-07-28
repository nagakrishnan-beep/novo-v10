import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot } from "@/components/site-chrome";
import { ScopeEstimator } from "@/components/scope-estimator";
import { PricingBands } from "@/components/service-extras";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/schema";
import { offersForServiceSchema } from "@/lib/pricing";
import { WORKS } from "@/lib/works";
import { SERVICES } from "@/lib/services";

const TITLE = "Hospitality Digital Twins | Novo Reperio";
const DESCRIPTION =
  "Matterport digital twins, 360° virtual tours, aerial capture and cinematic video for hotels, ballrooms, resorts and event venues across Malaysia and beyond.";
const URL = abs("/services/hospitality-digital-twins");

const FAQ = [
  { q: "How long does a hotel or ballroom capture take?", a: "A ballroom or single venue capture typically shoots in one day, with the twin published within a week. A full property (suites, F&B, MICE) usually takes 2–3 days on site and 1–2 weeks to publish." },
  { q: "Do you host the tour, or do we host it?", a: "We host the Matterport twin as standard, so you get a shareable link, embed code and analytics without infrastructure work. Self-hosting or brand-owned hosting is available on request." },
  { q: "Can we embed the tour in our booking flow or RFP responses?", a: "Yes. The tour is a single URL that embeds into your website, OTA extranet, RFP replies, sales decks and Google Business Profile." },
  { q: "How do we measure ROI?", a: "We wire up tour analytics (visits, dwell time, room-by-room engagement). Clients like WTCKL track 8,000+ visits and ~37/week, a direct signal of pre-booking interest." },
];

export const Route = createFileRoute("/services/hospitality-digital-twins")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: BASE_URL },
        { name: "Services", url: abs("/services") },
        { name: "Hospitality Digital Twins", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Hospitality Digital Twins",
        description: DESCRIPTION,
        url: URL,
        offers: offersForServiceSchema(),
      })) },
    ],
  }),
  component: HospitalityPage,
});

function HospitalityPage() {
  const relatedServices = SERVICES.filter((s) => s.track === "have");
  const relatedWorks = WORKS.filter((w) => w.relatedService === "hospitality-digital-twins").slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Track A · Hospitality Digital Twins
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          For hotels, ballrooms, resorts and event venues.
        </h1>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          Matterport digital twins, 360° virtual tours, drone aerial and cinematic
          video that let planners, guests and MICE buyers walk your property before
          they arrive, cutting shortlist time and boosting booking confidence.
        </p>
        <div className="mt-8 max-w-3xl">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-2">
            The problem
          </div>
          <p className="text-[15px] md:text-base text-neutral-400 leading-relaxed">
            Planners and guests cannot judge a venue or room remotely, so bookings stall on a site inspection.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            Start a project <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-6">
          Source: Matterport industry research
        </div>
        <ul className="grid md:grid-cols-3 gap-6 max-w-6xl">
          <li className="border-l-2 border-emerald-400/50 pl-4">
            <div className="text-3xl md:text-4xl font-light text-white">70%+</div>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              of hospitality bookings are shortlisted online before a site visit or RFP reply.
            </p>
          </li>
          <li className="border-l-2 border-emerald-400/50 pl-4">
            <div className="text-3xl md:text-4xl font-light text-white">3×</div>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              longer average engagement on listings that include an interactive 3D tour vs photos alone.
            </p>
          </li>
          <li className="border-l-2 border-emerald-400/50 pl-4">
            <div className="text-3xl md:text-4xl font-light text-white">2×</div>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              higher likelihood buyers request a viewing or quote after walking a Matterport twin.
            </p>
          </li>
        </ul>
      </section>



      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <MediaSlot ratio="16/9" label="Cover · Hospitality Digital Twins" />
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4">
          What's included
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedServices.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-cyan-400/40 transition h-full flex flex-col"
            >
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-300">
                Track A
              </div>
              <h3 className="text-white text-base font-light mt-2 leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed flex-1">
                {s.tagline}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-4">
          The outcome
        </div>
        <p className="text-xl md:text-2xl font-light text-white max-w-4xl leading-snug">
          A walkable twin that turns remote interest into confirmed bookings.
        </p>
      </section>

      {relatedWorks.length > 0 && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4">
            Selected work
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedWorks.map((w) => (
              <Link
                key={w.slug}
                to="/works/$slug"
                params={{ slug: w.slug }}
                className="border border-neutral-900 rounded-xl p-6 hover:border-cyan-500/40 transition"
              >
                <div className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
                  {w.format}
                </div>
                <h3 className="text-lg font-light text-white">{w.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{w.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
          Hospitality: common questions
        </h2>
        <div className="space-y-6 max-w-4xl">
          {FAQ.map((f) => (
            <div key={f.q} className="border-t border-white/10 pt-4">
              <h3 className="text-white text-base font-light">{f.q}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Instant scope estimator */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <ScopeEstimator />
      </section>

      {/* Published pricing bands */}
      <PricingBands />

      <SiteFooter />
    </div>
  );
}
