import { motion, useReducedMotion } from "framer-motion";

/**
 * PipelineRail - a thin SVG overlay that traces the capture pipeline
 * (SCAN -> POINT CLOUD -> DIGITAL TWIN -> DECISION) across a hero.
 * Decorative only; hidden from assistive tech.
 */
const NODES = [
  { x: 6, label: "SCAN" },
  { x: 36, label: "POINT CLOUD" },
  { x: 66, label: "DIGITAL TWIN" },
  { x: 94, label: "DECISION" },
];

export function PipelineRail({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="h-8 w-full">
        <line x1="0" y1="4" x2="100" y2="4" stroke="rgba(255,255,255,0.10)" strokeWidth="0.15" />
        <motion.line
          x1="0"
          y1="4"
          x2="100"
          y2="4"
          stroke="rgba(52,211,153,0.55)"
          strokeWidth="0.25"
          strokeDasharray="6 94"
          initial={{ strokeDashoffset: 100 }}
          animate={reduced ? undefined : { strokeDashoffset: [100, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        {NODES.map((n) => (
          <circle key={n.label} cx={n.x} cy="4" r="0.55" fill="rgb(52,211,153)" opacity="0.8" />
        ))}
      </svg>
      <div className="-mt-4 flex justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-neutral-500">
        {NODES.map((n) => (
          <span key={n.label}>{n.label}</span>
        ))}
      </div>
    </div>
  );
}
