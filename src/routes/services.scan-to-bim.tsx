import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/schema";
import { MonthlyValue } from "@/components/service-extras";
import { WORKS } from "@/lib/works";

const TITLE = "Scan-to-BIM & LiDAR Point Cloud Services Malaysia | As-Built CAD & Revit — Novo Reperio";
const DESCRIPTION =
  "LiDAR point clouds converted into accurate as-built BIM (LOD 200–350), 2D CAD, and measurable digital twins for architects, engineers and facility teams in Malaysia.";
const URL = abs("/services/scan-to-bim");

const FAQ = [
  { q: "What is Scan-to-BIM?", a: "Scan-to-BIM is the process of capturing an existing building with LiDAR or 3D scanning, then converting the resulting point cloud into an accurate as-built BIM model. It replaces guesswork and outdated drawings with a reliable digital record of what is actually on site — used by architects for renovation, MEP engineers for coordination, and facility owners for handover." },
  { q: "What accuracy does LiDAR scanning provide?", a: "Centimetre-grade LiDAR point clouds captured with fast walk-and-scan coverage, paired with millimetre-grade measurement inside the 3D twin. That is enough for LOD 200–350 BIM, MEP coordination, and quantity surveying without a second visit." },
  { q: "Can you produce AutoCAD drawings from a 3D scan?", a: "Yes. Once a building is scanned we can deliver 2D CAD floor plans, elevations and sections extracted from the point cloud, alongside the BIM model and the measurable 3D twin — one capture, multiple deliverables." },
];

const DELIVERABLES = [
  "Registered LiDAR point clouds",
  "Scan-to-BIM models at agreed LOD (LOD 200–350)",
  "2D CAD floor plans, elevations, sections",
  "As-built vs design verification",
  "Measurable 3D twin alongside the point cloud",
];

const BEST_FOR = [
  "Architects",
  "Engineers",
  "Quantity surveyors",
  "Renovation & retrofit",
  "MEP coordination",
  "Facility handover",
];

export const Route = createFileRoute("/services/scan-to-bim")({
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
        { name: "Scan-to-BIM & LiDAR", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Scan-to-BIM & LiDAR Point Cloud Services",
        description: DESCRIPTION,
        url: URL,
      })) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
    ],
  }),
  component: ScanToBimPage,
});

function ScanToBimPage() {
  const proof = WORKS.find((w) => w.slug === "pnb-cimb-hub");
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-16 pb-6">
        <BreadcrumbNav items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Scan-to-BIM" },
        ]} />
      </section>

      <section className="px-6 md:px-24 pt-6 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          BUILD IT · Scan-to-BIM & LiDAR
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          From site scan to as-built intelligence.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Novo Reperio captures existing buildings with LiDAR and 3D scanning, then
          converts the point cloud into accurate as-built deliverables — BIM models,
          2D CAD drawings, and measurable digital twins — so architects, engineers
          and facility teams design and plan from reality, not guesswork.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Request a quote <ArrowRight size={14} />
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

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 grid md:grid-cols-2 gap-10 items-start">
        <MediaSlot label="POINT CLOUD / BIM SAMPLE — PENDING" />
        <div>
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
            What we deliver
          </div>
          <ul className="space-y-3">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-neutral-300">
                <span className="text-emerald-300">+</span> {d}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-2">
              Accuracy
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Centimetre-grade LiDAR point clouds captured with fast walk-and-scan
              coverage, paired with millimetre-grade measurement inside the 3D twin.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Best for
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {BEST_FOR.map((b) => (
            <span key={b} className="px-3 py-2 border border-white/10 rounded text-neutral-300">
              {b}
            </span>
          ))}
        </div>
      </section>

      {proof && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
            Proof
          </div>
          <Link
            to="/works/$slug"
            params={{ slug: proof.slug }}
            className="block border border-white/10 rounded-xl p-6 hover:border-emerald-400/40 transition"
          >
            <div className="text-xs tracking-widest uppercase text-neutral-500 mb-2 font-mono">{proof.format}</div>
            <div className="text-white text-xl font-light">{proof.title}</div>
            <p className="mt-2 text-sm text-neutral-400">{proof.summary}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-widest">
              Read case study <ArrowRight size={12} />
            </div>
          </Link>
        </section>
      )}

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
          Scan-to-BIM — common questions
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

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          Related BUILD IT services
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/services/construction-progress"
            className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition"
          >
            <div className="text-white text-base font-light">Construction Progress Capture</div>
            <p className="mt-2 text-sm text-neutral-400">Every milestone, documented. Every site, visitable from your desk.</p>
          </Link>
          <Link
            to="/services/facilities-operations"
            className="border border-white/10 rounded-lg p-6 hover:border-emerald-400/40 transition"
          >
            <div className="text-white text-base font-light">Facilities Operations Twins</div>
            <p className="mt-2 text-sm text-neutral-400">Run the building from anywhere.</p>
          </Link>
        </div>
      </section>

      <MonthlyValue
        intro="Scan deliverables don't have to end when the point cloud is handed over."
        bullets={[
          "Hosted measurable twin alongside the BIM model — architects, MEP and QS teams share one live link.",
          "Usage analytics on twin access — see who inside the design team is inspecting what.",
          "Scheduled recapture — resurvey at fit-out, defects liability and post-occupation to track drift from as-designed.",
          "BIM handover integrations — LOD 200–350 model feeds straight into the FM asset register.",
        ]}
      />

      <SiteFooter />
    </div>
  );
}
