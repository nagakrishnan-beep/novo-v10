// Industry topical-authority pages. Each links to services, works, insights.

export type IndustryTech =
  | "Matterport twins"
  | "LiDAR / Scan-to-BIM"
  | "360° virtual tours"
  | "Drone / aerial capture"
  | "CGI & UE5"
  | "Commercial photography";

export type Industry = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  problems: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  outcome: { headline: string; points: string[] };
  tech: IndustryTech[];
  workSlugs: string[];
  serviceSlugs: { slug: string; label: string }[];
  insightSlugs: string[];
  faqs: { q: string; a: string }[];
  note?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "property-development",
    name: "Property Development",
    h1: "Sell off-plan units before ground breaks.",
    metaTitle:
      "Property Development Digital Twins & Virtual Tours Malaysia | Novo Reperio",
    metaDesc:
      "Virtual show units, CGI walkthroughs and 360° panoramas for Malaysian property developers; help buyers commit before construction completes.",
    intro:
      "Property developers use Novo Reperio's CGI walkthroughs, virtual show units and 360° panoramas to let buyers experience unbuilt homes online, shortening the trust gap between launch day and physical show unit.",
    problems: [
      {
        title: "Buyers hesitate on unbuilt units",
        body: "Renders alone don't convey scale. Off-plan buyers walk away from launches they cannot picture themselves inside.",
      },
      {
        title: "Physical show units are expensive to duplicate",
        body: "One region, one show unit. Buyers outside Klang Valley never see the space and drop off before the follow-up call.",
      },
      {
        title: "Sales galleries close early in the launch cycle",
        body: "Once units sell down, physical galleries close, but marketing still needs remaining stock to move.",
      },
    ],
    benefits: [
      {
        title: "24/7 virtual show unit",
        body: "Buyers walk the unit from anywhere, measure rooms, view furniture layouts and self-qualify before booking a site visit.",
      },
      {
        title: "CGI 360° for unbuilt phases",
        body: "Render every unit type before construction, embed on the sales portal, and syndicate to iProperty, PropertyGuru and OTA channels.",
      },
      {
        title: "Faster remote buyer conversion",
        body: "Overseas Malaysians and Singapore buyers commit without flying in, closing loops that used to take weeks in one call.",
      },
      {
        title: "Reusable across marketing channels",
        body: "One asset base fuels stills, walkthroughs, social cuts, WhatsApp shareables and the sales portal.",
      },
    ],
    outcome: {
      headline: "Sell more, sooner, to buyers who never visit.",
      points: [
        "Buyers self-qualify on the twin before booking a site visit.",
        "Overseas and out-of-state buyers commit without flying in.",
        "The asset keeps selling remaining stock after the gallery closes.",
      ],
    },
    tech: ["Matterport twins", "CGI & UE5", "360° virtual tours", "Drone / aerial capture"],
    workSlugs: ["flora-hijauan-gombak", "glomac-primrose", "parkland-residence-kj2", "dsara"],
    serviceSlugs: [
      { slug: "property-visualization", label: "Property Visualization" },
      { slug: "cgi-360-panorama-tours", label: "CGI 360° Panorama Tours" },
      { slug: "3d-rendered-walkthrough-tours", label: "3D Rendered Walkthrough Tours" },
    ],
    insightSlugs: [
      "3d-rendering-for-pre-sales",
      "cgi-vs-photography-property-marketing",
    ],
    faqs: [
      {
        q: "Can you produce virtual tours before the building is built?",
        a: "Yes. We render photorealistic CGI walkthroughs and 360° panoramas from architectural drawings; buyers explore unbuilt units months before handover.",
      },
      {
        q: "Do virtual show units replace physical galleries?",
        a: "They complement galleries. Physical spaces win first-time buyers; virtual show units keep converting after the gallery closes and reach overseas buyers who never visit.",
      },
      {
        q: "How quickly can we launch a project microsite with virtual tour?",
        a: "For a standard phase, 4–8 weeks depending on unit-type count and rendering complexity. Rush timelines are possible for launch-critical projects.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    h1: "Document every stage, defend every claim.",
    metaTitle:
      "Construction Digital Twins & Scan-to-BIM Malaysia | Novo Reperio",
    metaDesc:
      "Progress documentation, as-built LiDAR capture and Scan-to-BIM for contractors and developers: protect claims, reduce rework, close projects cleanly.",
    intro:
      "Contractors and PMCs use Novo Reperio's Matterport progress records and LiDAR Scan-to-BIM deliverables to document works accurately, defend variation claims, and hand over buildings with reliable as-built data.",
    problems: [
      {
        title: "As-built drawings drift from reality",
        body: "By handover, drawings rarely match the built condition. Downstream fit-out and FM teams inherit rework and disputes.",
      },
      {
        title: "Progress disputes hinge on memory",
        body: "Variation claims and delay disputes rely on photos taken by whoever was on site: inconsistent, incomplete, contested.",
      },
      {
        title: "Coordination breakdowns cost days",
        body: "Without shared spatial reference, RFIs and clashes get resolved by phone, WhatsApp and site walks, slowly.",
      },
    ],
    benefits: [
      {
        title: "Cyclical Matterport progress captures",
        body: "Time-stamped, walkable records at every milestone. Every stakeholder sees the same site from anywhere in the world.",
      },
      {
        title: "LiDAR as-built accuracy",
        body: "Centimetre-grade point clouds capture the building as it actually is, the source of truth for handover and future works.",
      },
      {
        title: "Scan-to-BIM for downstream teams",
        body: "Point clouds convert to accurate LOD 200/300 BIM so FM, fit-out and renovation teams inherit reliable geometry.",
      },
      {
        title: "Defensible documentation",
        body: "Immutable, timestamped captures back up variation claims, EOT submissions and defect close-out with visual evidence.",
      },
    ],
    outcome: {
      headline: "Hand over with defensible, accurate as-built data.",
      points: [
        "Variation and delay claims backed by timestamped spatial evidence.",
        "Downstream fit-out and FM teams inherit reliable geometry, not drift.",
        "Fewer disputes and less rework at close-out.",
      ],
    },
    tech: ["Matterport twins", "LiDAR / Scan-to-BIM", "Drone / aerial capture", "360° virtual tours"],
    workSlugs: ["pnb-cimb-hub", "world-trade-centre-kuala-lumpur", "henkel-malaysia-kuala-lumpur"],
    serviceSlugs: [
      { slug: "construction-progress", label: "Construction Progress Documentation" },
      { slug: "scan-to-bim", label: "LiDAR Scan-to-BIM" },
      { slug: "facilities-operations", label: "Facilities Operations Twins" },
    ],
    insightSlugs: [
      "bim-ready-point-cloud-workflow-existing-buildings",
      "scan-to-bim-services-that-reduce-risk",
    ],
    faqs: [
      {
        q: "How often should we capture construction progress?",
        a: "Most projects benefit from monthly or milestone-based captures: structure completion, MEP rough-in, ceiling closure, and pre-handover. Sensitive phases can be weekly.",
      },
      {
        q: "What accuracy do LiDAR scans deliver?",
        a: "Our terrestrial LiDAR captures at centimetre-grade accuracy suitable for as-built BIM. For survey-grade geodetic work we integrate control points.",
      },
      {
        q: "Can the same capture feed both marketing and BIM?",
        a: "Yes. A single site visit can produce a Matterport twin for stakeholder walkthroughs and a LiDAR scan for BIM, same day, same site.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    h1: "Let guests book confidently before they land.",
    metaTitle:
      "Hotel & Hospitality Digital Twins Malaysia | Novo Reperio",
    metaDesc:
      "Matterport digital twins, virtual event tours and 360° room previews for hotels, resorts and F&B venues: turn indecisive planners and travellers into confirmed bookings.",
    intro:
      "Hotels, resorts and F&B venues use Novo Reperio's Matterport digital twins to let event planners and travellers walk the space online, closing bookings before the first site inspection, from anywhere in the world.",
    problems: [
      {
        title: "Static galleries lose to indecision",
        body: "Curated stills flatter the space but planners still ask for a site inspection, losing days per opportunity.",
      },
      {
        title: "International bookings stall on trust",
        body: "Overseas MICE planners cannot fly in for every venue. Without an immersive preview, they default to venues they've seen before.",
      },
      {
        title: "Room-type comparisons are painful online",
        body: "OTA thumbnails cannot convey scale or view. Guests pick the wrong room and complain on arrival.",
      },
    ],
    benefits: [
      {
        title: "Digital twin of every function space",
        body: "Ballrooms, breakout rooms and lawns: planners walk, measure and screenshot their event layout without visiting.",
      },
      {
        title: "OTA-ready 360° room previews",
        body: "Embed 360° tours on Booking.com, Agoda, direct sites and Google Business Profile so guests self-select the right room.",
      },
      {
        title: "F&B private-dining previews",
        body: "Private-dining hosts pick venues on the spot; the tour answers 'does it fit our group?' in one visit to the page.",
      },
      {
        title: "Cross-channel reuse",
        body: "One twin fuels the direct site, OTA thumbnails, sales collateral, MICE proposals and Google listing.",
      },
    ],
    outcome: {
      headline: "Turn indecisive planners and travellers into confirmed bookings.",
      points: [
        "Event planners confirm without a physical site inspection.",
        "Guests self-select the right room and arrive with fewer complaints.",
        "One twin works across your direct site, OTAs and Google.",
      ],
    },
    tech: ["Matterport twins", "360° virtual tours", "Drone / aerial capture", "CGI & UE5"],
    workSlugs: [
      "hyatt-kuantan-ballroom",
      "lexis-hibiscus-port-dickson",
      "eastin-hotel-kuala-lumpur",
      "royal-lexis-kl",
    ],
    serviceSlugs: [
      { slug: "hospitality-digital-twins", label: "Hospitality Digital Twins" },
      { slug: "spatial-capture-digital-twins", label: "Spatial Capture & Digital Twins" },
      { slug: "cinematic-video", label: "Cinematic Property Video" },
    ],
    insightSlugs: [
      "digital-twin-for-hotels-guide",
      "360-virtual-tour-for-hotels-that-converts",
    ],
    faqs: [
      {
        q: "Does a hotel digital twin actually increase bookings?",
        a: "For event spaces and premium rooms, yes: planners and guests who explore the twin convert faster because the site-inspection question is answered on the page.",
      },
      {
        q: "Can the tour be embedded in Booking.com and Agoda?",
        a: "Direct embed varies by OTA. Most support 360° panoramas and video, and every OTA supports the twin's shareable link in property descriptions.",
      },
      {
        q: "How long does capture take for a full hotel?",
        a: "A mid-sized hotel with 4–6 function spaces and 3–4 room types typically captures in 2–4 days on site, delivered in 1–2 weeks.",
      },
    ],
  },
  {
    slug: "events-venues",
    name: "Events & Venues",
    h1: "Let planners verify capacity, flow and sightlines remotely.",
    metaTitle:
      "Event Venue Virtual Tours & Digital Twins Malaysia | Novo Reperio",
    metaDesc:
      "Matterport digital twins for convention centres, exhibition halls and event venues: planners walk the space, measure booths and confirm bookings without a site inspection.",
    intro:
      "Convention centres, exhibition halls and event venues use Novo Reperio's Matterport digital twins to let planners walk the space online: measure booth footprints, verify sightlines, and confirm bookings without flying in.",
    problems: [
      {
        title: "Every enquiry needs a site inspection",
        body: "Sales teams spend the week on repeat venue walkthroughs, for enquiries that often don't convert.",
      },
      {
        title: "Floor plans lose to spatial questions",
        body: "Planners ask about ceiling height, column spacing and load-in access, questions floor plans cannot answer.",
      },
      {
        title: "International planners cannot preview",
        body: "MICE and exhibition organisers based abroad need reassurance the venue works before they commit.",
      },
    ],
    benefits: [
      {
        title: "Walkable venue at every scale",
        body: "From foyers to main halls, the twin lets planners understand the entire journey guests will experience.",
      },
      {
        title: "Measurement + booth planning",
        body: "Matterport's measurement tool lets planners size booths, stages and seating clusters directly in the twin.",
      },
      {
        title: "Sightline and rigging verification",
        body: "AV, lighting and rigging teams check clearances and sightlines from the twin before quoting.",
      },
      {
        title: "Sales team leverage",
        body: "One well-produced twin equips every sales conversation; the venue is on every laptop, in every WhatsApp thread.",
      },
    ],
    outcome: {
      headline: "More qualified enquiries, fewer wasted site visits.",
      points: [
        "Planners verify capacity, sightlines and load-in remotely.",
        "Sales teams qualify enquiries before booking a walkthrough.",
        "The WTCKL twin has drawn 8,000+ visits, averaging 37 a week.",
      ],
    },
    tech: ["Matterport twins", "Drone / aerial capture", "360° virtual tours"],
    workSlugs: [
      "world-trade-centre-kuala-lumpur",
      "kuala-lumpur-convention-centre",
      "eastin-hotel-kuala-lumpur",
    ],
    serviceSlugs: [
      { slug: "hospitality-digital-twins", label: "Event Venue Digital Twins" },
      { slug: "spatial-capture-digital-twins", label: "Spatial Capture & Digital Twins" },
      { slug: "cinematic-video", label: "Cinematic Venue Video" },
    ],
    insightSlugs: [
      "digital-twin-for-convention-centres",
      "virtual-tour-for-event-venues-that-converts",
    ],
    faqs: [
      {
        q: "Can planners measure booth sizes inside the tour?",
        a: "Yes. Matterport's measurement tool works directly in the browser; planners drag between any two points to confirm distance.",
      },
      {
        q: "How does the WTCKL twin perform in practice?",
        a: "The WTCKL digital twin has received 8,000+ visits averaging 37 per week, a real load of planners self-serving between site visits.",
      },
      {
        q: "Can we integrate the tour with our enquiry form?",
        a: "Yes. Tours embed on your enquiry page, and we can add clickable hotspots that trigger contact forms or calendar bookings.",
      },
    ],
  },
  {
    slug: "facilities-management",
    name: "Facilities Management",
    h1: "One shared spatial record for every operations team.",
    metaTitle:
      "Facilities Digital Twin & Asset Documentation Malaysia | Novo Reperio",
    metaDesc:
      "Operational digital twins, asset registers and space audits for facility managers: one shared record for maintenance, moves, safety and audits.",
    intro:
      "Facility managers use Novo Reperio's operational digital twins to build a single, walkable record of every floor, powering maintenance planning, moves and changes, safety audits and asset registers without a physical walk.",
    problems: [
      {
        title: "Space knowledge lives in one person's head",
        body: "The one FM who's been there a decade knows every riser. When they leave, the knowledge leaves too.",
      },
      {
        title: "Moves and changes over-run",
        body: "Fit-out projects rely on outdated drawings. Site surveys happen late, findings arrive slowly, decisions push back.",
      },
      {
        title: "Safety and compliance audits are disruptive",
        body: "Every audit requires escorted walks, pulling FMs off higher-value work every time.",
      },
    ],
    benefits: [
      {
        title: "Walkable operational twin",
        body: "Every floor, every room, every plant space, captured once and shared across the operations team.",
      },
      {
        title: "Asset hotspots and registers",
        body: "Tag AHUs, panels, extinguishers and valves directly in the twin. Click any asset for spec sheets and service history.",
      },
      {
        title: "Faster space planning",
        body: "Fit-out designers and workplace teams sketch layouts from the twin before a physical survey is needed.",
      },
      {
        title: "Remote audit capability",
        body: "External auditors and HQ stakeholders walk the space without disrupting the site team.",
      },
    ],
    outcome: {
      headline: "Faster decisions from one shared spatial record.",
      points: [
        "Space knowledge survives staff turnover.",
        "Moves and fit-outs are planned from the twin before a physical survey.",
        "Audits and inspections run remotely, without pulling the site team off work.",
      ],
    },
    tech: ["Matterport twins", "LiDAR / Scan-to-BIM", "360° virtual tours"],
    workSlugs: ["pnb-cimb-hub", "henkel-malaysia-kuala-lumpur", "worq-kl-sentral"],
    serviceSlugs: [
      { slug: "facilities-operations", label: "Facilities Operations Twins" },
      { slug: "scan-to-bim", label: "LiDAR Scan-to-BIM" },
      { slug: "spatial-capture-digital-twins", label: "Spatial Capture & Digital Twins" },
    ],
    insightSlugs: [
      "malaysia-digital-twin-for-facilities",
      "bim-ready-point-cloud-workflow-existing-buildings",
    ],
    faqs: [
      {
        q: "How is a facilities twin different from a marketing twin?",
        a: "Same capture technology, different tagging strategy. Facilities twins emphasise plant rooms, risers and assets over lobbies and lounges.",
      },
      {
        q: "Can twins integrate with our CAFM or CMMS?",
        a: "Asset hotspots can link out to your existing system. Deeper integrations (JLL, Planon, Archibus) are project-dependent.",
      },
      {
        q: "How often should the twin be re-captured?",
        a: "After major fit-outs or annually for high-change floors. Static plant areas can be captured once and left.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    h1: "Document plants, brief teams, train remotely.",
    metaTitle:
      "Manufacturing Plant Digital Twins Malaysia | Novo Reperio",
    metaDesc:
      "Plant digital twins, line documentation and 360° safety training for manufacturing sites: brief remote teams, audit operations, onboard faster.",
    intro:
      "Manufacturers and R&D operators use Novo Reperio's plant digital twins and 360° training modules to document facilities, brief global stakeholders remotely, and onboard operators without disrupting production.",
    problems: [
      {
        title: "Remote HQ teams don't understand the plant",
        body: "Corporate stakeholders base decisions on photos and reports, missing the spatial context that changes conclusions.",
      },
      {
        title: "Safety training pulls people off the line",
        body: "New hires and contractors need site orientation before they touch the floor, but every session interrupts production.",
      },
      {
        title: "Audits and inspections are logistically heavy",
        body: "External auditors, quality teams and licensors need site walks that consume days of local team time.",
      },
    ],
    benefits: [
      {
        title: "Walkable plant twin",
        body: "Every line, cleanroom and warehouse zone, captured once and reused for briefings, audits and training.",
      },
      {
        title: "360° gamified safety training",
        body: "Immersive hazard-spotting modules onboard new hires and refresh existing teams without leaving the office.",
      },
      {
        title: "Remote inspection and audit",
        body: "External stakeholders walk the site online, so physical audits get shorter and more focused.",
      },
      {
        title: "R&D and NPD alignment",
        body: "Product, design and manufacturing teams review line changes and layout scenarios in a shared spatial record.",
      },
    ],
    outcome: {
      headline: "Brief global teams and onboard operators without stopping the line.",
      points: [
        "Remote HQ and R&D teams make decisions with real spatial context.",
        "New hires and contractors orient before they touch the floor.",
        "External audits get shorter and more focused.",
      ],
    },
    tech: ["Matterport twins", "360° virtual tours", "LiDAR / Scan-to-BIM", "CGI & UE5"],
    workSlugs: ["shell-360-training", "coway-experience-centre", "meshtech"],
    serviceSlugs: [
      { slug: "immersive-training", label: "Immersive 360° Training" },
      { slug: "facilities-operations", label: "Facilities Operations Twins" },
      { slug: "scan-to-bim", label: "LiDAR Scan-to-BIM" },
    ],
    insightSlugs: [
      "malaysia-digital-twin-for-facilities",
      "guide-to-reality-capture-workflows",
    ],
    faqs: [
      {
        q: "Can we capture a plant without stopping production?",
        a: "Yes. We schedule captures around production runs and cleanroom protocols; most plant twins are built during scheduled maintenance windows.",
      },
      {
        q: "Is 360° safety training accepted for compliance?",
        a: "It supplements (not replaces) required physical training. It excels at pre-work orientation and hazard-recognition refreshers.",
      },
      {
        q: "Can we restrict the twin to authorised viewers?",
        a: "Yes. Twins can be password-gated, IP-restricted or embedded behind your existing SSO.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    h1: "Familiarise patients and staff with the space before they arrive.",
    metaTitle:
      "Healthcare Facility Digital Twins Malaysia | Novo Reperio",
    metaDesc:
      "Hospital and clinic digital twins for patient orientation, staff training and facility documentation: reduce anxiety, brief remote teams, capture as-built.",
    intro:
      "Hospitals and clinics use Novo Reperio's digital twins to virtually orient patients before appointments, train new staff on ward layouts, and document facilities for planning, insurance and accreditation.",
    problems: [
      {
        title: "Patient anxiety is highest before arrival",
        body: "First-time patients (especially oncology, paediatrics and international) arrive unfamiliar with the space, adding stress to already difficult visits.",
      },
      {
        title: "Staff onboarding depends on physical shadowing",
        body: "New nurses and support staff learn ward layouts by walking them, slow, and repeats every rotation.",
      },
      {
        title: "Accreditation audits are documentation-heavy",
        body: "JCI, MSQH and similar audits demand spatial documentation that is expensive to produce and to keep current.",
      },
    ],
    benefits: [
      {
        title: "Patient-facing virtual walkthrough",
        body: "Patients preview the ward, day-care suite or clinic online; the space is familiar before check-in.",
      },
      {
        title: "Staff orientation on-demand",
        body: "New joiners and rotating clinicians self-serve orientation before their first day.",
      },
      {
        title: "Facility documentation for accreditation",
        body: "One accurate, walkable record supports internal quality, insurance and accreditation submissions.",
      },
      {
        title: "International patient enablement",
        body: "Medical-tourism patients preview facilities from abroad, bridging the trust gap for premium procedures.",
      },
    ],
    outcome: {
      headline: "Calmer patients, faster onboarding, cleaner documentation.",
      points: [
        "Patients arrive familiar with the space, with less anxiety.",
        "New and rotating staff self-serve orientation before day one.",
        "Accurate spatial records support accreditation submissions.",
      ],
    },
    tech: ["Matterport twins", "360° virtual tours", "LiDAR / Scan-to-BIM"],
    workSlugs: ["pnb-cimb-hub", "worq-kl-sentral", "henkel-malaysia-kuala-lumpur"],
    serviceSlugs: [
      { slug: "spatial-capture-digital-twins", label: "Spatial Capture & Digital Twins" },
      { slug: "immersive-training", label: "Immersive Staff Training" },
      { slug: "facilities-operations", label: "Facilities Operations Twins" },
    ],
    insightSlugs: [
      "digital-twin-implementation-guide-for-teams",
      "how-virtual-tours-are-changing-our-world",
    ],
    note: "Mahkota Medical Centre case study is pending; MediaSlot placeholders in use.",
    faqs: [
      {
        q: "Are healthcare digital twins compliant with patient privacy?",
        a: "Yes, captures are scheduled during non-clinical hours or in patient-free zones. Any incidental identifiable elements are redacted before publication.",
      },
      {
        q: "Can twins support telemedicine or remote consultations?",
        a: "For facility orientation, yes. For clinical care itself, twins are supplementary; they help patients and families understand the physical journey.",
      },
      {
        q: "Do you cover clinics as well as hospitals?",
        a: "Yes. Smaller clinics benefit especially; patients on premium procedures preview the whole space in one browser session.",
      },
    ],
  },
  {
    slug: "government",
    name: "Government & Heritage",
    h1: "Public-sector spaces, documented and open to the world.",
    metaTitle:
      "Government & Heritage Digital Twins Malaysia | Novo Reperio",
    metaDesc:
      "Digital twins for museums, heritage sites and public-sector facilities in Malaysia. MDEC Malaysia Digital recognised. ePerolehan registered. Urban twins for city planning.",
    intro:
      "Government agencies, museums and heritage bodies use Novo Reperio's digital twins to document public spaces, extend museum reach online, and support urban-planning decisions. Novo Reperio is MDEC Malaysia Digital recognised and registered on ePerolehan.",
    problems: [
      {
        title: "Public-sector spaces are under-documented online",
        body: "Museums, galleries and civic buildings often exist only as static websites, so reach is capped at visitors who can physically attend.",
      },
      {
        title: "Heritage assets need durable records",
        body: "Fragile heritage buildings and exhibits deserve accurate spatial documentation for research, conservation and disaster recovery.",
      },
      {
        title: "Urban planning debates lack shared reference",
        body: "City-scale decisions get made from PowerPoint. Stakeholders debate proposals without walking through them.",
      },
    ],
    benefits: [
      {
        title: "Museum & heritage twins",
        body: "Muzium Negara, KL Craft Museum and similar spaces become globally accessible: school groups, researchers and diaspora audiences all reach the collection.",
      },
      {
        title: "Public-facility documentation",
        body: "Government buildings and civic spaces get accurate, up-to-date spatial records for FM, security planning and public engagement.",
      },
      {
        title: "Urban digital twins for planning",
        body: "City and district-scale twins overlay GIS, traffic and demographic data for planning workshops and public consultation.",
      },
      {
        title: "Compliant procurement",
        body: "Novo Reperio operates through ePerolehan and holds MDEC Malaysia Digital recognition, clean procurement pathways for public-sector projects.",
      },
    ],
    outcome: {
      headline: "Public spaces documented, and open to everyone.",
      points: [
        "Museums and heritage reach audiences who cannot attend in person.",
        "Durable spatial records for conservation, FM and security planning.",
        "Procurement-ready via ePerolehan and Malaysia Digital recognition.",
      ],
    },
    tech: ["Matterport twins", "LiDAR / Scan-to-BIM", "Drone / aerial capture", "CGI & UE5"],
    workSlugs: ["muzium-negara-gallery-a-pre-history", "kuala-lumpur-convention-centre"],
    serviceSlugs: [
      { slug: "urban-digital-twins", label: "Urban Digital Twins" },
      { slug: "spatial-capture-digital-twins", label: "Spatial Capture & Digital Twins" },
      { slug: "scan-to-bim", label: "LiDAR Scan-to-BIM" },
    ],
    insightSlugs: [
      "green-smart-tech-powering-the-next-wave-of-sustainable-cities",
      "choosing-museum-virtual-tour-solution",
    ],
    faqs: [
      {
        q: "Can Novo Reperio be engaged through ePerolehan?",
        a: "Yes. We are registered on ePerolehan and can respond to public-sector tenders through the standard procurement pathway.",
      },
      {
        q: "Do you cover heritage sites outside Klang Valley?",
        a: "Yes. Our team travels nationwide; capture crews have documented sites across Peninsular and East Malaysia.",
      },
      {
        q: "Can twins support urban planning workshops?",
        a: "Yes. City-scale twins overlay planning data, allowing stakeholders to walk proposals before decisions are made.",
      },
    ],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
