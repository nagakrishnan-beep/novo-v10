import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { LaserTrail } from "@/components/laser-trail";
import {
  SERVICES,
  APPROACH,
  COMBINATIONS,
  SERVICE_INDUSTRIES,
} from "@/lib/services";

const WHATSAPP_URL = "https://wa.me/60172029996";
const TITLE = "Services — Immersive Spatial Solutions for the Built World";
const DESCRIPTION =
  "Matterport digital twins, 360° tours, aerial capture, CGI, and launch-ready web. Novo Reperio's end-to-end spatial services for venues, property, and facilities.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const core = SERVICES.filter((s) => s.tier === "core");
  const supporting = SERVICES.filter((s) => s.tier === "supporting");

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <LaserTrail />
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Virtual Tour Services
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          Immersive Spatial Solutions for the Built World.
        </h1>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          We transform physical environments into intelligent digital
          experiences through advanced spatial capture, visualization, and
          360° interactive technologies — enabling faster sales decisions,
          stronger client engagement, and smarter operations across industries.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            Start Your Transformation <ArrowRight size={14} />
          </Link>
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
          >
            Browse Our Portfolio
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
          <li>Pioneering Digital Twins since 2014</li>
          <li>· Cinematic 4K Drone & 360° Media</li>
          <li>· End-to-End Asset Deployment</li>
        </ul>
      </section>

      {/* Core services */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          From physical spaces to intelligent digital ecosystems
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Select the technology that best translates your vision into a
          digital reality.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {core.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:border-cyan-400/40 transition flex flex-col"
            >
              <div className="aspect-[4/3] bg-black/40 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-cyan-300 text-[10px] font-mono uppercase tracking-[0.3em]">
                  Core service
                </div>
                <h3 className="text-white text-lg font-light mt-2 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                  {s.tagline}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                  Explore service <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Supporting services */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Supporting services
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          End-to-end spatial intelligence for capturing, visualising, and
          activating the built world.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supporting.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-cyan-400/40 transition h-full flex flex-col"
            >
              <div className="text-cyan-300 text-[10px] font-mono uppercase tracking-[0.3em]">
                {s.slug === "web-development"
                  ? "Featured service"
                  : "Additional service"}
              </div>
              <h3 className="text-white text-base font-light mt-2 leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed flex-1">
                {s.tagline}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                Explore <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Our approach
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Every project is tailored to the audience it needs to impress.
        </h2>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          We do not force every project into the same package. Instead, we
          recommend the right combination based on what your space needs to
          communicate and how your audience will experience it.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {APPROACH.map((a) => (
            <div
              key={a.step}
              className="border border-white/10 rounded-lg p-6 bg-white/[0.02]"
            >
              <div className="font-mono text-cyan-300 text-xs tracking-widest">
                STEP {a.step}
              </div>
              <h3 className="mt-3 text-white text-xl font-light leading-snug">
                {a.title}
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Combinations */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Popular combinations
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Combine two or more services for a richer, more complete
          presentation.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {COMBINATIONS.map((c) => (
            <div
              key={c.title}
              className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-cyan-400/40 transition"
            >
              <div className="text-cyan-300 text-[10px] font-mono uppercase tracking-[0.3em]">
                Recommended combination
              </div>
              <h3 className="mt-3 text-white text-xl font-light">{c.title}</h3>
              <div className="mt-2 font-mono text-xs text-neutral-300">
                {c.stack}
              </div>
              <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          Built for spaces people need to understand fast
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          Novo supports sectors that need clearer views and faster review.
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          {SERVICE_INDUSTRIES.map((i) => (
            <div
              key={i}
              className="border border-white/10 rounded px-3 py-3 text-neutral-300 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              {i}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Looking for the right presentation for your space?
          </h2>
          <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">
            Novo Reperio can help recommend the right mix of capture,
            supporting visuals, and delivery format for your venue, property,
            facility, showroom, or destination.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
            >
              Start a Project <ArrowRight size={14} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/novo-logo.png" alt="Novo Reperio" className="h-8 w-auto" />
          <span className="sr-only">Novo Reperio</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-neutral-500">
          <Link to="/works" className="hover:text-cyan-300">Work</Link>
          <Link to="/services" className="text-cyan-300">Services</Link>
          <Link to="/about" className="hover:text-cyan-300">About</Link>
          <Link to="/insights" className="hover:text-cyan-300">Insights</Link>
          <Link to="/contact" className="hover:text-cyan-300">Contact</Link>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-500/10"
        >
          <MessageCircle size={14} /> WhatsApp Us
        </a>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="px-6 md:px-24 py-10 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src="/novo-logo.png" alt="Novo Reperio" className="h-7 w-auto opacity-70" />
        <span>© {new Date().getFullYear()} Novo Reperio Sdn Bhd</span>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/contact" className="hover:text-cyan-300 inline-flex items-center gap-1">
          Contact <ChevronRight size={12} />
        </Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-300">
          WhatsApp +60 17-202 9996
        </a>
      </div>
    </footer>
  );
}
