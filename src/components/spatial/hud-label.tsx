/**
 * HudLabel - the small technical caption pair used as a spatial accent.
 * Purely presentational, no motion, safe to server-render.
 */
export function HudLabel({
  k,
  v,
  className = "",
}: {
  k: string;
  v?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] ${className}`}
    >
      <span className="text-neutral-500">{k}</span>
      {v && (
        <>
          <span aria-hidden="true" className="h-px w-4 bg-emerald-400/40" />
          <span className="text-emerald-300">{v}</span>
        </>
      )}
    </span>
  );
}

/** A horizontal rail of HUD readouts. */
export function HudRail({
  items,
  className = "",
}: {
  items: { k: string; v: string }[];
  className?: string;
}) {
  return (
    <dl
      className={`flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.28em] ${className}`}
    >
      {items.map((it) => (
        <div key={it.k} className="flex items-center gap-2">
          <dt className="text-neutral-500">{it.k}</dt>
          <span aria-hidden="true" className="h-px w-4 bg-emerald-400/40" />
          <dd className="text-emerald-300">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
