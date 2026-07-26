import { useState } from "react";
import { Play } from "lucide-react";

export type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  description?: string;
  caption?: string;
  className?: string;
};

/**
 * Click-to-play YouTube facade. No iframe (and no third-party JS) until the
 * user actually clicks, keeping LCP/INP clean. Emits VideoObject JSON-LD.
 */
export function YouTubeEmbed({
  videoId,
  title,
  description,
  caption,
  className = "",
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: description ?? title,
    thumbnailUrl: thumb,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    publisher: {
      "@type": "Organization",
      name: "Novo Reperio",
    },
  };

  return (
    <figure className={`w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          >
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover opacity-70 transition group-hover:opacity-90"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/50 bg-black/60 backdrop-blur transition group-hover:border-emerald-300 group-hover:bg-emerald-400/20">
                <Play size={22} className="ml-1 text-emerald-300" />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-light text-white">
              {title}
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs font-mono uppercase tracking-widest text-neutral-500">
          {caption}
        </figcaption>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </figure>
  );
}

export function YouTubeReel({
  videos,
  className = "",
}: {
  videos: { videoId: string; title: string; caption?: string }[];
  className?: string;
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {videos.map((v) => (
        <YouTubeEmbed key={v.videoId} {...v} />
      ))}
    </div>
  );
}
