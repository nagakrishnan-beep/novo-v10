import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { LaserTrail } from "@/components/laser-trail";
import { getService, getNextService, SERVICES } from "@/lib/services";
import { YouTubeEmbed } from "@/components/youtube-embed";

const WHATSAPP_URL = "https://wa.me/60172029996";
const WP_MEDIA = "https://novoreperio.com/wp-content/uploads/2026/07/";

const SERVICE_VIDEOS: Record<string, { videoId: string; title: string }> = {
  "spatial-capture-digital-twins": {
    videoId: "U-VXk6MdxSI",
    title: "Matterport measurement tool — measure any space from the twin",
  },
};

const SERVICE_GALLERIES: Record<string, { title: string; files: string[] }> = {
  "photoreal-cgi-stills": {
    title: "3D Rendering Showcase",
    files: [
      "3D-Rendering-balcony-view-scaled.webp",
      "3D-Rendering-common-area-scaled.webp",
      "3D-Rendering-entrance-sunset-scaled.webp",
      "3D-Rendering-exterior-facade-scaled.jpeg",
      "3D-Rendering-exterior-facade2-scaled.webp",
      "3D-Rendering-facade-klcc-scaled.webp",
      "3D-Rendering-liftlobby-scaled.webp",
      "3D-Rendering-piazza-scaled.webp",
      "3D-Rendering-pool-facade-scaled.webp",
      "3D-Rendering-pool-nightview.jpeg",
    ],
  },
  "commercial-photography": {
    title: "Interior Photography Gallery",
    files: [1, 2, 3, 4, 5].map(
      (n) => `Interior-Photography-${n}-scaled.webp`,
    ),
  },
};

/** Turns "3D-Rendering-pool-nightview.jpeg" into descriptive alt text. */
function altFromFilename(file: string): string {
  const base = file
    .replace(/\.[a-z]+$/i, "")
    .replace(/-scaled$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b(\d)\b/g, "$1")
    .trim();
  return `${base.charAt(0).toUpperCase()}${base.slice(1)} — Novo Reperio`;
}


export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service not found — Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const s = loaderData.service;
    const title = `${s.title} — Novo Reperio`;
    const desc = s.tagline;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:image", content: s.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: s.image },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: ServiceNotFound,
  errorComponent: ServiceError,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const next = getNextService(service.slug);

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <LaserTrail />
      <SiteHeader active="services" />

      <section className="px-6 md:px-24 pt-16 pb-6 border-b border-neutral-900">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 hover:text-cyan-300"
        >
          <ArrowLeft size={14} /> All services
        </Link>
      </section>

      {/* Nameplate + hero */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          {service.tier === "core" ? "Core service" : "Supporting service"}
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-white max-w-5xl">
          {service.title}
        </h1>
        <p className="mt-6 text-neutral-400 max-w-3xl leading-relaxed text-lg">
          {service.tagline}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
          Best for · {service.bestFor}
        </div>
      </section>

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900 grid md:grid-cols-2 gap-10 items-start">
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
            What we deliver
          </div>
          <p className="text-neutral-300 leading-relaxed">
            {service.description}
          </p>
          <ul className="mt-6 space-y-3">
            {service.benefits.map((b: string) => (
              <li key={b} className="flex items-start gap-3 text-neutral-300 text-sm">
                <span className="text-cyan-400">+</span> {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black text-xs font-mono uppercase tracking-widest hover:bg-cyan-300"
            >
              Request Quote <ArrowRight size={14} />
            </Link>
            {service.exampleUrl && (
              <a
                href={service.exampleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
              >
                View Example
              </a>
            )}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Service video */}
      {SERVICE_VIDEOS[service.slug] && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
            Watch it work
          </div>
          <div className="max-w-4xl">
            <YouTubeEmbed
              videoId={SERVICE_VIDEOS[service.slug].videoId}
              title={SERVICE_VIDEOS[service.slug].title}
              description={service.tagline}
              caption={SERVICE_VIDEOS[service.slug].title}
            />
          </div>
        </section>
      )}

      {/* Image gallery */}
      {SERVICE_GALLERIES[service.slug] && (
        <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
            {SERVICE_GALLERIES[service.slug].title}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_GALLERIES[service.slug].files.map((f) => (
              <figure
                key={f}
                className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-neutral-950"
              >
                <img
                  src={`${WP_MEDIA}${f}`}
                  alt={altFromFilename(f)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Other services */}

      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Other services
        </div>
        <div className="flex flex-wrap gap-2">
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-400 hover:border-cyan-400/40 hover:text-cyan-300 transition"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Next */}
      <section className="px-6 md:px-24 py-20 md:py-24 border-b border-neutral-900">
        <Link
          to="/services/$slug"
          params={{ slug: next.slug }}
          className="group block"
        >
          <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-3">
            Next service
          </div>
          <div className="flex items-center justify-between gap-6">
            <h3 className="text-2xl md:text-4xl font-light text-white group-hover:text-cyan-300 transition">
              {next.title}
            </h3>
            <ArrowRight className="text-cyan-300" />
          </div>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}


function ServiceNotFound() {
  const params = Route.useParams();
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 mb-4">
        404
      </div>
      <h1 className="text-3xl md:text-4xl font-light text-white max-w-2xl">
        We couldn't find the service "{params.slug}".
      </h1>
      <Link
        to="/services"
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
      >
        <ArrowLeft size={14} /> All services
      </Link>
    </div>
  );
}

function ServiceError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[10px] tracking-[0.4em] uppercase text-red-400 mb-4">
        Error
      </div>
      <h1 className="text-2xl font-light text-white max-w-2xl">
        Something went wrong loading this service.
      </h1>
      <p className="mt-3 text-neutral-500 text-sm max-w-xl font-mono">
        {error.message}
      </p>
      <button
        onClick={() => {
          reset();
          router.invalidate();
        }}
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest hover:border-cyan-400/50 hover:text-cyan-300"
      >
        Try again
      </button>
    </div>
  );
}
