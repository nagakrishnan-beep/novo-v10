import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LaserTrail } from "@/components/laser-trail";

const WHATSAPP_URL = "https://wa.me/60172029996";
const PHONE = "+60 17-202 9996";
const EMAIL = "hello@novoreperio.com";
const ADDRESS =
  "Solaris Mont Kiara, Jalan Solaris, Mont Kiara, 50480 Kuala Lumpur, Malaysia";

const TITLE = "Contact — Start Your Spatial Project";
const DESCRIPTION =
  "Tell us about your space, launch, or venue. Novo Reperio replies within one working day with a recommended capture and delivery plan.";

const STEPS = [
  {
    step: "01",
    title: "Share your goals",
    body: "Tell us the space, audience, and outcome. A venue enquiry, a launch, a facility record — we treat each brief on its own terms.",
  },
  {
    step: "02",
    title: "We recommend the right mix",
    body: "Within one working day you receive a proposed mix of Matterport, 360°, aerial, CGI, and delivery formats scoped to your goals.",
  },
  {
    step: "03",
    title: "Site visit or virtual walkthrough",
    body: "For local projects we visit the site. For remote projects we do a video walkthrough to confirm access, timing, and coverage.",
  },
  {
    step: "04",
    title: "Capture and production",
    body: "Our team handles capture, edit, colour, and post — coordinated with your marketing, PR, or handover milestones.",
  },
  {
    step: "05",
    title: "Delivery and activation",
    body: "Final tour, files, or microsite delivered where they will have the most impact — web, QR, deck, or client presentation.",
  },
];

const METHODS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: PHONE,
    href: WHATSAPP_URL,
    hint: "Fastest response, typically same day.",
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    hint: "For scoping, quotes, and briefing documents.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: PHONE,
    href: `tel:+60172029996`,
    hint: "Weekdays, 9am — 6pm MYT.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Solaris Mont Kiara, KL",
    href: "https://maps.google.com/?q=Solaris+Mont+Kiara",
    hint: ADDRESS,
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <LaserTrail />
      <SiteHeader />

      {/* Hero */}
      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Contact
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          Let's turn your space into a shareable, sellable digital asset.
        </h1>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          Share a few details about your space, launch, or venue. We'll come
          back within one working day with a recommended capture, production,
          and delivery plan — tailored to your audience and timeline.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <Mail size={14} /> Email the studio
          </a>
        </div>
      </section>

      {/* Methods */}
      <section className="px-6 md:px-24 py-20 border-b border-neutral-900">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:border-cyan-400/40 transition block"
            >
              <m.icon className="text-cyan-300" size={18} />
              <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">
                {m.label}
              </div>
              <div className="mt-2 text-white font-light">{m.value}</div>
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                {m.hint}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Project brief form */}
      <section className="px-6 md:px-24 py-20 border-b border-neutral-900 grid md:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
            Project brief
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Tell us about your space.
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed max-w-md">
            The more we know about your goals, timeline, and audience, the
            faster we can recommend the right capture and delivery approach.
          </p>
        </div>

        <form
          action={`mailto:${EMAIL}`}
          method="post"
          encType="text/plain"
          className="space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone / WhatsApp" name="phone" />
          </div>
          <Field label="Project location" name="location" placeholder="City, venue, or address" />
          <div>
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">
              What do you need?
            </label>
            <textarea
              name="brief"
              rows={5}
              required
              placeholder="Tell us about the space, timeline, and how it will be used."
              className="mt-2 w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
          >
            Send Brief <ArrowRight size={14} />
          </button>
          <p className="text-[11px] font-mono text-neutral-600">
            We reply within one working day. For urgent enquiries, WhatsApp is fastest.
          </p>
        </form>
      </section>

      {/* Workflow */}
      <section className="px-6 md:px-24 py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          How we work
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          A five-step process from first message to launch-ready asset.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="border border-white/10 rounded-lg p-5 bg-white/[0.02]"
            >
              <div className="font-mono text-cyan-300 text-xs tracking-widest">
                STEP {s.step}
              </div>
              <h3 className="mt-3 text-white text-base font-light leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-neutral-400 text-xs leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Studio */}
      <section className="px-6 md:px-24 py-20 border-b border-neutral-900 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
            Studio
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
            Novo Reperio Sdn Bhd
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">{ADDRESS}</p>
          <div className="mt-6 space-y-2 font-mono text-sm text-neutral-300">
            <div>P · {PHONE}</div>
            <div>E · {EMAIL}</div>
            <div>Hours · Mon–Fri, 9:00 – 18:00 MYT</div>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
          <iframe
            title="Novo Reperio studio location"
            src="https://www.google.com/maps?q=Solaris+Mont+Kiara,+Kuala+Lumpur&output=embed"
            className="w-full h-full grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400/60 focus:outline-none"
      />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/novo-logo.png" alt="Novo Reperio" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-neutral-500">
          <Link to="/works" className="hover:text-cyan-300">Work</Link>
          <Link to="/services" className="hover:text-cyan-300">Services</Link>
          <Link to="/about" className="hover:text-cyan-300">About</Link>
          <Link to="/insights" className="hover:text-cyan-300">Insights</Link>
          <Link to="/contact" className="text-cyan-300">Contact</Link>
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
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-300">
        WhatsApp {PHONE}
      </a>
    </footer>
  );
}
