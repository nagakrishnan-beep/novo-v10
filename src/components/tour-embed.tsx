import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

export type TourEmbedProps = {
  url: string;
  title: string;
  poster?: string;
};

const GRID =
  "linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)";

/**
 * Click-to-load facade for a live tour iframe. No third-party iframe loads
 * until the visitor explicitly enters the tour.
 */
export function TourEmbed({ url, title, poster }: TourEmbedProps) {
  const [live, setLive] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#04060a] aspect-video md:aspect-auto md:h-[60vh] md:min-h-[420px]">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 backdrop-blur transition hover:border-emerald-400/60 hover:text-emerald-300"
      >
        <ExternalLink size={12} /> Open full screen
      </a>
      {live ? (
        <iframe
          src={url}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          aria-label={`Enter the interactive tour: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          {poster && /^https?:\/\//.test(poster) && (
            <img
              src={poster}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-500 group-hover:opacity-50 group-hover:scale-[1.02]"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{ backgroundImage: GRID, backgroundSize: "48px 48px" }}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/40 to-transparent"
          />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Live interactive tour
          </span>

          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/50 bg-black/60 backdrop-blur transition duration-300 group-hover:scale-110 group-hover:border-emerald-300 group-hover:bg-emerald-400/20">
              <Play size={26} className="ml-1 text-emerald-300" />
            </span>
            <span className="text-sm font-light text-neutral-200 transition group-hover:text-white">
              Enter the interactive tour
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
