import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Global multi-stage spring laser trail.
 *
 * - Fast focus ring + inner dot follows the pointer on a stiff spring.
 * - Slower elastic glow trails behind on a softer spring.
 * - Ring/dot morph from emerald → cyan and scale up when the pointer is over
 *   any interactive target (delegated: <a>, <button>, [role="button"],
 *   [data-target], [data-hover-target]).
 * - Floating telemetry chip shows live absolute coordinates (`LDR_IDX // X:.. Y:..`).
 * - Skipped on coarse pointers and when prefers-reduced-motion is set.
 */
export function LaserTrail() {
  const reduced = !!useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Fast focus node
  const fx = useSpring(x, { damping: 28, stiffness: 180, mass: 0.6 });
  const fy = useSpring(y, { damping: 28, stiffness: 180, mass: 0.6 });

  // Slow elastic glow
  const gx = useSpring(x, { damping: 40, stiffness: 140, mass: 0.8 });
  const gy = useSpring(y, { damping: 40, stiffness: 140, mass: 0.8 });

  const ringScale = useTransform([] as never, () => 1);
  // (ringScale unused — we use CSS class scale via `hovered` instead for crisp toggling.)

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const isTarget = (el: EventTarget | null): boolean => {
      if (!(el instanceof Element)) return false;
      return !!el.closest(
        'a, button, [role="button"], [data-target], [data-hover-target], input, textarea, select, summary'
      );
    };

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setCoords({
        x: Math.round(e.clientX + window.scrollX),
        y: Math.round(e.clientY + window.scrollY),
      });
    };
    const onOver = (e: PointerEvent) => {
      if (isTarget(e.target)) setHovered(true);
    };
    const onOut = (e: PointerEvent) => {
      // Only unset when leaving into a non-target (or into null)
      const to = (e as PointerEvent).relatedTarget as EventTarget | null;
      if (!isTarget(to)) setHovered(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Slow elastic glow */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[60] pointer-events-none rounded-full mix-blend-screen hidden md:block"
        style={{
          x: gx,
          y: gy,
          translateX: "-50%",
          translateY: "-50%",
          width: 176,
          height: 176,
          background: hovered
            ? "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(52,211,153,0.08) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(52,211,153,0.22) 0%, rgba(34,211,238,0.06) 45%, transparent 70%)",
          filter: "blur(14px)",
          transition: "background 220ms ease",
        }}
      />

      {/* Focus ring */}
      <motion.div
        aria-hidden
        className={`fixed top-0 left-0 z-[61] pointer-events-none rounded-full flex items-center justify-center hidden md:flex transition-[transform,border-color,background-color] duration-200 ${
          hovered
            ? "border-cyan-300 bg-cyan-400/10 scale-150"
            : "border-emerald-400 bg-transparent scale-100"
        }`}
        style={{
          x: fx,
          y: fy,
          translateX: "-50%",
          translateY: "-50%",
          width: 24,
          height: 24,
          borderWidth: 1,
          borderStyle: "solid",
          boxShadow: hovered
            ? "0 0 22px rgba(34,211,238,0.55)"
            : "0 0 18px rgba(52,211,153,0.35)",
        }}
      >
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-200 ${
            hovered ? "bg-cyan-300" : "bg-emerald-300"
          }`}
        />
      </motion.div>

      {/* Telemetry chip */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[62] pointer-events-none font-mono text-[9px] tracking-wider uppercase text-emerald-300/80 bg-neutral-950/80 border border-white/10 px-2 py-1 rounded hidden md:block"
        style={{
          x: fx,
          y: fy,
          translateX: 22,
          translateY: -28,
          color: hovered ? "rgb(103 232 249)" : undefined,
          borderColor: hovered
            ? "rgba(34,211,238,0.35)"
            : "rgba(255,255,255,0.08)",
          transition: "color 200ms ease, border-color 200ms ease",
        }}
      >
        LDR_IDX // X:{coords.x} Y:{coords.y}
      </motion.div>
    </>
  );
}
