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
  FOUNDER,
  abs,
} from "./site";

export const FOUNDER_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#founder`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.jobTitle,
  description: FOUNDER.bio,
  knowsAbout: [...FOUNDER.knowsAbout],
  worksFor: { "@id": `${BASE_URL}/#organization` },
  url: `${BASE_URL}/about`,
};

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: LEGAL_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/novo-logo.png`,
  foundingDate: "2014",
  slogan: "Reality, replicated.",
  founder: {
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    description: FOUNDER.bio,
  },

  knowsAbout: [
    "Digital Twin",
    "Reality Capture",
    "Matterport",
    "LiDAR Scanning",
    "Scan-to-BIM",
    "360 Virtual Tours",
    "Drone Mapping",
    "3D Visualization",
    "Property Development",
    "Construction",
    "Hospitality",
    "Events",
    "Facilities Management",
    "Manufacturing",
    "Healthcare",
    "Government",
  ],
  hasCredential: [
    "Matterport Certified Service Partner since 2015",
    "MDEC Malaysia Digital recognised",
    "Google Street View Trusted",
  ],

  areaServed: ["Malaysia", "Singapore", "Southeast Asia"],
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

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Novo Reperio",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/works?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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

export const webPageJsonLd = (p: {
  title: string;
  url: string;
  description?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: p.title,
  url: abs(p.url),
  ...(p.description ? { description: p.description } : {}),
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
});

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
  author: {
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    url: `${BASE_URL}/about`,
  },
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
  provider: { "@id": `${BASE_URL}/#organization` },
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
