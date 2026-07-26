import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Check } from "lucide-react";
import { SiteHeader, SiteFooter, trackEvent } from "@/components/site-chrome";
import {
  WHATSAPP_URL,
  WHATSAPP_PHONE,
  PHONE,
  PHONE_TEL,
  EMAIL,
  ADDRESS_FULL,
  LEGAL_NAME,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  abs,
} from "@/lib/site";

const TITLE = "Contact — Start Your Spatial Project | Novo Reperio";
const DESCRIPTION =
  "Tell us about your space, launch or venue. Novo Reperio replies within one working day with a recommended capture and delivery plan.";

const STEPS = [
  { step: "01", title: "Share your goals", body: "Tell us the space, audience and outcome. A venue enquiry, a launch, a facility record — we treat each brief on its own terms." },
  { step: "02", title: "We recommend the right mix", body: "Within one working day you receive a proposed mix of Matterport, 360°, aerial, CGI and delivery formats scoped to your goals." },
  { step: "03", title: "Site visit or virtual walkthrough", body: "For local projects we visit the site. For remote projects we do a video walkthrough to confirm access, timing and coverage." },
  { step: "04", title: "Capture and production", body: "Our team handles capture, edit, colour and post — coordinated with your marketing, PR or handover milestones." },
  { step: "05", title: "Delivery and activation", body: "Final tour, files or microsite delivered where they will have the most impact — web, QR, deck or client presentation." },
];

const METHODS = [
  { icon: MessageCircle, label: "WhatsApp", value: WHATSAPP_PHONE, href: WHATSAPP_URL, hint: "Fastest response, same day." },
  { icon: Phone, label: "Call the studio", value: PHONE, href: `tel:${PHONE_TEL}`, hint: "Office direct line, weekdays 9:00–18:00 MYT." },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, hint: "For scoping, quotes and briefing documents." },
  { icon: MapPin, label: "Nerve Center", value: "Solaris Mont Kiara, KL", href: "https://maps.google.com/?q=Solaris+Mont+Kiara", hint: ADDRESS_FULL },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: abs("/contact") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: abs("/contact") }],
  }),
  component: ContactPage,
});

type FormState = "idle" | "loading" | "success" | "error";

function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [prefill, setPrefill] = useState<string>("");

  // Read ?type= & ?size= URL params and prefill the message textarea.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const size = params.get("size");
    if (type || size) {
      const sizeLabel =
        size === "under-1000"
          ? "under 1,000"
          : size === "1000-3000"
            ? "1,000–3,000"
            : size === "3000-10000"
              ? "3,000–10,000"
              : size === "10000-plus"
                ? "10,000+"
                : size ?? "";
      const typeLabel = (type ?? "").replace(/-/g, " ");
      setPrefill(
        `Scope estimate request: ${typeLabel || "space"}, ${sizeLabel || "size TBD"} sq ft.`,
      );
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // client-side validation
    const data = new FormData(form);
    const name = (data.get("name") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const message = (data.get("message") as string || "").trim();
    if (!name || name.length > 120) return fail("Please enter your name (max 120 chars).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email.");
    if (!message || message.length > 4000) return fail("Please add a message (max 4000 chars).");

    // honeypot (two fields — legacy company_website + Web3Forms `botcheck`)
    if ((data.get("company_website") as string)?.length) return; // silent drop
    if ((data.get("botcheck") as string)?.length) return; // silent drop

    setState("loading");
    setErrorMsg("");

    const company = (data.get("company") as string || "").trim();
    const phone = (data.get("phone") as string || "").trim();
    const location = (data.get("location") as string || "").trim();

    // Compose a labeled block so the resulting ClickUp task email is readable.
    const composed = [
      `Name: ${name}`,
      `Company: ${company || "—"}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Location: ${location || "—"}`,
      ``,
      `Needs:`,
      message,
    ].join("\n");

    data.set("access_key", WEB3FORMS_ACCESS_KEY);
    data.set("subject", "New enquiry — Novo Reperio website");
    data.set("from_name", name);
    data.set("replyto", email);
    data.set("message", composed);
    // stay on page; success state is rendered client-side
    data.delete("redirect");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        trackEvent("form_submit_success");
        setState("success");
        form.reset();
      } else {
        throw new Error(json?.message || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      trackEvent("form_submit_error");
      fail(err?.message || "Something went wrong. Please try WhatsApp instead.");
    }
  }

  function fail(msg: string) {
    setErrorMsg(msg);
    setState("error");
  }

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="contact" />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">Contact</div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          Let's turn your space into a shareable, sellable digital asset.
        </h1>
        <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
          Share a few details about your space, launch or venue. We'll come back
          within one working day with a recommended capture, production and
          delivery plan — tailored to your audience and timeline.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("cta_whatsapp", { where: "contact_hero" })}
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

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
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
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed">{m.hint}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Project brief form */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 grid md:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
            Project brief
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Tell us about your space.
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed max-w-md">
            The more we know about your goals, timeline and audience, the faster we can
            recommend the right capture and delivery approach.
          </p>
          <p className="mt-6 text-xs font-mono uppercase tracking-widest text-neutral-500">
            400+ projects <span className="text-emerald-400">·</span> Since 2014{" "}
            <span className="text-emerald-400">·</span> Trusted by KLCC, Hyatt, Porsche
          </p>
        </div>

        {state === "success" ? (
          <div className="border border-cyan-400/40 bg-cyan-400/5 rounded-xl p-8">
            <Check className="text-cyan-300 mb-4" size={28} />
            <h3 className="text-xl text-white font-light">Brief received.</h3>
            <p className="mt-3 text-neutral-400 leading-relaxed text-sm">
              We'll come back within one working day with a recommended capture and
              delivery plan. For urgent enquiries, WhatsApp is fastest —{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">
                {WHATSAPP_PHONE}
              </a>.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            {/* honeypots — must remain empty; bots fill them */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              className="hidden"
              aria-hidden
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" name="name" required maxLength={120} />
              <Field label="Company" name="company" maxLength={120} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Email" name="email" type="email" required maxLength={200} />
              <Field label="Phone / WhatsApp" name="phone" maxLength={40} />
            </div>
            <Field
              label="Project location"
              name="location"
              placeholder="City, venue or address"
              maxLength={200}
            />
            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">
                What do you need?
              </label>
              <textarea
                name="message"
                rows={5}
                required
                maxLength={4000}
                defaultValue={prefill}
                key={prefill}
                placeholder="Tell us about the space, timeline and how it will be used."
                className="mt-2 w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
            {state === "error" && (
              <p className="text-xs font-mono text-rose-400" role="alert">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300 disabled:opacity-60"
            >
              {state === "loading" ? "Sending…" : "Send Brief"} <ArrowRight size={14} />
            </button>
            <p className="text-[11px] font-mono text-neutral-600">
              We reply within one working day. For urgent enquiries, WhatsApp is fastest.
            </p>
          </form>
        )}
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
          How we work
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-white max-w-4xl leading-tight">
          A five-step process from first message to launch-ready asset.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s) => (
            <div key={s.step} className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
              <div className="font-mono text-cyan-300 text-xs tracking-widest">STEP {s.step}</div>
              <h3 className="mt-3 text-white text-base font-light leading-snug">{s.title}</h3>
              <p className="mt-3 text-neutral-400 text-xs leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">Nerve Center</div>
          <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
            {LEGAL_NAME}
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">{ADDRESS_FULL}</p>
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
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
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
        maxLength={maxLength}
        className="mt-2 w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-400/60 focus:outline-none"
      />
    </div>
  );
}
