import { createFileRoute } from "@tanstack/react-router";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { Database, HelpCircle, ArrowRight, Play, ChevronRight } from "lucide-react";

const TITLE =
  "Novo Reperio — Transforming Physical Spaces into Intelligent Digital Assets";
const DESCRIPTION =
  "Malaysia's leading Digital Twin specialist. Reality Capture, BIM, and IoT-ready platforms that turn buildings into intelligent, operational digital assets.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type PillarKey = "platform" | "capture" | "intelligence";

type Pillar = {
  title: string;
  meta: string;
  tagline: string;
  desc: string;
  features: string[];
  workflow: string[];
};

const pillars: Record<PillarKey, Pillar> = {
  platform: {
    title: "Digital Twin Platform",
    meta: "Digital Twin Platform Malaysia | Intelligent Building & Asset Digitalisation",
    tagline: "One Platform. Endless Possibilities.",
    desc: "Novo Reperio's Digital Twin Platform combines Reality Capture, BIM, IoT-ready data structures, and immersive visualization into a single digital ecosystem that helps organizations market, manage, and optimize their physical assets.",
    features: [
      "Interactive 3D Environments",
      "Digital Asset Register",
      "IoT-Ready API Integrations",
      "Analytics Dashboards",
    ],
    workflow: ["Reality Capture", "Point Cloud", "BIM Modelling", "Digital Twin Platform"],
  },
  capture: {
    title: "Reality Capture",
    meta: "Reality Capture Specialist | LiDAR & Drone Mapping Malaysia",
    tagline: "Capture Reality. Build Intelligence.",
    desc: "Precise spatial data collection using high-accuracy LiDAR, advanced autonomous drone mapping, and photogrammetry to create flawless, millimeter-accurate digital replicas of existing environments.",
    features: [
      "LiDAR Laser Scanning",
      "Drone Photogrammetry",
      "Construction Documentation",
      "Scan to BIM Pipelines",
    ],
    workflow: ["Field Operations", "Laser Scanning", "Point Cloud Generation", "Mesh Optimization"],
  },
  intelligence: {
    title: "Building Intelligence",
    meta: "Building Lifecycle Management & Space Optimisation",
    tagline: "Buildings should do more than exist. They should provide intelligence.",
    desc: "Transform structural spaces into active operational assets. Integrate predictive analytics, monitor asset lifecycles, and optimize space utilization through data-driven central records.",
    features: [
      "Equipment Database",
      "Maintenance Dashboards",
      "Space Utilisation Analytics",
      "Inspection Histories",
    ],
    workflow: ["Data Layering", "IoT Sensor Binding", "Analytics Compilation", "Operational Insights"],
  },
};

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<PillarKey>("platform");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const active = pillars[activeTab];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-[500vh] bg-[#020203] text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-black"
    >
      {/* ENTERPRISE HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-[#020203]/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-[0.25em] text-white">NOVO REPERIO</span>
          <span className="text-[9px] font-mono tracking-widest text-emerald-400 mt-0.5 uppercase">
            MALAYSIA'S LEADING DIGITAL TWIN SPECIALIST
          </span>
        </div>

        <div className="hidden lg:flex bg-neutral-950 border border-neutral-800 p-1 rounded-full">
          {(Object.keys(pillars) as PillarKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === key
                  ? "bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {pillars[key].title}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full font-mono text-xs hover:bg-white hover:text-black transition"
        >
          {isMenuOpen ? "CLOSE INDEX //" : "OPEN INDEX Matrix //"}
        </button>
      </nav>

      {/* FULL-SCREEN COMMAND CENTER MATRIX OVERLAY */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-[#020203] pt-32 px-6 md:px-24 overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto pb-24">
            <div>
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                [ SOLUTIONS ARCHITECTURE ]
              </h4>
              <ul className="space-y-2 font-mono text-sm text-neutral-400">
                {[
                  "Digital Twin Platform",
                  "Reality Capture",
                  "Building Intelligence",
                  "Property Marketing",
                  "Facility Management",
                ].map((s) => (
                  <li
                    key={s}
                    className="hover:text-emerald-400 cursor-pointer flex items-center justify-between"
                  >
                    {s} <ChevronRight className="w-3 h-3" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                [ CORE METHODOLOGIES ]
              </h4>
              <ul className="space-y-2 font-mono text-xs text-neutral-400 grid grid-cols-2 gap-2">
                {[
                  "Matterport",
                  "LiDAR Scanning",
                  "Scan to BIM",
                  "Point Cloud",
                  "Drone Mapping",
                  "Photogrammetry",
                ].map((m) => (
                  <li key={m} className="hover:text-white cursor-pointer">
                    • {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-neutral-800 pb-3 mb-4">
                [ TARGET SECTORS ]
              </h4>
              <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                {[
                  "Property Developers",
                  "Hotels & Hospitality",
                  "Shopping Malls",
                  "Industrial Plants",
                  "Hospitals",
                  "Data Centres",
                ].map((ind) => (
                  <span
                    key={ind}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded hover:border-emerald-500 transition cursor-pointer"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STICKY CHRONO-ADAPTIVE HERO VIEWPORT */}
      <motion.section
        style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        className="h-screen w-full flex flex-col justify-center sticky top-0 z-10 pointer-events-none transition-all duration-300"
      >
        <motion.div
          style={{
            scaleY: textScaleY,
            skewY: textSkewY,
            opacity: textOpacity,
            filter: useTransform(matrixBlur, (b) => `blur(${b})`),
          }}
          className="max-w-5xl origin-left pointer-events-auto"
        >
          <span className="text-xs font-mono text-emerald-400 tracking-[0.4em] block mb-4 uppercase">
            // SOLUTIONS PIVOT // {active.title}
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white">
            {active.tagline}
          </h1>
          <p className="mt-6 text-neutral-400 text-lg font-light leading-relaxed max-w-3xl">
            {active.desc}
          </p>

          <div className="mt-8 flex gap-4 font-mono text-xs">
            <button className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-emerald-400 transition">
              EXPLORE SOLUTION
            </button>
            <button className="px-6 py-3 border border-neutral-800 rounded-full text-neutral-300 hover:bg-neutral-900 transition">
              BOOK ACCREDITED CONSULTATION
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end font-mono text-[11px] text-neutral-500">
          <div>
            ASSET META MAP:{" "}
            <span className="text-neutral-300 font-bold">{active.meta}</span>
          </div>
          <div>VELOCITY DETECTOR: {smoothVelocity.get().toFixed(3)}</div>
        </div>
      </motion.section>

      {/* CONTENT ZONE: DYNAMIC CAPABILITY STREAMS */}
      <section className="relative z-20 px-6 md:px-24 py-32 bg-gradient-to-b from-transparent to-[#050507] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase">
                [ Operational Architecture Specifications ]
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase mt-1">
                Platform Functional Scope
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-neutral-900/30 border border-neutral-800/60 rounded-xl backdrop-blur-md flex gap-4 items-start hover:border-emerald-500/40 transition"
                >
                  <div className="bg-neutral-950 p-2 rounded text-emerald-400 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white tracking-wide">
                      {feature}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-light">
                      End-to-end telemetry modules mapped cleanly to target architectural
                      system frameworks.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-neutral-950 border border-neutral-900 rounded-2xl">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6">
                [ INTELLIGENT WORKFLOW SEQUENCE ]
              </h4>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs text-neutral-400">
                {active.workflow.map((node, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="bg-neutral-900 px-4 py-3 border border-neutral-800 rounded flex items-center gap-2">
                      <span className="text-emerald-500 text-[10px] font-bold">▶</span>
                      <span>{node}</span>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-neutral-700 hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-[520px] sticky top-32">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  LIVE TWIN STREAM SHOWCASE
                </span>
                <Database className="w-4 h-4 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Experience the 90-second Platform Overview framework. Toggle across
                structural processing stages seamlessly below.
              </p>
            </div>

            <div className="my-6 relative bg-neutral-900 rounded-xl border border-neutral-800 aspect-video flex items-center justify-center overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 mix-blend-overlay" />
              <div className="text-center z-10 p-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto mb-3 hover:scale-110 transition cursor-pointer shadow-lg shadow-emerald-500/20">
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 tracking-widest block uppercase">
                  [ INITIALIZE PORTFOLIO FRAMEWORK SHOWCASE ]
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-[11px] text-neutral-400 border-t border-neutral-900 pt-4">
              <div className="flex justify-between">
                <span>PROCESSING FRAME:</span>{" "}
                <span className="text-emerald-400">UNREAL ENGINE 5 STREAM</span>
              </div>
              <div className="flex justify-between">
                <span>ACCURACY TOLERANCE:</span>{" "}
                <span className="text-neutral-200">MILLIMETER ACCURATE SCAN</span>
              </div>
              <div className="flex justify-between">
                <span>REVISION INTERVALS:</span>{" "}
                <span className="text-neutral-200">3 DEDICATED ROUNDS GIVEN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-24 py-24 bg-[#050507]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Topical Authority Reference Matrix FAQ</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Frequently Answered Queries
          </h3>

          <div className="border-t border-neutral-900 pt-4 space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase text-neutral-200">
                What is a Digital Twin?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                An accurate digital asset representation combining spatial reality data,
                active operational systems metrics, and continuous cloud access frameworks.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase text-neutral-200">
                Can existing physical structural setups be digitized?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Yes. Utilizing advanced LiDAR scanning, photogrammetry, and certified
                Matterport workflows, completed spaces map perfectly to existing facility
                models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
