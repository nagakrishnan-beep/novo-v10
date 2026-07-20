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

/** Web3Forms access key — replace TODO placeholder in production. */
export const WEB3FORMS_ACCESS_KEY = "TODO_WEB3FORMS_ACCESS_KEY";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** GA4 measurement ID — replace TODO placeholder in production. */
export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";
