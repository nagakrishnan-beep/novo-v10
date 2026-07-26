import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { getService } from "@/lib/services";
import { WHATSAPP_URL, abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/schema";
import { WORKS } from "@/lib/works";

const TITLE = "Immersive & Virtual Training Malaysia | 360° Interactive, Gamified & Simulation | Novo Reperio";
const DESCRIPTION =
  "Interactive 360° training tours, gamified digital twins, and game-engine simulations. Turn real workplaces into hands-on training on any device.";
const URL = abs("/services/immersive-training");

const FAQ = [
  { q: "Can virtual tours be used for employee training?", a: "Yes. A guided 360° tour with info-tags, step navigation, embedded checklists, media at each station and quiz gates lets staff run through a real workplace procedure hands-on, from anywhere, with consistent content every time." },
  { q: "What is gamified safety training?", a: "Gamified safety training turns a digital twin of the workplace into an interactive exercise, hazard hunts, timed procedure runs, branching decisions and scoring with cohort leaderboards. It rewards good behaviour, measures competency, and issues completion certification." },
  { q: "How do companies train staff without site visits?", a: "By replacing the site with an immersive twin. Novo Reperio captures the real workplace once, wraps it in the training UI (360° tour, gamified twin, or game-engine simulation), and delivers it to staff on mobile, tablet or VR, with no travel, no downtime, no exposure to live hazards." },
];

const TIERS = [
  {
    tag: "PROVEN",
    label: "01",
    title: "Interactive 360° Training Tours",
    body: "Info-tags, guided step navigation, embedded checklists, media at each station, quiz gates.",
    proof: "Shell PDP 360 Learning Experience",
    media: "SHELL PDP TRAINING VIDEO: PENDING",
  },
  {
    tag: "AVAILABLE",
    label: "02",
    title: "Gamified Digital Twin Training",
    body: "Hazard hunts, timed procedure runs, branching decisions, scoring, cohort leaderboards, completion certification.",
    proof: null,
    media: null,
  },
  {
    tag: "ON ENGAGEMENT · IN DEVELOPMENT",
    label: "03",
    title: "Game-Engine Simulation Training",
    body: "Full simulation of high-risk or unbuilt environments; consequence-free repetition.",
    proof: null,
    media: "GAME-ENGINE SIMULATION: PENDING",
  },
];

const BENEFITS = [
  { t: "Consistency at global scale", b: "Every learner gets the same content, in every location." },
  { t: "Travel & downtime eliminated", b: "Train wherever the learner is, with no flights, no shut-downs." },
  { t: "Safety without exposure", b: "Practice high-risk procedures with zero live-hazard risk." },
  { t: "Measurable", b: "Completion, scores, time analytics, audit-ready reporting." },
  { t: "Greener training", b: "Quantifiable carbon saved per avoided flight or site visit." },
  { t: "Always-on, multilingual", b: "Mobile, tablet and VR-headset-ready, in the languages you operate in." },
];

const BEST_FOR = ["HSE / safety", "L&D", "Operations", "HR onboarding", "Oil & gas", "Manufacturing", "Plants", "Distributed corporates"];

export const Route = createFileRoute("/services/immersive-training")({
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
        { name: "Immersive Training", url: URL },
      ])) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({
        name: "Immersive & Virtual Training",
        description: DESCRIPTION,
        url: URL,
      })) },
      { type: "application/ld+json", children: JSON.stringify(faqPageJsonLd(FAQ)) },
    ],
  }),
  component: Page,
});

function Page() {
  const service = getService("immersive-training")!;
  const shell = WORKS.find((w) => w.slug === "shell-360-training");
  const henkel = WORKS.find((w) => w.slug === "henkel-malaysia-kuala-lumpur");
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-16 pb-6">
        <BreadcrumbNav items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: "Immersive Training" },
        ]} />
      </section>

      <section className="px-6 md:px-24 pt-6 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-6 font-mono">
          Train · Immersive & Virtual Training
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          Turn training into an experience. Not a slideshow.
        </h1>
        <p className="mt-6 max-w-3xl text-sm md:text-base text-neutral-300 leading-relaxed">
          Novo Reperio converts real workplaces into interactive training environments,
          360° guided walkthroughs, gamified digital twins, and game-engine simulations
          on engagement, so staff learn procedures hands-on, from anywhere, on any device.
        </p>
        <div className="mt-8 max-w-3xl">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-2 font-mono">
            The problem
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            {service.problem}
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
          >
            Scope a training programme <ArrowRight size={14} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Three tiers</div>
        <div className="grid md:grid-cols-3 gap-4">
          {TIERS.map((t) => (
            <div key={t.title} className="border border-white/10 rounded-xl p-6 flex flex-col">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                {t.label} · {t.tag}
              </div>
              <h3 className="mt-3 text-white text-lg font-light">{t.title}</h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed flex-1">{t.body}</p>
              {t.proof && (
                <div className="mt-4 text-xs font-mono text-neutral-500">
                  Proof: <span className="text-neutral-300">{t.proof}</span>
                </div>
              )}
              {t.media && (
                <div className="mt-4">
                  <MediaSlot label={t.media} ratio="aspect-video" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">
          The outcome
        </div>
        <p className="text-xl md:text-2xl font-light text-white max-w-4xl leading-snug">
          {service.outcome}
        </p>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Why it works</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b) => (
            <div key={b.t} className="border border-white/10 rounded-lg p-5">
              <h3 className="text-white text-base font-light">{b.t}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{b.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Best for</div>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {BEST_FOR.map((b) => (
            <span key={b} className="px-3 py-2 border border-white/10 rounded text-neutral-300">{b}</span>
          ))}
        </div>
      </section>

      {(shell || henkel) && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">Selected work</div>
          <div className="grid md:grid-cols-2 gap-4">
            {[shell, henkel].filter(Boolean).map((w) => (
              <Link
                key={w!.slug}
                to="/works/$slug"
                params={{ slug: w!.slug }}
                className="border border-white/10 rounded-xl p-6 hover:border-emerald-400/40 transition"
              >
                <div className="text-white text-lg font-light">{w!.title}</div>
                <p className="mt-2 text-sm text-neutral-400">{w!.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 mb-4 font-mono">FAQ</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-10">
          Immersive training: common questions
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
