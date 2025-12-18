export type BrandKey =
  | "brand-50"
  | "brand-100"
  | "brand-200"
  | "brand-300"
  | "brand-400"
  | "brand-500"
  | "brand-600"
  | "brand-700"
  | "brand-800"
  | "brand-900"
  | "brand-1000";

export type BrandPalette = Record<BrandKey, string>;

export const BRAND_KEYS: BrandKey[] = [
  "brand-50",
  "brand-100",
  "brand-200",
  "brand-300",
  "brand-400",
  "brand-500",
  "brand-600",
  "brand-700",
  "brand-800",
  "brand-900",
  "brand-1000",
];

// Extracted from:
// - tokens/紫金矿业.json -> Light.Brand.*
// - tokens/和铂医药.json -> Light.Brand.*
export const BRAND_TOKEN: Record<"zijin" | "medical", BrandPalette> = {
  zijin: {
    "brand-50": "#faf7f5",
    "brand-100": "#ffebde",
    "brand-200": "#ffd8bc",
    "brand-300": "#ffcaa6",
    "brand-400": "#ffb56b",
    "brand-500": "#ff9a42",
    "brand-600": "#ff7d1a",
    "brand-700": "#d95d0b",
    "brand-800": "#b34100",
    "brand-900": "#8c2f00",
    "brand-1000": "#661f00",
  },
  medical: {
    "brand-50": "#f2f7ff",
    "brand-100": "#eaf3fe",
    "brand-200": "#dbecfe",
    "brand-300": "#cbe2fc",
    "brand-400": "#3b88b8",
    "brand-500": "#3b88b8",
    "brand-600": "#00589f",
    "brand-700": "#003e78",
    "brand-800": "#002752",
    "brand-900": "#00142b",
    "brand-1000": "#000205",
  },
};


