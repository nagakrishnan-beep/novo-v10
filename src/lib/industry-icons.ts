import {
  Building2,
  HardHat,
  BedDouble,
  Tent,
  Wrench,
  Factory,
  Stethoscope,
  Landmark,
  type LucideIcon,
} from "lucide-react";

/** Simple line icon per industry, rendered in the emerald brand accent. */
export const INDUSTRY_ICON: Record<string, LucideIcon> = {
  "property-development": Building2,
  construction: HardHat,
  hospitality: BedDouble,
  "events-venues": Tent,
  "facilities-management": Wrench,
  manufacturing: Factory,
  healthcare: Stethoscope,
  government: Landmark,
};

export function industryIcon(slug: string): LucideIcon {
  return INDUSTRY_ICON[slug] ?? Building2;
}
