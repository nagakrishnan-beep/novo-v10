import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Ruler, Wrench, Map as MapIcon } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { abs, BASE_URL } from "@/lib/site";
import {
  breadcrumbJsonLd,
  webPageJsonLd,
  serviceJsonLd,
  faqPageJsonLd,
} from "@/lib/schema";

const TITLE = "Digital Twins in Malaysia | Novo Reperio";
const DESCRIPTION =
  "Photorealistic, dimensionally accurate digital twins built from laser-measured reality. Matterport Pro3 LiDAR capture for property, construction, facilities and venues across Malaysia.";
const URL = abs("/digital-twins");

const FAQ = [
  {
    q: "What is a digital twin?",
    a: "A digital twin is a photorealistic, dimensionally accurate 3D replica of a real physical space. It is built from measured capture, so anyone can explore it, take measurements inside it and use it to make decisions from anywhere.",
  },
  {
    q: "How accurate is it?",
    a: "Our twins are captured with Matterport Pro3 LiDAR. Per Matterport's published specification, the Pro3 captures at range up to roughly 100 m with point accuracy in the ±20 mm class. Dimensions inside the tour come from that capture, not from a spec sheet.",
  },
  {
    q: "Can a digital twin integrate with BIM?",
    a: "Yes. The registered point cloud behind the twin can be converted to BIM or CAD through our Scan-to-BIM service, up to LOD 400, for as-built documentation, renovation and coordination work.",
  },
  {
    q: "Can it be embedded on a website or property listing?",
    a: "Yes. Every twin ships with an embed snippet and a shareable link, so it can be dropped into a website, a listing portal, a sales microsite or an email campaign without any plugin.",
  },
  {
    q: "Can you scan an occupied building?",
    a: "Yes. We routinely capture occupied hotels, offices, factories and venues. Capture is non-invasive and we schedule around operating hours so business continues while we scan.",
  },
  {
    q: "What does a digital twin cost?",
    a: "A Matterport 3D scan starts from RM 2,599. Final pricing is scoped per property based on floor area, complexity, access and the deliverables you need.",
  },
];

export const Route = createFileRoute("/digital-twins")({
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
            name: "Digital Twin",
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
            { name: "Digital Twins", url: URL },
          ]),
        ),
      },
    ],
  }),
  component: DigitalTwinsPage,
});

type Use = {
  key: string;
  label: string;
  icon: typeof Building2;
  points: string[];
  to: any;
  cta: string;
};

const USES: Use[] = [
  {
    key: "sell",
    label: "Sell",
    icon: Building2,
    points: [
      "Let buyers and event planners walk the space before they fly in.",
      "Embed the twin in listings, microsites and proposals.",
      "Shorten the gap between enquiry and site visit.",
    ],
    to: "/industries",
    cta: "See the sectors",
  },
  {
    key: "build",
    label: "Build",
    icon: Ruler,
    points: [
      "As-built documentation from a registered point cloud.",
      "Scan-to-BIM up to LOD 400 for coordination and renovation.",
      "Dated progress records you can go back to.",
    ],
    to: "/works",
    cta: "See the work",
  },
  {
    key: "operate",
    label: "Operate",
    icon: Wrench,
    points: [
      "Asset and equipment documentation tagged in place.",
      "Remote inspection without mobilising a site visit.",
      "Handover packs that survive staff turnover.",
    ],
    to: "/industries",
    cta: "See the sectors",
  },
  {
    key: "plan",
    label: "Plan",
    icon: MapIcon,
    points: [
      "Masterplan and campus-scale spatial context.",
      "Data overlay for planning and stakeholder review.",
      "One shared record instead of scattered drawings.",
    ],
    to: "/works",
    cta: "See the work",
  },
];

const PIPELINE = [
  { step: "Capture", body: "Matterport Pro3 LiDAR, 360°, drone and photogrammetry on site." },
  { step: "Process", body: "Registration, alignment and cleanup into a measured point cloud." },
  { step: "Create", body: "The twin, floorplans, BIM, stills and video are derived from that geometry." },
  { step: "Act", body: "Embed, share, measure, inspect and hand over. The twin becomes the record." },
];

const PROOF: { metric: string; label: string; to?: any }[] = [
  { metric: "350,000 sqft", label: "captured at the KL Convention Centre", to: "/works/kuala-lumpur-convention-centre" },
  { metric: "8,000+", label: "digital twin visits at WTCKL", to: "/works/world-trade-centre-kuala-lumpur" },
  { metric: "400+", label: "projects delivered" },
  { metric: "12+ years", label: "capturing physical space, since 2014" },
];

function DigitalTwinsPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="digital-twins" />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Digital Twins" }]} />
          <div className="mt-6 text-xs font-mono uppercase tracking-[0.35em] text-emerald-400">
            Digital Twins
          </div>
          <h1 className="mt-4 text-[clamp(30px,5vw,56px)] font-light leading-[1.05] max-w-4xl text-white">
            Digital twins of real, measured space.
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] md:text-base text-neutral-300 leading-relaxed">
            A digital twin is a photorealistic, dimensionally accurate 3D replica of a
            physical space that anyone can explore, measure and act on from anywhere.
            Ours are built from laser-measured reality, not rendered marketing.
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
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-light text-white">
              What is a digital twin?
            </h2>
            <p className="mt-6 text-[15px] md:text-base text-neutral-300 leading-relaxed">
              A digital twin is a measured 3D copy of a real place. It is captured on site
              with LiDAR and photographic sensors, then reconstructed so the geometry
              matches the building rather than approximating it. Because the geometry is
              real, you can take dimensions inside the twin, generate floorplans from it,
              convert it into BIM, and use it as the shared reference for sales,
              construction, operations and planning teams at the same time.
            </p>
            <p className="mt-4 text-[15px] md:text-base text-neutral-400 leading-relaxed">
              The difference from a rendered walkthrough is simple. A render shows what a
              space could look like. A digital twin records what it actually is, on the
              date it was captured.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">
            What you can do with it
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {USES.map((u) => (
              <div
                key={u.key}
                className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col"
              >
                <u.icon size={18} className="text-emerald-300" />
                <h3 className="mt-4 text-lg md:text-xl font-medium text-white">{u.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-400 leading-relaxed flex-1">
                  {u.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-emerald-300">+</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to={u.to}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
                >
                  {u.cta} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">How we build it</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {PIPELINE.map((s, i) => (
              <div key={s.step} className="border-l-2 border-emerald-400/40 pl-5">
                <div className="text-xs font-mono text-neutral-500">0{i + 1}</div>
                <h3 className="mt-2 text-lg md:text-xl font-medium text-white">{s.step}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">Proof, not adjectives</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((p) => {
              const inner = (
                <>
                  <div className="font-mono text-2xl text-emerald-300">{p.metric}</div>
                  <div className="mt-2 text-sm text-neutral-400 leading-relaxed">{p.label}</div>
                </>
              );
              return p.to ? (
                <Link
                  key={p.metric}
                  to={p.to}
                  className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 hover:border-emerald-400/40 transition"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={p.metric}
                  className="rounded-xl border border-white/10 bg-neutral-950/60 p-6"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-light text-white">Powered by reality capture</h2>
            <p className="mt-6 text-[15px] md:text-base text-neutral-300 leading-relaxed">
              A twin is only as good as the capture behind it. We run Matterport Pro3
              LiDAR, terrestrial LiDAR, 360° capture up to 8K, drone and aerial
              photogrammetry, and Scan-to-BIM conversion in house, so the technology is
              matched to the job instead of the job bent to one tool.
            </p>
            <Link
              to="/reality-capture"
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
            >
              Explore reality capture <ArrowRight size={12} />
            </Link>
          </div>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <h2 className="text-2xl md:text-4xl font-light text-white">Digital twin questions</h2>
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
              Find out what your space is worth as a digital asset.
            </h2>
            <p className="mt-4 text-[15px] md:text-base text-neutral-400 leading-relaxed">
              Tell us the building, the floor area and the outcome you need. We will come
              back with the right capture method and an indicative scope.
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
