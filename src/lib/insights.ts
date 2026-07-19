export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  sourceUrl: string;
};

export const INSIGHTS: Insight[] = [
  {
    slug: "best-tools-for-digital-twins",
    title: "Best Tools for Digital Twins by Business Use",
    excerpt:
      "Compare the best tools for digital twins across property, AEC, hospitality, and facilities, with practical criteria for selecting the right spatial platform.",
    date: "19 July 2026",
    category: "Digital Twins & Matterport",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/07/best-tools-for-digital-twins-by-business-use-featured.webp",
    sourceUrl: "https://novoreperio.com/best-tools-for-digital-twins/",
  },
  {
    slug: "3d-rendering-for-pre-sales",
    title: "How 3D Rendering for Pre Sales Drives Demand",
    excerpt:
      "3D rendering for pre sales gives buyers a clear view of unbuilt spaces, helping property, hospitality, and retail teams qualify leads faster remotely.",
    date: "17 July 2026",
    category: "3D Rendering & Visualisation",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/07/how-3d-rendering-for-pre-sales-drives-demand-featured.webp",
    sourceUrl: "https://novoreperio.com/3d-rendering-for-pre-sales/",
  },
  {
    slug: "bim-ready-point-cloud-workflow-existing-buildings",
    title: "BIM Ready Point Cloud Workflow for Existing Buildings",
    excerpt:
      "A BIM ready point cloud workflow turns site capture into reliable as-built models, reducing rework, design risk, and delays across complex projects today.",
    date: "15 July 2026",
    category: "LiDAR, Scan & BIM",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/07/bim-ready-point-cloud-workflow-for-existing-buildi-featured.webp",
    sourceUrl:
      "https://novoreperio.com/bim-ready-point-cloud-workflow-existing-buildings/",
  },
  {
    slug: "can-virtual-tours-increase-bookings",
    title: "Can Virtual Tours Increase Bookings? The Evidence",
    excerpt:
      "Can virtual tours increase bookings? See how immersive digital twins reduce uncertainty, qualify leads, and improve conversions for venues at scale now.",
    date: "13 July 2026",
    category: "Digital Twins & Matterport",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/07/can-virtual-tours-increase-bookings-the-evidence-featured.webp",
    sourceUrl: "https://novoreperio.com/can-virtual-tours-increase-bookings/",
  },
  {
    slug: "digital-twin-for-facility-management",
    title: "Digital Twin for Facility Management",
    excerpt:
      "Learn how a digital twin for facility management improves maintenance, asset visibility, planning, and faster decisions across complex buildings.",
    date: "4 May 2026",
    category: "Digital Twins & Matterport",
    image:
      "https://development.novoreperio.com/_astro/digital-twin-for-facility-management-featured_ZmKFew.webp",
    sourceUrl:
      "https://novoreperio.com/digital-twin-for-facility-management/",
  },
  {
    slug: "matterport-virtual-tour-for-real-estate",
    title: "Matterport Virtual Tour for Real Estate",
    excerpt:
      "A Matterport virtual tour for real estate helps attract serious buyers, improve engagement, and speed up decisions with immersive property viewing.",
    date: "3 May 2026",
    category: "Digital Twins & Matterport",
    image:
      "https://development.novoreperio.com/_astro/matterport-virtual-tour-for-real-estate-featured_Z2urpSj.webp",
    sourceUrl:
      "https://novoreperio.com/matterport-virtual-tour-for-real-estate/",
  },
  {
    slug: "lidar-scanning-for-buildings-that-pays-off",
    title: "LiDAR Scanning for Buildings That Pays Off",
    excerpt:
      "LiDAR scanning for buildings helps teams capture accurate site data, reduce rework, support BIM workflows, and speed up planning decisions.",
    date: "2 May 2026",
    category: "LiDAR, Scan & BIM",
    image:
      "https://development.novoreperio.com/_astro/lidar-scanning-for-buildings-that-pays-off-featured_Z1Flsxq.webp",
    sourceUrl:
      "https://novoreperio.com/lidar-scanning-for-buildings-that-pays-off/",
  },
  {
    slug: "scan-to-bim-services",
    title: "Scan to BIM Services for Existing Buildings",
    excerpt:
      "Scan to BIM services convert laser scans into accurate as-built models — supporting renovation, MEP coordination, and facility handover with fewer surprises.",
    date: "28 April 2026",
    category: "LiDAR, Scan & BIM",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/04/scan-to-bim-featured.webp",
    sourceUrl: "https://novoreperio.com/scan-to-bim-services/",
  },
  {
    slug: "360-virtual-tour-for-hotels",
    title: "360 Virtual Tour for Hotels and Resorts",
    excerpt:
      "A 360 virtual tour for hotels lets planners, corporates, and guests preview rooms, ballrooms, and public spaces before booking or site inspection.",
    date: "20 April 2026",
    category: "Virtual Tours",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/04/360-virtual-tour-for-hotels-featured.webp",
    sourceUrl: "https://novoreperio.com/360-virtual-tour-for-hotels/",
  },
  {
    slug: "aerial-drone-photography-for-property",
    title: "Aerial Drone Photography for Property Launches",
    excerpt:
      "Aerial drone photography shows scale, access, and surroundings — the context that unit floorplans and interior renders simply cannot communicate.",
    date: "12 April 2026",
    category: "3D Rendering & Visualisation",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/04/aerial-drone-property-featured.webp",
    sourceUrl:
      "https://novoreperio.com/aerial-drone-photography-for-property/",
  },
  {
    slug: "digital-twin-for-convention-centres",
    title: "Digital Twin for Convention Centres and Ballrooms",
    excerpt:
      "A digital twin for convention centres helps event planners visualise seating, staging, and flow — closing bookings faster with fewer site visits.",
    date: "1 April 2026",
    category: "Digital Twins & Matterport",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/04/digital-twin-convention-featured.webp",
    sourceUrl:
      "https://novoreperio.com/digital-twin-for-convention-centres/",
  },
  {
    slug: "cgi-vs-photography-property-marketing",
    title: "CGI vs Photography for Property Marketing",
    excerpt:
      "Choosing between CGI and photography depends on stage, budget, and target buyer. Here is how leading developers combine both for stronger launches.",
    date: "22 March 2026",
    category: "3D Rendering & Visualisation",
    image:
      "https://novoreperio.com/wp-content/uploads/2026/03/cgi-vs-photography-featured.webp",
    sourceUrl:
      "https://novoreperio.com/cgi-vs-photography-property-marketing/",
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
