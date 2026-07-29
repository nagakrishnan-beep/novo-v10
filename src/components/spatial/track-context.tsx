import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * TrackContext - a single source of truth for which business track the visitor
 * is exploring (sell / build / operate / plan).
 *
 * It also emits `novo:*` DOM CustomEvents so an external assistant layer
 * (YAL-E) can subscribe to visitor intent without importing React state:
 *
 *   window.addEventListener("novo:track", (e) => e.detail.track)
 *   window.addEventListener("novo:intent", (e) => e.detail)
 */
export type TrackKey = "sell" | "build" | "operate" | "plan";

type TrackCtx = {
  track: TrackKey;
  setTrack: (t: TrackKey) => void;
  emit: (name: string, detail?: Record<string, unknown>) => void;
};

const Ctx = createContext<TrackCtx | null>(null);

export function emitNovoEvent(name: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(`novo:${name}`, { detail }));
  } catch {
    /* no-op */
  }
}

export function TrackProvider({
  children,
  initial = "sell",
}: {
  children: ReactNode;
  initial?: TrackKey;
}) {
  const [track, setTrackState] = useState<TrackKey>(initial);

  const setTrack = useCallback((t: TrackKey) => {
    setTrackState(t);
    emitNovoEvent("track", { track: t });
  }, []);

  const value = useMemo<TrackCtx>(
    () => ({ track, setTrack, emit: emitNovoEvent }),
    [track, setTrack],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrack() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useTrack must be used inside <TrackProvider>");
  return c;
}
