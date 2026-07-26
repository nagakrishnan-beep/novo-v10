import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { MonthlyValue } from "@/components/service-extras";

const TITLE = "Construction Progress Capture & Remote Site Inspection Malaysia | Novo Reperio";
const DESCRIPTION =
  "Scheduled 3D and 360° construction progress capture: dated, walkable records for remote inspection, claims, and dispute-proof as-built history.";
const URL = abs("/services/construction-progress");

const SECTIONS = [
  { t: "Scheduled progress twins", b: "Weekly or monthly 3D capture aligned to your programme." },
  { t: "Remote inspection walkthroughs", b: "Site walks from your desk, auditable and shareable with the whole project team." },
  { t: "Milestone & claim records", b: "Dated evidence for progress claims, variations and RFIs." },
  { t: "Dispute-proof as-built history", b: "A defensible record of what was on site, and when." },
  { t: "Handover twin at completion", b: "The final capture becomes the operational digital twin for FM." },
];

const VALUE = [
  "Fewer site visits",
  "Faster stakeholder sign-off",
  "Defensible records for variations & claims",
  "Safer sites",
];

const BEST_FOR = ["Developers", "Main contractors", "Project consultants", "PMCs"];

export const Route = createFileRoute("/services/construction-progress")({
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
        { name: "Construction Progress Capture", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Construction Progress Capture & Remote Site Inspection",
        description: DESCRIPTION,
        url: URL,
      })) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-16 pb-6">
        <BreadcrumbNav items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Construction Progress" },
        ]} />
      </section>

      <section className="px-6 md:px-24 pt-6 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          BUILD IT · Construction Progress
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          Every milestone, documented. Every site, visitable from your desk.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Scheduled 3D and 360° capture turns your construction site into a dated,
          walkable record, so project teams inspect remotely, verify progress
          against programme, and settle disputes with evidence instead of memory.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Book a scan cycle <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <MediaSlot label="CONSTRUCTION PROGRESS CAPTURE: PENDING" />
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">What we deliver</div>
        <div className="grid md:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.t} className="border border-white/10 rounded-lg p-5">
              <h3 className="text-white text-base font-light">{s.t}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Value</div>
          <ul className="space-y-3">
            {VALUE.map((v) => (
              <li key={v} className="flex items-start gap-3 text-sm text-neutral-300">
                <span className="text-emerald-300">+</span> {v}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Best for</div>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {BEST_FOR.map((b) => (
              <span key={b} className="px-3 py-2 border border-white/10 rounded text-neutral-300">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Related BUILD IT services</div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/services/scan-to-bim" className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition">
            <div className="text-white text-base font-light">Scan-to-BIM & LiDAR</div>
            <p className="mt-2 text-sm text-neutral-400">From site scan to as-built intelligence.</p>
          </Link>
          <Link to="/services/facilities-operations" className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition">
            <div className="text-white text-base font-light">Facilities Operations Twins</div>
            <p className="mt-2 text-sm text-neutral-400">Run the building from anywhere.</p>
          </Link>
        </div>
      </section>

      <MonthlyValue
        intro="Progress capture is a recurring product, not a one-off shoot."
        bullets={[
          "Hosted, embed-ready progress twin, one link for consultants, PMCs, developer and end client.",
          "Usage analytics, which packages and floors are being reviewed remotely, and by whom.",
          "Scheduled recapture aligned to your programme, weekly or monthly, tied to milestone claims.",
          "Handover integration, the final progress twin converts directly into the operational FM twin.",
        ]}
      />

      <SiteFooter />
    </div>
  );
}
