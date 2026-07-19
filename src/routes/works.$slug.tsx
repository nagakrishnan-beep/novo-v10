import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { getWork, WORKS } from "@/lib/works";

const WHATSAPP_URL = "https://wa.me/60172029996";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Novo Reperio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { work } = loaderData;
    const title = `${work.title} — Novo Reperio`;
    return {
      meta: [
        { title },
        { name: "description", content: work.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: work.summary },
        { property: "og:type", content: "article" },
        { property: "og:image", content: work.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: work.image },
      ],
      links: [{ rel: "canonical", href: `/works/${work.slug}` }],
    };
  },
  component: WorkDetail,
  notFoundComponent: WorkNotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div>
        <h1 className="text-2xl mb-2">Something went wrong.</h1>
        <p className="text-neutral-500 text-sm">{error.message}</p>
        <Link to="/works" className="text-emerald-400 text-sm mt-4 inline-block">
          ← Back to Works
        </Link>
      </div>
    </div>
  ),
});

function WorkNotFound() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-300 flex items-center justify-center p-10">
      <div className="text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-3">
          404
        </div>
        <h1 className="text-3xl font-light mb-4">Project not found</h1>
        <Link to="/works" className="text-emerald-400 text-sm">
          ← Back to Selected Projects
        </Link>
      </div>
    </div>
  );
}

function WorkDetail() {
  const { work } = Route.useLoaderData();

  const idx = WORKS.findIndex((w) => w.slug === work.slug);
  const next = WORKS[(idx + 1) % WORKS.length];

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#020203]/80 border-b border-neutral-900">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <Link
            to="/"
            className="text-sm tracking-[0.3em] uppercase text-emerald-400"
          >
            Novo Reperio
          </Link>
          <Link
            to="/works"
            className="text-xs tracking-widest uppercase text-neutral-400 hover:text-emerald-400 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/10"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-24 pt-16 pb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-6">
          {work.format} · {work.categories.join(" · ")}
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl">
          {work.title}
        </h1>
        <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">
          {work.summary}
        </p>
      </section>

      {/* Image */}
      <section className="px-6 md:px-24">
        <div
          className="aspect-[16/9] w-full rounded-xl border border-neutral-900 bg-neutral-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${work.image})` }}
          role="img"
          aria-label={work.title}
        />
      </section>

      {/* Detail */}
      <section className="px-6 md:px-24 py-16 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-light mb-4">How it helps</h2>
          <p className="text-neutral-400 leading-relaxed mb-8">{work.helps}</p>
          {work.bullets && (
            <ul className="space-y-3">
              {work.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-neutral-300 text-sm leading-relaxed"
                >
                  <span className="text-emerald-400 mt-1">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        <aside className="border border-neutral-900 rounded-xl p-6 bg-neutral-950 h-fit">
          <div className="text-[10px] tracking-[0.4em] uppercase text-neutral-500 mb-4">
            Project Meta
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-neutral-500 text-xs uppercase tracking-widest">
                Format
              </dt>
              <dd className="text-neutral-200 mt-1">{work.format}</dd>
            </div>
            <div>
              <dt className="text-neutral-500 text-xs uppercase tracking-widest">
                Sector
              </dt>
              <dd className="text-neutral-200 mt-1">
                {work.categories.join(", ")}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500 text-xs uppercase tracking-widest">
                Space Type
              </dt>
              <dd className="text-neutral-200 mt-1">{work.spaceType}</dd>
            </div>
          </dl>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400"
          >
            Request Similar Project
          </a>
        </aside>
      </section>

      {/* Next */}
      <section className="px-6 md:px-24 py-16 border-t border-neutral-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-emerald-400 mb-4">
          Next Project
        </div>
        <Link
          to="/works/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between gap-6 border border-neutral-900 rounded-xl p-6 hover:border-emerald-500/40 transition"
        >
          <div>
            <div className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
              {next.format}
            </div>
            <h3 className="text-2xl font-light group-hover:text-emerald-300">
              {next.title}
            </h3>
          </div>
          <ArrowRight
            size={20}
            className="text-neutral-500 group-hover:text-emerald-400"
          />
        </Link>
      </section>
    </div>
  );
}
