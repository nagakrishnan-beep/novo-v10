import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/schema";

const TITLE = "Urban & Masterplan Digital Twins Malaysia | City-Scale 3D with Data Overlay — Novo Reperio";
const DESCRIPTION =
  "Digital twins at building, township, city and state scale — real-time visualisation with GIS, planning, traffic and public-safety overlays.";
const URL = abs("/services/urban-digital-twins");

const FAQ = [
  { q: "What is a city-scale digital twin?", a: "A city-scale digital twin is a real-time 3D model of a township, city or state that combines reality capture (LiDAR, aerial, photogrammetry) with data layers (GIS, planning, traffic, utilities). Authorities, developers and planners use it to visualise upcoming projects in their true surroundings and to compare scenarios before committing." },
  { q: "How are digital twins used in urban planning?", a: "They let planners see phasing, density, zoning, sun/shadow and traffic impact of a proposal in the actual context of the surrounding city — not on a flat plan. Stakeholders review the same shared model, and Plan A vs Plan B can be compared side-by-side in real time." },
  { q: "Can digital twins support fire and emergency planning?", a: "Yes. Public-safety and resilience overlays — fire and rescue access, hydrant and asset positions, evacuation routes, and flood or utility layers — turn the twin into a shared operational picture for emergency planning and response drills." },
];

const CAPABILITIES = [
  { t: "Real-time visualisation of upcoming projects", b: "See the proposal in the actual surrounding city, at scale, in real time." },
  { t: "Data / GIS overlays for planning", b: "Zoning & land use, phasing, density, sun/shadow, traffic & access." },
  { t: "Public-safety & resilience overlays", b: "Fire & rescue access, hydrants/assets, evacuation, flood/utility layers." },
  { t: "Shared authority/stakeholder review", b: "One model, many stakeholders, aligned decisions." },
  { t: "Scenario comparison", b: "Plan A vs Plan B, side-by-side, in real time." },
];

const BEST_FOR = ["Master developers", "State / municipal planning", "GLCs", "Large landowners", "Authorities"];

export const Route = createFileRoute("/services/urban-digital-twins")({
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
        { name: "Urban Digital Twins", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Urban & Masterplan Digital Twins",
        description: DESCRIPTION,
        url: URL,
      })) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
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
          { label: "Urban Digital Twins" },
        ]} />
      </section>

      <section className="px-6 md:px-24 pt-6 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          PLAN IT · Urban & Masterplan Digital Twins
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          From a single building to an entire city — visualised, before it's built.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Novo Reperio builds digital twins at every scale — building, township, city
          and state — combining reality capture with real-time 3D so planners,
          authorities and developers can visualise upcoming projects in context and
          overlay the data that matters.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Book a consultation <ArrowRight size={14} />
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
        <MediaSlot label="UE5 MASTERPLAN CLIP — PENDING" />
      </section>

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">Scale ladder</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Building", "Township", "City / State"].map((step, i) => (
            <div key={step} className="border border-white/10 rounded-xl p-6 relative">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-300">STAGE {i + 1}</div>
              <div className="mt-3 text-white text-2xl font-light">{step}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Our most advanced engagement — scoped per project
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.t} className="border border-white/10 rounded-lg p-5">
              <h3 className="text-white text-base font-light">{c.t}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{c.b}</p>
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

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
          Urban digital twins — common questions
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

      <SiteFooter />
    </div>
  );
}
