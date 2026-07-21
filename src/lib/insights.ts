export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO-ish
  datePublished: string; // YYYY-MM-DD for schema
  category: string;
  image: string;
  sourceUrl: string;
  body: string;
  keyPoints: string[];
  relatedService?: string; // service slug
  relatedServiceLabel?: string;
  relatedWork?: string; // work slug
  relatedWorkLabel?: string;
};

const img = (name: string) => `/images/insights/${name}`;

export const INSIGHTS: Insight[] = [
  {
    slug: "best-tools-for-digital-twins",
    title: "Best Tools for Digital Twins by Business Use",
    excerpt:
      "Compare the best tools for digital twins across property, AEC, hospitality, and facilities, with practical criteria for selecting the right spatial platform.",
    date: "19 July 2026",
    datePublished: "2026-07-19",
    category: "Digital Twins & Matterport",
    image: img("best-tools-for-digital-twins.jpg"),
    sourceUrl: "https://novoreperio.com/best-tools-for-digital-twins/",
    body:
      "Choosing a digital-twin tool is not a matter of picking the most-marketed platform — it depends on the business decision the twin has to support. For hospitality and venue sales, Matterport dominates because the dollhouse, floorplan and measurement tools directly influence booking confidence. For AEC and facilities, higher-fidelity LiDAR platforms with point-cloud output matter more, because the deliverable feeds BIM. This article breaks the market into four business-use lenses and matches the right platform to each.",
    keyPoints: [
      "Hospitality & venues: Matterport wins on ease of sharing and buyer decision speed.",
      "AEC & facilities: LiDAR + point-cloud output feeds BIM workflows.",
      "Property developers: Matterport for finished units, CGI 360° for unbuilt.",
      "Enterprise & training: interactive 360° platforms with hotspots and forms.",
    ],
    relatedService: "spatial-capture-digital-twins",
    relatedServiceLabel: "Spatial Capture & Digital Twins",
    relatedWork: "hyatt-kuantan-ballroom",
    relatedWorkLabel: "Hyatt Kuantan Ballroom",
  },
  {
    slug: "3d-rendering-for-pre-sales",
    title: "How 3D Rendering for Pre Sales Drives Demand",
    excerpt:
      "3D rendering for pre sales gives buyers a clear view of unbuilt spaces, helping property, hospitality, and retail teams qualify leads faster remotely.",
    date: "17 July 2026",
    datePublished: "2026-07-17",
    category: "3D Rendering & Visualisation",
    image: img("3d-rendering-for-pre-sales.jpg"),
    sourceUrl: "https://novoreperio.com/3d-rendering-for-pre-sales/",
    body:
      "The moment buyers are asked to commit to something that doesn't exist yet, trust becomes the entire sales cycle. High-quality 3D rendering shortens that trust gap — buyers who can walk, look around and imagine themselves inside a rendered space qualify themselves before ever speaking to sales.",
    keyPoints: [
      "Pre-sales renders let buyers self-qualify online, filtering weak leads.",
      "One 3D asset base unlocks stills, 360°, walkthrough films and social cuts.",
      "Rendered 360° panoramas are light enough for portals and WhatsApp.",
      "Photoreal dusk hero renders remain the highest-converting hero image.",
    ],
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
    relatedWork: "flora-hijauan-gombak",
    relatedWorkLabel: "Flora Hijauan Gombak",
  },
  {
    slug: "bim-ready-point-cloud-workflow-existing-buildings",
    title: "BIM Ready Point Cloud Workflow for Existing Buildings",
    excerpt:
      "A BIM ready point cloud workflow turns site capture into reliable as-built models, reducing rework, design risk, and delays across complex projects today.",
    date: "15 July 2026",
    datePublished: "2026-07-15",
    category: "LiDAR, Scan & BIM",
    image: img("bim-ready-point-cloud-workflow.jpg"),
    sourceUrl:
      "https://novoreperio.com/bim-ready-point-cloud-workflow-existing-buildings/",
    body:
      "As-built drawings are almost always wrong. A BIM-ready point-cloud workflow closes that gap: LiDAR captures the building exactly as it is today, and downstream modellers convert the cloud into an accurate BIM that design teams can trust. The result is fewer surprises in coordination, fewer clashes on site, and a much shorter path from survey to delivery.",
    keyPoints: [
      "LiDAR captures the building's true current state.",
      "Point cloud is registered and cleaned before modelling.",
      "Scan-to-BIM converts the cloud into LOD 200–350 as-built models.",
      "Design teams coordinate against reality, not out-of-date drawings.",
    ],
    relatedService: "scan-to-bim",
    relatedServiceLabel: "Scan-to-BIM & LiDAR",
    relatedWork: "pnb-cimb-hub",
    relatedWorkLabel: "PNB CIMB Hub",
  },
  {
    slug: "can-virtual-tours-increase-bookings",
    title: "Can Virtual Tours Increase Bookings? The Evidence",
    excerpt:
      "Can virtual tours increase bookings? See how immersive digital twins reduce uncertainty, qualify leads, and improve conversions for venues at scale now.",
    date: "13 July 2026",
    datePublished: "2026-07-13",
    category: "Digital Twins & Matterport",
    image: img("can-virtual-tours-increase-bookings.jpg"),
    sourceUrl: "https://novoreperio.com/can-virtual-tours-increase-bookings/",
    body:
      "The evidence keeps pointing in the same direction: venues that publish walkable digital twins convert enquiries faster and lose fewer deals to indecision. The twin removes the biggest friction in venue sales — uncertainty about the room — and lets planners self-qualify in seconds. WTCKL's twin has served 8,000+ visits, averaging ~37 per week; that traffic is doing sales work the human team no longer has to.",
    keyPoints: [
      "70%+ of hospitality bookings are shortlisted online before human contact.",
      "One site visit is all most planners get — the twin does the second.",
      "Planners verify scale and layout in seconds, not weeks.",
      "One capture, every channel: web, OTAs, RFPs, GBP, live calls.",
    ],
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
    relatedWork: "world-trade-centre-kuala-lumpur",
    relatedWorkLabel: "WTCKL",
  },
  {
    slug: "digital-twin-for-facility-management",
    title: "Digital Twin for Facility Management",
    excerpt:
      "Learn how a digital twin for facility management improves maintenance, asset visibility, planning, and faster decisions across complex buildings.",
    date: "4 May 2026",
    datePublished: "2026-05-04",
    category: "Digital Twins & Matterport",
    image: img("digital-twin-for-facility-management.jpg"),
    sourceUrl: "https://novoreperio.com/digital-twin-for-facility-management/",
    body:
      "A facility-management twin isn't a marketing asset — it's a working system of record. Every asset, valve and access panel tagged in-scene is one less field trip, one less call to the wrong contractor, and one less delayed maintenance decision. Owners of complex buildings recover the twin's cost within the first year on avoided site visits alone.",
    keyPoints: [
      "Assets tagged in-scene become the FM team's system of record.",
      "Contractors bid on accurate as-built context, not guesswork.",
      "Remote inspection replaces routine site visits.",
      "Space planning uses real dimensions, not stale drawings.",
    ],
    relatedService: "spatial-capture-digital-twins",
    relatedServiceLabel: "Spatial Capture & Digital Twins",
    relatedWork: "pnb-cimb-hub",
    relatedWorkLabel: "PNB CIMB Hub",
  },
  {
    slug: "matterport-virtual-tour-for-real-estate",
    title: "Matterport Virtual Tour for Real Estate",
    excerpt:
      "A Matterport virtual tour for real estate helps attract serious buyers, improve engagement, and speed up decisions with immersive property viewing.",
    date: "3 May 2026",
    datePublished: "2026-05-03",
    category: "Digital Twins & Matterport",
    image: img("matterport-virtual-tour-for-real-estate.jpg"),
    sourceUrl:
      "https://novoreperio.com/matterport-virtual-tour-for-real-estate/",
    body:
      "A Matterport listing does two jobs at once: it disqualifies buyers who wouldn't have proceeded (a good thing — it protects the agent's time) and it heats the ones who will. The dollhouse, floorplan and measurement views let serious buyers pre-commit before a physical viewing.",
    keyPoints: [
      "Serious buyers self-qualify — wasted viewings drop.",
      "Dollhouse and floorplan expose layout at a glance.",
      "Measurement tool answers 'will my sofa fit?' remotely.",
      "One link works across portals, WhatsApp and agent decks.",
    ],
    relatedService: "spatial-capture-digital-twins",
    relatedServiceLabel: "Spatial Capture & Digital Twins",
    relatedWork: "parkland-residence-kj2",
    relatedWorkLabel: "Parkland Residence KJ2",
  },
  {
    slug: "lidar-scanning-for-buildings-that-pays-off",
    title: "LiDAR Scanning for Buildings That Pays Off",
    excerpt:
      "LiDAR scanning for buildings helps teams capture accurate site data, reduce rework, support BIM workflows, and speed up planning decisions.",
    date: "2 May 2026",
    datePublished: "2026-05-02",
    category: "LiDAR, Scan & BIM",
    image: img("lidar-scanning-for-buildings.jpg"),
    sourceUrl:
      "https://novoreperio.com/lidar-scanning-for-buildings-that-pays-off/",
    body:
      "LiDAR isn't a novelty; on any renovation or heritage project it's the only capture path that pays for itself. The scanner records the building as it actually is — every out-of-plumb wall, every hidden bulkhead — so design decisions and cost estimates are grounded in reality. The alternative is discovering the truth mid-construction, at ten times the cost.",
    keyPoints: [
      "LiDAR captures the true, current state of the building.",
      "Reduces mid-construction surprises and change orders.",
      "Feeds BIM workflows cleanly.",
      "Pays back on the first avoided rework.",
    ],
    relatedService: "scan-to-bim",
    relatedServiceLabel: "Scan-to-BIM & LiDAR",
    relatedWork: "pnb-cimb-hub",
    relatedWorkLabel: "PNB CIMB Hub",
  },
  {
    slug: "scan-to-bim-services",
    title: "Scan to BIM Services for Existing Buildings",
    excerpt:
      "Scan to BIM services convert laser scans into accurate as-built models — supporting renovation, MEP coordination, and facility handover with fewer surprises.",
    date: "28 April 2026",
    datePublished: "2026-04-28",
    category: "LiDAR, Scan & BIM",
    image: img("scan-to-bim.jpg"),
    sourceUrl: "https://novoreperio.com/scan-to-bim-services/",
    body:
      "Scan to BIM is the bridge between the scanner and the design team. The point cloud is the raw truth; the BIM is the workable model. Getting that conversion right — LOD, discipline coverage, level of accuracy — is what makes the deliverable useful to architects, MEP engineers and facility owners rather than a data dump nobody opens.",
    keyPoints: [
      "Point cloud → LOD 200/300/350 BIM depending on downstream need.",
      "MEP coordination on reality, not on documented intent.",
      "Handover packages that owners can actually maintain.",
      "Renovation risk is priced accurately from day one.",
    ],
    relatedService: "scan-to-bim",
    relatedServiceLabel: "Scan-to-BIM & LiDAR",
    relatedWork: "pnb-cimb-hub",
    relatedWorkLabel: "PNB CIMB Hub",
  },
  {
    slug: "360-virtual-tour-for-hotels",
    title: "360° Virtual Tour for Hotels and Resorts",
    excerpt:
      "A 360° virtual tour for hotels lets planners, corporates, and guests preview rooms, ballrooms, and public spaces before booking or site inspection.",
    date: "20 April 2026",
    datePublished: "2026-04-20",
    category: "Virtual Tours",
    image: img("360-virtual-tour-for-hotels.jpg"),
    sourceUrl: "https://novoreperio.com/360-virtual-tour-for-hotels/",
    body:
      "A 360° hotel tour isn't a novelty — it's the modern brochure. Corporate bookers, wedding planners and leisure guests all want to look around before committing, and the properties that provide that experience win the booking. Combined with a full Matterport twin for ballrooms and F&B, the 360° tour is the fastest layer to deploy and the widest to distribute.",
    keyPoints: [
      "Rooms, ballrooms and public spaces previewable online.",
      "Distributes across web, OTA listings and Google Business Profile.",
      "Lighter than a full digital twin — deployable in days.",
      "Combines well with Matterport for signature spaces.",
    ],
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
    relatedWork: "royal-lexis-kl",
    relatedWorkLabel: "Royal Lexis KL",
  },
  {
    slug: "aerial-drone-photography-for-property",
    title: "Aerial Drone Photography for Property Launches",
    excerpt:
      "Aerial drone photography shows scale, access, and surroundings — the context that unit floorplans and interior renders simply cannot communicate.",
    date: "12 April 2026",
    datePublished: "2026-04-12",
    category: "3D Rendering & Visualisation",
    image: img("aerial-drone-property.jpg"),
    sourceUrl:
      "https://novoreperio.com/aerial-drone-photography-for-property/",
    body:
      "Interior renders sell the unit; aerial photography sells the location. Both matter, and buyers who see the surroundings, access and skyline at the right time make faster decisions. Aerial 360° panoramas at multiple floor heights let buyers preview the exact view from the exact floor they're considering — a signal no floorplan can send.",
    keyPoints: [
      "Aerial shots communicate scale, access and surroundings.",
      "Aerial 360° at multiple floor heights previews real views.",
      "Combines with CGI hybrids for unbuilt developments.",
      "Drone licensing is handled end-to-end by the studio.",
    ],
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
    relatedWork: "flora-hijauan-gombak",
    relatedWorkLabel: "Flora Hijauan Gombak",
  },
  {
    slug: "digital-twin-for-convention-centres",
    title: "Digital Twin for Convention Centres and Ballrooms",
    excerpt:
      "A digital twin for convention centres helps event planners visualise seating, staging, and flow — closing bookings faster with fewer site visits.",
    date: "1 April 2026",
    datePublished: "2026-04-01",
    category: "Digital Twins & Matterport",
    image: img("digital-twin-convention.jpg"),
    sourceUrl:
      "https://novoreperio.com/digital-twin-for-convention-centres/",
    body:
      "Convention centres are the venue category where digital twins pay back fastest. A single hall can be pitched to hundreds of prospects a year; every one of them wants to know it fits their event, and every unqualified site visit costs both parties. WTCKL's numbers make the case: 8,000+ tour visits doing the work of half a sales team.",
    keyPoints: [
      "Planners visualise seating, staging and flow before enquiry.",
      "Every RFP reply carries a live tour link.",
      "Site visits become confirmations, not exploration.",
      "Bookings close faster with confidence pre-built.",
    ],
    relatedService: "hospitality-digital-twins",
    relatedServiceLabel: "Hospitality Digital Twins",
    relatedWork: "world-trade-centre-kuala-lumpur",
    relatedWorkLabel: "WTCKL",
  },
  {
    slug: "cgi-vs-photography-property-marketing",
    title: "CGI vs Photography for Property Marketing",
    excerpt:
      "Choosing between CGI and photography depends on stage, budget, and target buyer. Here is how leading developers combine both for stronger launches.",
    date: "22 March 2026",
    datePublished: "2026-03-22",
    category: "3D Rendering & Visualisation",
    image: img("cgi-vs-photography.jpg"),
    sourceUrl:
      "https://novoreperio.com/cgi-vs-photography-property-marketing/",
    body:
      "The right answer is almost always 'both, in sequence'. CGI carries the pre-launch phase — hero visuals, dusk exteriors, virtual show units — because photography of an unbuilt building doesn't exist. Once the project is delivered, photography takes over for authenticity, but CGI is retained for consistent hero imagery and refresh cycles.",
    keyPoints: [
      "CGI dominates pre-launch — the building doesn't exist yet.",
      "Photography takes over post-handover for authenticity.",
      "CGI stays for hero refreshes and consistent finishes.",
      "One 3D asset base powers both hero stills and 360° tours.",
    ],
    relatedService: "property-visualization",
    relatedServiceLabel: "Property Visualization",
    relatedWork: "dsara",
    relatedWorkLabel: "D'sara",
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
