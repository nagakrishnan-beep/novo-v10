import { createFileRoute } from "@tanstack/react-router";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Database,
  HelpCircle,
  ArrowRight,
  Play,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const TITLE = "Novo Reperio — Turn Your Space Into a 24/7 Sales Engine";
const DESCRIPTION =
  "Space capture studio. Photorealistic Matterport, LiDAR, 360° and drone walkthroughs that let clients explore, measure, and book your venue from anywhere.";

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

const NAV = [
  { label: "Capture", href: "#capture" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Sectors", href: "#industries" },
  { label: "Services", href: "#integrations" },
  { label: "Client Work", href: "#stories" },
  { label: "Scope", href: "#pricing" },
] as const;

const WHATSAPP_URL = "https://wa.me/60172029996";

const CAPTURE_FEATURES = [
  {
    title: "LiDAR-Powered Accuracy",
    body: "Capture every measurement, corner, and detail with professional-grade depth sensors.",
  },
  {
    title: "Pro-Level Fidelity",
    body: "4K-resolution walkthroughs that hold clarity even when zooming in on fine textures.",
  },
  {
    title: "Frictionless Integration",
    body: "Your digital twin is fully hosted and ready for website embedding or BIM software.",
  },
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
  {
    kicker: "Core delivery layer",
    title: "Matterport + 360",
    body: "Main hosted tour. Shows flow, size, and layout as your primary asset.",
  },
  {
    kicker: "Lightweight share format",
    title: "360 Tours",
    body: "Lighter tour formats for web, QR, and quick review flows.",
  },
  {
    kicker: "Context and arrival",
    title: "Drone & Aerial",
    body: "Show scale, access, and the surroundings around the venue.",
  },
  {
    kicker: "Launch wrapper",
    title: "Project Websites",
    body: "Package the final experience for sharing and sales-ready launch pages.",
  },
];

const WORKFLOW = ["Capture", "Package", "Publish"];

const STORIES = [
  {
    tag: "Featured case study",
    title: "Hyatt Kuantan — Kempas & Prefunction Hall",
    body: "Ballroom presentation that helps buyers see layout and setup before the first visit.",
    cta: "View Hyatt project",
    href: "https://novoreperio.com/portfolio-item/hotel/3d-matterport-virtual-tour/hyatt-kuantan-kempas-prefunction-hall/",
  },
  {
    tag: "Venue sales support",
    title: "WTCKL — Venue sales proof",
    body: "Venue storytelling that helps scale, flow, and room layout make sense earlier.",
    cta: "See venue work",
    href: "https://novoreperio.com/works/?vp_filter=portfolio_category%3Aconvention-centers-ballroom",
  },
  {
    tag: "Facilities review",
    title: "Maxis — Facilities review use case",
    body: "Office and facilities work made clearer for teams that need quick context.",
    cta: "Explore facilities work",
    href: "https://novoreperio.com/portfolio-category/facilities-management/",
  },
];

const SCOPE_STEPS = [
  {
    n: "01",
    title: "Define the Objective",
    body: "We start with the ‘Why.’ We analyze your space, your target audience, and the specific decision you want them to make after viewing the tour.",
    bullets: [
      "Single vs. multi-site strategy",
      "Conversion-focused UX",
      "Operational vs. marketing use cases",
    ],
  },
  {
    n: "02",
    title: "Engineer the Experience",
    body: "We select the perfect combination of capture technology and interactive layers to match your brand's standards and technical requirements.",
    bullets: [
      "Precision LiDAR vs. 360° walkthroughs",
      "Custom branding & infotags",
      "Interactive floorplans & media",
    ],
  },
  {
    n: "03",
    title: "Seamless Launch",
    body: "We don't just send a link. We provide a launch-ready package, integrated into your website, ads, or pitch decks.",
    bullets: [
      "Quick turnaround",
      "Campaign-ready assets",
      "Dedicated integration support",
    ],
  },
];

const CLIENT_LOGOS = [
  { alt: "Mahkota", src: "https://novoreperio.com/wp-content/uploads/2022/02/mmc-final-1.png" },
  { alt: "Matterport", src: "https://novoreperio.com/wp-content/uploads/2025/01/mp-logo-v-lock-rgb-color-black.png" },
  { alt: "Glomac", src: "https://novoreperio.com/wp-content/uploads/2022/02/glomac-1.png" },
  { alt: "KLCC", src: "https://novoreperio.com/wp-content/uploads/2022/02/klcc-1.png" },
  { alt: "Mah Sing", src: "https://novoreperio.com/wp-content/uploads/2022/02/mahsing-1.png" },
  { alt: "Maxis", src: "https://novoreperio.com/wp-content/uploads/2022/02/maxis.png" },
  { alt: "MHUB", src: "https://novoreperio.com/wp-content/uploads/2022/02/Mhub-1.png" },
  { alt: "Hong Leong / Yamaha", src: "https://novoreperio.com/wp-content/uploads/2022/02/yamaha-logo-1-1.png" },
  { alt: "UEM", src: "https://novoreperio.com/wp-content/uploads/2022/02/uem-1.png" },
  { alt: "SP Setia", src: "https://novoreperio.com/wp-content/uploads/2022/02/setia-1.png" },
];

const AFFILIATIONS = [
  { alt: "PropTech", src: "https://novoreperio.com/wp-content/uploads/2022/02/prop.png" },
  { alt: "MDEC", src: "https://novoreperio.com/wp-content/uploads/2022/02/mdec.png" },
  { alt: "MHTC", src: "https://novoreperio.com/wp-content/uploads/2023/01/Untitled-1.jpg" },
  { alt: "PCEB", src: "https://novoreperio.com/wp-content/uploads/2022/11/PCeb-web2.png" },
  { alt: "MyCEB", src: "https://novoreperio.com/wp-content/uploads/2022/11/MyCeb-web.png" },
];

const REVIEWS = [
  {
    name: "Joyce Chong",
    body: "Novo Reperio is good and they use the latest equipment for their work. Experienced team, fast output, high quality.",
  },
  {
    name: "Kammy Parkland",
    body: "Been approaching Novo Reperio since 2020 for my projects' virtual show units. Great service, helpful staff, high quality works.",
  },
  {
    name: "Low Lap Sheng",
    body: "Skylon Residences, Kuala Lumpur by GBD Land. 60% of units now sold. Their 360° virtual tours greatly supported our foreign-buyer sales.",
  },
  {
    name: "Nur Aiman",
    body: "Excellent Matterport setup for our project. Professional, supportive, on time — the whole process was stress-free and rewarding.",
  },
];

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsFastScrolling] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 55, stiffness: 220 });

  const textScaleY = useTransform(smoothVelocity, [-3, 0, 3], [0.55, 1, 0.55]);
  const textSkewY = useTransform(smoothVelocity, [-3, 0, 3], [-5, 0, 5]);
  const textOpacity = useTransform(smoothVelocity, [-2, -0.2, 0, 0.2, 2], [0.1, 0.95, 1, 0.95, 0.1]);
  const matrixBlur = useTransform(smoothVelocity, [-2, 0, 2], ["8px", "0px", "8px"]);
  const matrixFilter = useTransform(matrixBlur, (b) => `blur(${b})`);
  const paddingX = useTransform(smoothVelocity, [-3, 0, 3], ["1.5rem", "6rem", "1.5rem"]);

  useEffect(() => {
    const unsub = scrollVelocity.on("change", (v) => {
      if (Math.abs(v) > 0.75) setIsFastScrolling(true);
      else if (Math.abs(v) < 0.15) setIsFastScrolling(false);
    });
    return () => unsub();
  }, [scrollVelocity]);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-[#020203] text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-black scroll-smooth"
    >
      {/* ENTERPRISE HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-[#020203]/80 backdrop-blur-xl border-b border-neutral-900 gap-4">
        <a href="#top" className="flex flex-col shrink-0">
          <span className="text-lg md:text-xl font-black tracking-[0.25em] text-white">NOVO REPERIO</span>
          <span className="text-[9px] font-mono tracking-widest text-emerald-400 mt-0.5 uppercase">
            SPACE CAPTURE STUDIO
          </span>
        </a>

        <div className="hidden lg:flex bg-neutral-950 border border-neutral-800 p-1 rounded-full">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-full font-mono text-xs font-bold hover:bg-emerald-400 transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WHATSAPP US
        </a>
      </nav>

      {/* HERO */}
      <motion.section
        id="top"
        style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        className="min-h-screen w-full flex flex-col justify-center pt-32 pb-24 relative"
      >
        <motion.div
          style={{ scaleY: textScaleY, skewY: textSkewY, opacity: textOpacity, filter: matrixFilter }}
          className="max-w-5xl origin-left"
        >
          <span className="text-xs font-mono text-emerald-400 tracking-[0.4em] block mb-4 uppercase">
            // SPACE CAPTURE STUDIO
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
            Turn Your Space Into a 24/7 Sales Engine
          </h1>
          <p className="mt-6 text-neutral-400 text-lg font-light leading-relaxed max-w-3xl">
            Transform your physical location into a high-performance sales tool. Eliminate site-visit
            friction and build instant trust with immersive 3D walkthroughs that let clients explore,
            measure, and book from anywhere in the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
            <a
              href="#demo"
              className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-emerald-400 transition"
            >
              GET A PROJECT QUOTE
            </a>
            <a
              href="#stories"
              className="px-6 py-3 border border-neutral-800 rounded-full text-neutral-300 hover:bg-neutral-900 transition"
            >
              SEE OUR WORK
            </a>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl font-mono text-[11px]">
          {[
            ["10+ YEARS", "Malaysia's most experienced capture team."],
            ["FASTER CYCLES", "Close deals faster with 24/7 virtual accessibility."],
            ["GLOBAL BRANDS", "From KL Convention Centre to five-star hospitality groups."],
          ].map(([k, v]) => (
            <div key={k} className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
              <div className="text-emerald-400 font-bold tracking-widest">{k}</div>
              <div className="text-neutral-400 mt-2 leading-relaxed">{v}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CAPTURE */}
      <section id="capture" className="relative z-20 px-6 md:px-24 py-24 bg-gradient-to-b from-transparent to-[#050507] border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase">[ DIGITAL TWIN ]</span>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">
                Let people walk through your venue before they even arrive.
              </h2>
              <p className="mt-4 text-neutral-400 font-light leading-relaxed max-w-3xl">
                Your clients are busy. Give them the confidence to book your venue without stepping
                foot on-site. Our photorealistic capture provides the scale, flow, and vibe of your
                space in a format that works on any device.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAPTURE_FEATURES.map((f, idx) => (
                <div
                  key={f.title}
                  className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl backdrop-blur-md flex gap-4 items-start hover:border-emerald-500/40 transition"
                >
                  <div className="bg-neutral-950 p-2 rounded text-emerald-400 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase text-white tracking-wide">{f.title}</h3>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE MATTERPORT PREVIEW PANEL */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-[520px] lg:sticky lg:top-32">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  LIVE MATTERPORT PREVIEW
                </span>
                <Database className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Preview from a Novo Reperio hospitality project — Hyatt Kuantan Ballroom, lower to
                upper level walkthrough.
              </p>
            </div>

            <div className="my-6 relative bg-neutral-900 rounded-xl border border-neutral-800 aspect-video flex items-center justify-center overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 mix-blend-overlay" />
              <div className="text-center z-10 p-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto mb-3 hover:scale-110 transition cursor-pointer shadow-lg shadow-emerald-500/20">
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest block uppercase">
                  [ LAUNCH SAMPLE WALKTHROUGH ]
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-[11px] text-neutral-400 border-t border-neutral-900 pt-4">
              <div className="flex justify-between"><span>CAPTURE STACK:</span><span className="text-emerald-400">MATTERPORT PRO3</span></div>
              <div className="flex justify-between"><span>ACCURACY:</span><span className="text-neutral-200">MILLIMETER-GRADE LiDAR</span></div>
              <div className="flex justify-between"><span>DELIVERY:</span><span className="text-neutral-200">HOSTED + EMBED-READY</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" className="px-6 md:px-24 py-24 bg-[#050507] border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <span className="text-xs font-mono text-neutral-500 uppercase">[ THE COMPETITIVE EDGE ]</span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase">
            Your space isn't just a location. It's your best sales tool.
          </h2>
          <p className="text-neutral-400 font-light max-w-3xl leading-relaxed">
            Transform your space into an interactive environment that lets your audience understand
            layout, atmosphere, and scale in seconds.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex gap-3 p-4 bg-neutral-900/40 border border-neutral-800 rounded-lg">
                <span className="text-emerald-400">+</span>
                <span className="text-neutral-300">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INDUSTRIES / SECTORS */}
      <section id="industries" className="px-6 md:px-24 py-24 border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <span className="text-xs font-mono text-neutral-500 uppercase">[ SECTORS ]</span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase">
            Strategy-first capture. Built for your business goals.
          </h2>
          <p className="text-neutral-400 font-light max-w-3xl leading-relaxed">
            From boutique retail to 1,000,000+ sq ft industrial complexes, we scale our process to
            match your project's complexity.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded hover:border-emerald-500 transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / INTEGRATIONS */}
      <section id="integrations" className="px-6 md:px-24 py-24 bg-[#050507] border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase">[ SERVICES ]</span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">
              One capture, many ways to use it.
            </h2>
            <p className="mt-4 text-neutral-400 font-light max-w-3xl leading-relaxed">
              One capture becomes a tour, a share link, or a presentation. Matterport shows flow, size,
              and layout — then we add web formats and launch pages.
            </p>
          </div>

          <div className="p-6 md:p-8 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6">
              [ CAPTURE → PACKAGE → PUBLISH ]
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs text-neutral-400">
              {WORKFLOW.map((node, idx, arr) => (
                <React.Fragment key={node}>
                  <div className="bg-neutral-900 px-4 py-3 border border-neutral-800 rounded flex items-center gap-2">
                    <span className="text-emerald-500 text-[10px] font-bold">▶</span>
                    <span>{node}</span>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-neutral-700 hidden md:block" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl hover:border-emerald-500/40 transition">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{s.kicker}</div>
                <h3 className="text-sm font-bold uppercase text-white tracking-wide mt-2">{s.title}</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES / CLIENT WORK */}
      <section id="stories" className="px-6 md:px-24 py-24 border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase">[ CLIENT WORK ]</span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">
              See how spaces are easier to trust before a visit.
            </h2>
            <p className="mt-4 text-neutral-400 font-light max-w-3xl leading-relaxed">
              Selected work across hospitality, venues, and facilities shows how Novo helps spaces
              feel clearer and easier to act on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORIES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl hover:border-emerald-500/40 transition flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{s.tag}</div>
                  <h3 className="text-base font-bold uppercase text-white tracking-wide mt-2">{s.title}</h3>
                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light">{s.body}</p>
                </div>
                <div className="mt-6 font-mono text-[11px] text-emerald-400 flex items-center gap-2">
                  {s.cta} <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST LOGOS */}
      <section className="px-6 md:px-24 py-16 bg-[#050507] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">[ CLIENTS & AFFILIATIONS ]</span>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
              Trusted by clients, partners, and industry bodies.
            </h2>
          </div>

          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">Clients</div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {CLIENT_LOGOS.map((l) => (
                <img key={l.alt} src={l.src} alt={`${l.alt} logo`} loading="lazy" className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition invert" />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">Affiliations</div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {AFFILIATIONS.map((l) => (
                <img key={l.alt} src={l.src} alt={`${l.alt} logo`} loading="lazy" className="h-10 md:h-12 object-contain opacity-70 hover:opacity-100 transition invert" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="px-6 md:px-24 py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase">[ GOOGLE REVIEWS ]</span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">Trusted by clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl">
                <div className="text-amber-400 text-sm">★★★★★</div>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-light">{r.body}</p>
                <div className="mt-4 text-[11px] font-mono text-neutral-500 uppercase tracking-widest">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE / PRICING */}
      <section id="pricing" className="px-6 md:px-24 py-24 bg-[#050507] border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <span className="text-xs font-mono text-neutral-500 uppercase">[ SCOPE ]</span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">
              One proven process. Infinite possibilities.
            </h2>
            <p className="mt-4 text-neutral-400 font-light max-w-3xl leading-relaxed">
              We don't believe in one-size-fits-all. We tailor our stack — Matterport, LiDAR, 360,
              drone, or 3D CGI — so your digital twin delivers exactly what your audience needs to see.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SCOPE_STEPS.map((s) => (
              <div key={s.n} className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl">
                <div className="text-emerald-400 font-mono text-xs font-bold tracking-widest">{s.n}</div>
                <h3 className="text-lg font-bold uppercase text-white tracking-tight mt-2">{s.title}</h3>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light">{s.body}</p>
                <ul className="mt-4 space-y-2 font-mono text-[11px] text-neutral-400">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="px-6 md:px-24 py-24 border-t border-neutral-900 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
            Stop letting geography limit your sales.
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed">
            Your space is your biggest asset — don't keep it behind closed doors. Launch high-performance
            digital experiences that remove site-visit friction, build instant buyer trust, and accelerate
            your sales cycle.
          </p>
          <div className="flex flex-wrap justify-center gap-4 font-mono text-xs pt-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition inline-flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> WHATSAPP US
            </a>
            <a href="#stories" className="px-6 py-3 border border-neutral-800 rounded-full text-neutral-300 hover:bg-neutral-900 transition">
              SEE INDUSTRY WORK
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-24 py-24 bg-[#050507] border-t border-neutral-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Frequently Asked</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">FAQ</h2>

          <div className="border-t border-neutral-900 pt-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-neutral-200">
                What does a Novo Reperio capture include?
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                A hosted Matterport tour as the main asset, plus support layers — 360°, drone/aerial,
                and stills — and a launch layer for embedding into your website, page, or deck.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-neutral-200">
                Can existing spaces be digitized?
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Yes. Using LiDAR scanning, photogrammetry, and certified Matterport workflows, completed
                spaces map cleanly into hosted, embed-ready digital twins.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-24 py-10 border-t border-neutral-900 text-[11px] font-mono text-neutral-500 flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} Novo Reperio Sdn Bhd</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
          WhatsApp +60 17-202 9996
        </a>
      </footer>
    </motion.div>
  );
}
