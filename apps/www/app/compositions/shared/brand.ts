"use client";

import * as React from "react";
import { BRAND_KEYS, BRAND_TOKEN } from "./brand-tokens";
import type { VariantKey } from "./types";

export function getScopedBrandVars(
  variant: VariantKey,
): React.CSSProperties | undefined {
  if (variant === "wenxue") return undefined;

  const palette = BRAND_TOKEN[variant];
  const vars: Record<string, string> = {};
  for (const key of BRAND_KEYS) {
    vars[`--${key}`] = palette[key];
  }

  // Also override commonly-used semantic vars inside this page scope.
  // This makes the change visible even for components relying on shadcn's --primary / --ring.
  vars["--primary"] = palette["brand-600"];
  vars["--ring"] = palette["brand-300"];

  vars["--text-brand"] = palette["brand-600"];
  vars["--text-brand-hover"] = palette["brand-500"];
  vars["--text-brand-active"] = palette["brand-700"];

  vars["--bg-brand-light"] = palette["brand-100"];
  vars["--bg-brand-light-hover"] = palette["brand-200"];
  vars["--bg-brand-light-active"] = palette["brand-300"];
  vars["--bg-brand"] = palette["brand-600"];
  vars["--bg-brand-hover"] = palette["brand-500"];
  vars["--bg-brand-active"] = palette["brand-700"];

  vars["--border-brand"] = palette["brand-600"];
  vars["--border-brand-hover"] = palette["brand-500"];
  vars["--border-brand-active"] = palette["brand-700"];
  vars["--border-brand-light"] = palette["brand-300"];
  vars["--border-brand-light-hover"] = palette["brand-400"];

  // Page background colors
  vars["--bg-page-brand"] = palette["brand-50"];

  // CSS custom properties via inline style (scoped to this page root only)
  return vars as unknown as React.CSSProperties;
}


