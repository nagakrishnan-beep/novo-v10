export type Work = {
  slug: string;
  title: string;
  format: string;
  categories: string[];
  spaceType: string;
  image: string;
  summary: string;
  helps: string;
  bullets?: string[];
};

const IMG = "https://development.novoreperio.com/images/";

export const WORKS: Work[] = [
  {
    slug: "hyatt-kuantan-ballroom",
    title: "Hyatt Kuantan Ballroom",
    format: "Matterport 3D Virtual Tour",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    image: IMG + "WTC.jpg",
    summary:
      "A realistic ballroom walkthrough that lets planners and buyers understand the venue before the first physical visit.",
    helps: "Reduces uncertainty before physical site visits.",
    bullets: [
      "3D walkthrough across ballroom and prefunction areas",
      "Supports event planning, buyer review, and venue presentations",
      "Reduces uncertainty before physical site visits",
    ],
  },
  {
    slug: "world-trade-centre-kuala-lumpur",
    title: "World Trade Centre Kuala Lumpur",
    format: "360 Tour",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    image: IMG + "WTC.jpg",
    summary:
      "A 360 tour that helps event teams understand hall scale and venue flow before a walkthrough.",
    helps: "Supports remote event planning and quick venue review.",
  },
  {
    slug: "lexis-hibiscus-port-dickson",
    title: "Lexis Hibiscus Port Dickson",
    format: "Website",
    categories: ["Hospitality"],
    spaceType: "Hospitality",
    image: IMG + "Lexis%20Hibiscs=us.jpg",
    summary:
      "A hospitality web presentation built to support booking interest and brand-first discovery.",
    helps: "Helps guests review the property online before enquiry or visit.",
  },
  {
    slug: "eastin-hotel-kuala-lumpur",
    title: "Eastin Ballroom",
    format: "Matterport",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    image: IMG + "Eastin%20Ballroom.jpg",
    summary:
      "A ballroom tour that helps teams judge event layout, scale, and presentation readiness with less friction.",
    helps: "Supports venue review before walkthroughs and shortlists.",
  },
  {
    slug: "muzium-negara-gallery-a-pre-history",
    title: "Muzium Negara Gallery A: Pre History",
    format: "Matterport",
    categories: ["Museum"],
    spaceType: "Museum",
    image: IMG + "Muzium%20Negara.jpg",
    summary:
      "A museum walkthrough that helps teams and visitors review Gallery A layout and exhibit flow remotely.",
    helps: "Makes exhibit planning and remote review easier before a visit.",
  },
  {
    slug: "porsche-center-ara-damansara",
    title: "Porsche Center Ara Damansara",
    format: "Matterport",
    categories: ["Automotive", "Showroom"],
    spaceType: "Showroom",
    image: IMG + "Porsche%20Ara.jpg",
    summary:
      "A showroom walkthrough that helps automotive teams present arrival, display zones, and customer flow online.",
    helps: "Supports sales and client review before an in-person visit.",
  },
  {
    slug: "kuala-lumpur-convention-centre",
    title: "Kuala Lumpur Convention Centre",
    format: "360 Tour",
    categories: ["Hospitality", "Convention Centre"],
    spaceType: "Convention Centre",
    image: IMG + "KLCC.jpg",
    summary:
      "A venue walkthrough that makes hall scale, circulation, and event flow easier to review remotely.",
    helps:
      "Helps event teams review hall scale and movement more confidently before site visits.",
  },
  {
    slug: "parkland-residence-kj2",
    title: "Parkland Residence KJ2",
    format: "Matterport",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    image: IMG + "Parkland%20Residence%20KJ2.jpg",
    summary:
      "A residential walkthrough that presents unit layout, room flow, and scale more clearly online.",
    helps: "Helps buyers and agents review the home before site visits.",
  },
  {
    slug: "swarovski-marina-bay-sands-singapore",
    title: "Swarovski Marina Bay Sands Singapore",
    format: "Matterport",
    categories: ["Retail", "Retail Showroom"],
    spaceType: "Retail Showroom",
    image: IMG + "Swarovski%20Marina%20Bay.jpg",
    summary:
      "A premium retail walkthrough that shows layout and display atmosphere with more clarity.",
    helps: "Helps luxury retail teams present the space before in-store visits.",
  },
  {
    slug: "pnb-cimb-hub",
    title: "PNB CIMB Hub",
    format: "Matterport",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    image: IMG + "PNB%20CIMB%20hub.jpg",
    summary:
      "A workplace walkthrough that helps stakeholders review floor planning and spatial flow remotely.",
    helps: "Supports internal alignment and workspace presentation.",
  },
  {
    slug: "huawei-enterprise-business-malaysia-tac-the-icon",
    title: "Huawei Enterprise Business Malaysia TAC The Icon",
    format: "Matterport",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    image: IMG + "Huawei.jpg",
    summary:
      "A workplace presentation designed to make the environment feel legible for business review.",
    helps: "Helps teams present office layouts and circulation more clearly.",
  },
  {
    slug: "yamaha-lifestyle-station",
    title: "Yamaha Lifestyle Station",
    format: "Matterport",
    categories: ["Automotive", "Showroom"],
    spaceType: "Showroom",
    image: IMG + "yamaha%20station.jpg",
    summary:
      "A showroom walkthrough that helps present products, circulation, and atmosphere with more clarity.",
    helps: "Supports retail and brand presentation before a visit.",
  },
  {
    slug: "sutra-house-sutra-dance-theatre",
    title: "Sutra House Sutra Dance Theatre",
    format: "Matterport",
    categories: ["Culture", "Performance Venue"],
    spaceType: "Performance Venue",
    image: IMG + "Sutra%20house.jpg",
    summary:
      "A venue walkthrough that helps present rehearsal, performance, and spatial context for cultural spaces.",
    helps: "Helps audiences and stakeholders review the venue remotely.",
  },
  {
    slug: "henkel-malaysia-kuala-lumpur",
    title: "Henkel Malaysia Kuala Lumpur",
    format: "Matterport",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    image: IMG + "Henkel.jpg",
    summary:
      "A workplace walkthrough that makes corporate layout and meeting areas easier to review online.",
    helps: "Supports stakeholder review and office presentation.",
  },
  {
    slug: "worq-kl-sentral",
    title: "WORQ KL Sentral",
    format: "Matterport",
    categories: ["Corporate", "Workspace"],
    spaceType: "Workspace",
    image: IMG + "Worq%20KL%20Sentral.jpg",
    summary:
      "A coworking walkthrough that helps prospects understand shared office flow before visiting.",
    helps:
      "Supports leasing and membership conversations with clearer space context.",
  },
  {
    slug: "coway-experience-centre",
    title: "Coway Experience Centre",
    format: "Matterport",
    categories: ["Retail", "Retail Showroom"],
    spaceType: "Retail Showroom",
    image: IMG + "Coway%20experience%20centre.jpg",
    summary:
      "A retail presentation that helps visitors understand the showroom flow and product environment online.",
    helps: "Supports product discovery and showroom preview before visits.",
  },
  {
    slug: "port-dickson-360-tour",
    title: "Port Dickson",
    format: "360 Tour",
    categories: ["Hospitality"],
    spaceType: "Hospitality",
    image: IMG + "portdickson.jpg",
    summary:
      "A destination-first tour format that gives viewers a quick and immersive sense of place across devices.",
    helps:
      "Helps audiences preview the destination quickly on mobile, web, and shared links.",
  },
  {
    slug: "glomac-primrose",
    title: "Glomac Primrose",
    format: "CGI",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    image: IMG + "glomac.jpg",
    summary:
      "A visualisation piece that helps explain the project before it reaches the physical stage.",
    helps: "Supports early sales and planning conversations.",
  },
  {
    slug: "dsara",
    title: "D'sara",
    format: "Visualisation",
    categories: ["Real Estate", "Residential"],
    spaceType: "Residential",
    image: IMG + "Dsara.jpg",
    summary:
      "A virtual staging presentation used to show layout and atmosphere before delivery.",
    helps: "Helps buyers visualise the finished space earlier.",
  },
  {
    slug: "dewan-1958-by-chef-wan",
    title: "De.Wan 1958 by Chef Wan",
    format: "Matterport",
    categories: ["Hospitality", "Restaurant"],
    spaceType: "Restaurant",
    image: IMG + "De.wan.jpg",
    summary:
      "A dining-space walkthrough that helps guests and teams review layout and atmosphere remotely.",
    helps: "Supports brand presentation and reservation confidence.",
  },
  {
    slug: "private-jet-falcon-7x",
    title: "Private Jet Falcon 7X",
    format: "Matterport",
    categories: ["Aviation", "Private Jet"],
    spaceType: "Private Jet",
    image: IMG + "Falcon%207x.jpg",
    summary:
      "A premium transport walkthrough that presents cabin detail, layout, and spatial finish online.",
    helps: "Supports high-touch sales and remote inspection.",
  },
];

export const SPACE_TYPES = [
  "All Spaces",
  "Convention Centre",
  "Hospitality",
  "Museum",
  "Showroom",
  "Residential",
  "Retail Showroom",
  "Workspace",
  "Performance Venue",
  "Restaurant",
  "Private Jet",
] as const;

export function getWork(slug: string) {
  return WORKS.find((w) => w.slug === slug);
}
