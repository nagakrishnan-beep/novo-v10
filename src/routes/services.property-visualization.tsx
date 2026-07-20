import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot } from "@/components/site-chrome";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { WORKS } from "@/lib/works";
import { SERVICES } from "@/lib/services";

const TITLE = "Property Visualization — Novo Reperio";
const DESCRIPTION =
  "3D rendered walkthroughs, CGI 360° panoramas, photoreal stills, launch films, UE5 masterplan experiences and AI-assisted visualisation for property developers.";
const URL = abs("/services/property-visualization");

const FAQ = [
  { q: "When should we start visualisation before launch?", a: "Ideally 4–6 months before launch for CGI stills, and 3–4 months for rendered walkthrough tours and 360° panoramas. UE5 masterplan experiences and interactive web platforms need 3–6 months depending on complexity." },
  { q: "What input do you need from us?", a: "CAD, BIM, SketchUp or PDF drawings at any stage of design maturity, finish material references, and a brand palette or previous marketing assets. We work with whatever fidelity of source you have." },
  { q: "Can we update finishes after the initial render?", a: "Yes. One of the reasons CGI stays with the project post-launch is finish and colourway updates — much cheaper than reshoot cycles." },
  { q: "Do you produce virtual show units for pre-launch sales?", a: "Yes — 3D rendered walkthrough tours generated from CAD are the standard pre-sales replacement for a physical show gallery." },
];

export const Route = createFileRoute("/services/property-visualization")({
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
        { name: "Property Visualization", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
    ],
  }),
  component: PropertyVizPage,
});

function PropertyVizPage() {
  const relatedServices = SERVICES.filter((s) => s.track === "unbuilt");
  const relatedWorks = WORKS.filter((w) => w.relatedService === "property-visualization").slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Track B · Property Visualization
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          For property that doesn't exist yet.
        </h1>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          Pre-sales, launch and gallery experiences for unbuilt developments —
          rendered walkthroughs, CGI 360° tours, photoreal stills, launch films,
          UE5 masterplan platforms and AI-assisted concept iteration.
        </p>
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

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <MediaSlot ratio="16/9" label="Cover · Property Visualization" />
      </section>

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          What's included
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedServices.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-cyan-400/40 transition h-full flex flex-col"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">
                Track B
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

      {relatedWorks.length > 0 && (
        <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
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

      <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
          Property Visualization — common questions
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
