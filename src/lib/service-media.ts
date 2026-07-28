/**
 * Maps each service slug to a real photograph from our own project archive
 * (downloaded locally by scripts/download-wp-media.mjs). Anything not listed
 * here degrades to the branded MediaSlot grid via <SmartImage />.
 */
export const SERVICE_IMAGE: Record<string, string> = {
  "spatial-capture-digital-twins": "/images/media/03-20-2022-18-36-37.webp",
  "ground-level-360": "/images/media/eastin-ballroom.webp",
  "aerial-context-intelligence": "/images/media/03-31-2021-11-07-06.webp",
  "cinematic-video": "/images/media/malaysia-autoshow-2019-mobility-for-all.webp",
  "3d-rendered-walkthrough-tours": "/images/media/final-version.jpg",
  "cgi-360-panorama-tours": "/images/media/img3-e1738834003665.jpg",
  "photoreal-cgi-stills": "/images/media/type-b-upper-unit.webp",
  "property-walkthrough-films": "/images/media/1-e1742622677688.jpg",
  "ue5-masterplan-experience": "/images/media/1004-novo-reperio-large-scale-spaces-1.jpg",
  "ue5-interactive-web-platform":
    "/images/media/1003-novo-reperio-interactive-360-virtual-tours-asia-wtckl.jpg",
  "ai-assisted-visualization": "/images/media/q1fwi2ek7sr-living-room.webp",
  "scan-to-bim": "/images/media/12-24-2021-11-19-06.webp",
  "construction-progress": "/images/media/09-10-2022-12-50-26.webp",
  "facilities-operations": "/images/media/compass-offices-serviced-offices-in-kuala-lumpur.webp",
  "immersive-training": "/images/media/pixo-the-astronomy-observatory-penang.webp",
  "urban-digital-twins": "/images/media/ishan-seefromthesky-x6muh-l-xg0-unsplash.jpg",
  "web-development": "/images/media/henkel-shah-alam-office-office1.jpg",
  "commercial-photography": "/images/media/bbq-smokehouse-bar.webp",
};

export function serviceImage(slug: string, fallback?: string): string | undefined {
  return SERVICE_IMAGE[slug] ?? fallback;
}
