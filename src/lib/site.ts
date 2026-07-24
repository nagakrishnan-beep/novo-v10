// Global site constants — used everywhere for consistency & SEO.
export const SITE_NAME = "Novo Reperio";
export const LEGAL_NAME = "Novo Reperio Sdn Bhd";
export const BASE_URL = "https://novo-v10.lovable.app";

export const PHONE = "+60 17-202 9996";
export const PHONE_TEL = "+60172029996";
export const WHATSAPP_URL = "https://wa.me/60172029996";
export const EMAIL = "hello@novoreperio.com";
export const ADDRESS_LINE_1 = "Solaris Mont Kiara, Jalan Solaris";
export const ADDRESS_LOCALITY = "Mont Kiara";
export const POSTAL_CODE = "50480";
export const REGION = "Kuala Lumpur";
export const COUNTRY = "Malaysia";
export const ADDRESS_FULL = `${LEGAL_NAME}, Solaris Mont Kiara, Jalan Solaris, Mont Kiara, ${POSTAL_CODE} Kuala Lumpur, Malaysia`;

export const HOURS = "Mon–Fri 9:00–18:00 MYT";

export const SOCIALS = {
  instagram: "https://www.instagram.com/novo_reperio/",
  facebook: "https://web.facebook.com/matterportmalaysia",
  linkedin: "https://www.linkedin.com/company/novo-reperio/",
  youtube: "https://www.youtube.com/@my-digitaltwin/",
};

export const abs = (path: string) =>
  path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Web3Forms access key — public access key, safe to ship in the client bundle.
 *  ClickUp destination = set the Web3Forms email recipient (in the Web3Forms
 *  dashboard) to the ClickUp list's email-to-task inbox address. No token here. */
export const WEB3FORMS_ACCESS_KEY = "dcf1882e-da1a-4dec-b8e3-6d8c2e783b7a";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** GA4 measurement ID — replace TODO placeholder in production. */
export const GA4_MEASUREMENT_ID = "G-PRMCVHTCGZ";

/** Meta (Facebook) Pixel ID. */
export const META_PIXEL_ID = "1196186000412033";

/** Founder / principal author. Bio TODO — pending client-supplied copy. */
export const FOUNDER = {
  name: "Naga R. Krishnan",
  jobTitle: "Founder & Chief Executive Officer",
  bio: "Naga R. Krishnan is the Founder and CEO of Novo Reperio Sdn. Bhd., with more than a decade of experience in spatial technology, digital twins, reality capture, and immersive 3D visualization. Since founding the company in 2014, he has led the delivery of digital transformation projects across real estate, hospitality, facilities management, construction, and major events, helping organizations leverage Matterport, LiDAR, aerial mapping, and AI-powered digital experiences to improve marketing, operations, and asset management.",
  knowsAbout: [
    "Digital Twins",
    "Matterport",
    "LiDAR",
    "Spatial Technology",
    "Reality Capture",
    "3D Visualization",
  ],
} as const;

