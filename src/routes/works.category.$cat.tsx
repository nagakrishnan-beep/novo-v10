import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  WORK_CATEGORIES,
  getWorksByCategory,
  type WorkCategoryKey,
} from "@/lib/works";
import { SiteHeader, SiteFooter, MediaSlot, BreadcrumbNav } from "@/components/site-chrome";
import { abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

export const Route = createFileRoute("/works/category/$cat")({
  loader: ({ params }) => {
    const key = params.cat as WorkCategoryKey;
    const cat = WORK_CATEGORIES[key];
    if (!cat) throw notFound();
    const works = getWorksByCategory(key);
    return { cat, works, key };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    }
    const { cat } = loaderData;
    const url = abs(`/works/category/${params.cat}`);
    return {
      meta: [
        { title: cat.metaTitle },
        { name: "description", content: cat.metaDesc },
        { property: "og:title", content: cat.metaTitle },
        { property: "og:description", content: cat.metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: BASE_URL },
              { name: "Works", url: abs("/works") },
              { name: cat.title, url },
            ])
          ),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, works } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active="works" />

      <div className="px-6 md:px-24 pt-8">
        <BreadcrumbNav
          items={[
            { label: "Works", to: "/works" },
            { label: cat.title },
          ]}
        />
      </div>

      <section className="px-6 md:px-24 pt-8 pb-16 border-b border-neutral-900">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 hover:text-cyan-300 mb-6"
        >
          <ArrowLeft size={14} /> All projects
        </Link>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
          {cat.title}
        </h1>
        <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">{cat.metaDesc}</p>
      </section>

      <section className="px-6 md:px-24 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((w: any) => (
            <Link
              key={w.slug}
              to="/works/$slug"
              params={{ slug: w.slug }}
              className="group border border-neutral-900 rounded-xl overflow-hidden hover:border-cyan-500/40 transition"
            >
              <MediaSlot ratio="4/3" label={w.title} className="rounded-none border-none" />
              <div className="p-5">
                <div className="text-[10px] tracking-widest uppercase text-cyan-400 mb-2">
                  {w.format}
                </div>
                <h3 className="text-lg font-light text-white group-hover:text-cyan-300">
                  {w.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{w.summary}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                  View project <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
