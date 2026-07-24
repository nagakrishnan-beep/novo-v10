import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  HelpCircle,
  ArrowRight,
  Play,
  ChevronRight,
  MessageCircle,
  Building2,
  Ruler,
  GraduationCap,
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
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const TITLE = "360° Virtual Tour & Digital Twin Experts Malaysia | Novo Reperio";
const DESCRIPTION =
  "Matterport digital twins, 360° virtual tours & drone capture in Kuala Lumpur. Trusted by Hyatt, KLCC, Porsche & 400+ clients since 2014.";
const CANONICAL = "https://novo-v10.lovable.app/";

const HOMEPAGE_FAQ = [
  { q: "What is a digital twin?", a: "A digital twin is a photorealistic, dimensionally accurate 3D copy of a real space that people can explore online. It captures every wall, corner and finish so remote viewers can walk through, measure and understand the venue as if they were there." },
  { q: "What's the difference between Matterport and a 360° tour?", a: "Matterport is a measurable 3D digital twin with dollhouse view, floorplan and room-to-room navigation. A 360° tour is a series of linked panoramas — lighter and cheaper, ideal for OTAs and social. Most venues benefit from both." },
  { q: "How much does a project cost?", a: "Pricing is scoped per property; packages range from single-space capture to full-property annual subscriptions. Request a quote and we'll size it against your space and use case." },
  { q: "How long does delivery take?", a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project — typically two to eight weeks depending on scale." },
  { q: "Where do you operate?", a: "We are based in Kuala Lumpur and cover all of Malaysia, Singapore, and worldwide on request. Regional deployments to Indonesia and the Middle East are handled by our travelling capture teams." },
  { q: "How do I embed a tour on my website or listing?", a: "Every tour ships with an embed snippet and a shareable link. It drops into your website, OTA listing (Booking.com, Agoda), Google Business Profile and email — no plugins or hosting on your side." },
  { q: "Who owns the files?", a: "You own the delivered media — final renders, videos, images and embed rights are yours to use for marketing in perpetuity. Raw project files remain with the studio unless a buy-out is agreed upfront." },
  { q: "How long do you host the tour for?", a: "Matterport tours are hosted on our active subscription for the term you buy — typically one to three years, renewable. We notify you before expiry so nothing goes dark unexpectedly." },
  { q: "Do I need to prepare the site before capture?", a: "Yes — the space should look the way you want buyers to see it. Lights on, clutter cleared, staging in place. We send a short prep checklist before every shoot and can advise on styling." },
  { q: "Are your drone operations licensed?", a: "Yes. All aerial capture in Malaysia is flown by CAAM-certified pilots with the appropriate permits, and we secure landowner and airspace approvals before every shoot." },
  { q: "Can you deliver point clouds and Scan-to-BIM?", a: "Yes. Our LiDAR captures produce registered point clouds that we convert to as-built BIM models (LOD 200–350), 2D CAD drawings and measurable twins for AEC and facilities teams." },
  { q: "How do I book?", a: "WhatsApp us for the fastest reply, email hello@novoreperio.com, or use the contact form. We'll respond within one business day with next steps and a scoping call." },
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
  { title: "LiDAR-Powered Accuracy", body: "Capture every measurement, corner, and detail with professional-grade depth sensors." },
  { title: "Pro-Level Fidelity", body: "4K-resolution walkthroughs that hold clarity even when zooming in on fine textures." },
  { title: "Frictionless Integration", body: "Your digital twin is fully hosted and ready for website embedding or BIM software." },
];

const OUTCOMES = [
  "Anytime, Anywhere — 24/7 access to your site from anywhere in the world.",
  "Optimized For Web — lightweight, web-ready experiences built for engagement.",
  "Spatial Digital Twins — accurate remote walkthroughs for flow and layout analysis.",
  "Brand-First 360° Tours — polished, interactive showcases reflecting your brand.",
  "Omnichannel Delivery — packaged for web, mobile, and high-stakes presentations.",
];

const SECTORS = ["Hospitality", "Venues", "Property", "Facilities & More"];

const SERVICES = [
  { kicker: "Core delivery layer", title: "Matterport + 360", body: "Main hosted tour. Shows flow, size, and layout as your primary asset." },
  { kicker: "Lightweight share format", title: "360 Tours", body: "Lighter tour formats for web, QR, and quick review flows." },
  { kicker: "Context and arrival", title: "Drone & Aerial", body: "Show scale, access, and the surroundings around the venue." },
  { kicker: "Launch wrapper", title: "Project Websites", body: "Package the final experience for sharing and sales-ready launch pages." },
];

const WORKFLOW = ["Capture", "Package", "Publish"];

const STORIES = [
  { tag: "Featured case study", title: "Hyatt Kuantan — Kempas & Prefunction Hall", body: "Ballroom presentation that helps buyers see layout and setup before the first visit.", cta: "View Hyatt project", href: "/works/hyatt-kuantan-ballroom", internal: true },
  { tag: "Venue sales support", title: "WTCKL — Venue sales proof", body: "Venue storytelling that helps scale, flow, and room layout make sense earlier.", cta: "See venue work", href: "/works/world-trade-centre-kuala-lumpur", internal: true },
  { tag: "Facilities review", title: "Maxis — Facilities review use case", body: "Office and facilities work made clearer for teams that need quick context.", cta: "Explore facilities work", href: "/works/pnb-cimb-hub", internal: true },
];

const SCOPE_STEPS = [
  { n: "01", title: "Define the Objective", body: "We start with the ‘Why.’ We analyze your space, your target audience, and the specific decision you want them to make after viewing the tour.", bullets: ["Single vs. multi-site strategy", "Conversion-focused UX", "Operational vs. marketing use cases"] },
  { n: "02", title: "Engineer the Experience", body: "We select the perfect combination of capture technology and interactive layers to match your brand's standards and technical requirements.", bullets: ["Precision LiDAR vs. 360° walkthroughs", "Custom branding & infotags", "Interactive floorplans & media"] },
  { n: "03", title: "Seamless Launch", body: "We don't just send a link. We provide a launch-ready package, integrated into your website, ads, or pitch decks.", bullets: ["Quick turnaround", "Campaign-ready assets", "Dedicated integration support"] },
];


const REVIEWS = [
  { name: "Joyce Chong", body: "Novo Reperio is good and they use the latest equipment for their work. Experienced team, fast output, high quality." },
  { name: "Kammy Parkland", body: "Been approaching Novo Reperio since 2020 for my projects' virtual show units. Great service, helpful staff, high quality works." },
  { name: "Low Lap Sheng", body: "Skylon Residences, Kuala Lumpur by GBD Land. 60% of units now sold. Their 360° virtual tours greatly supported our foreign-buyer sales." },
  { name: "Nur Aiman", body: "Excellent Matterport setup for our project. Professional, supportive, on time — the whole process was stress-free and rewarding." },
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
    <div className="relative min-h-screen text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-emerald-400 selection:text-black">
      <SiteHeader active="home" />
      <SideRail />
      <main>
        <Hero />
        <ByTheNumbers />
        <DefinedTerms />
        <FourDoorRouter />
        <IndustriesRow />
        <CaptureSection />
        <OutcomesSection />
        <IndustriesSection />
        <ServicesSection />
        <StoriesSection />
        <LogosSection />
        <ReviewsSection />
        <ScopeSection />
        <CtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}


/* ---------- four-door router (MARKET / BUILD / TRAIN / PLAN) ---------- */

type Door = {
  key: string;
  label: string;
  outcome: string;
  href: string;
  routeTo?: "/services/immersive-training" | "/services/urban-digital-twins";
  icon: React.ComponentType<{ className?: string; size?: number }>;
};

const DOORS: Door[] = [
  { key: "market", label: "MARKET IT", outcome: "Property marketing, hospitality, staging, CGI, video, launch microsites.", href: "/services#market", icon: Building2 },
  { key: "build",  label: "BUILD IT",  outcome: "Scan-to-BIM, construction progress capture, facilities operations twins.", href: "/services#build",  icon: Ruler },
  { key: "train",  label: "TRAIN IN IT", outcome: "360° interactive, gamified and simulation training environments.", href: "/services/immersive-training", routeTo: "/services/immersive-training", icon: GraduationCap },
  { key: "plan",   label: "PLAN IT",   outcome: "City & masterplan-scale digital twins with data overlay for planning.", href: "/services/urban-digital-twins", routeTo: "/services/urban-digital-twins", icon: MapIcon },
];

function FourDoorRouter() {
  return (
    <section id="doors" className="relative z-10 px-6 md:px-24 py-20 border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <Reveal className="max-w-3xl space-y-3">
          <KineticEyebrow className="text-xs font-mono uppercase block">[ FOUR TRACKS ]</KineticEyebrow>
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
            Pick the door that matches the job.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOORS.map((d, i) => {
            const Icon = d.icon;
            const inner = (
              <MagneticCard
                strength={10}
                className="h-full p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-emerald-400/40 transition flex flex-col"
              >
                <Icon className="text-emerald-300" size={22} />
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-emerald-300">
                  {d.label}
                </div>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed flex-1">{d.outcome}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white">
                  Open <ArrowRight size={12} />
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
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length) {
          const top = visibleEntries.sort(
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

  return (
    <aside
      role="complementary"
      aria-label="On this page"
      className={`hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 pointer-events-none transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur px-3 py-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-emerald-300 px-1">
          QUICK LINK
        </div>
        <div className="h-px bg-white/10" />
        <ul className="flex flex-col gap-1">
          {QUICK_LINKS.map((q) => {
            const id = q.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={q.href}>
                <a
                  href={q.href}
                  className={`group flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono uppercase tracking-widest transition ${
                    isActive
                      ? "text-emerald-300"
                      : "text-neutral-500 hover:text-neutral-200"
                  }`}
                >
                  <span
                    className={`inline-block h-px transition-all ${
                      isActive ? "w-6 bg-emerald-300" : "w-3 bg-neutral-700 group-hover:bg-neutral-400"
                    }`}
                  />
                  {q.label}
                </a>
              </li>
            );
          })}
        </ul>
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
  { label: "Client Work", href: "#stories" },
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
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16 pb-16"
    >
      <div className="max-w-5xl origin-left">
        <KineticEyebrow className="text-xs font-mono block mb-6 uppercase tracking-widest">
          NOVO REPERIO — SPACE CAPTURE STUDIO
        </KineticEyebrow>

        <KineticHeadline className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-white">
          Turn Your Space Into a 24/7 Sales Engine
        </KineticHeadline>

        <div className="mt-8 max-w-3xl">
          <KineticBody className="text-base md:text-lg leading-relaxed text-neutral-300 font-light">
            Photorealistic Matterport, LiDAR, 360° and drone walkthroughs — delivered inside a page that responds to you. Explore, measure, and book from anywhere in the world.
          </KineticBody>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300 font-light">
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>10+ Years of Immersive Excellence</li>
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>Reduce Sales Cycles with 24/7 virtual access</li>
          <li className="flex items-center gap-2"><span className="text-emerald-300">+</span>Trusted by Global Brands — KLCC to five-star hospitality groups</li>
        </ul>

        <HeroQuickLinks />

        {/* Compact estimator entry card */}
        <a
          href="/estimate"
          className="mt-10 inline-flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full max-w-3xl border border-emerald-400/30 rounded-2xl bg-emerald-400/[0.03] hover:border-emerald-400/60 transition px-6 py-5"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300">
              60-second estimate
            </div>
            <div className="mt-2 text-base md:text-lg font-light text-white">
              What would your space cost to capture?
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-300">
            Get an instant estimate <ArrowRight size={14} />
          </span>
        </a>
      </div>

      {/* proof line */}
      <div className="mt-12 max-w-5xl border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-300">
        <span className="font-mono text-xs uppercase tracking-wider text-emerald-300">Proof</span>
        <span className="font-light">
          WTCKL digital twin: <span className="text-white font-medium">8,000+ visits · 37/week</span> — bookings confirmed faster.
        </span>
        <ArrowRight className="w-4 h-4 text-neutral-500" />
      </div>
    </section>
  );
}

/* ---------- By the numbers strip ---------- */
function ByTheNumbers() {
  const stats = [
    "12+ years in spatial capture (since 2014).",
    "400+ projects delivered.",
    "WTCKL digital twin: 8,000+ visits, averaging 37 per week.",
    "Skylon Residences: 60% of units sold, supported by 360° virtual tours.",
  ];
  return (
    <section className="px-6 md:px-24 py-14 border-t border-neutral-900">
      <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-6">
        By the numbers
      </div>
      <ul className="space-y-3 max-w-3xl">
        {stats.map((s) => (
          <li key={s} className="text-base md:text-lg text-white font-light border-l-2 border-emerald-400/50 pl-4">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Defined terms ---------- */
function DefinedTerms() {
  const terms = [
    { term: "Digital Twin", def: "A photorealistic, walkable 3D replica of a physical space — measurable, shareable and always up to date." },
    { term: "Scan-to-BIM", def: "The process of converting a LiDAR point cloud into an accurate BIM model that design and FM teams can trust." },
    { term: "LiDAR", def: "Light Detection and Ranging — laser scanning that captures a building's true geometry at centimetre-grade accuracy." },
  ];
  return (
    <section className="px-6 md:px-24 pb-14">
      <div className="grid md:grid-cols-3 gap-4">
        {terms.map((t) => (
          <div key={t.term} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">
              Definition
            </div>
            <div className="mt-2 text-white text-lg font-light">{t.term}</div>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              <span className="text-emerald-300">{t.term}:</span> {t.def.replace(/^[^:]*:\s*/,"")}
            </p>
          </div>
        ))}
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
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
        {title}
      </h2>
      {body && (
        <KineticBody className="text-neutral-400 font-light max-w-3xl leading-relaxed text-base">
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
      className="relative z-20 px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                  <div className="bg-black/60 border border-white/10 px-2.5 py-1.5 rounded text-cyan-300 font-mono text-[10px] font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase text-white tracking-wide">
                      {f.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
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
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  LIVE PREVIEW
                </span>
                <Database className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Preview from a Novo Reperio hospitality project — Hyatt Kuantan
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
                <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto space-y-10">
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto space-y-10">
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionHeader
          kicker="SERVICES"
          title="One capture, many ways to use it."
          body="Matterport shows flow, size, and layout — then we add web formats and launch pages."
        />

        <Reveal>
          <div className="p-6 md:p-8 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mb-6">
              [ CAPTURE → PACKAGE → PUBLISH ]
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs text-neutral-400">
              {WORKFLOW.map((node, idx, arr) => (
                <React.Fragment key={node}>
                  <div className="bg-black/60 px-4 py-3 border border-white/10 rounded flex items-center gap-2">
                    <span className="text-cyan-400 text-[10px] font-bold">▶</span>
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
                <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                  {s.kicker}
                </div>
                <h3 className="text-sm font-bold uppercase text-white tracking-wide mt-2">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-10">
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
                    <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">
                      {s.tag}
                    </div>
                    <h3 className="text-base font-bold uppercase text-white tracking-wide mt-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light">
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
      </div>
    </section>
  );
}

function LogosSection() {
  return (
    <section className="px-6 md:px-24 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-8">
        <Reveal className="text-center space-y-2">
          <KineticEyebrow className="text-[11px] font-mono uppercase tracking-widest block">
            [ CLIENTS & PARTNERS ]
          </KineticEyebrow>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
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
    <section className="px-6 md:px-24 py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-10">
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
                  — {r.name}
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionHeader
          kicker="SCOPE"
          title="One proven process. Infinite possibilities."
          body="We tailor our stack — Matterport, LiDAR, 360, drone, or 3D CGI — so your digital twin delivers exactly what your audience needs to see."
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
                <h3 className="text-lg font-bold uppercase text-white tracking-tight mt-2">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light">
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
      className="px-6 md:px-24 py-32 border-t border-white/5 scroll-mt-24"
    >
      <Reveal className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Stop letting geography limit your sales.
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed">
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
  return (
    <section className="px-6 md:px-24 py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Frequently Asked</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
          FAQ
        </h2>
        <div className="border-t border-white/10 pt-4 space-y-6">
          {HOMEPAGE_FAQ.map((f) => (
            <Reveal key={f.q} className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-neutral-200">
                {f.q}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                {f.a}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


