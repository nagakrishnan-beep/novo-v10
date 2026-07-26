import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/site";
import { trackEvent } from "@/components/site-chrome";
import {
  SPACE_TYPES,
  SIZE_BANDS,
  estimate,
  whatsappEstimateUrl,
  SUBSCRIPTION_LINE,
  TC_LINE,
  type SpaceType,
  type SizeBand,
} from "@/lib/pricing";

/**
 * ScopeEstimator - 3-step client-side estimator.
 * Fires GA4 events: estimator_start, estimator_complete, estimator_cta_click.
 */
export function ScopeEstimator({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<SpaceType | null>(null);
  const [size, setSize] = useState<SizeBand | null>(null);
  const [started, setStarted] = useState(false);

  const markStart = () => {
    if (!started) {
      trackEvent("estimator_start");
      setStarted(true);
    }
  };

  const result = useMemo(() => (type && size ? estimate(type, size) : null), [type, size]);

  function pickType(t: SpaceType) {
    markStart();
    setType(t);
    setStep(2);
  }
  function pickSize(s: SizeBand) {
    markStart();
    setSize(s);
    if (type) {
      trackEvent("estimator_complete", { type, size: s });
      setStep(3);
    }
  }
  function reset() {
    setType(null);
    setSize(null);
    setStep(1);
  }

  const contactHref =
    type && size ? `/contact?type=${type}&size=${size}` : "/contact";
  const waHref =
    type && size && result ? whatsappEstimateUrl(WHATSAPP_URL, type, size, result) : WHATSAPP_URL;

  const wrap =
    variant === "compact"
      ? "border border-white/10 rounded-2xl p-6 bg-white/[0.02]"
      : "border border-emerald-400/20 rounded-2xl p-8 bg-emerald-400/[0.02]";

  return (
    <div className={wrap} aria-labelledby="scope-estimator-title">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
        <Sparkles size={12} /> 60-second estimate
      </div>
      <h2
        id="scope-estimator-title"
        className="mt-3 text-2xl md:text-3xl font-light text-white leading-tight"
      >
        Get an instant scope estimate.
      </h2>
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
        Pick a space and a size, and we'll show you an indicative band from our
        published pricing. No email required.
      </p>

      {/* Progress */}
      <ol className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-widest">
        {[1, 2, 3].map((n) => (
          <li key={n} className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                step >= n
                  ? "border-emerald-400 text-emerald-300"
                  : "border-white/15 text-neutral-500"
              }`}
            >
              {n}
            </span>
            <span className={step >= n ? "text-emerald-300" : "text-neutral-500"}>
              {n === 1 ? "Space" : n === 2 ? "Size" : "Result"}
            </span>
          </li>
        ))}
      </ol>

      {/* Step 1 */}
      {step === 1 && (
        <fieldset className="mt-6">
          <legend className="text-sm text-neutral-300 mb-3">What kind of space?</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SPACE_TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => pickType(t.key)}
                className="text-left px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-200 transition"
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <fieldset className="mt-6">
          <legend className="text-sm text-neutral-300 mb-3">Approximate size?</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SIZE_BANDS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => pickSize(s.key)}
                className="px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-200 transition"
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-300"
          >
            ← Change space
          </button>
        </fieldset>
      )}

      {/* Step 3: Result */}
      {step === 3 && result && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
            Indicative estimate
          </div>
          <div className="mt-3 text-2xl md:text-3xl font-light text-white leading-tight">
            {result.headline}
          </div>
          {result.note && (
            <p className="mt-2 text-sm text-neutral-400">{result.note}</p>
          )}
          <p className="mt-4 text-sm text-emerald-200">➕ {SUBSCRIPTION_LINE}</p>
          <p className="mt-3 text-xs font-mono text-neutral-500">{TC_LINE}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contactHref}
              onClick={() =>
                trackEvent("estimator_cta_click", { where: "contact", type, size })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
            >
              Book a scoping consultation <ArrowRight size={14} />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("estimator_cta_click", { where: "whatsapp", type, size })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
            >
              <MessageCircle size={14} /> WhatsApp us this estimate
            </a>
            <button
              type="button"
              onClick={reset}
              className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-300 px-3 py-3"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
