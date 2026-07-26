import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { abs, BASE_URL } from "@/lib/site";
import {
  breadcrumbJsonLd,
  webPageJsonLd,
  serviceJsonLd,
  faqPageJsonLd,
} from "@/lib/schema";

const TITLE =
  "Reality Capture Malaysia: LiDAR, Matterport, 360°, Drone, Scan-to-BIM | Novo Reperio";
const DESCRIPTION =
  "LiDAR scanning, Matterport 3D, 360° capture, drone survey, photogrammetry and Scan-to-BIM up to LOD 400. Reality capture matched to your project, delivered across Malaysia.";
const URL = abs("/reality-capture");

const FAQ = [
  {
    q: "What is the difference between LiDAR and Matterport?",
    a: "LiDAR is the measurement technology: a laser sensor that records the geometry of a space as a point cloud. Matterport is a capture and delivery platform that uses LiDAR (in the Pro3 camera) to produce a hosted, photorealistic twin you can walk and measure in a browser. Put simply, LiDAR gives you the measurement, Matterport gives you the experience built on it.",
  },
  {
    q: "How accurate is LiDAR scanning?",
    a: "We capture with the Matterport Pro3. Per Matterport's published specification the Pro3 scans at range up to roughly 100 m with point accuracy in the ±20 mm class. For survey-grade AEC work we deploy terrestrial LiDAR and register the scans into a single controlled point cloud.",
  },
  {
    q: "What is Scan-to-BIM and what does LOD 400 mean?",
    a: "Scan-to-BIM converts a registered point cloud into a usable BIM or CAD model of the building as it actually stands. LOD stands for Level of Development. LOD 400 means elements are modelled with fabrication-level detail and accurate quantity, size, shape, location and orientation, which is the level needed for construction and renovation coordination.",
  },
];

export const Route = createFileRoute("/reality-capture")({
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
      {
        type: "application/ld+json",
        children: JSON.stringify(
          webPageJsonLd({ title: TITLE, url: URL, description: DESCRIPTION }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceJsonLd({
            name: "Reality Capture",
            description: DESCRIPTION,
            url: URL,
          }),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", url: BASE_URL },
            { name: "Reality Capture", url: URL },
          ]),
        ),
      },
    ],
  }),
  component: RealityCapturePage,
});

type Tech = {
  name: string;
  what: string;
  when: string;
  delivers: string;
  to: any;
  linkLabel: string;
  bestFor: string;
};

const TECHS: Tech[] = [
  {
    name: "LiDAR scanning",
    what: "Laser measurement of a space, captured with the Matterport Pro3 and terrestrial LiDAR where survey control is required. Per Matterport's published specification the Pro3 scans at range up to roughly 100 m with point accuracy in the ±20 mm class.",
    when: "When the numbers matter: measurement, AEC coordination, BIM and facilities records.",
    delivers: "A registered point cloud, measurable twin, floorplans and dimensioned exports.",
    to: "/services/scan-to-bim",
    linkLabel: "LiDAR Scan-to-BIM",
    bestFor: "Measurement, AEC, BIM, FM",
  },
  {
    name: "Matterport 3D",
    what: "A photorealistic, dimensionally accurate digital twin you can walk in any browser, hosted and shareable. A Matterport 3D scan starts from RM 2,599.",
    when: "When a remote viewer needs to understand and trust a space without visiting it.",
    delivers: "Hosted twin, embed snippet, schematic floorplan and in-tour measurement.",
    to: "/services/spatial-capture-digital-twins",
    linkLabel: "Spatial Capture & Digital Twins",
    bestFor: "Property, hospitality, venues",
  },
  {
    name: "360° capture",
    what: "Immersive spherical panoramas up to 8K, linked into a lightweight navigable tour.",
    when: "When you need fast, low-friction coverage rather than measurement.",
    delivers: "Panoramic tour, Google-ready imagery and embeddable hotspot navigation.",
    to: "/services/ground-level-360",
    linkLabel: "Ground-level 360°",
    bestFor: "Lightweight marketing tours, Google",
  },
  {
    name: "Drone & aerial",
    what: "Aerial capture flown by DJI-certified pilots. Every operation is flown under CAAM flight permits secured for each project.",
    when: "When the story is the site, the surroundings or the scale of a development.",
    delivers: "Aerial stills, video, orthomosaics and site context imagery.",
    to: "/services/aerial-context-intelligence",
    linkLabel: "Aerial Context Intelligence",
    bestFor: "Aerial context, large sites",
  },
  {
    name: "Photogrammetry",
    what: "Reconstruction of 3D geometry from large overlapping photo sets, ground and air.",
    when: "When you need to model exteriors, terrain or environments too large for interior scanning alone.",
    delivers: "Textured 3D meshes, orthomosaics and site-scale models.",
    to: "/services/aerial-context-intelligence",
    linkLabel: "Aerial & photogrammetry",
    bestFor: "Mapping, large environments",
  },
  {
    name: "Scan-to-BIM",
    what: "Conversion of a registered point cloud into BIM or CAD of the building as built, up to LOD 400.",
    when: "When design, renovation or coordination has to work against reality, not legacy drawings.",
    delivers: "Revit or CAD models, as-built documentation and clash-ready geometry.",
    to: "/services/scan-to-bim",
    linkLabel: "Scan-to-BIM",
    bestFor: "AEC, renovation, documentation",
  },
];

const LADDER = [
  { label: "Technology", body: "LiDAR, Matterport, 360°, drone, photogrammetry." },
  { label: "Output", body: "Point clouds, twins, panoramas, meshes, BIM models." },
  { label: "Business use", body: "Sell the space, build it, operate it, plan it." },
];

function RealityCapturePage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="reality-capture" />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Reality Capture" }]} />
          <div className="mt-6 text-xs font-mono uppercase tracking-[0.35em] text-emerald-400">
            Reality Capture
          </div>
          <h1 className="mt-4 text-[clamp(30px,5vw,56px)] font-light leading-[1.05] max-w-4xl text-white">
            Capture reality at the level your project requires.
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] md:text-base text-neutral-300 leading-relaxed">
            Not every job needs the same sensor. A sales tour, a BIM model and a site
            survey each demand a different fidelity, a different turnaround and a
            different budget. We run LiDAR, Matterport, 360°, drone, photogrammetry and
            Scan-to-BIM under one roof and pick the right one for the outcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300 transition"
            >
              Get an assessment <ArrowRight size={14} />
            </Link>
            <Link
              to="/digital-twins"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-white hover:border-emerald-400/50 hover:text-emerald-300 transition"
            >
              What is a digital twin <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">The technologies</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TECHS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col"
              >
                <h3 className="text-lg md:text-xl font-medium text-white">{t.name}</h3>
                <dl className="mt-4 space-y-3 text-sm text-neutral-400 leading-relaxed flex-1">
                  <div>
                    <dt className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      What it is
                    </dt>
                    <dd className="mt-1">{t.what}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      When to use it
                    </dt>
                    <dd className="mt-1">{t.when}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      What it delivers
                    </dt>
                    <dd className="mt-1">{t.delivers}</dd>
                  </div>
                </dl>
                <Link
                  to={t.to}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
                >
                  {t.linkLabel} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">
            How the technologies relate
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] md:text-base text-neutral-400 leading-relaxed">
            Every engagement climbs the same ladder. The sensor produces an output, and
            the output serves a business use. Start from the business use and the
            technology choice makes itself.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {LADDER.map((l, i) => (
              <div key={l.label} className="border-l-2 border-emerald-400/40 pl-5">
                <div className="text-xs font-mono text-neutral-500">0{i + 1}</div>
                <h3 className="mt-2 text-lg md:text-xl font-medium text-white">{l.label}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">Technology selector</h2>
          <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-neutral-950/60">
                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-normal">
                    Technology
                  </th>
                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-normal">
                    Best for
                  </th>
                </tr>
              </thead>
              <tbody>
                {TECHS.map((t) => (
                  <tr key={t.name} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 text-white font-light">{t.name}</td>
                    <td className="px-5 py-4 text-neutral-400">{t.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            to="/estimate"
            className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
          >
            Not sure? Get an assessment <ArrowRight size={12} />
          </Link>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-light text-white">Where we deploy</h2>
            <p className="mt-6 text-[15px] md:text-base text-neutral-300 leading-relaxed">
              Malaysia, with regional deployment across Indonesia and the Philippines.
              Crews, permits and equipment travel as one team, so a regional site gets the
              same capture standard as a Kuala Lumpur one.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">Reality capture questions</h2>
          <div className="mt-10 max-w-4xl divide-y divide-white/5 border-t border-white/5">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base md:text-lg font-light text-white flex items-start justify-between gap-4">
                  {f.q}
                  <span className="text-emerald-300 shrink-0 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-light text-white">
              Tell us the site. We will tell you the method.
            </h2>
            <p className="mt-4 text-[15px] md:text-base text-neutral-400 leading-relaxed">
              Send us the building type, the floor area and what you need the output to
              do. We will recommend the capture stack and an indicative scope.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/estimate"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300 transition"
              >
                Get an assessment <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-white hover:border-emerald-400/50 hover:text-emerald-300 transition"
              >
                Talk to a specialist <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
