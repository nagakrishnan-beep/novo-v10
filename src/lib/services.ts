export type ServiceTier = "flagship" | "core" | "supporting";
export type ServiceTrack = "have" | "unbuilt" | "supporting";
export type ServiceCluster = "market" | "build" | "train" | "plan" | "supporting";

export type Service = {
  slug: string;
  title: string;
  tier: ServiceTier;
  track: ServiceTrack;
  cluster: ServiceCluster;
  tagline: string;
  problem: string;
  outcome: string;
  description: string;
  bestFor: string;
  benefits: string[];
  image: string;
  exampleUrl?: string;
};

const img = (name: string) => `/images/services/${name}`;

export const SERVICES: Service[] = [
  /* ---------- MARKET IT: existing (Track A) ---------- */
  {
    slug: "spatial-capture-digital-twins",
    problem: "Clients cannot judge scale, flow or finish from photos, so they insist on a site visit before deciding.",
    outcome: "Buyers and planners self-qualify remotely and arrive ready to commit.",
    title: "Matterport Digital Twin",
    tier: "core",
    track: "have",
    cluster: "market",
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
    problem: "A full twin is more than a quick listing needs, but flat photos undersell the space.",
    outcome: "A light, shareable tour that lifts listings on OTAs, Google and WhatsApp.",
    title: "Ground-Level 360° Tour",
    tier: "core",
    track: "have",
    cluster: "market",
    tagline: "Lightweight 360° tours for web, OTAs, WhatsApp and rapid distribution.",
    description:
      "Ground-level 360° panoramic capture stitched into interactive tours, lighter than a full digital twin, ideal for social, OTA listings and quick sales replies.",
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
    problem: "Ground-level media cannot show arrival, scale or the surroundings that sell a location.",
    outcome: "Buyers understand the site and its context before they visit.",
    title: "Drone Aerial 360° & Cinematic Video",
    tier: "core",
    track: "have",
    cluster: "market",
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
    problem: "Launches need motion and story, but multi-channel video usually means multiple shoots.",
    outcome: "One production run fuels the launch film, social cuts and reels.",
    title: "Cinematic Video",
    tier: "core",
    track: "have",
    cluster: "market",
    tagline: "60–90s launch films and 15–30s social cuts, colour-graded and delivery-ready.",
    description:
      "Cinematic ground and aerial video edited into launch films, brand suites, social cuts and 9:16 reels. One production run powers every channel.",
    bestFor: "Launches, brand refreshes, RFP responses and social campaigns.",
    benefits: [
      "60–90s hero launch films",
      "15–30s social cuts and 9:16 reels",
      "Drone-CGI hybrids on request",
      "Broadcast-ready 4K delivery",
    ],
    image: img("cinematic-video.jpg"),
  },
  /* ---------- MARKET IT: unbuilt (Track B) ---------- */
  {
    slug: "3d-rendered-walkthrough-tours",
    problem: "Off-plan buyers cannot picture a unit that is not built, and the physical show unit is not ready.",
    outcome: "Buyers walk the unit online months before handover, and commit sooner.",
    title: "3D Rendered Walkthrough Tours",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "Dollhouse-style virtual show units generated from CAD, BIM, SketchUp or PDF at any stage.",
    description:
      "Rendered walkthrough tours of unbuilt units, dollhouse and floorplan views, room-by-room navigation, measurement tool where applicable. Perfect pre-sales asset when the physical show unit isn't ready.",
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
    problem: "Renders alone are static, and buyers want to look around a space that does not exist yet.",
    outcome: "Interactive 360° previews that turn pre-launch interest into bookings.",
    title: "CGI 360° Panorama Tours",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "Rendered 360° panoramas, light enough for portals, WhatsApp and interactive campaign pages.",
    description:
      "Photoreal 360° panoramas rendered from architectural intent. Buyers can look around a proposed space long before it exists.",
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
    problem: "Campaigns need hero imagery for spaces that are unbuilt or mid-construction.",
    outcome: "Print-ready hero visuals for billboards, portals and brochures, before completion.",
    title: "Photoreal CGI Stills",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "Magazine-grade exteriors, interiors, aerials and dusk hero shots, print-ready for billboards.",
    description:
      "Still CGI at the highest fidelity, exteriors, interiors, aerials and dusk hero shots ready for print, campaign pages, billboards and portal listings.",
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
    problem: "A launch needs a centrepiece film, but the building is not ready to shoot.",
    outcome: "A cinematic walkthrough that anchors the campaign across every channel.",
    title: "Property Walkthrough Films",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "60–90s launch films, 15–30s social cuts and drone-CGI hybrids for portal, gallery and social.",
    description:
      "Cinematic films that combine CGI walkthroughs, drone hybrids and lifestyle vignettes, the launch centrepiece for property developments.",
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
    problem: "Township buyers cannot grasp a phased masterplan from boards and brochures.",
    outcome: "Buyers explore the whole development, phase by phase, and see availability live.",
    title: "UE5 Masterplan Experience",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline:
      "SIGNATURE: a fully explorable township in Unreal Engine 5: free-roam, phase timeline, live availability, day/night, POI hotspots.",
    description:
      "The signature Novo Reperio deliverable, a fully explorable township built in Unreal Engine 5. Free-roam navigation, phase-timeline scrubbing, live unit availability, day/night/seasons and POI hotspots. Runs in the sales gallery, on touchscreens and in browsers.",
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
    problem: "Interactive 3D usually means heavy downloads that lose remote buyers.",
    outcome: "Console-quality exploration in the browser, with a live unit selector, from anywhere.",
    title: "UE5 Interactive Web Platform",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "Console-quality 3D pixel-streamed from the cloud, no downloads, live unit selector, real-time finish switching.",
    description:
      "Cloud pixel-streamed UE5 experiences. Buyers explore console-quality 3D in the browser with zero download. Live unit selector, real-time finish switching, shareable agent links and buyer-behaviour analytics.",
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
    problem: "Concept exploration is slow and costly, so teams test fewer directions than they should.",
    outcome: "More directions per budget, delivered in hours, finished to a photoreal standard.",
    title: "AI-Assisted Visualization",
    tier: "core",
    track: "unbuilt",
    cluster: "market",
    tagline: "Concepts in hours not weeks, more directions per budget; every final frame finished by human artists.",
    description:
      "AI-assisted iteration during concept development, more directions per budget, faster feedback loops. Every final frame is finished by human artists to preserve consistency and photoreal quality.",
    bestFor: "Concept and mood exploration, campaign iterations, moodboards.",
    benefits: [
      "More directions per budget",
      "Concept turnaround in hours",
      "Human artists finish every final frame",
      "Consistent with the studio's photoreal standard",
    ],
    image: img("ai-viz.jpg"),
  },

  /* ---------- BUILD IT ---------- */
  {
    slug: "scan-to-bim",
    problem: "As-built drawings drift from reality, leaving design and FM teams to work from guesswork.",
    outcome: "Accurate as-built BIM and CAD, up to LOD 400, that teams can build and plan against.",
    title: "Scan-to-BIM & LiDAR Point Cloud Services",
    tier: "core",
    track: "have",
    cluster: "build",
    tagline:
      "LiDAR point clouds converted into accurate as-built BIM, 2D CAD and measurable digital twins.",
    description:
      "Novo Reperio captures existing buildings with LiDAR and 3D scanning, then converts the point cloud into accurate as-built deliverables (BIM models, 2D CAD drawings, and measurable digital twins) so architects, engineers and facility teams design and plan from reality, not guesswork.",
    bestFor:
      "Architects, engineers, quantity surveyors, renovation & retrofit, MEP coordination, facility handover.",
    benefits: [
      "Registered LiDAR point clouds",
      "Scan-to-BIM models up to LOD 400",
      "2D CAD floor plans, elevations, sections",
      "As-built vs design verification",
      "Measurable 3D twin alongside the point cloud",
    ],
    image: img("scan-to-bim.jpg"),
  },
  {
    slug: "construction-progress",
    problem: "Progress and variation disputes hinge on whoever took photos that day.",
    outcome: "A dated, walkable record that verifies progress and settles claims with evidence.",
    title: "Construction Progress Capture & Remote Inspection",
    tier: "core",
    track: "have",
    cluster: "build",
    tagline:
      "Scheduled 3D and 360° capture turns your site into a dated, walkable record.",
    description:
      "Scheduled 3D and 360° capture turns your construction site into a dated, walkable record, so project teams inspect remotely, verify progress against programme, and settle disputes with evidence instead of memory.",
    bestFor: "Developers, main contractors, project consultants, PMCs.",
    benefits: [
      "Scheduled progress twins (weekly/monthly)",
      "Remote inspection walkthroughs",
      "Milestone & claim records",
      "Dispute-proof as-built history",
      "Handover twin at completion",
    ],
    image: img("construction-progress.jpg"),
  },
  {
    slug: "facilities-operations",
    problem: "Building knowledge lives in one person's head and outdated drawings.",
    outcome: "One shared, asset-tagged twin the whole operations team runs the building from.",
    title: "Facilities Management Digital Twins",
    tier: "core",
    track: "have",
    cluster: "build",
    tagline:
      "Asset-tagged 3D operations. Run the building from anywhere.",
    description:
      "An operational digital twin gives facilities teams a live, navigable model of their building, asset registers, room-by-room documentation, and contractor briefing without a site visit.",
    bestFor: "Building owners, FM companies, corporate real estate, REITs.",
    benefits: [
      "Asset-tagged twins",
      "Space & inventory registers",
      "Remote contractor/vendor briefing",
      "Insurance-grade condition documentation",
      "Virtual onboarding of new FM staff",
    ],
    image: img("facilities-operations.jpg"),
  },

  /* ---------- TRAIN IN IT ---------- */
  {
    slug: "immersive-training",
    problem: "Site-based training pulls staff off the floor and cannot scale across locations.",
    outcome: "Consistent, measurable training staff complete from anywhere, on any device.",
    title: "Immersive & Virtual Training",
    tier: "core",
    track: "have",
    cluster: "train",
    tagline:
      "360° interactive, gamified digital twins, and game-engine simulation training.",
    description:
      "Novo Reperio converts real workplaces into interactive training environments (360° guided walkthroughs, gamified digital twins, and game-engine simulations on engagement) so staff learn procedures hands-on, from anywhere, on any device.",
    bestFor:
      "HSE/safety, L&D, operations, HR onboarding: oil & gas, manufacturing, plants, distributed corporates.",
    benefits: [
      "Consistency at global scale",
      "Travel & downtime eliminated",
      "Safety without exposure",
      "Measurable: completion, scores, time",
      "Always-on, multilingual, mobile/VR-ready",
    ],
    image: img("immersive-training.jpg"),
  },

  /* ---------- PLAN IT ---------- */
  {
    slug: "urban-digital-twins",
    problem: "City-scale decisions get made from slides, without shared spatial context.",
    outcome: "Planners and authorities walk proposals in context and compare scenarios.",
    title: "Urban & Masterplan Digital Twins",
    tier: "flagship",
    track: "unbuilt",
    cluster: "plan",
    tagline:
      "City-scale 3D with data overlay, visualise upcoming projects in their real surroundings.",
    description:
      "Novo Reperio builds digital twins at every scale (building, township, city and state), combining reality capture with real-time 3D so planners, authorities and developers can visualise upcoming projects in context and overlay the data that matters.",
    bestFor:
      "Master developers, state/municipal planning, GLCs, large landowners, authorities.",
    benefits: [
      "Real-time visualisation of upcoming projects",
      "Data/GIS overlays for planning",
      "Public-safety & resilience overlays",
      "Shared authority/stakeholder review",
      "Scenario comparison (Plan A vs Plan B)",
    ],
    image: img("urban-digital-twins.jpg"),
  },

  /* ---------- Supporting ---------- */
  {
    slug: "web-development",
    problem: "Tours, films and renders end up scattered across links and platforms.",
    outcome: "One shareable launch site that hosts every asset and captures leads.",
    title: "Launch Microsites & Project Websites",
    tier: "supporting",
    track: "supporting",
    cluster: "supporting",
    tagline:
      "The wrapper that hosts your tours, renders and films for property launches.",
    description:
      "Launch-ready microsites and project websites that package Matterport tours, aerial films, and CGI into one clear, shareable presentation for a property launch.",
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
    slug: "commercial-photography",
    problem: "Immersive capture still needs a polished still layer for print and PR.",
    outcome: "Editorial-grade stills that match the tour's visual language across every channel.",
    title: "Commercial Photography",
    tier: "supporting",
    track: "supporting",
    cluster: "supporting",
    tagline: "Premium interior, exterior and architectural stills that complement immersive capture.",
    description:
      "High-end interior, exterior and architectural photography, the still hero layer that complements immersive capture with editorial and campaign imagery.",
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

export type ClusterDef = {
  key: ServiceCluster;
  label: string;
  outcome: string;
  href: string;
};

export const CLUSTERS: ClusterDef[] = [
  {
    key: "market",
    label: "Sell",
    outcome: "Property marketing, hospitality, staging, CGI, video, launch microsites.",
    href: "/services#market",
  },
  {
    key: "build",
    label: "Build",
    outcome: "Scan-to-BIM, construction progress capture, facilities operations twins.",
    href: "/services#build",
  },
  {
    key: "train",
    label: "Train",
    outcome: "360° interactive, gamified and simulation training environments.",
    href: "/services/immersive-training",
  },
  {
    key: "plan",
    label: "Plan",
    outcome: "City & masterplan-scale digital twins with data overlay for planning.",
    href: "/services/urban-digital-twins",
  },
];

export const APPROACH = [
  {
    step: "01",
    title: "Understand your goals",
    body: "We begin with what your audience needs to understand most clearly: layout, finish, arrival, flow, or overall setting.",
  },
  {
    step: "02",
    title: "Recommend the right format",
    body: "We recommend the right mix of Matterport, 360° tours, aerial visuals, CGI, or web support based on how the experience will be viewed and shared.",
  },
  {
    step: "03",
    title: "Deliver it where it matters",
    body: "We prepare the final output for the place it will have the most impact: your website, a QR code, a sales deck, or a client presentation.",
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
    a: "Matterport is a measurable 3D digital twin: dollhouse and floorplan views, room-to-room navigation, and a measurement tool. A 360° tour is a series of linked panoramas, lighter and cheaper. Most venues benefit from both: Matterport for signature spaces, 360° for wider distribution.",
  },
  {
    q: "Can you produce a tour for a building that isn't built yet?",
    a: "Yes, from CAD, BIM, SketchUp or PDF at any stage. We render 3D walkthrough tours and CGI 360° panoramas for pre-sales, then re-capture the completed building as a Matterport twin after construction.",
  },
  {
    q: "How long does delivery take?",
    a: "Most capture projects deliver within days of the shoot. Larger CGI, UE5 masterplans and launch films are scoped per project, typically two to eight weeks depending on scale.",
  },
  {
    q: "Where do you operate?",
    a: "We are based in Kuala Lumpur and serve Malaysia, with regional deployment across Indonesia and the Philippines.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getNextService(slug: string): Service {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  return SERVICES[(idx + 1) % SERVICES.length];
}
