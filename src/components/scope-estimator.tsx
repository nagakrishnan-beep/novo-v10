import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, Check } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/site";
import { trackEvent } from "@/components/site-chrome";
import {
  SPACE_TYPES,
  SIZE_BANDS,
  estimate,
  TC_LINE,
  type SpaceType,
  type SizeBand,
} from "@/lib/pricing";

const GOALS = ["Sell", "Build", "Operate", "Plan", "Document", "Train"] as const;
type Goal = (typeof GOALS)[number];

const OUTPUTS = [
  "Digital twin",
  "Point cloud (LiDAR)",
  "Scan-to-BIM",
  "360° tour",
  "Drone capture",
  "3D CGI / visualisation",
  "Web platform",
] as const;
type Output = (typeof OUTPUTS)[number];

const RATIONALE: Record<string, string> = {
  "Matterport 3D digital twin": "Walkable, measurable twin your audience can explore from anywhere.",
  "360° capture": "Panoramic coverage of every key position for orientation and context.",
  "LiDAR scanning": "Survey-grade point cloud at millimetre tolerance for engineering use.",
  "Scan-to-BIM (up to LOD 400)": "As-built model authored from the point cloud for design and coordination.",
  "Drone and aerial capture": "Roof, facade and site context that ground-level capture cannot reach.",
  "3D CGI / visualisation": "Rendered imagery for spaces that are unbuilt or mid-construction.",
  "Hosted web experience and embed": "Hosting, embeds and analytics so the asset stays live on your site.",
};

function buildWorkflow(
  goal: Goal | null,
  outputs: Output[],
  type: SpaceType | null,
  size: SizeBand | null,
): string[] {
  const O = new Set<string>(outputs);
  const list: string[] = [];
  const add = (v: string) => {
    if (!list.includes(v)) list.push(v);
  };

  if (
    O.has("Digital twin") ||
    O.has("360° tour") ||
    goal === "Sell" ||
    (type && ["airbnb", "residential", "commercial", "event-space", "hotel"].includes(type))
  ) {
    add("Matterport 3D digital twin");
    add("360° capture");
  }
  if (
    O.has("Scan-to-BIM") ||
    O.has("Point cloud (LiDAR)") ||
    goal === "Build" ||
    goal === "Operate" ||
    (type && ["office", "large-venue"].includes(type))
  ) {
    add("LiDAR scanning");
    if (O.has("Scan-to-BIM") || goal === "Build") add("Scan-to-BIM (up to LOD 400)");
  }
  if (O.has("Drone capture") || goal === "Plan" || type === "large-venue" || size === "10000-plus") {
    add("Drone and aerial capture");
  }
  if (O.has("3D CGI / visualisation")) add("3D CGI / visualisation");
  if (O.has("Web platform")) add("Hosted web experience and embed");

  if (list.length === 0) add("Matterport 3D digital twin");
  return list;
}

/**
 * ScopeEstimator - 5-step project assessment.
 * Fires GA4 events: assessment_start, assessment_complete, assessment_cta_click.
 */
export function ScopeEstimator({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [type, setType] = useState<SpaceType | null>(null);
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [size, setSize] = useState<SizeBand | null>(null);
  const [started, setStarted] = useState(false);

  const markStart = () => {
    if (!started) {
      trackEvent("assessment_start");
      setStarted(true);
    }
  };

  const result = useMemo(() => (type && size ? estimate(type, size) : null), [type, size]);
  const workflow = useMemo(
    () => buildWorkflow(goal, outputs, type, size),
    [goal, outputs, type, size],
  );

  function pickGoal(g: Goal) {
    markStart();
    setGoal(g);
    setStep(2);
  }
  function pickType(t: SpaceType) {
    markStart();
    setType(t);
    setStep(3);
  }
  function toggleOutput(o: Output) {
    markStart();
    setOutputs((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));
  }
  function pickSize(s: SizeBand) {
    markStart();
    setSize(s);
    trackEvent("assessment_complete", { goal, type, size: s, outputs: outputs.join(",") });
    setStep(5);
  }
  function reset() {
    setGoal(null);
    setType(null);
    setOutputs([]);
    setSize(null);
    setStep(1);
  }

  const qs = new URLSearchParams();
  if (goal) qs.set("goal", goal);
  if (type) qs.set("type", type);
  if (size) qs.set("size", size);
  if (outputs.length) qs.set("outputs", outputs.join(","));
  const contactHref = qs.toString() ? `/contact?${qs.toString()}` : "/contact";

  const waHref = (() => {
    if (!result || !type || !size) return WHATSAPP_URL;
    const typeLabel = SPACE_TYPES.find((t) => t.key === type)?.label ?? type;
    const sizeLabel = SIZE_BANDS.find((s) => s.key === size)?.label ?? size;
    const text = [
      "Hi Novo Reperio, I just completed the project assessment.",
      `Goal: ${goal ?? "not set"}`,
      `Space: ${typeLabel}`,
      `Size: ${sizeLabel}`,
      `Outputs: ${outputs.length ? outputs.join(", ") : "not sure yet"}`,
      `Recommended workflow: ${workflow.join(", ")}`,
      `Indicative scope: ${result.headline}`,
      "Can we set up a project assessment call?",
    ].join("\n");
    const base = WHATSAPP_URL.includes("?text=") ? WHATSAPP_URL : `${WHATSAPP_URL}?text=`;
    return base + encodeURIComponent(text);
  })();

  const wrap =
    variant === "compact"
      ? "border border-white/10 rounded-2xl p-6 bg-white/[0.02]"
      : "border border-emerald-400/20 rounded-2xl p-8 bg-emerald-400/[0.02]";

  const stepLabels = ["Goal", "Space", "Outputs", "Size", "Result"];

  const backLink = (to: 1 | 2 | 3 | 4, label: string) => (
    <button
      type="button"
      onClick={() => setStep(to)}
      className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-300"
    >
      ← {label}
    </button>
  );

  return (
    <div className={wrap} aria-labelledby="scope-estimator-title">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
        <Sparkles size={12} /> Project assessment
      </div>
      <h2
        id="scope-estimator-title"
        className="mt-3 text-2xl md:text-3xl font-light text-white leading-tight"
      >
        What does your project need?
      </h2>
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
        Four short questions about your goal, your space, the outputs you need and the
        approximate size. We return a recommended capture workflow and an indicative scope
        band from our published pricing. No email required.
      </p>

      {/* Progress */}
      <ol className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest">
        {[1, 2, 3, 4, 5].map((n) => (
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
              {stepLabels[n - 1]}
            </span>
          </li>
        ))}
      </ol>

      {/* Step 1 - goal */}
      {step === 1 && (
        <fieldset className="mt-6">
          <legend className="text-sm text-neutral-300 mb-3">What are you trying to achieve?</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => pickGoal(g)}
                className="text-left px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-200 transition"
              >
                {g}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 2 - space */}
      {step === 2 && (
        <fieldset className="mt-6">
          <legend className="text-sm text-neutral-300 mb-3">What are we capturing?</legend>
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
          {backLink(1, "Change goal")}
        </fieldset>
      )}

      {/* Step 3 - outputs (multi) */}
      {step === 3 && (
        <fieldset className="mt-6">
          <legend className="text-sm text-neutral-300 mb-3">
            What outputs do you need? Pick as many as apply.
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {OUTPUTS.map((o) => {
              const on = outputs.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleOutput(o)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition flex items-center justify-between gap-2 ${
                    on
                      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                      : "border-white/10 bg-white/[0.02] text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-200"
                  }`}
                >
                  {o}
                  {on && <Check size={14} />}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
            >
              Continue <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-300"
            >
              ← Change space
            </button>
          </div>
        </fieldset>
      )}

      {/* Step 4 - size */}
      {step === 4 && (
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
          {backLink(3, "Change outputs")}
        </fieldset>
      )}

      {/* Step 5 - result */}
      {step === 5 && result && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
            Recommended capture workflow
          </div>
          <ul className="mt-4 space-y-3">
            {workflow.map((w) => (
              <li key={w} className="flex gap-3">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <div className="text-[15px] md:text-base text-white font-light">{w}</div>
                  {RATIONALE[w] && (
                    <div className="text-sm text-neutral-400">{RATIONALE[w]}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-xs font-mono uppercase tracking-[0.3em] text-emerald-300">
            Indicative scope
          </div>
          <div className="mt-3 text-2xl md:text-3xl font-light text-white leading-tight">
            {result.headline}
          </div>
          {result.note && <p className="mt-2 text-sm text-neutral-400">{result.note}</p>}
          <p className="mt-4 text-xs font-mono text-neutral-500">{TC_LINE}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contactHref}
              onClick={() =>
                trackEvent("assessment_cta_click", { where: "contact", goal, type, size })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-emerald-300"
            >
              Request a project assessment <ArrowRight size={14} />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("assessment_cta_click", { where: "whatsapp", goal, type, size })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-emerald-400/50 hover:text-emerald-300"
            >
              <MessageCircle size={14} /> WhatsApp us
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
