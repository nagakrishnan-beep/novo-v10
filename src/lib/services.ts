export type ServiceTier = "core" | "supporting";

export type Service = {
  slug: string;
  title: string;
  tier: ServiceTier;
  tagline: string;
  description: string;
  bestFor: string;
  benefits: string[];
  image: string;
  exampleUrl?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "spatial-capture-digital-twins",
    title: "Spatial Capture & Digital Twins",
    tier: "core",
    tagline: "Precision systems that convert real-world environments into structured digital assets.",
    description:
      "Matterport LiDAR, laser scanning, and Scan-to-BIM workflows convert existing environments into structured, dimensionally accurate digital twins ready for marketing, review, and operations.",
    bestFor:
      "Hotels, venues, show units, and properties that benefit from detailed spatial viewing.",
    benefits: [
      "Immersive room-to-room navigation",
      "Convenient remote viewing for clients",
      "Greater confidence before site visits",
      "BIM-ready point clouds for coordination",
    ],
    image: "https://development.novoreperio.com/images/matterport-pro3.png",
    exampleUrl:
      "https://novoreperio.com/portfolio-item/hotel/3d-matterport-virtual-tour/hyatt-kuantan-ballroom/",
  },
  {
    slug: "immersive-visualization",
    title: "Immersive Visualization & Experience Design",
    tier: "core",
    tagline: "Photorealistic environments that bring spaces to life before they exist.",
    description:
      "360° tours, 3D walkthroughs, and CGI environments make unbuilt or in-progress spaces easy to review and easy to sell, wherever your audience is.",
    bestFor:
      "Property launches, show units, sales galleries, and any space that needs a preview before completion.",
    benefits: [
      "Photorealistic pre-construction previews",
      "Interactive 360° environments",
      "Ready for web, QR, and pitch decks",
      "Brand-consistent finishes and lighting",
    ],
    image: "https://development.novoreperio.com/images/matterport-pro3.png",
  },
  {
    slug: "aerial-context-intelligence",
    title: "Aerial & Context Intelligence",
    tier: "core",
    tagline: "Cinematic and analytical aerial perspectives that reveal scale and spatial relationships.",
    description:
      "Drone and aerial photography, 360° panoramic capture, and mapping deliver the arrival experience, scale, and surroundings that ground-level media cannot show.",
    bestFor:
      "Landmark developments, venues, and destination projects where scale and context matter.",
    benefits: [
      "4K cinematic aerial video",
      "Aerial 360° panoramic capture",
      "Site context and arrival storytelling",
      "Orthomosaic mapping on request",
    ],
    image: "https://development.novoreperio.com/images/drone.png",
  },
  {
    slug: "web-development",
    title: "Web Development",
    tier: "supporting",
    tagline: "Polished microsites and landing pages that bring your visuals, tours, and story together beautifully.",
    description:
      "Launch-ready websites and campaign microsites that package your Matterport tours, aerial films, and CGI into one clear, shareable presentation.",
    bestFor:
      "Project launches, campaign pages, and venues that need a single link to send.",
    benefits: [
      "Custom microsites and landing pages",
      "Embed-ready tour and video hosting",
      "Lead capture and analytics",
      "Mobile-first and CDN-delivered",
    ],
    image:
      "https://development.novoreperio.com/_astro/photo-1600607687939-ce8a6c25118c_Z1Esz9A.webp",
  },
  {
    slug: "3d-walkthroughs",
    title: "3D Walkthroughs",
    tier: "supporting",
    tagline: "An elegant preview before construction is complete or the space is ready to open.",
    description:
      "Animated 3D walkthroughs let stakeholders move through a design before a single wall is built — perfect for pre-launch presentations and investor decks.",
    bestFor:
      "Pre-launch marketing, investor pitches, and construction-in-progress projects.",
    benefits: [
      "Camera-choreographed 3D flythroughs",
      "Photoreal materials and lighting",
      "Broadcast-ready 4K delivery",
      "Same asset reusable for web and social",
    ],
    image:
      "https://development.novoreperio.com/_astro/photo-1486406146926-c627a92ad1ab_KtJem.webp",
  },
  {
    slug: "3d-visualisation",
    title: "3D Visualisation",
    tier: "supporting",
    tagline: "CGI, virtual staging, and refined presentation visuals that bring the final vision to life.",
    description:
      "Still CGI and virtual staging translate architectural intent, interior finishes, and product concepts into presentation-quality imagery for launch and sales.",
    bestFor:
      "Property developers, interior brands, and marketing teams needing hero visuals.",
    benefits: [
      "Photoreal interior and exterior CGI",
      "Virtual staging for empty units",
      "Consistent brand palette and finishes",
      "Print- and web-ready deliverables",
    ],
    image:
      "https://development.novoreperio.com/_astro/photo-1497366754035-f200968a6e72_1w9CXC.webp",
  },
  {
    slug: "3d-360-rendering",
    title: "3D 360 Rendering",
    tier: "supporting",
    tagline: "Panoramic renders that present unbuilt spaces with clarity across web, pitch, and sales materials.",
    description:
      "Rendered 360° panoramas let audiences look around a proposed space long before it exists — great for launches, sales galleries, and preview microsites.",
    bestFor:
      "Sales galleries, pre-launch previews, and interactive campaign pages.",
    benefits: [
      "Photoreal 360° panoramic renders",
      "Interactive hotspot integration",
      "Embed inside web tours and decks",
      "Refresh finishes without re-shooting",
    ],
    image:
      "https://development.novoreperio.com/_astro/photo-1486406146926-c627a92ad1ab_Z1Eg7St.webp",
  },
  {
    slug: "commercial-photography",
    title: "Commercial Photography",
    tier: "supporting",
    tagline: "Premium still photography across websites, brochures, campaigns, and property presentations.",
    description:
      "High-end interior, exterior, and architectural photography that complements immersive capture with hero stills for launch, editorial, and campaign use.",
    bestFor:
      "Websites, brochures, PR campaigns, and property presentations.",
    benefits: [
      "Interior, exterior, and detail coverage",
      "Colour-graded, delivery-ready files",
      "Consistent with tour visual language",
      "Rights cleared for marketing use",
    ],
    image:
      "https://development.novoreperio.com/_astro/photo-1600607687939-ce8a6c25118c_Z1Esz9A.webp",
  },
];

export const APPROACH = [
  {
    step: "01",
    title: "Understand your goals",
    body: "We begin with what your audience needs to understand most clearly — layout, finish, arrival, flow, or overall setting.",
  },
  {
    step: "02",
    title: "Recommend the right format",
    body: "We recommend the right mix of Matterport, 360 tours, aerial visuals, CGI, or web support based on how the experience will be viewed and shared.",
  },
  {
    step: "03",
    title: "Deliver it where it matters",
    body: "We prepare the final output for the place it will have the most impact — your website, a QR code, a sales deck, or a client presentation.",
  },
];

export const COMBINATIONS = [
  {
    title: "Venue Marketing",
    stack: "Matterport + aerial + landing page",
    body: "Ideal when clients need to understand the space, arrival experience, and event setup before stepping on site.",
  },
  {
    title: "Property Launch",
    stack: "360 + drone + CGI support",
    body: "A refined option when you need attractive visuals for campaigns, online listings, and launch materials.",
  },
  {
    title: "Facilities Presentation",
    stack: "Matterport + photography + presentation assets",
    body: "Well suited when teams or clients need a clear remote view of the space for planning, review, and presentation.",
  },
];

export const SERVICE_INDUSTRIES = [
  "Commercial Real Estate",
  "Architecture, Engineering & Construction",
  "Manufacturing",
  "Insurance",
  "Residential Building Construction",
  "Travel & Hospitality",
  "Retail",
  "Residential Real Estate",
  "Multi-Family",
  "Government",
  "Energy and Utilities",
  "Oil and Gas",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getNextService(slug: string): Service {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  return SERVICES[(idx + 1) % SERVICES.length];
}
