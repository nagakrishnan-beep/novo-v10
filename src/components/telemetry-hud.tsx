import { useEffect, useState } from "react";
import { useIntensity } from "@/components/chrono";

/**
 * Decorative telemetry readout. Desktop only, aria-hidden, no layout shift.
 * Driven by the existing IntensityProvider scroll-velocity motion value.
 */
export function TelemetryHUD() {
  const { intensity, reduced } = useIntensity();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const unsub = intensity.on("change", (v: number) => {
      setValue(Math.round(v * 1000) / 1000);
    });
    return () => unsub();
  }, [intensity, reduced]);

  if (reduced) return null;

  const velocity = (value * 4).toFixed(2);
  const state = value > 0.18 ? "FLUID MICRO-MORPH" : "EDITORIAL GRID";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-40 hidden md:block"
    >
      <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
        <span className="text-neutral-500">Scroll velocity:</span>{" "}
        <span className="text-emerald-300/80">{velocity}</span>
        <span className="text-neutral-700"> · </span>
        <span className="text-neutral-500">State:</span>{" "}
        <span className="text-cyan-300/80">{state}</span>
      </div>
    </div>
  );
}
