// Novo Reperio published pricing bands (MYR).
// Do not invent values — every number below is fixed by Phase B brief.

export const SUBSCRIPTION_MYR = 499;
export const SUBSCRIPTION_LINE =
  "Keep it live: hosting & virtual-tour subscription from RM499/month";
export const TC_LINE =
  "Indicative only — final quote after a free scoping consultation. Terms & conditions apply.";

export type SpaceType =
  | "airbnb"
  | "residential"
  | "commercial"
  | "event-space"
  | "hotel"
  | "office"
  | "large-venue";

export type SizeBand = "under-1000" | "1000-3000" | "3000-10000" | "10000-plus";

export const SPACE_TYPES: { key: SpaceType; label: string; short: string }[] = [
  { key: "airbnb", label: "Airbnb / Homestay", short: "Airbnb / Homestay" },
  { key: "residential", label: "Residential or Show Unit", short: "Residential / Show Unit" },
  { key: "commercial", label: "Commercial / Showroom", short: "Commercial / Showroom" },
  { key: "event-space", label: "Small Event Space / F&B", short: "Event / F&B" },
  { key: "hotel", label: "Hotel / Resort", short: "Hotel / Resort" },
  { key: "office", label: "Office / Corporate Facility", short: "Office / Corporate" },
  { key: "large-venue", label: "Large Venue / Convention / Industrial", short: "Large Venue / Industrial" },
];

export const SIZE_BANDS: { key: SizeBand; label: string; short: string }[] = [
  { key: "under-1000", label: "Under 1,000 sq ft", short: "<1,000 sq ft" },
  { key: "1000-3000", label: "1,000 – 3,000 sq ft", short: "1,000–3,000 sq ft" },
  { key: "3000-10000", label: "3,000 – 10,000 sq ft", short: "3,000–10,000 sq ft" },
  { key: "10000-plus", label: "10,000+ sq ft", short: "10,000+ sq ft" },
];

export const BASE_PRICING: Record<
  SpaceType,
  { kind: "from" | "custom"; from?: number; label: string }
> = {
  airbnb: { kind: "from", from: 988, label: "Matterport capture from RM988" },
  residential: { kind: "from", from: 2599, label: "from RM2,599" },
  commercial: { kind: "from", from: 2599, label: "from RM2,599" },
  "event-space": { kind: "from", from: 5999, label: "from RM5,999" },
  hotel: {
    kind: "custom",
    label:
      "Custom scope — sized by area and complexity. Typical engagements are quoted after a scoping walkthrough.",
  },
  office: {
    kind: "custom",
    label:
      "Custom scope — sized by area and complexity. Typical engagements are quoted after a scoping walkthrough.",
  },
  "large-venue": {
    kind: "custom",
    label:
      "Custom scope — sized by area and complexity. Typical engagements are quoted after a scoping walkthrough.",
  },
};

export type EstimateResult = {
  headline: string;
  fromPrice: number | null;
  isCustom: boolean;
  note?: string;
};

export function estimate(type: SpaceType, size: SizeBand): EstimateResult {
  // 10,000+ is always custom regardless of type
  if (size === "10000-plus") {
    return {
      headline:
        "Custom scope — sized by area and complexity. Typical engagements are quoted after a scoping walkthrough.",
      fromPrice: null,
      isCustom: true,
    };
  }
  const base = BASE_PRICING[type];
  if (base.kind === "custom") {
    return { headline: base.label, fromPrice: null, isCustom: true };
  }
  if (size === "3000-10000") {
    return {
      headline: base.label,
      fromPrice: base.from ?? null,
      isCustom: false,
      note: "Larger areas scoped per sqm — final band confirmed after a walkthrough.",
    };
  }
  return { headline: base.label, fromPrice: base.from ?? null, isCustom: false };
}

/** Public price-band cards for the /services hub + hospitality page. */
export const PUBLISHED_BANDS = [
  {
    key: "airbnb",
    title: "Airbnb / Homestay",
    price: "from RM988",
    body: "Matterport capture for short-stay listings — one visit, hosted twin, embed-ready link.",
  },
  {
    key: "residential",
    title: "Residential or Show Unit",
    price: "from RM2,599",
    body: "Show units, condos and landed homes — walkable twin with measurement and floorplan.",
  },
  {
    key: "commercial",
    title: "Commercial / Showroom",
    price: "from RM2,599",
    body: "Retail, showrooms and small commercial floors — capture, host and embed on your site.",
  },
  {
    key: "event-space",
    title: "Small Event Space / F&B",
    price: "from RM5,999",
    body: "Restaurants, cafés, function rooms and boutique venues — planner-ready twin with prefunction coverage.",
  },
  {
    key: "custom",
    title: "Hotel · Office · Large Venue · Industrial",
    price: "Custom scope",
    body: "Sized by area and complexity. Typical engagements are quoted after a scoping walkthrough.",
  },
  {
    key: "subscription",
    title: "Hosting & Subscription",
    price: "from RM499/month",
    body: "Keeps your twin live: hosting, embeds everywhere, usage analytics and scheduled refreshes.",
  },
] as const;

/** Emit Offer objects for Service schema. */
export function offersForServiceSchema() {
  return [
    offer(988, "Matterport capture — Airbnb / Homestay"),
    offer(2599, "Matterport capture — Residential or Show Unit / Commercial or Showroom"),
    offer(5999, "Matterport capture — Small Event Space / F&B"),
    subscriptionOffer(),
  ];
}

function offer(minPrice: number, description: string) {
  return {
    "@type": "Offer",
    priceCurrency: "MYR",
    price: minPrice,
    availability: "https://schema.org/InStock",
    description,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "MYR",
      minPrice,
    },
  };
}

function subscriptionOffer() {
  return {
    "@type": "Offer",
    priceCurrency: "MYR",
    price: 499,
    availability: "https://schema.org/InStock",
    description: "Hosting & virtual-tour subscription — keeps the twin live, embeddable and analytics-tracked.",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "MYR",
      minPrice: 499,
      billingIncrement: 1,
      unitCode: "MON",
      unitText: "month",
    },
  };
}

/** URL-encoded WhatsApp text for the "share this estimate" secondary CTA. */
export function whatsappEstimateUrl(
  phoneUrl: string,
  type: SpaceType,
  size: SizeBand,
  result: EstimateResult,
) {
  const typeLabel = SPACE_TYPES.find((t) => t.key === type)?.label ?? type;
  const sizeLabel = SIZE_BANDS.find((s) => s.key === size)?.label ?? size;
  const line = result.isCustom
    ? "Custom scope"
    : result.fromPrice
      ? `${result.headline}`
      : result.headline;
  const text = [
    "Hi Novo Reperio — I just used the scope estimator.",
    `Space: ${typeLabel}`,
    `Size: ${sizeLabel}`,
    `Result: ${line}`,
    "Can we set up a free scoping consultation?",
  ].join("\n");
  const base = phoneUrl.includes("?") ? phoneUrl : `${phoneUrl}?text=`;
  return base + encodeURIComponent(text);
}
