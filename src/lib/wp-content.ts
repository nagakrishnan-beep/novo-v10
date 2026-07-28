import generated from "./wp-content.generated.json";
import media from "./wp-media.generated.json";

type Rec = { image?: string; alt?: string; tourUrl?: string };
type Generated = { generatedAt?: string; posts?: Record<string, Rec>; portfolio?: Record<string, Rec> };
const data = generated as Generated;

const LOCAL_MEDIA = (media as { files?: Record<string, string> }).files ?? {};

/** Remote WordPress URL -> locally downloaded path (falls back to the URL). */
export function localMedia<T extends string | undefined>(url: T): T {
  if (!url) return url;
  return (LOCAL_MEDIA[url] ?? url) as T;
}

export const WORK_WP_SLUG: Record<string, string> = {
  "hyatt-kuantan-ballroom": "hyatt-kuantan-ballroom",
  "world-trade-centre-kuala-lumpur": "property-website-wtc",
  "lexis-hibiscus-port-dickson": "property-website-lexis",
  "eastin-hotel-kuala-lumpur": "matterport-3d-virtual-tour-eastin-ballroom",
  "muzium-negara-gallery-a-pre-history": "muzium-adat-istiadat-perkahwinan-langkawi",
  "flora-hijauan-melati-east": "taman-tugu-nursery",
  "porsche-center-ara-damansara": "porsche-ara-damansara-2",

  "kuala-lumpur-convention-centre": "klcc-aerial-360",
  "parkland-residence-kj2": "parkland-residence-kj2-929sqft",
  "swarovski-marina-bay-sands-singapore": "swarovski-marina-bay-sands-singapore",
  "pnb-cimb-hub": "pnb-cimb-hub",
  "huawei-enterprise-business-malaysia-tac-the-icon": "huawei-enterprise-business-malaysia-tac",
  "yamaha-lifestyle-station": "yamaha-lifestyle-station",
  "sutra-house-sutra-dance-theatre": "sutra-house-sutra-dance-theatre",
  "henkel-malaysia-kuala-lumpur": "henkel-malaysia-kuala-lumpur",
  "worq-kl-sentral": "worq-kl-sentral",
  "coway-experience-centre": "coway-experience-centre",
  "port-dickson-360-tour": "aerial-360-port-dickson",
  "glomac-primrose": "cgi-360-glomac",
  "dsara": "virtual-staging-dsara",
  "dewan-1958-by-chef-wan": "de-wan-1958-by-chef-wan",
  "private-jet-falcon-7x": "private-jet",
  "confetti-kuala-lumpur": "confetti",
  "jerry-coworking-sri-hartamas": "jerry-coworking-space-sri-hartamas",
};

export function wpPostImage(slug: string): string | undefined {
  return localMedia(data.posts?.[slug]?.image || undefined);
}
export function wpWorkImage(workSlug: string): string | undefined {
  const wp = WORK_WP_SLUG[workSlug];
  return localMedia((wp && data.portfolio?.[wp]?.image) || undefined);
}
export function wpWorkTour(workSlug: string): string | undefined {
  const wp = WORK_WP_SLUG[workSlug];
  return (wp && data.portfolio?.[wp]?.tourUrl) || undefined;
}
