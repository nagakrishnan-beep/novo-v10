import { createFileRoute, ClientOnly, Link } from "@tanstack/react-router";
import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  HelpCircle,
  ArrowRight,
  Play,
  ChevronRight,
  MessageCircle,
  Menu,
  Sparkles,
} from "lucide-react";
import {
  IntensityProvider,
  AuroraBackdrop,
  KineticHeadline,
  KineticBody,
  KineticEyebrow,
  MagneticCard,
  Reveal,
  useIntensity,
} from "@/components/chrono";
import { LaserTrail } from "@/components/laser-trail";
import { useTransform } from "framer-motion";
import { CLIENT_LOGOS } from "@/lib/logos";

const TITLE = "Novo Reperio — The Chrono-Adaptive Canvas";
const DESCRIPTION =
  "Space capture studio building the Chrono-Adaptive Canvas: velocity-morphing typography, liquid navigation, and time-of-day generative motion for venues and brands.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/60172029996";

type RailRoute = "/about" | "/works" | "/services" | "/contact";
type RailItem = { label: string; to: RailRoute };

const RAIL: RailItem[] = [
  { label: "ABOUT", to: "/about" },
  { label: "WORK", to: "/works" },
  { label: "SERVICES", to: "/services" },
  { label: "CONTACT", to: "/contact" },
];

type NavRoute = "/works" | "/about" | "/insights" | "/services" | "/contact";
type NavItem = { label: string; href: string; to?: NavRoute };

const NAV: NavItem[] = [
  { label: "Capture", href: "#capture" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Sectors", href: "#industries" },
  { label: "Services", href: "/services", to: "/services" },
  { label: "Client Work", href: "/works", to: "/works" },
  { label: "Insights", href: "/insights", to: "/insights" },
  { label: "About", href: "/about", to: "/about" },
  { label: "Contact", href: "/contact", to: "/contact" },
];


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
  { tag: "Facilities review", title: "Maxis — Facilities review use case", body: "Office and facilities work made clearer for teams that need quick context.", cta: "Explore facilities work", href: "/works", internal: true },
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
        <LiquidCursor />
      </ClientOnly>
      <PageContent />
    </IntensityProvider>
  );
}

function PageContent() {
  return (
    <div className="relative min-h-screen text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      <TopBar />
      <Hero />
      <SideRail />
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
      <Footer />
    </div>
  );
}

/* ---------- top bar (hides on hero, visible below) ---------- */

function TopBar() {
  const { scrollY } = useIntensity();
  const opacity = useTransform(scrollY, [0, 400, 600], [0, 0, 1]);
  const y = useTransform(scrollY, [0, 400, 600], [-30, -30, 0]);
  const pointerEvents = useTransform(scrollY, (v) =>
    v > 500 ? "auto" : "none",
  ) as unknown as string;

  return (
    <motion.nav
      style={{ opacity, y, pointerEvents: pointerEvents as any }}
      className="fixed top-0 left-0 w-full px-6 md:px-10 py-4 flex justify-between items-center z-50 bg-black/60 backdrop-blur-xl border-b border-white/5"
    >
      <a href="#top" className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-black tracking-[0.3em] text-white">
          NOVOREPERIO
        </span>
      </a>
      <div className="hidden lg:flex gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-full">
        {NAV.map((item) =>
          item.to ? (
            <Link
              key={item.href}
              to={item.to}
              className="px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-cyan-300 hover:bg-white/5 transition"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-cyan-300 hover:bg-white/5 transition"
            >
              {item.label}
            </a>
          ),
        )}
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 rounded-full font-mono text-[10px] font-bold hover:bg-cyan-300 transition"
      >
        <MessageCircle className="w-3 h-3" />
        WHATSAPP US
      </a>
    </motion.nav>
  );
}

/* ---------- side rail (hero-only vertical nav) ---------- */

function SideRail() {
  const { scrollY } = useIntensity();
  const opacity = useTransform(scrollY, [0, 500, 700], [1, 1, 0]);

  const cls =
    "text-[10px] font-mono tracking-[0.35em] transition text-neutral-500 hover:text-cyan-300";

  return (
    <motion.aside
      style={{ opacity }}
      className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-end pointer-events-auto"
    >
      <div className="relative flex flex-col gap-4 items-end">
        {RAIL.map((r) => {
          if (r.kind === "route") {
            return (
              <Link
                key={r.label}
                to={r.href as "/works" | "/about" | "/insights"}
                className={cls}
              >
                {r.label}
              </Link>
            );
          }
          if (r.kind === "external") {
            return (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {r.label}
              </a>
            );
          }
          return (
            <a key={r.label} href={r.href} className={cls}>
              {r.label}
            </a>
          );
        })}
      </div>
      <motion.div
        className="w-px h-16 bg-gradient-to-b from-cyan-400/80 to-transparent mt-2"
        animate={{ scaleY: [1, 0.6, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.aside>
  );
}



/* ---------- hero ---------- */

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-16"
    >
      {/* corner brand */}
      <div className="absolute top-6 left-6 md:top-10 md:left-16 z-20 flex items-center gap-3">
        <img
          src="/novo-logo.png"
          alt="Novo Reperio"
          className="h-9 md:h-11 w-auto brightness-0 invert"
        />
        <span className="hidden md:inline-block text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase border-l border-white/15 pl-3">
          Space Capture Studio
        </span>
      </div>
      <div className="absolute top-6 right-6 md:top-10 md:right-16 z-20">
        <button
          aria-label="Menu"
          className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-300 hover:border-cyan-400/40 transition"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-5xl origin-left">
        <KineticEyebrow className="text-[11px] font-mono block mb-6 uppercase">
          CHRONO-ADAPTIVE CANVAS
        </KineticEyebrow>

        <KineticHeadline className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-white">
          The evolution of sensation.
          <br />
          Experiencing the
          <br />
          <span className="text-white/90">Chrono-Adaptive Canvas.</span>
        </KineticHeadline>

        <div className="mt-10 max-w-xl">
          <KineticHeadline className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-tight text-neutral-100">
            Genuine innovation
            <br />
            in web design.
          </KineticHeadline>
        </div>

        <div className="mt-10 max-w-2xl">
          <KineticBody className="text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            Turn your venue into a 24/7 sales engine. Photorealistic Matterport,
            LiDAR, 360° and drone walkthroughs — delivered inside a page that
            morphs with your scroll, your cursor, and the hour of the day.
          </KineticBody>
        </div>
      </div>

      {/* feature preview strip */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
        <FeaturePreview
          label="KINETIC MORPHING TYPOGRAPHY"
          demo={<KineticDemo />}
        />
        <FeaturePreview label="FLUID NAVIGATION" demo={<FluidDemo />} />
        <StartExperienceCta />
      </div>

      {/* thin baseline row */}
      <div className="mt-12 max-w-5xl border-t border-white/10 pt-4 flex flex-wrap justify-between gap-4 text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
        <span>VELOCITY-BASED LAYOUTS</span>
        <span>CONTEXTUAL INTERFACE</span>
        <span>ORGANIC TRANSITIONS</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </section>
  );
}

function FeaturePreview({
  label,
  demo,
}: {
  label: string;
  demo: React.ReactNode;
}) {
  return (
    <MagneticCard
      strength={10}
      className="relative bg-white/[0.02] border border-white/10 rounded-xl p-5 min-h-[180px] backdrop-blur-md overflow-hidden group hover:border-cyan-400/40 transition"
    >
      <div className="text-[10px] font-mono tracking-[0.25em] text-white/90 uppercase leading-tight max-w-[10rem]">
        {label}
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-70">
        {demo}
      </div>
    </MagneticCard>
  );
}

function KineticDemo() {
  const { intensity } = useIntensity();
  const y = useTransform(intensity, [0, 1], [0, -30]);
  return (
    <div className="absolute inset-0 flex items-end justify-end p-4 overflow-hidden">
      <motion.div
        style={{ y }}
        className="flex flex-col gap-2 items-end font-mono text-[10px] text-cyan-300/70"
      >
        <div className="w-24 h-1 bg-gradient-to-r from-transparent to-cyan-400/60 rounded-full" />
        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-emerald-400/60 rounded-full" />
        <div className="w-32 h-1 bg-gradient-to-r from-transparent to-purple-400/60 rounded-full" />
        <div className="w-20 h-1 bg-gradient-to-r from-transparent to-cyan-400/60 rounded-full" />
      </motion.div>
    </div>
  );
}

function FluidDemo() {
  return (
    <div className="absolute inset-0 flex items-end justify-end p-4">
      <motion.div
        className="w-32 h-20 rounded-lg border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 1.5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-cyan-300/60" />
        </div>
      </motion.div>
    </div>
  );
}

function StartExperienceCta() {
  const { intensity } = useIntensity();
  const boxShadow = useTransform(
    intensity,
    [0, 1],
    [
      "0 0 40px rgba(34,211,238,0.35)",
      "0 0 90px rgba(34,211,238,0.7)",
    ],
  );
  return (
    <MagneticCard strength={16} className="relative flex">
      <motion.a
        href="#capture"
        style={{ boxShadow }}
        className="flex-1 relative overflow-hidden bg-gradient-to-br from-cyan-300 to-emerald-400 text-black rounded-xl p-5 flex flex-col justify-between min-h-[180px] font-black uppercase tracking-tight text-2xl leading-none"
      >
        <div className="text-[10px] font-mono tracking-[0.3em] font-bold">
          [ CTA ]
        </div>
        <div>
          Start the
          <br />
          Experience
        </div>
        <div
          className="absolute top-0 right-0 w-8 h-full"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.9) 50%)",
          }}
        />
      </motion.a>
    </MagneticCard>
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
              <div className="flex justify-between"><span>ACCURACY:</span><span className="text-neutral-200">mm-GRADE LiDAR</span></div>
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
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Frequently Asked</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
          FAQ
        </h2>
        <div className="border-t border-white/10 pt-4 space-y-6">
          <Reveal className="space-y-2">
            <h3 className="text-sm font-bold uppercase text-neutral-200">
              What does a Novo Reperio capture include?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              A hosted Matterport tour as the main asset, plus support layers —
              360°, drone/aerial, and stills — and a launch layer for embedding
              into your website, page, or deck.
            </p>
          </Reveal>
          <Reveal className="space-y-2">
            <h3 className="text-sm font-bold uppercase text-neutral-200">
              Can existing spaces be digitized?
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Yes. Using LiDAR scanning, photogrammetry, and certified
              Matterport workflows, completed spaces map cleanly into hosted,
              embed-ready digital twins.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-24 py-10 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          src="/novo-logo.png"
          alt="Novo Reperio"
          className="h-7 w-auto opacity-70"
        />
        <span>© {new Date().getFullYear()} Novo Reperio Sdn Bhd</span>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-cyan-300"
      >
        WhatsApp +60 17-202 9996
      </a>
    </footer>
  );
}
