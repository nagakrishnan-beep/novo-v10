import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  HelpCircle,
  ArrowRight,
  Play,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  MessageCircle,
  Building2,
  Ruler,
  Wrench,
  Box,
  ScanLine,
  Map as MapIcon,
} from "lucide-react";
import {
  IntensityProvider,
  AuroraBackdrop,
  KineticHeadline,
  KineticBody,
  KineticEyebrow,
  MagneticCard,
  Reveal,
} from "@/components/chrono";
import { LaserTrail } from "@/components/laser-trail";
import { PointCloudHero } from "@/components/point-cloud-hero";
import { CLIENT_LOGOS } from "@/lib/logos";
import { WORKS } from "@/lib/works";
import { SiteHeader, SiteFooter, SmartImage } from "@/components/site-chrome";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { HudLabel, HudRail } from "@/components/spatial/hud-label";
import { CountUp } from "@/components/spatial/count-up";
import { PipelineRail } from "@/components/spatial/pipeline-rail";
import { TrackProvider, useTrack, type TrackKey } from "@/components/spatial/track-context";



const TITLE = "360° Virtual Tour & Digital Twin Experts Malaysia | Novo Reperio";
const DESCRIPTION =
  "Matterport digital twins, 360° virtual tours & drone capture in Kuala Lumpur. Trusted by Hyatt, KLCC, Porsche & 400+ clients since 2014.";
const CANONICAL = "https://novo-v10.lovable.app/";

const HOMEPAGE_FAQ = [
  { q: "What is a digital twin?", a: "A digital twin is a photorealistic, dimensionally accurate 3D copy of a real space that people can explore online. It captures every wall, corner and finish so remote viewers can walk through, measure and understand the venue as if they were there." },
  { q: "What's the difference between Matterport and a 360° tour?", a: "Matterport is a measurable 3D digital twin with dollhouse view, floorplan and room-to-room navigation. A 360° tour is a series of linked panoramas, lighter and cheaper, ideal for OTAs and social. Most venues benefit from both." },
  { q: "How much does a project cost?", a: "A Matterport 3D scan starts from RM 2,599. Pricing is scoped per property, from single-space capture to full-property programmes. Request a quote and we'll size it against your space and use case." },
  { q: "How long does delivery take?", a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project, typically two to eight weeks depending on scale." },
  { q: "Where do you operate?", a: "We are based in Kuala Lumpur and cover Malaysia, with regional deployment across Indonesia and the Philippines." },
  { q: "How do I embed a tour on my website or listing?", a: "Every tour ships with an embed snippet and a shareable link. It drops into your website, OTA listing (Booking.com, Agoda), Google Business Profile and email, with no plugins or hosting on your side." },
  { q: "Who owns the files?", a: "You own the delivered media: final renders, videos, images and embed rights are yours to use for marketing in perpetuity. Raw project files remain with the company unless a buy-out is agreed upfront." },
  { q: "How long do you host the tour for?", a: "Matterport tours are hosted for the term you buy, typically one to three years, renewable. We notify you before expiry so nothing goes dark unexpectedly." },
  { q: "Do I need to prepare the site before capture?", a: "Yes, the space should look the way you want buyers to see it. Lights on, clutter cleared, staging in place. We send a short prep checklist before every shoot and can advise on styling." },
  { q: "Are your drone operations licensed?", a: "Yes. Our pilots are DJI-certified, and every drone operation is flown under CAAM flight permits secured for each project, in compliance with Malaysian aviation regulations." },
  { q: "Can you deliver point clouds and Scan-to-BIM?", a: "Yes. Our LiDAR captures produce registered point clouds that we convert to as-built BIM models (up to LOD 400), 2D CAD drawings and measurable twins for AEC and facilities teams." },
  { q: "How do I book?", a: "WhatsApp us for the fastest reply, email hello@novoreperio.com, or use the contact form. We'll respond within one business day with next steps and a scoping call." },
];

const HOMEPAGE_FAQ_DISPLAY = [
  { q: "What exactly is a digital twin?", a: "A measured 3D copy of a real space you can walk, measure and share from anywhere. It is captured with LiDAR and photography, so the geometry matches the building, not a render." },
  { q: "Matterport, LiDAR, 360° or drone: which do I need?", a: "It depends on the job, and most projects mix a few. Matterport for a measurable twin, LiDAR for engineering accuracy, 360° for light marketing tours, drone for scale and context. The project assessment recommends the right mix in about a minute." },
  { q: "What does it cost?", a: "A Matterport 3D scan starts from RM 2,599, scoped per property by size and complexity. Run the project assessment for an indicative band before you even talk to us." },
  { q: "Can you deliver point clouds and Scan-to-BIM?", a: "Yes. We convert LiDAR point clouds into as-built BIM up to LOD 400, plus 2D CAD drawings and a measurable twin, from a single capture." },
  { q: "How do I get the tour onto my website or listing?", a: "Every tour ships with an embed snippet and a shareable link. It drops into your website, an OTA listing, your Google Business Profile or an email, with no plugins on your side." },
  { q: "Where do you work?", a: "We are based in Kuala Lumpur and cover Malaysia, with regional deployment across Indonesia and the Philippines." },
];

export const Route = createFileRoute("/")({
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
          mainEntity: HOMEPAGE_FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/60172029996";


const CAPTURE_FEATURES = [
  { title: "LiDAR-powered accuracy", body: "Capture every measurement, corner, and detail with professional-grade depth sensors." },
  { title: "Highest-resolution capture", body: "DSLR and drone RAW stills at the highest resolution, plus 360° capture up to 8K." },
  { title: "Frictionless integration", body: "Your digital twin is fully hosted and ready for website embedding or BIM software." },
];

const OUTCOMES = [
  "Anytime, Anywhere: 24/7 access to your site from anywhere in the world.",
  "Optimized For Web: lightweight, web-ready experiences built for engagement.",
  "Spatial Digital Twins: accurate remote walkthroughs for flow and layout analysis.",
  "Brand-First 360° Tours: polished, interactive showcases reflecting your brand.",
  "Omnichannel Delivery: packaged for web, mobile, and high-stakes presentations.",
];

const SECTORS = ["Hospitality", "Venues", "Property", "Facilities & More"];

const SERVICES = [
  { kicker: "Core delivery layer", title: "Matterport + 360", body: "Main hosted tour. Shows flow, size, and layout as your primary asset." },
  { kicker: "Lightweight share format", title: "360 Tours", body: "Lighter tour formats for web, QR, and quick review flows." },
  { kicker: "Context and arrival", title: "Drone and aerial", body: "Show scale, access, and the surroundings around the venue." },
  { kicker: "Launch wrapper", title: "Project websites", body: "Package the final experience for sharing and sales-ready launch pages." },
];

const WORKFLOW = ["Capture", "Process", "Create", "Act"];

const STORIES = [
  { metric: "8,000+ digital twin visits", tag: "Venue sales proof", title: "World Trade Centre Kuala Lumpur", body: "A venue digital twin averaging 37 visits a week, so event buyers understand scale and flow before they book.", cta: "See venue work", href: "/works/world-trade-centre-kuala-lumpur", internal: true },
  { metric: "350,000 sqft captured", tag: "Large complex site proof", title: "Kuala Lumpur Convention Centre", body: "One of the largest venue captures we have delivered, covering halls, foyers and circulation in a single navigable twin.", cta: "See the KLCC capture", href: "/works/kuala-lumpur-convention-centre", internal: true },
  { metric: "Ballroom and prefunction captured", tag: "Hospitality presentation proof", title: "Hyatt Kuantan, Kempas Ballroom", body: "Ballroom presentation that helps event buyers see layout and setup before the first site visit.", cta: "View Hyatt project", href: "/works/hyatt-kuantan-ballroom", internal: true },
];

const SCOPE_STEPS = [
  { n: "01", title: "Define the objective", body: "We start with the ‘Why.’ We analyze your space, your target audience, and the specific decision you want them to make after viewing the tour.", bullets: ["Single vs. multi-site strategy", "Conversion-focused UX", "Operational vs. marketing use cases"] },
  { n: "02", title: "Engineer the experience", body: "We select the perfect combination of capture technology and interactive layers to match your brand's standards and technical requirements.", bullets: ["Precision LiDAR vs. 360° walkthroughs", "Custom branding & infotags", "Interactive floorplans & media"] },
  { n: "03", title: "Seamless launch", body: "We don't just send a link. We provide a launch-ready package, integrated into your website, ads, or pitch decks.", bullets: ["Quick turnaround", "Campaign-ready assets", "Dedicated integration support"] },
];


const REVIEWS = [
  { name: "Joyce Chong", body: "Novo Reperio is good and they use the latest equipment for their work. Experienced team, fast output, high quality." },
  { name: "Kammy Parkland", body: "Been approaching Novo Reperio since 2020 for my projects' virtual show units. Great service, helpful staff, high quality works." },
  { name: "Low Lap Sheng", body: "Skylon Residences, Kuala Lumpur by GBD Land. 60% of units now sold. Their 360° virtual tours greatly supported our foreign-buyer sales." },
  { name: "Nur Aiman", body: "Excellent Matterport setup for our project. Professional, supportive, on time, the whole process was stress-free and rewarding." },
];

function Index() {
  return (
    <IntensityProvider>
      <ClientOnly fallback={null}>
        <AuroraBackdrop />
        <LaserTrail />
      </ClientOnly>

      <PageContent />
    </IntensityProvider>
  );
}


function PageContent() {
  return (
    <TrackProvider>
      <div className="relative min-h-screen text-neutral-100 font-sans antialiased overflow-x-clip selection:bg-emerald-400 selection:text-black">
        <SiteHeader active="home" />
        <SideRail />
        <main>
          <Hero />
          <FeaturedWorkStrip />

          <ByTheNumbers />
          <DefinedTerms />
          <FourDoorRouter />
          <ScanRealitySection />
          <IndustriesRow />
          <CaptureSection />
          <OutcomesSection />
          <IndustriesSection />
          <ServicesSection />
          <StoriesSection />
          <LogosSection />
          <ReviewsSection />
          <ScopeSection />
          <FaqSection />
          <CtaSection />
        </main>
        <SiteFooter />
      </div>
    </TrackProvider>
  );
}


/* ---------- scan reality flagship section ---------- */

function ScanRealitySection() {
  return (
    <section
      id="scan-reality"
      className="relative z-10 border-t border-white/5 bg-[#04060a]"
      aria-label="Scan-verified geometry"
    >
      <div className="relative h-[70vh] md:h-[80vh] min-h-[520px] w-full overflow-hidden">
        <PointCloudHero className="absolute inset-0" offsetX={0.85} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent md:block hidden" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden" />
        <div className="relative z-10 h-full flex items-end md:items-center px-6 md:px-24 pb-10 md:pb-0">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-300 mb-6">
              [ Scan-verified geometry ·{" "}
              <CountUp value={77399} /> points ]
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white leading-[1.05] tracking-tight">
              This is measured reality.
            </h2>
            <p className="mt-6 text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl">
              Every point you see was laser-captured on a real Novo Reperio
              project. Walk the actual space. Nothing here is rendered marketing.
            </p>
            <HudRail
              className="mt-8"
              items={[
                { k: "Source", v: "Falcon 7X cabin" },
                { k: "Method", v: "LiDAR + photogrammetry" },
                { k: "Deliverable", v: "Point cloud, twin" },
              ]}
            />
            <div className="mt-8">
              <Link
                to="/works/$slug"
                params={{ slug: "private-jet-falcon-7x" }}
                className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
              >
                Explore the aircraft twin <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* capture -> deliverable diptych */}
      <div className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="space-y-5">
            <HudLabel k="Capture" v="Deliverable" />
            <h3 className="text-2xl md:text-4xl font-light text-white">
              What we put on site, and what you get back.
            </h3>
            <p className="text-[15px] text-neutral-400 font-light leading-relaxed max-w-xl">
              Capture is the easy half. The value sits in what the scan becomes:
              a measurable twin, a registered point cloud, a BIM model, a
              walkthrough your buyers or engineers can actually use.
            </p>
            <ul className="space-y-2 text-sm text-neutral-300 font-light">
              <li className="border-l-2 border-emerald-400/50 pl-4">
                Geometry you can measure, not a render you have to trust.
              </li>
              <li className="border-l-2 border-emerald-400/50 pl-4">
                One capture session, multiple output formats.
              </li>
            </ul>
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
            >
              How we measure <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                src: "/images/media/12-24-2021-11-19-06.webp",
                k: "On site",
                t: "LiDAR capture",
                d: "Terrestrial scanning across the live building.",
              },
              {
                src: "/images/media/1003-novo-reperio-interactive-360-virtual-tours-asia-wtckl.jpg",
                k: "Delivered",
                t: "Navigable twin",
                d: "WTCKL, the venue twin event buyers walk before booking.",
              },
            ].map((f) => (
              <figure
                key={f.t}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <img
                  src={f.src}
                  alt={f.d}
                  loading="lazy"
                  className="h-56 w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <HudLabel k={f.k} />
                  <div className="mt-2 text-base font-light text-white">{f.t}</div>
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{f.d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}



type Door = {
  key: TrackKey;
  label: string;
  outcome: string;
  /** one-line spatial readout shown when the track is active */
  readout: { k: string; v: string }[];
  href: string;
  routeTo?: "/services/facilities-operations" | "/services/urban-digital-twins";
  icon: React.ComponentType<{ className?: string; size?: number }>;
  /** work slug whose photography represents this track */
  imageFrom: string;
};

const DOORS: Door[] = [
  { key: "sell", label: "SELL", outcome: "Property marketing, virtual showrooms, venue sales, CGI and launch microsites.", readout: [{ k: "Output", v: "Matterport, 360°, CGI" }, { k: "Buyer", v: "Sales and marketing" }], href: "/services#market", icon: Building2, imageFrom: "royal-lexis" },
  { key: "build",  label: "BUILD",  outcome: "Scan-to-BIM up to LOD 400, as-built capture and construction progress documentation.", readout: [{ k: "Output", v: "Point cloud, BIM, CAD" }, { k: "Buyer", v: "AEC and project teams" }], href: "/services#build",  icon: Ruler, imageFrom: "pnb-cimb-hub" },
  { key: "operate", label: "OPERATE", outcome: "Facilities digital twins, asset documentation and remote inspection.", readout: [{ k: "Output", v: "Asset twin, tagged data" }, { k: "Buyer", v: "Facilities and operations" }], href: "/services/facilities-operations", routeTo: "/services/facilities-operations", icon: Wrench, imageFrom: "kuala-lumpur-convention-centre" },
  { key: "plan",   label: "PLAN",   outcome: "City and masterplan-scale digital twins with data overlay for planning.", readout: [{ k: "Output", v: "Aerial mesh, city twin" }, { k: "Buyer", v: "Planning and government" }], href: "/services/urban-digital-twins", routeTo: "/services/urban-digital-twins", icon: MapIcon, imageFrom: "majlis-bandaraya-seremban" },
];

function FourDoorRouter() {
  const { track, setTrack } = useTrack();

  return (
    <section id="doors" className="relative z-10 px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24">
      <div className="space-y-8">
        <Reveal className="max-w-3xl space-y-3">
          <KineticEyebrow className="text-xs font-mono uppercase block">[ FOUR TRACKS ]</KineticEyebrow>
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
            Pick the track that matches the job: sell, build, operate or plan.
          </h2>
        </Reveal>

        {/* track selector */}
        <div
          role="tablist"
          aria-label="Business tracks"
          className="flex flex-wrap gap-2"
        >
          {DOORS.map((d) => {
            const on = track === d.key;
            return (
              <button
                key={d.key}
                type="button"
                role="tab"
                aria-selected={on}
                onMouseEnter={() => setTrack(d.key)}
                onFocus={() => setTrack(d.key)}
                onClick={() => setTrack(d.key)}
                className={`px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest transition ${
                  on
                    ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOORS.map((d, i) => {
            const Icon = d.icon;
            const bg = WORKS.find((w) => w.slug === d.imageFrom)?.image;
            const on = track === d.key;
            const inner = (
              <MagneticCard
                strength={10}
                className={`group relative h-full overflow-hidden bg-white/[0.02] border rounded-2xl transition duration-500 flex flex-col ${
                  on
                    ? "border-emerald-400/50 shadow-[0_0_40px_-18px_rgba(52,211,153,0.8)] md:-translate-y-1"
                    : "border-white/10 md:opacity-70 hover:opacity-100 hover:border-emerald-400/30"
                }`}
              >
                {bg && (
                  <img
                    src={bg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition duration-700 scale-105 ${
                      on ? "opacity-40 scale-110" : "opacity-20 group-hover:opacity-35"
                    }`}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                {/* corner ticks */}
                <span aria-hidden className={`pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t transition ${on ? "border-emerald-400/70" : "border-white/15"}`} />
                <span aria-hidden className={`pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b transition ${on ? "border-emerald-400/70" : "border-white/15"}`} />
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <Icon className="text-emerald-300" size={22} />
                  <div className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-300">
                    {d.label}
                  </div>
                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed flex-1">{d.outcome}</p>
                  <dl
                    className={`mt-4 grid gap-1 overflow-hidden transition-all duration-500 ${
                      on ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {d.readout.map((r) => (
                      <div key={r.k} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                        <dt className="text-neutral-500">{r.k}</dt>
                        <span aria-hidden className="h-px w-3 bg-emerald-400/40" />
                        <dd className="text-emerald-300">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white">
                    Open <ArrowRight size={12} />
                  </div>
                </div>
              </MagneticCard>
            );
            return (
              <Reveal key={d.key} delay={i * 0.06} className="h-full">
                {d.routeTo ? (
                  <Link to={d.routeTo} className="block h-full">{inner}</Link>
                ) : (
                  <a href={d.href} className="block h-full">{inner}</a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );

}

/* ---------- side rail (desktop only, scroll-spy over in-page sections) ---------- */

function SideRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("capture");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const ids = QUICK_LINKS.map((q) => q.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) {
          const top = vis.sort(
            (a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop,
          )[0];
          setActive((top.target as HTMLElement).id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeLabel =
    QUICK_LINKS.find((q) => q.href.replace("#", "") === active)?.label ?? "";

  return (
    <aside
      role="complementary"
      aria-label="On this page"
      className={`hidden lg:block fixed right-5 top-1/2 -translate-y-1/2 z-[80] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="group relative flex justify-end">
        <div
          aria-hidden
          className="flex flex-col items-end gap-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-2.5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-x-1 group-focus-within:opacity-0 group-focus-within:translate-x-1"
        >
          <ChevronLeft size={12} className="text-neutral-400" aria-hidden />
          {QUICK_LINKS.map((q) => {
            const id = q.href.replace("#", "");
            const isActive = active === id;
            return (
              <span
                key={q.href}
                className={`block h-px rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                    : "w-4 bg-neutral-400"
                }`}
              />
            );
          })}
          <span className="mt-2 text-[8px] font-mono uppercase tracking-[0.3em] text-neutral-400 [writing-mode:vertical-rl] rotate-180 select-none">
            {activeLabel}
          </span>
        </div>

        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 origin-right translate-x-3 scale-95 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:scale-100 group-focus-within:opacity-100">
          <div className="relative flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-2xl backdrop-saturate-150">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.07] to-transparent" />
            <div className="relative z-10 text-xs font-mono uppercase tracking-[0.35em] text-emerald-300 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              Quick Link
            </div>
            <div className="relative z-10 h-px bg-white/10" />
            <ul className="relative z-10 flex flex-col gap-0.5">
              {QUICK_LINKS.map((q) => {
                const id = q.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={q.href}>
                    <a
                      href={q.href}
                      className={`group/link flex items-center gap-2.5 rounded px-2 py-1.5 text-xs font-mono uppercase tracking-widest transition [text-shadow:0_1px_6px_rgba(0,0,0,0.7)] ${
                        isActive ? "text-emerald-300" : "text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span
                        className={`inline-block h-px transition-all duration-300 ${
                          isActive ? "w-6 bg-emerald-300" : "w-3 bg-neutral-600 group-hover/link:w-5 group-hover/link:bg-neutral-300"
                        }`}
                      />
                      {q.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}


/* ---------- in-hero quick links (static, non-sticky) ---------- */

const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "Capture", href: "#capture" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Sectors", href: "#industries" },
  { label: "Services", href: "#integrations" },
  { label: "Works", href: "#stories" },
  { label: "Scope", href: "#pricing" },
];


function HeroQuickLinks() {
  return (
    <nav
      aria-label="Jump to section"
      className="mt-10 flex flex-wrap gap-2 max-w-5xl"
    >
      {QUICK_LINKS.map((q) => (
        <a
          key={q.href}
          href={q.href}
          className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-emerald-300 hover:border-emerald-400/40 transition"
        >
          {q.label}
        </a>
      ))}
    </nav>
  );
}





/* ---------- hero ---------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-24 pt-16 pb-16"
    >
      {/* scan-data backdrop: our own point cloud, dimmed behind the copy */}
      <ClientOnly fallback={null}>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <PointCloudHero className="absolute inset-0 opacity-[0.35]" offsetX={-0.9} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020203] via-[#020203]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020203] to-transparent" />
        </div>
      </ClientOnly>

      <div className="relative z-10 max-w-5xl origin-left">
        <PipelineRail className="mb-8 max-w-3xl" />

        <KineticEyebrow className="text-xs font-mono block mb-6 uppercase tracking-widest">
          NOVO REPERIO · DIGITAL TWIN & REALITY CAPTURE
        </KineticEyebrow>

        <KineticHeadline className="text-[clamp(30px,5vw,56px)] font-light leading-[1.05] text-white">
          Capture reality. Build digital intelligence.
        </KineticHeadline>

        <div className="mt-8 max-w-3xl">
          <KineticBody className="text-base md:text-lg leading-relaxed text-neutral-300 font-light">
            Digital twins, LiDAR, Matterport, 360° and aerial reality capture for property, construction, facilities, hospitality and enterprise environments.
          </KineticBody>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300 font-light">
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>12+ years capturing physical space as spatial data, since 2014.</li>
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>Matterport, LiDAR, 360°, drone, photogrammetry and Scan-to-BIM under one roof.</li>
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>Proven on sites up to 350,000 sqft, from the KL Convention Centre to five-star hospitality.</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300 transition"
          >
            Explore the work <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-white hover:border-emerald-400/50 hover:text-emerald-300 transition"
          >
            Talk to a specialist <ArrowRight size={14} />
          </Link>
        </div>

        <HeroQuickLinks />

        {/* Compact estimator entry card */}
        <a
          href="/estimate"
          className="mt-10 inline-flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full max-w-3xl border border-emerald-400/30 rounded-2xl bg-emerald-400/[0.03] hover:border-emerald-400/60 transition px-6 py-5"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
              Project assessment
            </div>
            <div className="mt-2 text-base md:text-lg font-light text-white">
              What does your project need?
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300">
            Get an instant estimate <ArrowRight size={14} />
          </span>
        </a>
      </div>

      {/* proof line */}
      <div className="relative z-10 mt-12 max-w-5xl border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-300">
        <span className="font-mono text-xs uppercase tracking-wider text-emerald-300">Proof</span>
        <span className="font-light">
          WTCKL digital twin: <span className="text-white font-medium">8,000+ visits · 37/week</span>, bookings confirmed faster.
        </span>
        <ArrowRight className="w-4 h-4 text-neutral-500" />
      </div>

      {/* client logo row */}
      <div className="relative z-10 mt-8 max-w-5xl">

        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
          Trusted by
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          {CLIENT_LOGOS.slice(0, 8).map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={`${l.alt} logo`}
              loading="lazy"
              className="h-6 md:h-7 w-auto object-contain invert opacity-40 hover:opacity-90 transition"
            />
          ))}
        </div>
      </div>
    </section>

  );
}

/* ---------- featured work strip ---------- */

const FEATURED_SLUGS = [
  "world-trade-centre-kuala-lumpur",
  "kuala-lumpur-convention-centre",
  "porsche-center-ara-damansara",
  "hyatt-kuantan-ballroom",
  "lexis-hibiscus-port-dickson",
  "royal-lexis",
];

function FeaturedWorkStrip() {
  const items = FEATURED_SLUGS.map((s) => WORKS.find((w) => w.slug === s)).filter(
    (w): w is NonNullable<typeof w> => !!w,
  );

  return (
    <section
      aria-label="Selected projects"
      className="relative z-10 px-6 md:px-24 py-20 md:py-24 border-t border-white/5"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <KineticEyebrow className="text-xs font-mono uppercase block">
              [ SELECTED WORK ]
            </KineticEyebrow>
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
              Real spaces we have already captured.
            </h2>
          </div>
          <Link
            to="/works"
            className="text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200"
          >
            All projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.05}>
              <Link
                to="/works/$slug"
                params={{ slug: w.slug }}
                className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 transition"
              >
                <div className="relative">
                  <SmartImage
                    src={w.image}
                    alt={w.title}
                    ratio="aspect-[4/3]"
                    className="!rounded-none !border-0"
                    imgClassName="transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 bottom-4 right-4">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-300">
                      {w.format}
                    </div>
                    <div className="mt-1 text-base md:text-lg font-light text-white leading-snug">
                      {w.title}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-neutral-300 leading-relaxed">{w.helps}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white group-hover:text-emerald-300 transition">
                    View project <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ---------- By the numbers strip ---------- */
function ByTheNumbers() {
  const stats: { value: number; prefix?: string; suffix?: string; label: string }[] = [
    { value: 12, suffix: "+", label: "Years in spatial capture, since 2014." },
    { value: 400, suffix: "+", label: "Projects delivered across Malaysia and the region." },
    { value: 8000, suffix: "+", label: "WTCKL digital twin visits, averaging 37 a week." },
    { value: 60, suffix: "%", label: "Skylon Residences units sold, supported by 360° tours." },
  ];
  return (
    <section className="px-6 md:px-24 py-20 md:py-24 border-t border-neutral-900">
      <HudLabel k="By the numbers" v="Verified" className="mb-8" />
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((s) => (
          <div key={s.label} className="border-l-2 border-emerald-400/50 pl-4">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block text-3xl md:text-5xl font-light text-white tabular-nums tracking-tight">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="mt-3 block text-sm text-neutral-400 font-light leading-relaxed">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Defined terms ---------- */
function DefinedTerms() {
  const terms = [
    { term: "Digital Twin", icon: Box, def: "A photorealistic, walkable 3D replica of a physical space, measurable, shareable and always up to date." },
    { term: "Scan-to-BIM", icon: Ruler, def: "The process of converting a LiDAR point cloud into an accurate BIM model that design and FM teams can trust." },
    { term: "LiDAR", icon: ScanLine, def: "Light Detection and Ranging: laser scanning that captures a building's true geometry at centimetre-grade accuracy." },
  ];
  return (
    <section className="px-6 md:px-24 pb-14">
      <div className="grid md:grid-cols-3 gap-4">
        {terms.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.term} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                  <Icon size={18} />
                </span>
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                  Definition
                </div>
              </div>
              <div className="mt-3 text-white text-lg font-light">{t.term}</div>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                <span className="text-emerald-300">{t.term}:</span> {t.def.replace(/^[^:]*:\s*/,"")}
              </p>
            </div>
          );
        })}
      </div>
    </section>

  );
}

/* ---------- Industries we serve row ---------- */
function IndustriesRow() {
  const items = [
    { slug: "property-development", label: "Property" },
    { slug: "construction", label: "Construction" },
    { slug: "hospitality", label: "Hospitality" },
    { slug: "events-venues", label: "Events & Venues" },
    { slug: "facilities-management", label: "Facilities" },
    { slug: "manufacturing", label: "Manufacturing" },
    { slug: "healthcare", label: "Healthcare" },
    { slug: "government", label: "Government" },
  ];
  return (
    <section className="px-6 md:px-24 py-10 border-t border-neutral-900">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
          Industries we serve
        </span>
        {items.map((it) => (
          <Link
            key={it.slug}
            to="/industries/$slug"
            params={{ slug: it.slug }}
            className="text-sm text-neutral-300 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded"
          >
            {it.label}
          </Link>
        ))}
        <Link to="/industries" className="text-xs font-mono uppercase tracking-wider text-emerald-300 ml-auto">
          All industries →
        </Link>
      </div>
    </section>
  );
}

/* ---------- sections ---------- */



function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <Reveal className="max-w-4xl space-y-4">
      <KineticEyebrow className="text-[11px] font-mono uppercase block">
        [ {kicker} ]
      </KineticEyebrow>
      <h2 className="text-2xl md:text-4xl font-light text-white">
        {title}
      </h2>
      {body && (
        <KineticBody className="text-[15px] md:text-base text-neutral-400 font-light max-w-3xl leading-relaxed">
          {body}
        </KineticBody>
      )}
    </Reveal>
  );
}

function CaptureSection() {
  return (
    <section
      id="capture"
      className="relative z-20 px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <SectionHeader
            kicker="DIGITAL TWIN"
            title="Let people walk your venue before they arrive."
            body="Photorealistic capture provides the scale, flow, and vibe of your space in a format that works on any device."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAPTURE_FEATURES.map((f, idx) => (
              <Reveal key={f.title} delay={idx * 0.08}>
                <MagneticCard
                  strength={8}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-md flex gap-4 items-start hover:border-cyan-400/40 transition h-full"
                >
                  <div className="bg-black/60 border border-white/10 px-2.5 py-1.5 rounded text-cyan-300 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-white">
                      {f.title}
                    </h3>
                    <p className="text-[15px] md:text-base text-neutral-400 mt-2 leading-relaxed font-light">
                      {f.body}
                    </p>
                  </div>
                </MagneticCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="h-full">
          <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[520px] backdrop-blur-md lg:sticky lg:top-24">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  LIVE PREVIEW
                </span>
                <Database className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Preview from a Novo Reperio hospitality project, Hyatt Kuantan
                Ballroom, lower to upper level walkthrough.
              </p>
            </div>
            <div className="my-6 relative bg-black rounded-xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />
              <Link
                to="/works/$slug"
                params={{ slug: "hyatt-kuantan-ballroom" }}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 transition">
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                </div>
                <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                  [ LAUNCH SAMPLE ]
                </span>
              </Link>
            </div>
            <div className="space-y-3 font-mono text-[11px] text-neutral-400 border-t border-white/10 pt-4">
              <div className="flex justify-between"><span>CAPTURE:</span><span className="text-cyan-300">MATTERPORT PRO3</span></div>
              <div className="flex justify-between"><span>ACCURACY:</span><span className="text-neutral-200">cm-GRADE LiDAR</span></div>
              <div className="flex justify-between"><span>DELIVERY:</span><span className="text-neutral-200">HOSTED + EMBED</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section
      id="outcomes"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="space-y-10">
        <SectionHeader
          kicker="THE COMPETITIVE EDGE"
          title="Your space isn't just a location. It's your best sales tool."
          body="Transform your space into an interactive environment that lets your audience understand layout, atmosphere, and scale in seconds."
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o} delay={i * 0.06}>
              <MagneticCard
                strength={6}
                className="flex gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-lg h-full"
              >
                <span className="text-cyan-300">+</span>
                <span className="text-neutral-300">{o}</span>
              </MagneticCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section
      id="industries"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="space-y-10">
        <SectionHeader
          kicker="SECTORS"
          title="Strategy-first capture. Built for business goals."
          body="From boutique retail to 1,000,000+ sq ft complexes, we scale our process to match your project."
        />
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {SECTORS.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <MagneticCard
                strength={6}
                className="px-4 py-2 bg-white/[0.02] border border-white/10 rounded hover:border-cyan-400/50 transition"
              >
                {s}
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="integrations"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="space-y-10">
        <SectionHeader
          kicker="SERVICES"
          title="One capture, many ways to use it."
          body="Matterport shows flow, size, and layout; then we add web formats and launch pages."
        />

        <Reveal>
          <div className="p-6 md:p-8 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
            <h3 className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-6">
              [ Capture → Process → Create → Act ]
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs text-neutral-400">
              {WORKFLOW.map((node, idx, arr) => (
                <React.Fragment key={node}>
                  <div className="bg-black/60 px-4 py-3 border border-white/10 rounded flex items-center gap-2">
                    <span className="text-cyan-400 text-xs font-bold">▶</span>
                    <span>{node}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-neutral-700 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <MagneticCard
                strength={8}
                className="p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-cyan-400/40 transition h-full"
              >
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                  {s.kicker}
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white mt-2">
                  {s.title}
                </h3>
                <p className="text-[15px] md:text-base text-neutral-400 mt-2 leading-relaxed font-light">
                  {s.body}
                </p>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section
      id="stories"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="space-y-10">
        <SectionHeader
          kicker="CLIENT WORK"
          title="See how spaces are easier to trust before a visit."
          body="Selected work across hospitality, venues, and facilities shows how Novo helps spaces feel clearer and easier to act on."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STORIES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link
                to={s.href as any}
                className="block h-full"
              >
                <MagneticCard
                  strength={10}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-cyan-400/40 transition flex flex-col justify-between min-h-[240px] h-full"
                >
                  <div>
                    <div className="font-mono text-sm text-emerald-300 tracking-tight">
                      {s.metric}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mt-2">
                      {s.tag}
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-white mt-2">
                      {s.title}
                    </h3>
                    <p className="text-[15px] md:text-base text-neutral-400 mt-3 leading-relaxed font-light">
                      {s.body}
                    </p>
                  </div>
                  <div className="mt-6 font-mono text-[11px] text-cyan-300 flex items-center gap-2">
                    {s.cta} <ArrowRight className="w-3 h-3" />
                  </div>
                </MagneticCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="pt-6">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 hover:text-cyan-200 uppercase tracking-widest"
          >
            View all projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <Reveal className="pt-8">
          <div className="max-w-4xl mx-auto">
            <YouTubeEmbed
              videoId="OV1JOrpUx5w"
              title="The Power of Digital Twins"
              description="How digital twins turn a physical space into an always-available, measurable sales asset."
              caption="The Power of Digital Twins"
            />
          </div>
        </Reveal>
      </div>
    </section>

  );
}

function LogosSection() {
  return (
    <section className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5">
      <div className="space-y-8">
        <Reveal className="text-center space-y-2">
          <KineticEyebrow className="text-[11px] font-mono uppercase tracking-widest block">
            [ CLIENTS & PARTNERS ]
          </KineticEyebrow>
          <h2 className="text-lg md:text-xl font-light text-white">
            Trusted by clients, partners, and industry bodies.
          </h2>
        </Reveal>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-10 md:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
              <img
                key={l.alt + i}
                src={l.src}
                alt={`${l.alt} logo`}
                loading="lazy"
                className="h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition invert shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5">
      <div className="space-y-10">
        <SectionHeader kicker="GOOGLE REVIEWS" title="Trusted by clients" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <MagneticCard
                strength={8}
                className="p-6 bg-white/[0.02] border border-white/10 rounded-xl h-full"
              >
                <div className="text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-light">
                  {r.body}
                </p>
                <div className="mt-4 text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                  · {r.name}
                </div>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeSection() {
  return (
    <section
      id="pricing"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="space-y-10">
        <SectionHeader
          kicker="SCOPE"
          title="One proven process. Infinite possibilities."
          body="We tailor our stack (Matterport, LiDAR, 360, drone, or 3D CGI) so your digital twin delivers exactly what your audience needs to see."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCOPE_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <MagneticCard
                strength={10}
                className="p-6 bg-white/[0.02] border border-white/10 rounded-xl h-full"
              >
                <div className="text-cyan-300 font-mono text-xs font-bold tracking-widest">
                  {s.n}
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white mt-2">
                  {s.title}
                </h3>
                <p className="text-[15px] md:text-base text-neutral-400 mt-3 leading-relaxed font-light">
                  {s.body}
                </p>
                <ul className="mt-4 space-y-2 font-mono text-[11px] text-neutral-400">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="demo"
      className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5 scroll-mt-24"
    >
      <Reveal className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-4xl font-light text-white">
          Stop letting geography limit your sales.
        </h2>
        <p className="text-[15px] md:text-base text-neutral-400 font-light leading-relaxed">
          Launch high-performance digital experiences that remove site-visit
          friction, build instant buyer trust, and accelerate your sales cycle.
        </p>
        <div className="flex flex-wrap justify-center gap-4 font-mono text-xs pt-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition inline-flex items-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WHATSAPP US
          </a>
          <Link
            to="/works"
            className="px-6 py-3 border border-white/10 rounded-full text-neutral-300 hover:bg-white/5 transition"
          >
            SEE INDUSTRY WORK
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 md:px-24 py-20 md:py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Frequently asked</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-light text-white">
          Questions we get before every scan
        </h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {HOMEPAGE_FAQ_DISPLAY.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left transition hover:text-emerald-300"
                >
                  <span
                    className={`text-sm md:text-base font-light ${open ? "text-emerald-300" : "text-neutral-200"}`}
                  >
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`mt-0.5 shrink-0 text-neutral-500 transition-transform duration-300 ${open ? "rotate-180 text-emerald-300" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-sm leading-relaxed font-light text-neutral-400">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm text-neutral-500 font-light">
            Still have a question?
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200 transition"
            >
              Talk to a specialist <ArrowRight size={14} />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300 hover:text-emerald-200 transition"
            >
              See all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


