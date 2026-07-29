import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, ScanLine, Ruler, Users, CalendarClock, Layers, MoveRight } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav, SmartImage } from "@/components/site-chrome";
import matterportPro3 from "@/assets/matterport-pro3.png.asset.json";
import faroFocus from "@/assets/faro-focus-s.png.asset.json";
import { abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";

const TITLE = "How scan-verified measurement works: Methodology | Novo Reperio";
const DESCRIPTION =
  "Every Novo Reperio digital twin is measured geometry. Here is how our Matterport and LiDAR capture, measurement, and freshness process actually works.";
const URL = abs("/methodology");

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(webPageJsonLd({ title: TITLE, url: URL, description: DESCRIPTION })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([
        { name: "Home", url: BASE_URL },
        { name: "Methodology", url: URL },
      ])) },
    ],
  }),
  component: MethodologyPage,
});

const PROCESS_STEPS = [
  {
    title: "Capture",
    body: "Matterport Pro3 LiDAR or survey-grade terrestrial LiDAR records the space as a registered point cloud.",
    icon: ScanLine,
  },
  {
    title: "Register",
    body: "Individual scans are aligned into one coherent coordinate system ready for measurement and modelling.",
    icon: Layers,
  },
  {
    title: "Measure",
    body: "Walls, openings, ceiling heights and circulation widths are taken from real geometry, not legacy drawings.",
    icon: Ruler,
  },
  {
    title: "Deliver",
    body: "The same data feeds the interactive twin, 2D floorplans and BIM-ready outputs.",
    icon: MoveRight,
  },
];

const PRINCIPLES = [
  {
    title: "Measured capture, not photography",
    icon: ScanLine,
    body: "Every Novo Reperio twin is captured with either Matterport Pro3 LiDAR or survey-grade terrestrial LiDAR. The output is a registered point cloud (real geometry) from which the visible twin, the 2D floorplan and any BIM deliverable are derived. Nothing in the tour is modelled from imagination.",
  },
  {
    title: "Dimensions come from the capture, not the copy",
    icon: Ruler,
    body: "Inside the tour you can measure walls, doors, ceiling heights, corridor widths and window openings directly. Those numbers come from LiDAR, not from a spec sheet, not from a legacy CAD file. When you compare our tour to a room, they should agree.",
  },
  {
    title: "Capacity figures: how they should be derived",
    icon: Users,
    body: "Room capacity is not a Matterport output. Capacity is the measured usable floor area multiplied by a stated layout standard (banquet, theatre, classroom, cabaret or standing) provided by the venue operator. Where a work page shows a capacity number, that number comes from the client's own standard, never from us.",
  },
  {
    title: "Freshness dating",
    icon: CalendarClock,
    body: "Every twin carries a capture date. Renovations, re-branding and menu changes drift the record. Scheduled recapture keeps the record current, so the twin you share tomorrow still matches the space a visitor sees.",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-10 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Methodology" }]} />
          <div className="mt-6 flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-emerald-400">
            <ShieldCheck size={12} /> Verified by scan
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
            How scan-verified measurement works.
          </h1>
          <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
            Every Novo Reperio twin is measured geometry: dimensions and layouts
            you can verify inside the tour, not marketing copy. Here is the
            process behind that claim.
          </p>

          <div className="mt-10">
            <SmartImage
              src="/images/media/bim-ready-point-cloud-workflow-for-existing-buildi-featured.webp"
              alt="LiDAR point cloud workflow for existing buildings"
              label="LiDAR point cloud"
              ratio="aspect-[21/9]"
              className="rounded-2xl"
            />
          </div>
        </section>

        <section className="px-6 md:px-24 py-14 md:py-18 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-8">
            Capture hardware
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                src: matterportPro3.url,
                name: "Matterport Pro3",
                spec: "LiDAR capture, ±20 mm dimensional accuracy",
                body: "Primary tool for photorealistic digital twins with measured geometry, schematic floor plans and BIM-ready point clouds.",
              },
              {
                src: faroFocus.url,
                name: "FARO Focus S 150 / 350",
                spec: "Survey-grade terrestrial laser scanner",
                body: "Used where tighter tolerances or long-range coverage are required: as-built verification, structural surveys and scan-to-BIM at LOD 300 to 400.",
              },
            ].map((k) => (
              <figure
                key={k.name}
                className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gradient-to-b from-white/[0.06] to-transparent flex items-center justify-center p-6">
                  <img
                    src={k.src}
                    alt={`${k.name} laser scanner used by Novo Reperio`}
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <figcaption className="p-5 border-t border-white/5">
                  <h3 className="text-lg font-light text-white">{k.name}</h3>
                  <div className="mt-1 text-xs font-mono text-emerald-300/80">{k.spec}</div>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{k.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>


        <section className="px-6 md:px-24 py-14 md:py-18 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-8">
            Capture to deliverable
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-light text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 space-y-10">
          {PRINCIPLES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="border-l-2 border-emerald-400/40 pl-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 text-2xl font-light text-white">{s.title}</h2>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-4">
            Capacity standards
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-white max-w-3xl">
            Layout standards used to derive capacity from measured area.
          </h2>
          <p className="mt-4 max-w-3xl text-neutral-400 leading-relaxed">
            We do not publish capacity numbers we cannot back with a stated
            standard. Room capacity is always the measured usable floor area
            multiplied by the venue operator's chosen layout standard
            (banquet, theatre, classroom, cabaret or standing). When your
            operator confirms the sqm-per-pax it uses, the capacity fields on
            your venue's work page fill in automatically.
          </p>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
            >
              Get a project assessment <ArrowRight size={14} />
            </Link>
            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/40 hover:text-emerald-300"
            >
              See works <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
