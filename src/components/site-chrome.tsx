import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Menu, X } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { LEGAL_NAME, SOCIALS } from "@/lib/site";


type ActiveKey =
  | "home"
  | "digital-twins"
  | "reality-capture"
  | "solutions"
  | "services"
  | "industries"
  | "works"
  | "about"
  | "insights"
  | "contact"
  | null;

const NAV: { key: ActiveKey; label: string; to: any }[] = [
  { key: "digital-twins", label: "Digital Twins", to: "/digital-twins" },
  { key: "reality-capture", label: "Reality Capture", to: "/reality-capture" },
  { key: "solutions", label: "Solutions", to: "/solutions" },
  { key: "industries", label: "Industries", to: "/industries" },
  { key: "works", label: "Works", to: "/works" },
  { key: "insights", label: "Insights", to: "/insights" },
  { key: "about", label: "About", to: "/about" },
];

const FOOTER_NAV: { key: string; label: string; to: any }[] = [
  ...NAV.map((n) => ({ key: String(n.key), label: n.label, to: n.to })),
  { key: "contact", label: "Contact", to: "/contact" },
  { key: "faq", label: "FAQ", to: "/faq" },
];

export function SiteHeader({ active = null }: { active?: ActiveKey }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
        <div className="flex items-center px-6 md:px-12 py-4 gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Novo Reperio home">
            <img src="/novo-logo.png" alt="Novo Reperio" className="h-12 md:h-14 w-auto" />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden ml-auto p-2 -mr-2 text-neutral-300 hover:text-emerald-300"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-wider uppercase text-neutral-400 ml-auto">
            {NAV.map((n) => (
              <Link
                key={n.key ?? n.label}
                to={n.to}
                className={
                  active === n.key
                    ? "text-emerald-300"
                    : "hover:text-emerald-300 transition"
                }
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/estimate"
              onClick={() => trackEvent("cta_click", { label: "Get an assessment" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/10"
            >
              Get an assessment
            </Link>
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-[min(88vw,360px)] bg-[#020203] border-l border-neutral-900 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-neutral-300 hover:text-emerald-300"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {NAV.map((n) => (
                  <li key={n.key ?? n.label}>
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-sm tracking-wider uppercase transition ${
                        active === n.key ? "text-emerald-300" : "text-neutral-300 hover:text-emerald-300"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-neutral-900">
                <Link
                  to="/estimate"
                  onClick={() => {
                    setOpen(false);
                    trackEvent("cta_click", { label: "Get an assessment" });
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/10"
                >
                  Get an assessment
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full mt-3 px-5 py-3 rounded-full bg-emerald-500/10 text-emerald-300 text-sm hover:bg-emerald-500/20"
                >
                  Contact us
                </Link>
              </div>

              <div className="mt-8">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">Explore</div>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li><Link to="/contact" onClick={() => setOpen(false)} className="hover:text-emerald-300">Contact</Link></li>
                  <li><Link to="/faq" onClick={() => setOpen(false)} className="hover:text-emerald-300">FAQ</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900 bg-[#020203] mt-0">
      <div className="px-6 md:px-24 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/novo-logo.png" alt="Novo Reperio" className="h-12 md:h-14 w-auto opacity-90" />
          <p className="mt-4 text-sm text-neutral-400 max-w-md leading-relaxed">
            {LEGAL_NAME}, spatial capture studio in Kuala Lumpur since 2014. Matterport
            digital twins, 360° tours, drone capture, CGI and UE5 experiences for venues,
            developers and enterprises worldwide.
          </p>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-neutral-300">
            {FOOTER_NAV.map((n) => (
              <li key={n.key}>
                <Link to={n.to} className="hover:text-emerald-300">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4">Follow</div>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="hover:text-emerald-300 inline-flex items-center gap-2"><Instagram size={14}/> Instagram</a></li>
            <li><a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="hover:text-emerald-300 inline-flex items-center gap-2"><Facebook size={14}/> Facebook</a></li>
            <li><a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-300 inline-flex items-center gap-2"><Linkedin size={14}/> LinkedIn</a></li>
            <li><a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="hover:text-emerald-300 inline-flex items-center gap-2"><Youtube size={14}/> YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-900 px-6 md:px-24 py-6 flex items-center justify-center text-xs font-mono text-neutral-500">
        <span>© {new Date().getFullYear()} {LEGAL_NAME}. All rights reserved.</span>
      </div>
    </footer>
  );
}

/** Empty media placeholder - used everywhere marked [PENDING-DECISION]. */
export function MediaSlot({
  label = "MEDIA PENDING",
  ratio = "aspect-video",
  className = "",
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`${ratio} w-full rounded-xl border border-white/10 bg-neutral-950 flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,211,153,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <span className="relative text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-500">
        {label}
      </span>
    </div>
  );
}

/** Lazy click-to-activate iframe (Matterport, YouTube) - protects Core Web Vitals. */
export function LazyEmbed({
  src,
  title,
  caption,
  ratio = "aspect-video",
}: {
  src: string;
  title: string;
  caption?: string;
  ratio?: string;
}) {
  return (
    <figure className="w-full">
      <div className={`${ratio} w-full rounded-xl border border-white/10 bg-neutral-950 overflow-hidden relative group`}>
        <ActivateableIframe src={src} title={title} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs font-mono uppercase tracking-wider text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ActivateableIframe({ src, title }: { src: string; title: string }) {
  return (
    <ClickToLoad src={src} title={title} />
  );
}

// Client-only click-to-load wrapper.
function ClickToLoad({ src, title }: { src: string; title: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        src={src}
        title={title}
        allow="fullscreen; vr; xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    );
  }
  return (
    <button
      onClick={() => setOn(true)}
      className="absolute inset-0 flex items-center justify-center w-full h-full"
      aria-label={`Load interactive tour: ${title}`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-emerald-300">
        <span className="w-14 h-14 rounded-full border border-emerald-400/60 flex items-center justify-center group-hover:bg-emerald-400/10 transition">
          <span className="w-0 h-0 border-l-[10px] border-l-emerald-300 border-y-[7px] border-y-transparent ml-1" />
        </span>
        <span className="text-xs font-mono uppercase tracking-wider">
          Load interactive tour
        </span>
        <span className="text-xs font-mono text-neutral-500">
          {title}
        </span>
      </div>
    </button>
  );
}

/** Very small util: fire GA4 + Meta Pixel events, no-op if not present. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", name, params ?? {});
  }
  if (w.fbq) {
    // Map select events to Meta standard events
    if (name === "form_submit_success") {
      w.fbq("track", "Lead", params ?? {});
    } else if (name === "assessment_complete") {
      w.fbq("track", "Lead", { content_name: "project_assessment", ...(params ?? {}) });
    } else if (name === "whatsapp_click") {
      w.fbq("track", "Contact", params ?? {});
    } else {
      w.fbq("trackCustom", name, params ?? {});
    }
  }
}

export function BreadcrumbNav({ items }: { items: { label: string; to?: any }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-mono uppercase tracking-wider text-neutral-500 flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.to ? (
            <Link to={it.to} className="hover:text-emerald-300">{it.label}</Link>
          ) : (
            <span className="text-neutral-300">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="text-neutral-700">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function TrackedLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent("cta_click", { href: props.href, label: typeof children === "string" ? children : undefined });
        props.onClick?.(e as any);
      }}
    >
      {children}
    </a>
  );
}

export type { ReactNode };
