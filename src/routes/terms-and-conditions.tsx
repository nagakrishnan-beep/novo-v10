import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { abs, EMAIL } from "@/lib/site";

const TITLE = "Terms & Conditions | Novo Reperio";
const DESCRIPTION =
  "Terms and conditions for Matterport 3D showcase, 3D rendering, and spatial capture services provided by Novo Reperio Sdn Bhd.";
const CANONICAL = abs("/terms-and-conditions");

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: TermsPage,
});

const MATTERPORT_SECTIONS = [
  {
    title: "1. Preamble",
    items: [
      "Welcome to Novo Reperio Sdn Bhd. These Terms and Conditions govern the provision of Matterport-based 3D scanning and virtual tour services by Novo Reperio Sdn Bhd.",
      "The Client acknowledges that the Services rely on the Matterport platform, and as such, the Client's use of the Services is further subject to the Matterport Terms of Use.",
    ],
  },
  {
    title: "2. Service Provider's Role and Disclaimer",
    items: [
      "The Service Provider acts solely as a service provider using the Matterport Platform.",
      "The Client acknowledges that their use of the virtual tours and related services is contingent upon their adherence to the Matterport Terms.",
    ],
  },
  {
    title: "3. Client Obligations",
    items: [
      "The Client warrants that they possess the necessary legal authority to authorize the scanning and public display of the subject property.",
      "The Client agrees to use the Services solely for lawful purposes and in compliance with all applicable laws and regulations.",
      "The Client acknowledges that all Matterport-generated content is subject to the licensing terms stipulated by Matterport.",
      "The Client is solely responsible for obtaining all necessary consents and permissions from property owners, tenants, or other relevant stakeholders before the commencement of any scanning activities.",
    ],
  },
  {
    title: "4. Data Ownership, Hosting, and Usage Rights",
    items: [
      "All 3D scans, images, and virtual tours are hosted on the Matterport Platform, and the associated hosting fees and data retention policies are governed by the Matterport Terms.",
      "The Service Provider reserves the right to use any 3D models, scans, and imagery for marketing, promotional, and portfolio purposes, unless otherwise specified in a written agreement executed by both parties.",
      "The Client acknowledges that data storage, access duration, and security measures are governed by the Matterport Platform, and the Service Provider provides no independent guarantees in this regard.",
      "The Service Provider does not warrant uninterrupted or indefinite access to the virtual tours, as such access is subject to Matterport's storage limitations, policy modifications, or service discontinuation.",
    ],
  },
  {
    title: "5. Copyright and Intellectual Property",
    items: [
      "The imagery, scans, and models generated through the Services remain the property of the Service Provider, subject to Matterport's intellectual property rights in the Platform.",
      "The Client is granted a non-exclusive, non-transferable license to use the virtual tours for their intended business or personal purposes.",
      "The Service Provider retains the right to display any scans, models, or imagery created through the Services for demonstration, marketing, and business development purposes.",
      "Any restriction on the Service Provider's use of scanned content for promotional purposes must be requested in writing and agreed upon by both parties before the provision of the Services.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    items: [
      "The Service Provider shall not be liable for any disruptions, data loss, or service changes arising from Matterport's policies, system outages, or updates.",
      "The Service Provider shall not be held responsible for any third-party claims resulting from the Client's use of the Matterport Services.",
      "The Service Provider does not warrant the accuracy, completeness, or uninterrupted availability of any virtual tours, as these are dependent on Matterport's hosting and technical infrastructure.",
    ],
  },
  {
    title: "7. Amendments and Termination",
    items: [
      "The Service Provider reserves the right to amend these Terms at any time.",
      "The Client acknowledges that changes to the Matterport Terms may impact the Services, and the Service Provider shall not be liable for such changes.",
      "The Service Provider reserves the right to suspend or terminate the Client's access to the virtual tour without prior notice in the event of a breach of these Terms.",
    ],
  },
  {
    title: "8. Governing Law and Jurisdiction",
    items: [
      "These Terms shall be governed by and construed in accordance with the laws of Malaysia.",
      "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.",
    ],
  },
  {
    title: "9. Contact",
    items: [
      "For any inquiries regarding these Terms, please contact us at hello@novoreperio.com.",
    ],
  },
  {
    title: "10. Acknowledgement and Agreement",
    items: [
      "By utilizing the Services, the Client acknowledges that they have read, understood, and agree to be bound by these Terms and Conditions.",
    ],
  },
];

const RENDERING_SECTIONS = [
  {
    title: "1. Preamble",
    items: [
      "Welcome to Novo Reperio Sdn Bhd. These Terms of Use govern your access and use of our 3D rendering services, including but not limited to animation, perspective images, and 360 photography. By engaging with our Services, you agree to these Terms.",
    ],
  },
  {
    title: "2. Scope of Services",
    items: [
      "Our Services include 3D rendering and animation for real estate, product visualization, and marketing; perspective images for architectural, interior, and exterior visualizations; and 360-degree photography and virtual tours.",
      "We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time.",
    ],
  },
  {
    title: "3. User Responsibilities",
    items: [
      "You agree to provide accurate project details and materials required for rendering.",
      "You must ensure you have legal rights to all assets and materials provided to us.",
      "You agree to review and approve work within agreed-upon timelines.",
      "You may not use our Services for any unlawful or infringing activities.",
    ],
  },
  {
    title: "4. Intellectual Property",
    items: [
      "We retain ownership of all proprietary techniques and methodologies used in our Services.",
      "You own the final rendered output upon full payment unless otherwise agreed.",
      "You grant us a non-exclusive right to use completed work for promotional purposes, unless otherwise agreed in writing.",
    ],
  },
  {
    title: "5. Payment Terms",
    items: [
      "A 50% deposit is required before commencement of services.",
      "The remaining balance is due upon completion and prior to delivery of final outputs.",
      "All accounts are to be paid within 14 days of the billing date. Interest may be charged on outstanding balances at the rate of 10% per annum if this due date is not met.",
    ],
  },
  {
    title: "6. Revisions and Variations",
    items: [
      "We will work on your project until you are satisfied. However, additional fees may apply for design changes beyond the original scope; incorrect, inaccurate, or outdated documentation provided by the client; missing documentation requiring us to create designs; changes to camera angles or positions resulting in significant additional work; feedback provided after the issuance of preview images that could have been given earlier; or revisions requested after the final high-resolution imagery has been issued.",
    ],
  },
  {
    title: "7. Delivery & Revisions",
    items: [
      "Initial drafts will be provided within the project timeline.",
      "You are entitled to 3 rounds of revisions.",
      "Additional revisions or modifications beyond the agreed scope will be subject to extra charges.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    items: [
      "We are not liable for any indirect, incidental, or consequential damages; errors resulting from incorrect or incomplete project information provided by the client; or delays caused by unforeseen circumstances beyond our control.",
    ],
  },
  {
    title: "9. Confidentiality",
    items: [
      "We respect your confidentiality and will not share project details with third parties without your consent, except as required by law.",
    ],
  },
  {
    title: "10. Termination",
    items: [
      "We reserve the right to terminate the Service if the client fails to comply with these Terms, payment obligations are not met, or any abusive or unreasonable behaviour is directed towards our team.",
    ],
  },
  {
    title: "11. Governing Law and Jurisdiction",
    items: [
      "These Terms shall be governed by and construed in accordance with the laws of Malaysia.",
      "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.",
    ],
  },
  {
    title: "12. Contact Information",
    items: [
      "For any inquiries regarding these Terms, please contact us at hello@novoreperio.com.",
    ],
  },
  {
    title: "13. Acknowledgement and Agreement",
    items: [
      "By utilizing the Services, the Client acknowledges that they have read, understood, and agree to be bound by these Terms and Conditions.",
    ],
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#020203] text-neutral-200 font-sans antialiased">
      <SiteHeader active={null} />

      <section className="px-6 md:px-24 pt-20 pb-16 border-b border-neutral-900">
        <div className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-6">
          Legal
        </div>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] max-w-5xl text-white">
          Terms & Conditions
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-neutral-400 max-w-3xl">
          The terms below govern Matterport 3D showcase services and 3D
          rendering services provided by Novo Reperio Sdn Bhd. Please read them
          carefully before engaging our services.
        </p>
      </section>

      <main className="px-6 md:px-24 py-16 md:py-24 space-y-20 md:space-y-28">
        <TermsGroup
          heading="Terms and Conditions of Service for Matterport 3D Showcase"
          sections={MATTERPORT_SECTIONS}
        />
        <TermsGroup
          heading="Terms and Conditions of 3D Rendering Services"
          sections={RENDERING_SECTIONS}
        />
      </main>

      <section className="px-6 md:px-24 py-16 border-t border-neutral-900">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Need more information?
          </h2>
          <p className="text-[15px] text-neutral-400 leading-relaxed mb-8">
            If you have any questions about these terms, please contact us and
            we will be happy to clarify.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-500/10 transition"
          >
            Contact us
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 ml-3 text-sm text-neutral-400 hover:text-emerald-300 transition"
          >
            {EMAIL}
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function TermsGroup({
  heading,
  sections,
}: {
  heading: string;
  sections: { title: string; items: string[] }[];
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-light text-white mb-10 pb-6 border-b border-neutral-800">
        {heading}
      </h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg md:text-xl font-light text-emerald-300 mb-4">
              {section.title}
            </h3>
            <ul className="space-y-3 text-[15px] leading-relaxed text-neutral-400">
              {section.items.map((item, i) => (
                <li key={i} className="pl-4 border-l border-neutral-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
