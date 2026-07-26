import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, BreadcrumbNav } from "@/components/site-chrome";
import { ScopeEstimator } from "@/components/scope-estimator";
import { PricingBands } from "@/components/service-extras";
import { abs, BASE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

const TITLE = "Get an instant scope estimate | Novo Reperio";
const DESCRIPTION =
  "Tell us the kind of space and its size, and we return an indicative scope band in 60 seconds, based on our published Malaysia pricing.";
const URL = abs("/estimate");

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", url: BASE_URL },
            { name: "Estimate", url: URL },
          ]),
        ),
      },
    ],
  }),
  component: EstimatePage,
});

function EstimatePage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />
      <main>
        <section className="px-6 md:px-24 pt-20 pb-10 border-b border-neutral-900">
          <BreadcrumbNav items={[{ label: "Home", to: "/" }, { label: "Estimate" }]} />
          <div className="mt-6 text-[10px] tracking-[0.4em] uppercase text-emerald-400">
            Project assessment
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-light leading-[1.05] max-w-4xl text-white">
            What does your project need?
          </h1>
          <p className="mt-6 max-w-3xl text-neutral-400 leading-relaxed">
            Answer four short questions about your goal, your space, the outputs you need
            and the approximate size. We return a recommended capture workflow and an
            indicative scope band from our published Malaysia pricing. No email, no forms.
            When you are ready, book a free project assessment for a final quote.
          </p>
        </section>

        <section className="px-6 md:px-24 py-20 md:py-24">
          <ScopeEstimator />
        </section>

        <PricingBands />
      </main>
      <SiteFooter />
    </div>
  );
}
