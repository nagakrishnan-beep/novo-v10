import { useCallback, useRef, useState } from "react";

/**
 * CompareSlider - drag-to-reveal "reality vs digital twin" comparison.
 * Keyboard accessible via the range input.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Reality",
  afterLabel = "Digital twin",
  ratio = "aspect-[16/10]",
  className = "",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  ratio?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <figure className={className}>
      <div
        ref={wrapRef}
        className={`relative w-full ${ratio} overflow-hidden rounded-2xl border border-white/10 bg-black select-none touch-none`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
        }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-125"
          />
        </div>

        {/* handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-emerald-300/80"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/70 bg-black/70 backdrop-blur-sm" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-emerald-300">
            ↔
          </span>
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-300">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300">
          {afterLabel}
        </span>

        <label className="sr-only" htmlFor="compare-range">
          Reveal the digital twin
        </label>
        <input
          id="compare-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-3 mx-auto w-[85%] cursor-ew-resize opacity-0 focus-visible:opacity-100"
          aria-label="Reveal the digital twin"
        />
      </div>
    </figure>
  );
}
