export type ServiceTier = "core" | "supporting";
export type ServiceTrack = "have" | "unbuilt" | "supporting";

export type Service = {
  slug: string;
  title: string;
  tier: ServiceTier;
  track: ServiceTrack;
  tagline: string;
  description: string;
  bestFor: string;
  benefits: string[];
  image: string;
  exampleUrl?: string;
};

const img = (name: string) => `/images/services/${name}`;

export const SERVICES: Service[] = [
  {
    slug: "spatial-capture-digital-twins",
    title: "Matterport Digital Twin",
    tier: "core",
    track: "have",
    tagline: "Precision LiDAR twins that convert real-world environments into structured, measurable digital assets.",
    description:
      "Matterport Pro3 LiDAR capture, laser scanning, and Scan-to-BIM workflows convert existing environments into structured, dimensionally accurate digital twins ready for marketing, review, and operations.",
    bestFor:
      "Hotels, venues, show units, workplaces and properties where scale, flow and measurement matter.",
    benefits: [
      "Immersive room-to-room navigation",
      "Convenient remote viewing for clients",
      "Greater confidence before site visits",
      "BIM-ready point clouds for coordination",
    ],
    image: img("matterport-pro3.jpg"),
    exampleUrl:
      "https://novoreperio.com/portfolio-item/hotel/3d-matterport-virtual-tour/hyatt-kuantan-ballroom/",
  },
  {
    slug: "ground-level-360",
    title: "Ground-Level 360° Tour",
    tier: "core",
    track: "have",
    tagline: "Lightweight 360° tours for web, OTAs, WhatsApp and rapid distribution.",
    description:
      "Ground-level 360° panoramic capture stitched into interactive tours — lighter than a full digital twin, ideal for social, OTA listings and quick sales replies.",
    bestFor: "Hotels, restaurants, retail and destinations that need fast, wide distribution.",
    benefits: [
      "Fast to capture and publish",
      "Ideal for OTAs and Google Business Profile",
      "Great for mobile and WhatsApp sharing",
      "Combines with Matterport for signature spaces",
    ],
    image: img("360-ground.jpg"),
  },
  {
    slug: "aerial-context-intelligence",
    title: "Drone Aerial 360° & Cinematic Video",
    tier: "core",
    track: "have",
    tagline: "Aerial 360° panoramas and 4K cinematic drone footage that reveal scale, arrival and surroundings.",
    description:
      "Drone and aerial photography, 360° panoramic capture, orthomosaic mapping and cinematic 4K video that show the arrival experience, scale, and surroundings that ground-level media cannot communicate.",
    bestFor: "Landmark developments, venues, and destination projects.",
    benefits: [
      "4K cinematic aerial video",
      "Aerial 360° at multiple floor heights",
      "Site context and arrival storytelling",
      "Orthomosaic mapping on request",
    ],
    image: img("drone.jpg"),
  },
  {
    slug: "cinematic-video",
    title: "Cinematic Video",
    tier: "core",
    track: "have",
    tagline: "60–90s launch films and 15–30s social cuts, colour-graded and delivery-ready.",
    description:
      "Cinematic ground and aerial video edited into launch films, brand suites, social cuts and 9:16 reels — one production run powers every channel.",
    bestFor: "Launches, brand refreshes, RFP responses and social campaigns.",
    benefits: [
      "60–90s hero launch films",
      "15–30s social cuts and 9:16 reels",
      "Drone-CGI hybrids on request",
      "Broadcast-ready 4K delivery",
    ],
    image: img("cinematic-video.jpg"),
  },
  /* ---------- Track B — Unbuilt ---------- */
  {
    slug: "3d-rendered-walkthrough-tours",
    title: "3D Rendered Walkthrough Tours",
    tier: "core",
    track: "unbuilt",
    tagline: "Dollhouse-style virtual show units generated from CAD, BIM, SketchUp or PDF at any stage.",
    description:
      "Rendered walkthrough tours of unbuilt units — dollhouse and floorplan views, room-by-room navigation, measurement tool where applicable. Perfect pre-sales asset when the physical show unit isn't ready.",
    bestFor: "Property developers pre-launch, sales galleries, remote buyers.",
    benefits: [
      "Full walkthrough of unbuilt units",
      "Dollhouse and floorplan views",
      "Rebuilt when finishes change",
      "Reusable across web, WhatsApp and gallery",
    ],
    image: img("rendered-walkthrough.jpg"),
  },
  {
    slug: "cgi-360-panorama-tours",
    title: "CGI 360° Panorama Tours",
    tier: "core",
    track: "unbuilt",
    tagline: "Rendered 360° panoramas — light enough for portals, WhatsApp and interactive campaign pages.",
    description:
      "Photoreal 360° panoramas rendered from architectural intent — buyers can look around a proposed space long before it exists.",
    bestFor: "Sales galleries, pre-launch previews, interactive campaign microsites.",
    benefits: [
      "Photoreal 360° panoramic renders",
      "Interactive hotspot integration",
      "Embed inside web tours and decks",
      "Refresh finishes without re-shooting",
    ],
    image: img("cgi-360.jpg"),
  },
  {
    slug: "photoreal-cgi-stills",
    title: "Photoreal CGI Stills",
    tier: "core",
    track: "unbuilt",
    tagline: "Magazine-grade exteriors, interiors, aerials and dusk hero shots — print-ready for billboards.",
    description:
      "Still CGI at the highest fidelity — exteriors, interiors, aerials and dusk hero shots ready for print, campaign pages, billboards and portal listings.",
    bestFor: "Property developers, interior brands, marketing teams needing hero visuals.",
    benefits: [
      "Photoreal interior and exterior CGI",
      "Aerial and dusk hero compositions",
      "Print-ready for billboards and brochures",
      "Consistent brand palette across every asset",
    ],
    image: img("cgi-stills.jpg"),
  },
  {
    slug: "property-walkthrough-films",
    title: "Property Walkthrough Films",
    tier: "core",
    track: "unbuilt",
    tagline: "60–90s launch films, 15–30s social cuts and drone-CGI hybrids for portal, gallery and social.",
    description:
      "Cinematic films that combine CGI walkthroughs, drone hybrids and lifestyle vignettes — the launch centrepiece for property developments.",
    bestFor: "Property launches, campaign pushes and portal hero placements.",
    benefits: [
      "60–90s launch films",
      "15–30s social cuts and 9:16 reels",
      "Drone-CGI hybrids on request",
      "Same asset reusable for web, gallery, LED walls",
    ],
    image: img("walkthrough-films.jpg"),
  },
  {
    slug: "ue5-masterplan-experience",
    title: "UE5 Masterplan Experience",
    tier: "core",
    track: "unbuilt",
    tagline:
      "SIGNATURE — a fully explorable township in Unreal Engine 5: free-roam, phase timeline, live availability, day/night, POI hotspots.",
    description:
      "The signature Novo Reperio deliverable — a fully explorable township built in Unreal Engine 5. Free-roam navigation, phase-timeline scrubbing, live unit availability, day/night/seasons and POI hotspots. Runs in the sales gallery, on touchscreens and in browsers.",
    bestFor: "Township-scale masterplans, phased developments, signature sales galleries.",
    benefits: [
      "Free-roam exploration of the whole masterplan",
      "Phase timeline scrubbing",
      "Live unit availability integration",
      "Day / night / seasonal simulation",
      "POI hotspots for schools, transport, amenities",
    ],
    image: img("ue5-masterplan.jpg"),
  },
  {
    slug: "ue5-interactive-web-platform",
    title: "UE5 Interactive Web Platform",
    tier: "core",
    track: "unbuilt",
    tagline: "Console-quality 3D pixel-streamed from the cloud, no downloads — live unit selector, real-time finish switching.",
    description:
      "Cloud pixel-streamed UE5 experiences — buyers explore console-quality 3D in the browser with zero download. Live unit selector, real-time finish switching, shareable agent links and buyer-behaviour analytics.",
    bestFor: "Digital-first launches, agent-driven remote selling, international campaigns.",
    benefits: [
      "Zero-download console-quality 3D in browser",
      "Live unit selector with real-time finishes",
      "Shareable agent links",
      "Buyer-behaviour analytics",
    ],
    image: img("ue5-web.jpg"),
  },
  {
    slug: "ai-assisted-visualization",
    title: "AI-Assisted Visualization",
    tier: "core",
    track: "unbuilt",
    tagline: "Concepts in hours not weeks, more directions per budget — every final frame finished by human artists.",
    description:
      "AI-assisted iteration during concept development — more directions per budget, faster feedback loops. Every final frame is finished by human artists to preserve consistency and photoreal quality.",
    bestFor: "Concept and mood exploration, campaign iterations, moodboards.",
    benefits: [
      "More directions per budget",
      "Concept turnaround in hours",
      "Human artists finish every final frame",
      "Consistent with the studio's photoreal standard",
    ],
    image: img("ai-viz.jpg"),
  },
  /* ---------- Supporting ---------- */
  {
    slug: "web-development",
    title: "Launch Microsites & Web Development",
    tier: "supporting",
    track: "supporting",
    tagline:
      "Polished microsites and landing pages that package your tours, films and CGI into one shareable presentation.",
    description:
      "Launch-ready websites and campaign microsites that package Matterport tours, aerial films, and CGI into one clear, shareable presentation.",
    bestFor: "Project launches, campaign pages and venues that need a single link to send.",
    benefits: [
      "Custom microsites and landing pages",
      "Embed-ready tour and video hosting",
      "Lead capture and analytics",
      "Mobile-first and CDN-delivered",
    ],
    image: img("web.jpg"),
  },
  {
    slug: "scan-to-bim",
    title: "Scan to BIM",
    tier: "supporting",
    track: "supporting",
    tagline: "LiDAR point clouds converted into accurate as-built BIM models — LOD 200 through 350.",
    description:
      "Convert LiDAR captures into reliable as-built BIM models for renovation, MEP coordination and handover — the design team works against reality, not out-of-date drawings.",
    bestFor: "Renovation projects, complex MEP coordination, facility handover.",
    benefits: [
      "LOD 200 / 300 / 350 depending on need",
      "MEP coordination on real geometry",
      "Fewer clashes on site",
      "Owner-ready handover packages",
    ],
    image: img("scan-to-bim.jpg"),
  },
  {
    slug: "commercial-photography",
    title: "Commercial Photography",
    tier: "supporting",
    track: "supporting",
    tagline: "Premium interior, exterior and architectural stills that complement immersive capture.",
    description:
      "High-end interior, exterior and architectural photography — the still hero layer that complements immersive capture with editorial and campaign imagery.",
    bestFor: "Websites, brochures, PR campaigns and property presentations.",
    benefits: [
      "Interior, exterior and detail coverage",
      "Colour-graded, delivery-ready files",
      "Consistent with tour visual language",
      "Rights cleared for marketing use",
    ],
    image: img("photography.jpg"),
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
    body: "We recommend the right mix of Matterport, 360° tours, aerial visuals, CGI, or web support based on how the experience will be viewed and shared.",
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
    stack: "360° + drone + CGI support",
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

export const SERVICES_HUB_FAQ = [
  {
    q: "What's the difference between Matterport and a 360° tour?",
    a: "Matterport is a measurable 3D digital twin — dollhouse and floorplan views, room-to-room navigation, and a measurement tool. A 360° tour is a series of linked panoramas, lighter and cheaper. Most venues benefit from both: Matterport for signature spaces, 360° for wider distribution.",
  },
  {
    q: "Can you produce a tour for a building that isn't built yet?",
    a: "Yes — from CAD, BIM, SketchUp or PDF at any stage. We render 3D walkthrough tours and CGI 360° panoramas for pre-sales, then re-capture the completed building as a Matterport twin after construction.",
  },
  {
    q: "How long does delivery take?",
    a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project — typically two to eight weeks depending on scale.",
  },
  {
    q: "Where do you operate?",
    a: "We are based in Kuala Lumpur and serve Malaysia, Singapore, Indonesia, the Middle East and worldwide on request.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getNextService(slug: string): Service {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  return SERVICES[(idx + 1) % SERVICES.length];
}
