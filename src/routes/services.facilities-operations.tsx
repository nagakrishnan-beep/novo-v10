import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { MonthlyValue } from "@/components/service-extras";
import { WORKS } from "@/lib/works";

const TITLE = "Facilities Management Digital Twins Malaysia | Asset-Tagged 3D Operations — Novo Reperio";
const DESCRIPTION =
  "Operational digital twins for facilities teams — asset registers, room-by-room documentation, and remote contractor briefing without a site visit.";
const URL = abs("/services/facilities-operations");

const SECTIONS = [
  { t: "Asset-tagged twins", b: "Every piece of equipment tagged in place, linked to manuals, contracts and inspection history." },
  { t: "Space & inventory registers", b: "Room-by-room documentation that stays in sync with the physical building." },
  { t: "Remote contractor & vendor briefing", b: "Quote and brief works without a site visit — measurable twin, hotspots, references." },
  { t: "Insurance-grade condition documentation", b: "A dated, walkable record you can hand to insurers, auditors, or new owners." },
  { t: "Virtual onboarding for new FM staff", b: "New team members walk the building on day one, from anywhere." },
];

const BEST_FOR = ["Building owners", "FM companies", "Corporate real estate", "REITs"];

export const Route = createFileRoute("/services/facilities-operations")({
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
        { name: "Facilities Operations", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Facilities Management Digital Twins",
        description: DESCRIPTION,
        url: URL,
      })) },
    ],
  }),
  component: Page,
});

function Page() {
  const proof = WORKS.find((w) => w.slug === "pnb-cimb-hub");
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-16 pb-6">
        <BreadcrumbNav items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Facilities Operations" },
        ]} />
      </section>

      <section className="px-6 md:px-24 pt-6 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          BUILD IT · Facilities Operations
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          Run the building from anywhere.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          An operational digital twin gives facilities teams a live, navigable model of
          their building — asset registers, room-by-room documentation, and contractor
          briefing without a site visit.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Talk to us <ArrowRight size={14} />
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

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <MediaSlot label="FACILITIES DIGITAL TWIN — PENDING" />
      </section>

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
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

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Best for</div>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {BEST_FOR.map((b) => (
            <span key={b} className="px-3 py-2 border border-white/10 rounded text-neutral-300">{b}</span>
          ))}
        </div>
      </section>

      {proof && (
        <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Proof</div>
          <Link
            to="/works/$slug"
            params={{ slug: proof.slug }}
            className="block border border-white/10 rounded-xl p-6 hover:border-emerald-400/40 transition"
          >
            <div className="text-white text-xl font-light">{proof.title}</div>
            <p className="mt-2 text-sm text-neutral-400">{proof.summary}</p>
          </Link>
        </section>
      )}

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Related BUILD IT services</div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/services/scan-to-bim" className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition">
            <div className="text-white text-base font-light">Scan-to-BIM & LiDAR</div>
            <p className="mt-2 text-sm text-neutral-400">From site scan to as-built intelligence.</p>
          </Link>
          <Link to="/services/construction-progress" className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition">
            <div className="text-white text-base font-light">Construction Progress Capture</div>
            <p className="mt-2 text-sm text-neutral-400">Every milestone, documented.</p>
          </Link>
        </div>
      </section>

      <MonthlyValue
        intro="An FM twin is a living record — most of the value shows up month after month."
        bullets={[
          "Hosted, embed-ready twin — asset registers, room documentation and contractor brief packs from one link.",
          "Usage analytics — see how often assets and rooms are inspected remotely by FM and contractors.",
          "Scheduled recapture — refit and tenant-change captures keep the twin aligned with the physical building.",
          "FM integrations — asset registers, inspection history and vendor contracts wired to each tagged asset.",
        ]}
      />

      <SiteFooter />
    </div>
  );
}
