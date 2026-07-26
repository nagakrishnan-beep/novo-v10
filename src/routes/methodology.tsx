import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
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

const STEPS = [
  {
    title: "1 · Measured capture, not photography",
    body: "Every Novo Reperio twin is captured with either Matterport Pro3 LiDAR or survey-grade terrestrial LiDAR. The output is a registered point cloud (real geometry) from which the visible twin, the 2D floorplan and any BIM deliverable are derived. Nothing in the tour is modelled from imagination.",
  },
  {
    title: "2 · Dimensions come from the capture, not the copy",
    body: "Inside the tour you can measure walls, doors, ceiling heights, corridor widths and window openings directly. Those numbers come from LiDAR, not from a spec sheet, not from a legacy CAD file. When you compare our tour to a room, they should agree.",
  },
  {
    title: "3 · Capacity figures: how they should be derived",
    body: "Room capacity is not a Matterport output. Capacity is the measured usable floor area multiplied by a stated layout standard (banquet / theatre / classroom / cabaret / standing) provided by the venue operator. Where a work page shows a capacity number, that number comes from the client's own standard, never from us.",
  },
  {
    title: "4 · Freshness dating",
    body: "Every twin carries a capture date. Renovations, re-branding and menu changes drift the record. Our hosting & subscription programme funds scheduled recapture so the twin you share tomorrow still matches the space a visitor sees.",
  },
];

function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-10 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Methodology" }]} />
          <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-emerald-400">
            <ShieldCheck size={12} /> Verified by scan
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
            How scan-verified measurement works.
          </h1>
          <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
            Every Novo Reperio twin is measured geometry, dimensions and layouts
            you can verify inside the tour, not marketing copy. Here is the
            process behind that claim.
          </p>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 space-y-10 max-w-4xl">
          {STEPS.map((s) => (
            <div key={s.title} className="border-l-2 border-emerald-400/40 pl-5">
              <h2 className="text-2xl font-light text-white">{s.title}</h2>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-4">
            Capacity standards: pending client input
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-white max-w-3xl">
            Layout standards used to derive capacity from measured area.
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-[560px] w-full text-sm font-mono border border-white/10">
              <thead className="bg-white/[0.03]">
                <tr className="text-left text-emerald-300 uppercase tracking-widest text-[10px]">
                  <th className="p-3 border-b border-white/10">Layout</th>
                  <th className="p-3 border-b border-white/10">Area per person</th>
                  <th className="p-3 border-b border-white/10">Source</th>
                </tr>
              </thead>
              <tbody className="text-neutral-300">
                {[
                  ["Banquet (round tables)"],
                  ["Theatre (rows)"],
                  ["Classroom"],
                  ["Cabaret"],
                  ["Standing / cocktail"],
                ].map(([layout]) => (
                  <tr key={layout} className="border-b border-white/5">
                    <td className="p-3">{layout}</td>
                    <td className="p-3 text-neutral-500">[PENDING: client capacity standards]</td>
                    <td className="p-3 text-neutral-500">[PENDING: client capacity standards]</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-mono text-neutral-500">
            We do not publish capacity numbers we cannot back with a stated
            standard. When your operator confirms the sqm-per-pax it uses, this
            table fills in, and so do the capacity fields on your venue's work
            page.
          </p>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24">
          <Link
            to="/estimate"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Get an instant scope estimate <ArrowRight size={14} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
