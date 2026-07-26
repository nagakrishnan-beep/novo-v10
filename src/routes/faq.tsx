import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Building2,
  ChevronDown,
  Images,
  Rocket,
  Ruler,
  ScanLine,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { WHATSAPP_URL, abs } from "@/lib/site";

const TITLE = "FAQ & Help | Novo Reperio";
const DESCRIPTION =
  "Answers on digital twins, reality capture, Matterport, LiDAR, Scan-to-BIM, pricing and how a Novo Reperio project runs from first message to delivery.";
const CANONICAL = abs("/faq");

const FAQS = [
  { q: "What is reality capture?", a: "Reality capture is the process of recording a real place as accurate 3D data using LiDAR, Matterport, 360° imaging, drone and photogrammetry. It is the input that a digital twin, point cloud or BIM model is built from." },
  { q: "How accurate is LiDAR scanning?", a: "We capture with Matterport Pro3 LiDAR (per Matterport's published spec, range up to roughly 100 m with point accuracy in the ±20 mm class) and terrestrial LiDAR for larger or survey-grade work, tied to survey control points where geodetic accuracy is needed." },
  { q: "What is a digital twin?", a: "A digital twin is a photorealistic, dimensionally accurate 3D copy of a real space that people can explore online. It captures every wall, corner and finish so remote viewers can walk through, measure and understand the venue as if they were there." },
  { q: "What's the difference between Matterport and a 360° tour?", a: "Matterport is a measurable 3D digital twin with dollhouse view, floorplan and room-to-room navigation. A 360° tour is a series of linked panoramas, lighter and cheaper, ideal for OTAs and social. Most venues benefit from both." },
  { q: "How much does a project cost?", a: "A Matterport 3D scan starts from RM 2,599. Pricing is scoped per property, from single-space capture to full-property programmes. Request a quote and we'll size it against your space and use case." },
  { q: "How long does delivery take?", a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project, typically two to eight weeks depending on scale." },
  { q: "Where do you operate?", a: "We are based in Kuala Lumpur and cover Malaysia, with regional deployment across Indonesia and the Philippines." },
  { q: "How do I embed a tour on my website or listing?", a: "Every tour ships with an embed snippet and a shareable link. It drops into your website, OTA listing (Booking.com, Agoda), Google Business Profile and email, with no plugins or hosting on your side." },
  { q: "Who owns the files?", a: "You own the delivered media: final renders, videos, images and embed rights are yours to use for marketing in perpetuity. Raw project files remain with the studio unless a buy-out is agreed upfront." },
  { q: "How long do you host the tour for?", a: "Matterport tours are hosted for the term you buy, typically one to three years, renewable. We notify you before expiry so nothing goes dark unexpectedly." },
  { q: "Do I need to prepare the site before capture?", a: "Yes, the space should look the way you want buyers to see it. Lights on, clutter cleared, staging in place. We send a short prep checklist before every shoot and can advise on styling." },
  { q: "Are your drone operations licensed?", a: "Yes. Our pilots are DJI-certified, and every drone operation is flown under CAAM flight permits secured for each project, in compliance with Malaysian aviation regulations." },
  { q: "Can you deliver point clouds and Scan-to-BIM?", a: "Yes. Our LiDAR captures produce registered point clouds that we convert to as-built BIM models (up to LOD 400), 2D CAD drawings and measurable twins for AEC and facilities teams." },
  { q: "How do I book?", a: "WhatsApp us for the fastest reply, email hello@novoreperio.com, or use the contact form. We'll respond within one business day with next steps and a scoping call." },
];

const CATEGORIES: { icon: any; to: any; title: string; body: string }[] = [
  { icon: Boxes, to: "/digital-twins", title: "Digital twins", body: "What a digital twin is, and everything it can do." },
  { icon: ScanLine, to: "/reality-capture", title: "Reality capture", body: "LiDAR, Matterport, 360° and drone, and when to use each." },
  { icon: Ruler, to: "/services/scan-to-bim", title: "Scan-to-BIM", body: "Point clouds to as-built BIM and CAD, up to LOD 400." },
  { icon: Sparkles, to: "/estimate", title: "Pricing and scope", body: "What it costs, and the project assessment." },
  { icon: Building2, to: "/industries", title: "Industries", body: "How property, AEC, hospitality, FM and government use it." },
  { icon: Images, to: "/works", title: "Our work", body: "Real projects, real measured spaces." },
  { icon: Rocket, to: "/contact", title: "Getting started", body: "How a project runs, from first message to delivery." },
  { icon: Target, to: "/solutions", title: "Solutions", body: "Sell, build, operate, plan. One space, many outcomes." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-100">
      <SiteHeader active={null} />

      <main className="px-6 md:px-24 py-20 md:py-24 space-y-12">
        <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />

        <section className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-4">
                FAQ & Help
              </div>
              <h1 className="font-light leading-tight" style={{ fontSize: "clamp(30px, 5vw, 56px)" }}>
                Looking for help? Start with our most-asked questions.
              </h1>
              <p className="mt-5 text-[15px] md:text-base text-neutral-400 font-light max-w-2xl">
                Everything you need to know about our digital twins, reality capture and how we work.
                Can't find your answer? Talk to a specialist or WhatsApp us.
              </p>
            </div>
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the FAQs"
                aria-label="Search the FAQs"
                className="w-full rounded-full bg-black/40 border border-white/10 pl-11 pr-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-emerald-400/50"
              />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <Link
            to="/contact"
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex items-center justify-between gap-4 hover:border-emerald-400/40 transition"
          >
            <span className="text-lg font-light">I've got a question</span>
            <span className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500/10 transition">
              <ArrowRight size={16} />
            </span>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-emerald-400/40 bg-emerald-500/15 p-6 flex items-center justify-between gap-4 hover:bg-emerald-500/25 transition"
          >
            <span className="text-lg font-light text-emerald-100">Talk to our team</span>
            <span className="w-10 h-10 rounded-xl border border-emerald-300/40 flex items-center justify-center text-emerald-200">
              <ArrowRight size={16} />
            </span>
          </a>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-400/40 transition block"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300">
                  <Icon size={18} />
                </span>
                <div className="mt-4 text-base font-light">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-400 font-light leading-relaxed">{c.body}</p>
              </Link>
            );
          })}
        </section>

        <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6 md:p-10">
          <h2 className="font-light text-2xl md:text-4xl">General FAQs</h2>
          <p className="mt-3 text-[15px] md:text-base text-neutral-400 font-light">
            Everything you need to know. Can't find an answer?{" "}
            <Link to="/contact" className="text-emerald-300 hover:text-emerald-200">
              Talk to our team
            </Link>
            .
          </p>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {filtered.length === 0 && (
              <p className="py-6 text-sm text-neutral-400 font-light">
                No matches.{" "}
                <Link to="/contact" className="text-emerald-300 hover:text-emerald-200">
                  Talk to a specialist.
                </Link>
              </p>
            )}
            {filtered.map((f) => {
              const idx = FAQS.indexOf(f);
              const isOpen = query.trim() ? true : open === idx;
              return (
                <div key={f.q} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen && !query.trim() ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-6 text-left py-4"
                  >
                    <span className="text-[15px] md:text-base font-light text-neutral-100">{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 mt-1 text-emerald-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 pr-10 text-sm md:text-[15px] text-neutral-400 font-light leading-relaxed">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
