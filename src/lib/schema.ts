// Structured-data helpers.
import {
  LEGAL_NAME,
  BASE_URL,
  PHONE,
  EMAIL,
  ADDRESS_LINE_1,
  ADDRESS_LOCALITY,
  POSTAL_CODE,
  REGION,
  COUNTRY,
  SOCIALS,
  abs,
} from "./site";

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: LEGAL_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/novo-logo.png`,
  foundingDate: "2014",
  sameAs: [SOCIALS.instagram, SOCIALS.facebook, SOCIALS.linkedin, SOCIALS.youtube],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service",
      email: EMAIL,
      areaServed: "MY",
      availableLanguage: ["en", "ms"],
    },
  ],
};

export const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: LEGAL_NAME,
  url: BASE_URL,
  image: `${BASE_URL}/novo-logo.png`,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINE_1,
    addressLocality: ADDRESS_LOCALITY,
    postalCode: POSTAL_CODE,
    addressRegion: REGION,
    addressCountry: COUNTRY,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [SOCIALS.instagram, SOCIALS.facebook, SOCIALS.linkedin, SOCIALS.youtube],
};

export const breadcrumbJsonLd = (
  crumbs: { name: string; url: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: abs(c.url),
  })),
});

export const articleJsonLd = (a: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  image: abs(a.image),
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  mainEntityOfPage: abs(a.url),
  author: { "@type": "Organization", name: LEGAL_NAME, url: BASE_URL },
  publisher: {
    "@type": "Organization",
    name: LEGAL_NAME,
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/novo-logo.png` },
  },
});

export const serviceJsonLd = (s: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  url: abs(s.url),
  provider: { "@type": "Organization", name: LEGAL_NAME, url: BASE_URL },
  areaServed: ["Malaysia", "Singapore", "Indonesia", "Middle East", "Worldwide"],
  ...(s.image ? { image: abs(s.image) } : {}),
});

export const faqPageJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
