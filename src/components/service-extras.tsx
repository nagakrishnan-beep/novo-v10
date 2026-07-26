import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Ruler, Repeat, LineChart } from "lucide-react";
import { PUBLISHED_BANDS, SUBSCRIPTION_LINE, TC_LINE } from "@/lib/pricing";

/** "What your twin does every month": recurring-value reframe. */
export function MonthlyValue({
  bullets,
  intro,
}: {
  bullets: string[];
  intro?: string;
}) {
  return (
    <section className="px-6 md:px-24 py-16 border-b border-neutral-900">
      <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-4">
        Recurring value
      </div>
      <h2 className="text-3xl md:text-4xl font-light text-white leading-tight max-w-3xl">
        What your twin does every month.
      </h2>
      {intro && (
        <p className="mt-4 max-w-3xl text-sm text-neutral-400 leading-relaxed">
          {intro}
        </p>
      )}
      <ul className="mt-8 grid md:grid-cols-2 gap-3 max-w-5xl">
        {bullets.map((b) => (
          <li
            key={b}
            className="border border-white/10 rounded-lg p-5 bg-white/[0.02] text-sm text-neutral-300 leading-relaxed"
          >
            <span className="text-emerald-300 mr-2">▸</span>
            {b}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-emerald-200">
        Capture once. Keep it working, hosting &amp; subscription from
        <span className="text-emerald-300"> RM499/month</span>.
      </p>
    </section>
  );
}

/** Published price bands - services hub + hospitality. */
export function PricingBands({ id = "pricing" }: { id?: string }) {
  return (
    <section
      id={id}
      className="px-6 md:px-24 py-16 border-b border-neutral-900 scroll-mt-24"
    >
      <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-4">
        Indicative pricing (MYR)
      </div>
      <h2 className="text-3xl md:text-4xl font-light text-white leading-tight max-w-3xl">
        Published bands so you can plan the budget.
      </h2>
      <p className="mt-4 max-w-3xl text-sm text-neutral-400 leading-relaxed">
        Every space is different. These starting bands cover our most common
        engagements; final quotes are confirmed after a free scoping walkthrough.
      </p>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PUBLISHED_BANDS.map((b) => (
          <div
            key={b.key}
            className="border border-white/10 rounded-xl p-6 bg-white/[0.02] flex flex-col h-full"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300">
              {b.title}
            </div>
            <div className="mt-3 text-2xl font-light text-white">{b.price}</div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed flex-1">
              {b.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs font-mono text-neutral-500">{TC_LINE}</p>
      <p className="mt-2 text-xs font-mono text-neutral-500">➕ {SUBSCRIPTION_LINE}</p>
    </section>
  );
}

/** Verified-by-scan explainer strip - services + industries hub. */
export function VerifiedByScanStrip() {
  return (
    <section className="px-6 md:px-24 py-14 border-b border-neutral-900">
      <div className="max-w-5xl border border-emerald-400/20 rounded-2xl p-6 md:p-8 bg-emerald-400/[0.02] flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full border border-emerald-400/60 flex items-center justify-center">
            <ShieldCheck className="text-emerald-300" size={18} />
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300">
            Verified by scan
          </div>
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Every Novo Reperio twin is measured geometry, dimensions and layouts
          you can verify inside the tour, not marketing copy.{" "}
          <Link to="/methodology" className="text-emerald-300 hover:text-emerald-200 underline-offset-4 hover:underline inline-flex items-center gap-1">
            How scan-verified measurement works <ArrowRight size={12} />
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Free/open layer statement - /services hub + /about. */
export function FreeOpenLayer() {
  return (
    <section className="px-6 md:px-24 py-14 border-b border-neutral-900">
      <div className="max-w-4xl">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-3">
          Always free
        </div>
        <p className="text-lg md:text-xl font-light text-white leading-relaxed">
          Explore any live sample tour · scoping consultations · our guides and
          insights.{" "}
          <span className="text-neutral-400">
            You pay for capture, production and the subscription that keeps your
            twin alive.
          </span>
        </p>
      </div>
    </section>
  );
}

/** Small three-tile "what monthly hosting covers" strip. */
export function SubscriptionTiles() {
  const tiles = [
    { icon: Repeat, title: "Hosted & embed-ready", body: "Runs everywhere: your site, OTAs, RFP replies, GMB, sales decks." },
    { icon: LineChart, title: "Usage analytics", body: "Visits, dwell, room-by-room engagement piped to your sales team." },
    { icon: Ruler, title: "Scheduled refresh", body: "Recapture programs keep finishes, layouts and menus current." },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {tiles.map((t) => (
        <div
          key={t.title}
          className="border border-white/10 rounded-lg p-5 bg-white/[0.02]"
        >
          <t.icon className="text-emerald-300" size={18} />
          <div className="mt-3 text-sm text-white font-light">{t.title}</div>
          <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{t.body}</p>
        </div>
      ))}
    </div>
  );
}
