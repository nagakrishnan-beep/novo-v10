import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Ruler, Wrench, Map as MapIcon } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";

const TITLE = "Solutions | Novo Reperio";
const DESCRIPTION =
  "One physical space, many digital outcomes. Sell it, build it, operate it or plan it with digital twins, reality capture, Scan-to-BIM and urban-scale spatial data.";
const URL = abs("/solutions");

export const Route = createFileRoute("/solutions")({
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
          breadcrumbJsonLd([
            { name: "Home", url: BASE_URL },
            { name: "Solutions", url: URL },
          ]),
        ),
      },
    ],
  }),
  component: SolutionsPage,
});

type Block = {
  key: string;
  label: string;
  icon: typeof Building2;
  lead: string;
  cards: { title: string; body: string; to: any }[];
};

const BLOCKS: Block[] = [
  {
    key: "sell",
    label: "Sell",
    icon: Building2,
    lead: "Let the space do the selling before anyone books a flight or a site visit.",
    cards: [
      {
        title: "Property marketing",
        body: "Measurable twins, CGI and film for launches, listings and sales galleries.",
        to: "/industries/property-development",
      },
      {
        title: "Venue sales",
        body: "Event planners walk the ballroom, check sightlines and confirm faster.",
        to: "/industries/events-venues",
      },
      {
        title: "Virtual showroom",
        body: "See how the same approach performed across 400+ delivered projects.",
        to: "/works",
      },
    ],
  },
  {
    key: "build",
    label: "Build",
    icon: Ruler,
    lead: "Design and coordinate against the building as it actually stands.",
    cards: [
      {
        title: "Construction documentation",
        body: "Dated as-built records and progress capture through the build.",
        to: "/industries/construction",
      },
      {
        title: "Reality capture",
        body: "LiDAR, Matterport, drone and photogrammetry matched to the project.",
        to: "/reality-capture",
      },
      {
        title: "Scan-to-BIM",
        body: "Registered point cloud converted to BIM or CAD, up to LOD 400.",
        to: "/services/scan-to-bim",
      },
    ],
  },
  {
    key: "operate",
    label: "Operate",
    icon: Wrench,
    lead: "Turn the building into an operating record your team can actually use.",
    cards: [
      {
        title: "Facilities management",
        body: "Asset documentation and space records that survive staff turnover.",
        to: "/industries/facilities-management",
      },
      {
        title: "Facilities operations twins",
        body: "Remote inspection and tagged equipment inside a measured twin.",
        to: "/services/facilities-operations",
      },
      {
        title: "Progress documentation",
        body: "Recapture on schedule so the record stays current after handover.",
        to: "/services/construction-progress",
      },
    ],
  },
  {
    key: "plan",
    label: "Plan",
    icon: MapIcon,
    lead: "Give planners and stakeholders one shared spatial reference at scale.",
    cards: [
      {
        title: "Urban digital twins",
        body: "City and masterplan-scale twins with data overlay for planning review.",
        to: "/services/urban-digital-twins",
      },
      {
        title: "Government and public sector",
        body: "Heritage, infrastructure and civic assets recorded as spatial data.",
        to: "/industries/government",
      },
      {
        title: "Masterplan experience",
        body: "Interactive real-time masterplan environments built on captured context.",
        to: "/services/ue5-masterplan-experience",
      },
    ],
  },
];

function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="solutions" />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Solutions" }]} />
          <div className="mt-6 text-xs font-mono uppercase tracking-[0.35em] text-emerald-400">
            Solutions
          </div>
          <h1 className="mt-4 text-[clamp(30px,5vw,56px)] font-light leading-[1.05] max-w-4xl text-white">
            One physical space. Many digital outcomes.
          </h1>
          <p className="mt-6 max-w-3xl text-[15px] md:text-base text-neutral-300 leading-relaxed">
            The same capture can sell a property, coordinate a renovation, document a
            plant and inform a masterplan. What changes is the deliverable, not the site
            visit. Start from the outcome you need and work backwards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300 transition"
            >
              Get an assessment <ArrowRight size={14} />
            </Link>
            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-white hover:border-emerald-400/50 hover:text-emerald-300 transition"
            >
              Explore the work <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {BLOCKS.map((b) => (
          <section
            key={b.key}
            className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900"
          >
            <div className="flex items-center gap-3">
              <b.icon size={18} className="text-emerald-300" />
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-emerald-400">
                {b.label}
              </span>
            </div>
            <h2 className="mt-4 text-2xl md:text-4xl font-light text-white max-w-3xl">
              {b.lead}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {b.cards.map((c) => (
                <Link
                  key={c.title}
                  to={c.to}
                  className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 hover:border-emerald-400/40 transition flex flex-col"
                >
                  <h3 className="text-lg md:text-xl font-medium text-white">{c.title}</h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed flex-1">
                    {c.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300">
                    Explore <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="px-6 md:px-24 py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-light text-white">
              Not sure which outcome you need first?
            </h2>
            <p className="mt-4 text-[15px] md:text-base text-neutral-400 leading-relaxed">
              Most clients start with one outcome and reuse the same capture for the next
              three. Tell us the space and we will map the sequence.
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
