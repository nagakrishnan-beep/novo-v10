import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*                        Intensity Provider                          */
/* ------------------------------------------------------------------ */

type IntensityCtx = {
  /** 0 = still, 1 = fast scroll. Spring-smoothed. */
  intensity: MotionValue<number>;
  /** raw absolute velocity (0 - ~5) */
  velocity: MotionValue<number>;
  scrollY: MotionValue<number>;
  /** 0-1, time-of-day (0=dawn, .33=day, .66=dusk, 1=night) — client-set */
  chrono: number;
  reduced: boolean;
};

const Ctx = createContext<IntensityCtx | null>(null);

export function useIntensity() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useIntensity must be used inside <IntensityProvider>");
  return c;
}

export function IntensityProvider({ children }: { children: ReactNode }) {
  const reduced = !!useReducedMotion();
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);

  // absolute value, normalized
  const absVelocity = useMotionValue(0);
  useMotionValueEvent(rawVelocity, "change", (v) => {
    // typical fast scroll ~ 3000-5000 px/s
    const norm = Math.min(1, Math.abs(v) / 3500);
    absVelocity.set(norm);
  });

  const intensity = useSpring(absVelocity, {
    stiffness: 120,
    damping: 30,
    mass: 0.6,
  });

  const [chrono, setChrono] = useState(0.33); // default "day"
  useEffect(() => {
    const h = new Date().getHours();
    // dawn 5-8, day 8-17, dusk 17-20, night 20-5
    if (h >= 5 && h < 8) setChrono(0);
    else if (h >= 8 && h < 17) setChrono(0.33);
    else if (h >= 17 && h < 20) setChrono(0.66);
    else setChrono(1);
  }, []);

  const value: IntensityCtx = {
    intensity: reduced ? useMotionValue(0) : intensity,
    velocity: absVelocity,
    scrollY,
    chrono,
    reduced,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ------------------------------------------------------------------ */
/*                        Aurora Backdrop                             */
/* ------------------------------------------------------------------ */

const CHRONO_PALETTES = [
  // dawn
  { a: "#1a0f2e", b: "#7c3aed", c: "#22d3ee", d: "#f472b6" },
  // day
  { a: "#020203", b: "#065f46", c: "#10b981", d: "#06b6d4" },
  // dusk
  { a: "#1a0a1f", b: "#f43f5e", c: "#f59e0b", d: "#8b5cf6" },
  // night
  { a: "#020203", b: "#1e1b4b", c: "#3b82f6", d: "#22d3ee" },
];

function pickPalette(chrono: number) {
  if (chrono < 0.16) return CHRONO_PALETTES[0];
  if (chrono < 0.5) return CHRONO_PALETTES[1];
  if (chrono < 0.83) return CHRONO_PALETTES[2];
  return CHRONO_PALETTES[3];
}

export function AuroraBackdrop() {
  const { intensity, scrollY, chrono, reduced } = useIntensity();
  const palette = pickPalette(chrono);

  const rot = useTransform(scrollY, [0, 4000], [0, 15]);
  const shiftY = useTransform(scrollY, [0, 4000], ["0%", "-30%"]);
  const opacity = useTransform(intensity, [0, 1], [0.55, 0.9]);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: palette.a }}
      />
      <motion.div
        className="absolute -inset-[30%]"
        style={{
          rotate: rot,
          y: shiftY,
          opacity,
          background: `
            radial-gradient(60% 40% at 20% 30%, ${palette.b}55 0%, transparent 65%),
            radial-gradient(50% 50% at 80% 20%, ${palette.c}44 0%, transparent 60%),
            radial-gradient(55% 45% at 60% 80%, ${palette.d}3a 0%, transparent 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.08, 1],
                x: ["0%", "3%", "0%"],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      {/* vignette that darkens on fast scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #000 100%)",
          opacity: useTransform(intensity, [0, 1], [0.4, 0.85]),
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                        Liquid Cursor                               */
/* ------------------------------------------------------------------ */

export function LiquidCursor() {
  const { intensity, reduced } = useIntensity();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.4 });
  const bx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.9 });
  const by = useSpring(y, { stiffness: 90, damping: 20, mass: 0.9 });

  useEffect(() => {
    if (reduced) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    const handle = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [x, y, reduced]);

  if (reduced) return null;

  const scale = useTransform(intensity, [0, 1], [1, 1.8]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[70] pointer-events-none rounded-full mix-blend-screen hidden md:block"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: 12,
          height: 12,
          background: "rgb(34 211 238)",
          boxShadow: "0 0 24px rgba(34,211,238,0.7)",
        }}
      />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[69] pointer-events-none rounded-full mix-blend-screen hidden md:block"
        style={{
          x: bx,
          y: by,
          translateX: "-50%",
          translateY: "-50%",
          width: 120,
          height: 120,
          scale,
          background:
            "radial-gradient(circle, rgba(52,211,153,0.35) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*                       Kinetic Text                                 */
/* ------------------------------------------------------------------ */

/** Headline text that tightens tracking and compresses on velocity. */
export function KineticHeadline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { intensity } = useIntensity();
  const letterSpacing = useTransform(intensity, [0, 1], ["-0.02em", "-0.06em"]);
  const scaleY = useTransform(intensity, [0, 1], [1, 0.82]);
  const filter = useTransform(intensity, (v) => `blur(${v * 2}px)`);
  const skewY = useTransform(intensity, [0, 1], [0, -1.5]);

  return (
    <motion.h1
      style={{
        letterSpacing,
        scaleY,
        skewY,
        filter,
        transformOrigin: "left top",
      }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

/** Body copy that dims on fast scroll. */
export function KineticBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { intensity } = useIntensity();
  const opacity = useTransform(intensity, [0, 1], [1, 0.35]);
  const filter = useTransform(intensity, (v) => `blur(${v * 4}px)`);
  return (
    <motion.p style={{ opacity, filter }} className={className}>
      {children}
    </motion.p>
  );
}

/** Small eyebrow labels that widen tracking on velocity. */
export function KineticEyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { intensity } = useIntensity();
  const letterSpacing = useTransform(intensity, [0, 1], ["0.4em", "0.7em"]);
  const color = useTransform(
    intensity,
    [0, 1],
    ["rgb(52 211 153)", "rgb(34 211 238)"],
  );
  return (
    <motion.span style={{ letterSpacing, color }} className={className}>
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*                       Magnetic Card                                */
/* ------------------------------------------------------------------ */

export function MagneticCard({
  children,
  className = "",
  strength = 12,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const { reduced } = useIntensity();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionEl = motion[as] as typeof motion.div;

  return (
    <MotionEl
      ref={ref as never}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </MotionEl>
  );
}

/* ------------------------------------------------------------------ */
/*                       Reveal on view                               */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
