import { wpWorkImage, wpWorkTour } from "./wp-content";

export type Work = {
  slug: string;
  title: string;
  format: string;
  categories: string[];
  spaceType: string;
  category: WorkCategoryKey;
  image: string;
  summary: string;
  helps: string;
  body: string;
  features: string[];
  impact: string;
  tourUrl?: string;
  externalUrl?: string;
  featured?: boolean;
  videoId?: string;
  location?: string;

  relatedService?: string; // service slug
  relatedServiceLabel?: string;
};

/**
 * Manual tour overrides. These always win over the WordPress auto-fetch.
 */
export const TOUR_OVERRIDES: Record<string, string> = {
  "kuala-lumpur-convention-centre":
    "https://my.treedis.com/tour/kuala-lumpur-convention-centre-may-2026",
  "world-trade-centre-kuala-lumpur": "https://worldtradecentrekl.com/tour-2/",
  "lexis-hibiscus-port-dickson": "https://lexis.novoreperio.com/",
};


export const WORK_CATEGORIES = {
  hospitality: {
    slug: "hospitality",
    title: "Hotel & Venue Virtual Tours",
    metaTitle: "Hotel & Venue Virtual Tours — Novo Reperio Works",
    metaDesc:
      "Matterport digital twins and 360° virtual tours for hotels, ballrooms, resorts and event venues across Malaysia and beyond.",
  },
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate Virtual Tours & CGI",
    metaTitle: "Property Virtual Tours & CGI — Novo Reperio Works",
    metaDesc:
      "Show-unit tours, CGI panoramas and pre-launch visualization for property developers in Malaysia and worldwide.",
  },
  commercial: {
    slug: "commercial",
    title: "Corporate & Commercial Spaces",
    metaTitle: "Corporate & Commercial Virtual Tours — Novo Reperio Works",
    metaDesc:
      "Workplace, showroom and enterprise digital twins for corporate onboarding, facility management and internal alignment.",
  },
  automotive: {
    slug: "automotive",
    title: "Automotive & Showroom Tours",
    metaTitle: "Automotive Showroom Virtual Tours — Novo Reperio Works",
    metaDesc:
      "Immersive 3D walkthroughs of showrooms and lifestyle stations that showcase arrival, display zones and customer flow.",
  },
  aerial: {
    slug: "aerial",
    title: "Aerial & 360° Training Platforms",
    metaTitle: "Aerial 360° & Training Platforms — Novo Reperio Works",
    metaDesc:
      "Aerial 360° captures, drone-led context and interactive safety training platforms for industrial and destination projects.",
  },
} as const;
export type WorkCategoryKey = keyof typeof WORK_CATEGORIES;

const img = (name: string) => `/images/works/${name}`;

const RAW_WORKS: Work[] = [
  {
    slug: "hyatt-kuantan-ballroom",
    title: "Hyatt Kuantan — Kempas Ballroom & Prefunction",
    format: "Matterport Digital Twin",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    category: "hospitality",
    image: img("hyatt-kuantan.jpg"),
    summary:
      "A realistic ballroom walkthrough that lets planners and buyers understand the venue before the first physical visit.",
    helps: "Reduces uncertainty before physical site visits.",
    body:
      "Hyatt Kuantan's Kempas Ballroom and prefunction area were captured as a hosted Matterport digital twin, giving corporate planners, wedding buyers and DMCs the ability to walk the room from any device before travelling. The dollhouse and floorplan views expose ceiling height, pillar placement and stage setup at a glance, and the measurement tool lets planners verify their exact table plan and exhibition footprint in seconds.",
    features: [
      "Full walkable capture of the ballroom and prefunction area",
      "Dollhouse and floorplan views for scale and flow",
      "Embedded on the property page and shared as one link in sales replies",
      "Reusable across OTAs, RFP responses and live video calls",
    ],
    impact: "Reduces uncertainty and shortlisting time — planners commit before travelling.",
    tourUrl: "https://my.matterport.com/show/?m=V4ViihFfjzk",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "world-trade-centre-kuala-lumpur",
    title: "World Trade Centre Kuala Lumpur",
    format: "360° Virtual Tour",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    category: "hospitality",
    image: img("wtc.jpg"),
    summary:
      "A 360° tour that helps event teams understand hall scale and venue flow before a walkthrough.",
    helps: "Supports remote event planning and quick venue review.",
    body:
      "WTCKL's tour has been fully integrated into their event marketing and pre-planning process. The venue's sales team shares the tour link in every RFP reply, so organisers can finalise event flow without repeated physical site visits — accelerating booking confirmations.",
    features: [
      "Fully integrated into WTCKL's event marketing and pre-planning",
      "8,000+ unique tour visits, averaging 37 per week",
      "Clients finalise event flow without physical site visits",
      "Faster booking confirmations for major events",
    ],
    impact: "8,000+ tour visits, ~37/week — the twin now front-loads every enquiry.",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "lexis-hibiscus-port-dickson",
    title: "Lexis Hibiscus Port Dickson",
    format: "360° Virtual Tour",
    categories: ["Hospitality"],
    spaceType: "Hospitality",
    category: "hospitality",
    image: img("lexis_hibiscus.jpg"),
    summary:
      "A 360° virtual tour of the resort that supports remote review and booking interest at every level.",
    helps: "Helps guests review the property online before enquiry or visit.",
    body:
      "Lexis Hibiscus is a large multi-wing resort where booking decisions are made across guest, corporate, and management stakeholders. The interactive 360° tour lets multi-level management teams review, approve, and align on layout, F&B and MICE space remotely — accelerating the entire sales cycle.",
    features: [
      "Multi-level management teams review, approve and align remotely",
      "Accelerated sales cycle for MICE and group bookings",
      "Deployed on the property site, OTAs and sales decks",
      "Reusable across every departmental workflow",
    ],
    impact: "Accelerated sales cycle — remote alignment across multi-level management.",
    tourUrl: "https://novoreperio.com/360tour/lexishibiscuspd/",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "eastin-hotel-kuala-lumpur",
    title: "Eastin Ballroom",
    format: "Matterport Digital Twin",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    category: "hospitality",
    image: img("eastin_ballroom.jpg"),
    summary:
      "A ballroom tour that helps teams judge event layout, scale, and presentation readiness with less friction.",
    helps: "Supports venue review before walkthroughs and shortlists.",
    body:
      "Eastin's ballroom digital twin makes it easy for wedding planners, MICE buyers and internal event teams to inspect the room's scale, ceiling height, service access and staging options without a scheduled visit.",
    features: [
      "Ballroom walkthrough with measurement tool",
      "Prefunction and service circulation captured together",
      "One share link for every RFP reply",
    ],
    impact: "Faster shortlisting and fewer speculative site visits.",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "muzium-negara-gallery-a-pre-history",
    title: "Muzium Negara — Gallery A (Pre-history)",
    format: "Matterport Digital Twin",
    categories: ["Museum"],
    spaceType: "Museum",
    category: "commercial",
    image: img("muzium_negara.jpg"),
    summary:
      "A museum walkthrough that helps teams and visitors review Gallery A layout and exhibit flow remotely.",
    helps: "Makes exhibit planning and remote review easier before a visit.",
    body:
      "Malaysia's National Museum captured Gallery A as a digital twin so curators, educators and visitors can move through the exhibit online — a permanent, accessible record of the current installation used for planning, remote education and archival purposes.",
    features: [
      "Full gallery walkthrough with hotspots",
      "Permanent digital record for archival",
      "Supports remote education and pre-visit planning",
    ],
    impact: "A permanent, sharable spatial record of the current installation.",
  },
  {
    slug: "porsche-center-ara-damansara",
    title: "Porsche Center Ara Damansara",
    format: "Matterport Digital Twin",
    categories: ["Automotive", "Showroom"],
    spaceType: "Showroom",
    category: "automotive",
    image: img("porsche_ara.jpg"),
    summary:
      "A showroom walkthrough that helps automotive teams present arrival, display zones, and customer flow online.",
    helps: "Supports sales and client review before an in-person visit.",
    body:
      "The Porsche Center digital twin brings the arrival experience, showroom brand cues and vehicle display sequence online — sales advisors can pre-brief customers on layout and appointments before they walk in.",
    features: [
      "Arrival, showroom and after-sales areas captured",
      "Brand-consistent presentation embedded on partner sites",
      "Used in remote pre-sales appointments",
    ],
    impact: "Warm, on-brand first impression before the customer arrives.",
  },
  {
    slug: "kuala-lumpur-convention-centre",
    title: "Kuala Lumpur Convention Centre (KLCC)",
    format: "360° Virtual Tour",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    category: "hospitality",
    image: img("klcc.jpg"),
    summary:
      "A venue walkthrough that makes hall scale, circulation, and event flow easier to review remotely.",
    helps:
      "Helps event teams review hall scale and movement more confidently before site visits.",
    body:
      "KLCC's spatial tour eliminates repeated physical site visits for international and out-of-state organisers — hall dimensions, loading dock access, prefunction flow and breakout rooms are all walkable in one shared link.",
    features: [
      "Grand and plenary halls captured",
      "Circulation and prefunction spaces visible",
      "Eliminates repeated physical site visits for organisers",
    ],
    impact: "Site-visit reduction for international organisers.",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "parkland-residence-kj2",
    title: "Parkland Residence — Type KJ2 (929 sq ft)",
    format: "Matterport Digital Twin",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    category: "real-estate",
    image: img("parkland_residence_kj2.jpg"),
    summary:
      "929 sq ft Type KJ2 unit with dollhouse & floorplan views, measurement tool and remote exploration.",
    helps: "Helps buyers and agents review the home before site visits.",
    body:
      "The Type KJ2 unit at Parkland Residence — a 929 sq ft layout — was captured as a Matterport twin, exposing dollhouse and floorplan views, a room-by-room walkthrough and the measurement tool so buyers and agents can verify furniture fit and layout choices remotely.",
    features: [
      "929 sq ft Type KJ2 unit fully captured",
      "Dollhouse and floorplan views",
      "Measurement tool for furniture fit",
      "Remote exploration for out-of-town buyers",
    ],
    impact: "Buyers self-qualify — fewer wasted show-unit visits.",
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
  },
  {
    slug: "swarovski-marina-bay-sands-singapore",
    title: "Swarovski — Marina Bay Sands, Singapore",
    format: "Matterport Digital Twin",
    categories: ["Retail", "Retail Showroom"],
    spaceType: "Retail Showroom",
    category: "commercial",
    image: img("swarovski_marina_bay.jpg"),
    summary:
      "A premium retail walkthrough that shows layout and display atmosphere with more clarity.",
    helps: "Helps luxury retail teams present the space before in-store visits.",
    body:
      "Swarovski's Marina Bay Sands boutique was captured as a digital twin used by regional VM and training teams to present store planograms, brand cues and customer flow to markets that can't visit in person.",
    features: [
      "Boutique-scale capture at Marina Bay Sands",
      "Used for VM and training briefings across markets",
      "Preserves seasonal display for archival",
    ],
    impact: "Regional teams align on VM and brand cues remotely.",
  },
  {
    slug: "pnb-cimb-hub",
    title: "PNB — CIMB Hub",
    format: "Matterport Digital Twin",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    category: "commercial",
    image: img("pnb_cimb_hub.jpg"),
    summary:
      "Doubles as a virtual showcase AND a facility-management tool supporting PNB's digital transformation.",
    helps: "Supports internal alignment and workspace presentation.",
    body:
      "PNB's CIMB Hub is captured as a digital twin that plays two roles at once — a virtual showcase for stakeholders and partners, and a working facility-management tool that supports PNB's broader digital transformation agenda.",
    features: [
      "Virtual showcase for stakeholders and partners",
      "Facility-management reference for maintenance and space planning",
      "Supports PNB's digital transformation",
    ],
    impact: "One asset, two workflows — marketing and FM.",
  },
  {
    slug: "huawei-enterprise-business-malaysia-tac-the-icon",
    title: "Huawei Enterprise Business Malaysia — TAC, The Icon",
    format: "Matterport Digital Twin",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    category: "commercial",
    image: img("huawei.jpg"),
    summary:
      "A workplace presentation designed to make the environment feel legible for business review.",
    helps: "Helps teams present office layouts and circulation more clearly.",
    body:
      "Huawei's Technology and Application Centre at The Icon was captured so partners, distributors and enterprise clients can pre-brief on the demo environment before visiting.",
    features: [
      "Full TAC workspace capture",
      "Used for partner enablement",
      "Reusable across regional business reviews",
    ],
    impact: "Cleaner partner enablement before physical visits.",
  },
  {
    slug: "yamaha-lifestyle-station",
    title: "Yamaha Lifestyle Station",
    format: "Matterport Digital Twin",
    categories: ["Automotive", "Showroom"],
    spaceType: "Showroom",
    category: "automotive",
    image: img("yamaha_station.jpg"),
    summary:
      "A showroom walkthrough that helps present products, circulation, and atmosphere with more clarity.",
    helps: "Supports retail and brand presentation before a visit.",
    body:
      "Yamaha's Lifestyle Station brings the brand's product range, service bays and lifestyle activation zones online, so dealers and prospects understand the experience before they arrive.",
    features: [
      "Product, service and lifestyle zones captured",
      "Used by dealer network for training",
      "Embedded on brand campaigns",
    ],
    impact: "Consistent brand experience across every dealer channel.",
  },
  {
    slug: "sutra-house-sutra-dance-theatre",
    title: "Sutra House — Sutra Dance Theatre",
    format: "Matterport Digital Twin",
    categories: ["Culture", "Performance Venue"],
    spaceType: "Performance Venue",
    category: "commercial",
    image: img("sutra_house.jpg"),
    summary:
      "A venue walkthrough that helps present rehearsal, performance, and spatial context for cultural spaces.",
    helps: "Helps audiences and stakeholders review the venue remotely.",
    body:
      "The Sutra Dance Theatre — a heritage venue — was captured so cultural institutions, funders and audiences can experience the space and its programming context online.",
    features: [
      "Heritage venue captured with fidelity",
      "Used for cultural funding presentations",
      "Preserves the current interpretive layout",
    ],
    impact: "A durable, sharable record of a living heritage venue.",
  },
  {
    slug: "henkel-malaysia-kuala-lumpur",
    title: "Henkel Malaysia Kuala Lumpur",
    format: "Matterport Digital Twin",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    category: "commercial",
    image: img("henkel.jpg"),
    summary:
      "A workplace walkthrough that makes corporate layout and meeting areas easier to review online.",
    helps: "Supports stakeholder review and office presentation.",
    body:
      "Henkel Malaysia uses their digital twin as a corporate virtual onboarding tool — remote candidates and new hires can walk the office, meeting rooms and collaboration spaces before their first day, keeping engagement warm during hiring.",
    features: [
      "Corporate virtual onboarding use case",
      "Remote employee engagement during hiring",
      "Walkable office, meeting rooms and collaboration spaces",
    ],
    impact: "Warmer onboarding for hires who join before their first office visit.",
  },
  {
    slug: "worq-kl-sentral",
    title: "WORQ KL Sentral",
    format: "Matterport Digital Twin",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    category: "commercial",
    image: img("worq_kl_sentral.jpg"),
    summary:
      "A coworking walkthrough that helps prospects understand shared office flow before visiting.",
    helps:
      "Supports leasing and membership conversations with clearer space context.",
    body:
      "WORQ's KL Sentral hub was captured so membership prospects can preview desks, meeting rooms and lounge areas online — every enquiry can be answered with a tour link.",
    features: [
      "Desks, meeting rooms and lounge captured",
      "Used for membership and enterprise leasing",
      "Reduces speculative viewings",
    ],
    impact: "Membership conversations start with the tour already viewed.",
  },
  {
    slug: "coway-experience-centre",
    title: "Coway Experience Centre",
    format: "Matterport Digital Twin",
    categories: ["Retail", "Retail Showroom"],
    spaceType: "Retail Showroom",
    category: "commercial",
    image: img("coway_experience_centre.jpg"),
    summary:
      "A retail presentation that helps visitors understand the showroom flow and product environment online.",
    helps: "Supports product discovery and showroom preview before visits.",
    body:
      "Coway's Experience Centre digital twin lets prospective customers explore the product-in-context environment online, guided by hotspots that link to specific product pages.",
    features: [
      "Product-in-context showroom captured",
      "Hotspots link to product detail pages",
      "Reduces friction for online-to-store journeys",
    ],
    impact: "Smoother online-to-store journeys with self-guided discovery.",
  },
  {
    slug: "port-dickson-360-tour",
    title: "Port Dickson — Destination 360°",
    format: "360° Virtual Tour",
    categories: ["Hospitality"],
    spaceType: "Hospitality",
    category: "hospitality",
    image: img("portdickson.jpg"),
    summary:
      "A destination-first tour format that gives viewers a quick and immersive sense of place across devices.",
    helps:
      "Helps audiences preview the destination quickly on mobile, web, and shared links.",
    body:
      "Port Dickson's destination tour bundles the coastline, marina and key hospitality landmarks into a lightweight, mobile-first 360° experience — perfect for social, WhatsApp and OTA discovery.",
    features: [
      "Coastline, marina and hospitality landmarks",
      "Lightweight, mobile-first delivery",
      "Shareable on social and WhatsApp",
    ],
    impact: "Fast destination discovery on the smallest screens.",
  },
  {
    slug: "glomac-primrose",
    title: "Glomac Primrose",
    format: "CGI",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    category: "real-estate",
    image: img("glomac.jpg"),
    summary:
      "A visualisation piece that helps explain the project before it reaches the physical stage.",
    helps: "Supports early sales and planning conversations.",
    body:
      "Glomac Primrose was visualised in CGI ahead of physical construction to support early sales conversations, planning meetings and campaign material.",
    features: [
      "Photoreal CGI interiors and exteriors",
      "Used for early sales and campaign material",
      "Consistent finishes across every marketing asset",
    ],
    impact: "Sales conversations start well before the physical show unit.",
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
  },
  {
    slug: "dsara",
    title: "D'sara",
    format: "Virtual Staging",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    category: "real-estate",
    image: img("dsara.jpg"),
    summary:
      "A virtual staging presentation used to show layout and atmosphere before delivery.",
    helps: "Helps buyers visualise the finished space earlier.",
    body:
      "D'sara's virtual staging brought empty units to life with photoreal furnishing, giving buyers a clear feel for the delivered atmosphere long before handover.",
    features: [
      "Photoreal virtual staging",
      "Multiple furnishing schemes explored",
      "Reusable across brochures and portals",
    ],
    impact: "Buyers visualise the finished space earlier — faster commitment.",
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
  },
  {
    slug: "dewan-1958-by-chef-wan",
    title: "De.Wan 1958 by Chef Wan",
    format: "Matterport Digital Twin",
    categories: ["Hospitality", "Restaurant"],
    spaceType: "Restaurant",
    category: "hospitality",
    image: img("de_wan.jpg"),
    summary:
      "A dining-space walkthrough that helps guests and teams review layout and atmosphere remotely.",
    helps: "Supports brand presentation and reservation confidence.",
    body:
      "De.Wan 1958's digital twin captures the restaurant's design language and dining flow — perfect for group bookings and private-event enquiries.",
    features: [
      "Full restaurant walkthrough",
      "Private dining and event areas visible",
      "Reservation confidence for group bookings",
    ],
    impact: "Group and event bookings decide with the room already walked.",
  },
  {
    slug: "private-jet-falcon-7x",
    title: "Private Jet — Falcon 7X",
    format: "Matterport Digital Twin",
    categories: ["Aviation", "Private Jet"],
    spaceType: "Private Jet",
    category: "aerial",
    image: img("falcon_7x.jpg"),
    summary:
      "A premium transport walkthrough that presents cabin detail, layout, and spatial finish online.",
    helps: "Supports high-touch sales and remote inspection.",
    body:
      "The Falcon 7X cabin was captured for remote high-touch sales — brokers can walk clients through the aircraft interior at any hour, with measurement tools for cabin dimensions.",
    features: [
      "Cabin interior fully walkable",
      "Measurement tool for cabin dimensions",
      "Used for remote pre-inspection",
    ],
    impact: "Sales cycles compress — buyers pre-inspect from anywhere.",
  },
  /* ---------- NEW case studies (2.4) ---------- */
  {
    slug: "confetti-kuala-lumpur",
    title: "Confetti Kuala Lumpur — Wedding Halls & Ballrooms",
    format: "Matterport Digital Twin",
    categories: ["Hospitality", "Event Venue"],
    spaceType: "Hospitality",
    category: "hospitality",
    image: img("confetti_kl.jpg"),
    summary:
      "Wedding halls, ballrooms, honeymoon suites and themed bars — all explorable online.",
    helps: "Supports event planning and booking decisions.",
    body:
      "Confetti KL's full property was captured as one integrated digital twin — wedding halls, ballrooms, honeymoon suites and themed bars, all walkable from a single link. Couples, wedding planners and MICE buyers can compare rooms and finalise setup before a physical visit.",
    features: [
      "Wedding halls, ballrooms and honeymoon suites captured",
      "Themed bars included for F&B decisions",
      "Supports event planning and booking decisions",
      "Live tour: https://my.matterport.com/show/?m=UBz2L8ZyT8S",
    ],
    impact: "Every enquiry starts with the twin — booking decisions move earlier.",
    tourUrl: "https://my.matterport.com/show/?m=UBz2L8ZyT8S",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "shell-360-training",
    title: "Shell — 360° Safety Training Platform",
    format: "Interactive 360° Training",
    categories: ["Industrial", "Training"],
    spaceType: "Training Platform",
    category: "aerial",
    image: img("shell_training.jpg"),
    summary:
      "An interactive 360° safety-training platform for oil & gas — aerial 360° views, guided steps, and info tags.",
    helps: "Delivers standardised safety training without deploying trainers on site.",
    body:
      "Shell's interactive 360° safety-training platform combines aerial 360° views of the site with guided step navigation, info tags and checklist call-out forms — turning a scattered training programme into one browsable, auditable experience.",
    features: [
      "Aerial 360° views of the operational site",
      "Guided step navigation through the training flow",
      "Info tags for hazards and procedures",
      "Checklist call-out forms embedded in-scene",
    ],
    impact: "Standardised training delivered without repeated trainer deployment.",
  },
  {
    slug: "flora-hijauan-gombak",
    title: "Flora Hijauan Gombak — Type A / B / C Units",
    format: "3D 360° Rendered Tour",
    categories: ["Real Estate", "Residential", "CGI"],
    spaceType: "Residential",
    category: "real-estate",
    image: img("flora_hijauan.jpg"),
    summary:
      "3D 360° rendered tours of unbuilt Type A/B/C units plus aerial 360° context — pre-sales without physical visits.",
    helps: "Enables pre-sales for developments that don't yet exist physically.",
    body:
      "Flora Hijauan Gombak's Type A, B and C unit layouts were rendered as immersive 3D 360° tours before construction, paired with aerial 360° site context — letting the developer take pre-sales enquiries with a fully explorable virtual show unit in place of a costly physical gallery.",
    features: [
      "Type A, B and C units rendered in 3D 360°",
      "Aerial 360° site context included",
      "Pre-sales without physical visits",
      "Reusable across web, WhatsApp and gallery displays",
    ],
    impact: "Pre-sales pipeline warmed months before the show unit opens.",
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
  },
  {
    slug: "royal-lexis-kl",
    title: "Royal Lexis Kuala Lumpur",
    format: "360° Virtual Tour",
    categories: ["Hospitality"],
    spaceType: "Hospitality",
    category: "hospitality",
    image: img("royal_lexis_kl.jpg"),
    summary:
      "360° tour of suites and amenities — stronger online engagement and booking confidence.",
    helps: "Boosts online engagement and booking confidence.",
    body:
      "Royal Lexis KL uses a 360° virtual tour of its suites and shared amenities to drive stronger online engagement, and to give bookers the confidence to lock premium rooms without physical inspection.",
    features: [
      "Suites and amenities in 360°",
      "Higher online engagement",
      "Premium bookings converted remotely",
    ],
    impact: "Stronger conversion on premium suite bookings.",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
  },
  {
    slug: "meshtech",
    title: "Meshtech — HD 360° Corporate Showroom",
    format: "HD 360° Tour",
    categories: ["Corporate", "Showroom"],
    spaceType: "Showroom",
    category: "commercial",
    image: img("meshtech.jpg"),
    summary:
      "HD 360° corporate showroom tour for a technology brand's client-facing experience.",
    helps: "Supports client-facing showroom preview at broadcast fidelity.",
    body:
      "Meshtech's HD 360° tour brings their corporate showroom online at broadcast fidelity — used by sales teams to preview the space with clients before scheduling on-site demos.",
    features: [
      "HD 360° capture for maximum fidelity",
      "Used for client-facing pre-demo previews",
      "Embedded on the corporate site and sales decks",
    ],
    impact: "Client demos start warmer — the showroom is already familiar.",
  },
  {
    slug: "jerry-coworking-sri-hartamas",
    title: "Jerry Coworking — Sri Hartamas",
    format: "Immersive Coworking Tour",
    categories: ["Corporate", "Coworking"],
    spaceType: "Workspace",
    category: "commercial",
    image: img("jerry_coworking.jpg"),
    summary:
      "Immersive coworking tour used for member acquisition and virtual community engagement.",
    helps: "Supports member acquisition without repeat viewings.",
    body:
      "Jerry Coworking in Sri Hartamas captured their space as an immersive tour used across their member acquisition funnel — prospects walk the space, community areas and phone booths online before booking a trial day.",
    features: [
      "Full coworking floor captured immersively",
      "Community areas and phone booths visible",
      "Used across the member acquisition funnel",
    ],
    impact: "Member acquisition without repeat viewings.",
  },
  {
    slug: "royal-lexis",
    title: "Royal Lexis",
    format: "360° Virtual Tour + Drone 360°",
    categories: ["Property Developer", "Residential"],
    spaceType: "Residential",
    category: "real-estate",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/07/360-PanoramicRoyal-Lexis-Drone-3D-360-Day-View-scaled.jpg",
    featured: true,
    videoId: "3XjFnvJUWMo",
    location: "Malaysia",
    summary:
      "A property-developer 360° virtual tour paired with drone 360° panoramas, so buyers read the unit and the surrounding context in one session.",
    helps: "Buyers understand unit, view and surroundings before a site visit.",
    body:
      "Royal Lexis was captured as a full 360° virtual tour for the developer's sales funnel, combined with drone 360° panoramas that place the development in its real surroundings. Prospects move from the aerial day view straight into the unit interiors, which answers the two questions buyers ask first: what does it look like, and what is around it.",
    features: [
      "360° virtual tour of the development",
      "Drone 360° day-view panoramas for context",
      "Video walkthrough embedded alongside the tour",
      "One shareable link for agents and buyers",
    ],
    impact: "Fewer speculative site visits — buyers arrive already convinced.",
    tourUrl: "https://virtualproperty.my/360tour/royallexis/",
    relatedService: "cgi-360-panorama-tours",
    relatedServiceLabel: "CGI 360° Panorama Tours",
  },
  {
    slug: "maeps",
    title: "MAEPS — Malaysia Agro Exposition Park",
    format: "360° Virtual Tour",
    categories: ["Exhibition & Events"],
    spaceType: "Exhibition & Events",
    category: "hospitality",
    image: "",
    featured: true,
    location: "Serdang, Selangor",
    summary:
      "Event-space visualization and remote site visits for one of Malaysia's largest exhibition venues.",
    helps: "Organisers run remote site visits before committing to a hall.",
    body:
      "MAEPS is a large multi-hall exhibition venue where organisers historically had to travel for a physical site visit before committing. The 360° tour lets event planners, exhibitors and stand builders walk the halls remotely, judge scale and access, and plan floor layouts without a trip to Serdang.",
    features: [
      "360° capture across exhibition halls",
      "Remote site visits for organisers and exhibitors",
      "Supports floor-plan and stand-build planning",
      "Shared as one link in RFP responses",
    ],
    impact: "Remote site visits replace travel in the shortlisting stage.",
    tourUrl: "https://novoreperio.com/360tour/maeps/",
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Event Venue Digital Twins",
  },
  {
    slug: "flora-hijauan-melati-east",
    title: "Flora Hijauan Melati East",
    format: "360° Property Visualization",
    categories: ["Residential", "Property Developer"],
    spaceType: "Residential",
    category: "real-estate",
    image: "",
    featured: true,
    location: "Melati East, Kuala Lumpur",
    summary:
      "360° property visualization for a transit-oriented residential development off the MRR2.",
    helps: "Explains layout and connectivity for a transit-oriented launch.",
    body:
      "Flora Hijauan Melati East is a transit-oriented residential development near the MRR2. The 360° property visualization gives buyers a clear read of unit layouts and the connectivity story that drives the launch, delivered as a link agents can send instantly.",
    features: [
      "360° visualization of unit types",
      "Transit-oriented context communicated visually",
      "Agent-ready shareable link",
      "Works on mobile for on-the-go buyers",
    ],
    impact: "Layout and connectivity are understood before the showroom visit.",
    tourUrl: "https://virtualproperty.my/360tour/hijauan/",
    relatedService: "cgi-360-panorama-tours",
    relatedServiceLabel: "CGI 360° Panorama Tours",
  },
  {
    slug: "majlis-bandaraya-seremban",
    title: "Majlis Bandaraya Seremban",
    format: "City Digital Twin",
    categories: ["Government & Tourism"],
    spaceType: "Government & Tourism",
    category: "aerial",
    image: "",
    featured: true,
    location: "Seremban, Negeri Sembilan",
    summary:
      "A city and local-tourism digital twin for the Seremban city council, opening the destination to remote visitors.",
    helps: "Puts the city's landmarks online for tourism and civic promotion.",
    body:
      "Majlis Bandaraya Seremban commissioned a city digital twin that presents key civic and tourism landmarks as an explorable online destination. It serves both citizens and visitors — a single, always-available window into the city.",
    features: [
      "Digital twin of civic and tourism landmarks",
      "Public-facing, always available",
      "Supports destination and investment promotion",
      "Hosted and shareable as one link",
    ],
    impact: "The destination is discoverable long before anyone travels.",
    tourUrl: "https://mbs.novoreperio.com/",
    relatedService: "urban-digital-twins",
    relatedServiceLabel: "Urban Digital Twins",
  },
  {
    slug: "peel-lane",
    title: "Peel Lane",
    format: "360° Virtual Tour",
    categories: ["Residential", "Property Developer"],
    spaceType: "Residential",
    category: "real-estate",
    image: "",
    featured: true,
    location: "Maluri, Cheras, Kuala Lumpur",
    summary:
      "A 40-storey, 406-unit residence in Maluri presented as a 360° virtual tour for the developer, Kukuh Dinamik Ekspres.",
    helps: "Buyers preview unit types across a 406-unit tower remotely.",
    body:
      "Peel Lane is a 40-storey residence of 406 units in Maluri, Cheras, developed by Kukuh Dinamik Ekspres. The 360° virtual tour lets buyers preview unit types and finishes from anywhere, keeping the sales conversation moving between showroom appointments.",
    features: [
      "360° virtual tour of unit types",
      "40 storeys, 406 units presented online",
      "Developer: Kukuh Dinamik Ekspres",
      "Mobile-first shareable link for agents",
    ],
    impact: "Sales conversations continue between showroom appointments.",
    tourUrl: "https://novoreperio.com/360tour/peel-lane/",
    relatedService: "cgi-360-panorama-tours",
    relatedServiceLabel: "CGI 360° Panorama Tours",
  },
];

export const WORKS: Work[] = RAW_WORKS.map((w) => ({
  ...w,
  image: wpWorkImage(w.slug) ?? w.image,
  tourUrl: TOUR_OVERRIDES[w.slug] ?? wpWorkTour(w.slug) ?? w.tourUrl,
})).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export const SPACE_TYPES = [
  "All Spaces",
  "Convention Centre",
  "Hospitality",
  "Exhibition & Events",
  "Museum",
  "Showroom",
  "Residential",
  "Government & Tourism",
  "Retail Showroom",
  "Workspace",
  "Performance Venue",
  "Restaurant",
  "Private Jet",
  "Training Platform",
] as const;


export function getWork(slug: string) {
  return WORKS.find((w) => w.slug === slug);
}

export function getWorksByCategory(cat: WorkCategoryKey) {
  return WORKS.filter((w) => w.category === cat);
}

export function getRelatedWorks(slug: string, limit = 2) {
  const w = getWork(slug);
  if (!w) return [];
  return WORKS.filter((x) => x.slug !== slug && x.category === w.category).slice(0, limit);
}
