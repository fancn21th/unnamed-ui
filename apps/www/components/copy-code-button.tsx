"use client"

import * as React from "react"
import { Check, Copy, Download } from "lucide-react"
import { useThemeConfig } from "@/components/active-theme"
import { Button } from "@/registry/wuhan/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/wuhan/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/wuhan/ui/drawer"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/wuhan/ui/tabs"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Helper function to get computed CSS variable value
function getCSSVariableValue(variableName: string, isDark: boolean = false): string {
  if (typeof window === "undefined") return ""
  
  // Create a temporary element to read CSS variables without affecting the page
  const tempEl = document.createElement("div")
  tempEl.style.position = "fixed"
  tempEl.style.visibility = "hidden"
  tempEl.style.pointerEvents = "none"
  
  if (isDark) {
    tempEl.classList.add("dark")
  }
  
  document.body.appendChild(tempEl)
  
  const value = getComputedStyle(tempEl).getPropertyValue(variableName).trim()
  
  document.body.removeChild(tempEl)
  
  return value
}

// Helper function to convert HEX/RGB to OKLCH (sRGB -> OKLab -> OKLCH)
// This is much more accurate than the previous simplified approximation.
function hexToOklch(input: string): string {
  // If already OKLCH format, return as is
  if (input.startsWith("oklch(")) return input

  if (!input || typeof input !== "string") return "oklch(0 0 0)"
  const v = input.trim()

  // Parse HEX (#rgb / #rrggbb)
  let hex = v
  const hex3 = hex.match(/^#([0-9A-Fa-f]{3})$/)
  if (hex3) {
    const s = hex3[1]
    hex = `#${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`
  }
  const hex6 = hex.match(/^#([0-9A-Fa-f]{6})$/)

  let r = 0
  let g = 0
  let b = 0

  if (hex6) {
    r = Number.parseInt(hex.slice(1, 3), 16)
    g = Number.parseInt(hex.slice(3, 5), 16)
    b = Number.parseInt(hex.slice(5, 7), 16)
  } else {
    // Fallback: parse rgb()/rgba()
    const rgbMatch = v.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/i)
    if (!rgbMatch) return "oklch(0 0 0)"
    r = Number.parseInt(rgbMatch[1], 10)
    g = Number.parseInt(rgbMatch[2], 10)
    b = Number.parseInt(rgbMatch[3], 10)
  }

  if ([r, g, b].some((n) => Number.isNaN(n))) return "oklch(0 0 0)"

  // sRGB -> linear RGB
  const toLinear = (c255: number) => {
    const c = c255 / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  const rL = toLinear(r)
  const gL = toLinear(g)
  const bL = toLinear(b)

  // linear sRGB -> LMS (OKLab)
  const l = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL
  const m = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL
  const s = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  const C = Math.sqrt(a * a + b2 * b2)
  let H = (Math.atan2(b2, a) * 180) / Math.PI
  if (H < 0) H += 360

  const chroma = C < 0.0001 ? 0 : C
  const hue = C < 0.0001 ? 0 : H

  // Higher precision reduces visible/round-trip errors (e.g. #bc01b6 -> #bc02b6).
  // CSS accepts more decimals; we keep it compact but precise.
  return `oklch(${L.toFixed(5)} ${chroma.toFixed(5)} ${hue.toFixed(3)})`
}

// Helper function to convert HEX/RGB to HSL
function hexToHsl(hex: string): string {
  // If already HSL format, return as is
  if (hex.includes("hsl(") || hex.includes("var(")) return hex
  
  // Validate input
  if (!hex || typeof hex !== "string") return "0 0% 0%"
  
  // Check if it's a valid HEX color
  const hexMatch = hex.match(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
  if (!hexMatch) {
    // If not a valid HEX, try to parse as RGB/RGBA
    const rgbMatch = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10) / 255
      const g = parseInt(rgbMatch[2], 10) / 255
      const b = parseInt(rgbMatch[3], 10) / 255
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0
      let s = 0
      const l = (max + min) / 2
      
      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6
            break
          case g:
            h = ((b - r) / d + 2) / 6
            break
          case b:
            h = ((r - g) / d + 4) / 6
            break
        }
      }
      
      if (isNaN(h) || isNaN(s) || isNaN(l)) {
        return "0 0% 0%"
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
    }
    // If still not valid, return default
    return "0 0% 0%"
  }
  
  // Normalize 3-digit HEX to 6-digit
  const normalizedHex = hex.length === 4 
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex
  
  const r = parseInt(normalizedHex.slice(1, 3), 16) / 255
  const g = parseInt(normalizedHex.slice(3, 5), 16) / 255
  const b = parseInt(normalizedHex.slice(5, 7), 16) / 255
  
  // Validate RGB values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "0 0% 0%"
  }
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  
  // Validate final values
  if (isNaN(h) || isNaN(s) || isNaN(l)) {
    return "0 0% 0%"
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

function isPaletteScaleVar(name: string): boolean {
  return /^(neutral|brand|success|warning|error)-\d+$/.test(name)
}

function normalizeColorForCompare(value: string): string | null {
  const v = value.trim()
  if (!v || v.includes("var(")) return null

  // Normalize hex (#rgb/#rrggbb) to lowercase #rrggbb
  const hex3 = v.match(/^#([0-9a-fA-F]{3})$/)
  if (hex3) {
    const r = hex3[1][0]
    const g = hex3[1][1]
    const b = hex3[1][2]
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  const hex6 = v.match(/^#([0-9a-fA-F]{6})$/)
  if (hex6) return `#${hex6[1]}`.toLowerCase()

  // Normalize rgb/rgba to rgba(r,g,b,a)
  const rgb = v.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\s*\)/i)
  if (rgb) {
    const r = Number.parseInt(rgb[1], 10)
    const g = Number.parseInt(rgb[2], 10)
    const b = Number.parseInt(rgb[3], 10)
    const a = rgb[4] == null ? 1 : Number.parseFloat(rgb[4])
    if ([r, g, b, a].some((n) => Number.isNaN(n))) return null
    const aKey = Math.round(a * 1000) / 1000
    return `rgba(${r},${g},${b},${aKey})`
  }

  return null
}

function buildBestVarByColor(vars: Record<string, string>): Map<string, string> {
  const out = new Map<string, string>()
  for (const [name, value] of Object.entries(vars)) {
    const key = normalizeColorForCompare(value)
    if (!key) continue
    const existing = out.get(key)
    if (!existing) {
      out.set(key, name)
      continue
    }
    // Prefer palette scales (brand-600 etc.) as alias targets.
    if (isPaletteScaleVar(name) && !isPaletteScaleVar(existing)) {
      out.set(key, name)
    }
  }
  return out
}

// Get all CSS variables from :root or .dark
function getAllCSSVariables(isDark: boolean = false): Record<string, string> {
  if (typeof window === "undefined") return {}
  
  const variables: Record<string, string> = {}
  
  // Create a temporary element with the appropriate dark mode class
  const tempEl = document.createElement("div")
  tempEl.style.position = "fixed"
  tempEl.style.visibility = "hidden"
  tempEl.style.pointerEvents = "none"
  
  if (isDark) {
    tempEl.classList.add("dark")
  }
  
  document.body.appendChild(tempEl)
  
  // Get all CSS variables from computed styles
  const computedStyles = getComputedStyle(tempEl)
  
  // Get all CSS custom properties (variables that start with --)
  // We'll iterate through common variable names and also try to get all from the stylesheet
  const allVariableNames = new Set<string>()
  
  // First, try to get variables from stylesheets
  try {
    for (const stylesheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(stylesheet.cssRules || [])) {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText
            const selectors = selector.split(",").map((s) => s.trim())
            const matchesTarget = isDark
              ? selectors.some((s) => s === ".dark" || s.startsWith(".dark") || s.includes(".dark"))
              : selectors.some((s) => s === ":root" || s === "html" || s.includes(":root"))

            if (matchesTarget) {
              for (const prop of rule.style) {
                if (prop.startsWith("--")) {
                  // Store keys WITHOUT leading `--` so we don't read `----foo` later.
                  allVariableNames.add(prop.replace(/^--/, ""))
                }
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheets may throw errors, ignore them
      }
    }
  } catch (e) {
    // Some browsers may restrict access to stylesheets
  }
  
  // Fallback: get variables from computed styles (this gets all variables that are actually used)
  // We'll also manually add common variable names to ensure we get them all
  const commonVariableNames = [
    // Radius
    "radius", "radius-sm", "radius-md", "radius-lg", "radius-xl", "radius-2xl", "radius-circle",
    // Colors - basic
    "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
    "primary", "primary-foreground", "secondary", "secondary-foreground",
    "muted", "muted-foreground", "accent", "accent-foreground",
    "destructive", "destructive-foreground", "border", "input", "ring",
    "surface", "surface-foreground", "code", "code-foreground", "code-highlight", "code-number",
    "selection", "selection-foreground",
    // Neutral colors
    "neutral-0", "neutral-10", "neutral-50", "neutral-100", "neutral-200", "neutral-300",
    "neutral-400", "neutral-500", "neutral-600", "neutral-700", "neutral-800", "neutral-900", "neutral-1000",
    // Brand colors
    "brand-50", "brand-100", "brand-200", "brand-300", "brand-400", "brand-500",
    "brand-600", "brand-700", "brand-800", "brand-900", "brand-1000",
    // Success colors
    "success-50", "success-100", "success-200", "success-300", "success-400", "success-500",
    "success-600", "success-700", "success-800", "success-900", "success-1000", "success", "success-foreground",
    // Warning colors
    "warning-50", "warning-100", "warning-200", "warning-300", "warning-400", "warning-500",
    "warning-600", "warning-700", "warning-800", "warning-900", "warning-1000", "warning-10000", "warning", "warning-foreground",
    // Error colors
    "error-50", "error-100", "error-200", "error-300", "error-400", "error-500",
    "error-600", "error-700", "error-800", "error-900", "error-1000", "error-10000", "error", "error-foreground",
    // Text colors
    "text-primary", "text-secondary", "text-tertiary", "text-disable", "text-placeholder",
    "text-brand", "text-brand-hover", "text-brand-active", "text-title", "text-inverse",
    "text-success", "text-success-hover", "text-success-active",
    "text-warning", "text-warning-hover", "text-warning-active",
    "text-error", "text-error-hover", "text-error-active",
    // Background colors
    "bg-container", "bg-neutral-light", "bg-neutral-light-hover", "bg-neutral-light-active",
    "bg-brand-light", "bg-brand-light-hover", "bg-brand-light-active",
    "bg-brand", "bg-brand-hover", "bg-brand-active",
    "bg-container-disable",
    "bg-success", "bg-success-light", "bg-success-light-hover", "bg-success-light-active",
    "bg-success-hover", "bg-success-active",
    "bg-warning", "bg-warning-light", "bg-warning-light-hover", "bg-warning-light-active",
    "bg-warning-hover", "bg-warning-active",
    "bg-error", "bg-error-light", "bg-error-light-hover", "bg-error-light-active",
    "bg-error-hover", "bg-error-active",
    "bg-neutral", "bg-neutral-hover", "bg-neutral-active",
    "bg-mask", "bg-page", "bg-page-brand", "bg-page-secondary", "bg-container-secondary",
    // Border colors
    "border-brand", "border-brand-hover", "border-brand-active",
    "border-brand-light", "border-brand-light-hover",
    "border-neutral",
    "border-success", "border-success-hover", "border-success-active",
    "border-success-light", "border-success-light-hover",
    "border-warning", "border-warning-hover", "border-warning-active",
    "border-warning-light", "border-warning-light-hover",
    "border-error", "border-error-hover", "border-error-active",
    "border-error-light", "border-error-light-hover",
    "divider-neutral-basic", "divider-neutral-strong",
    // Other
    "focusring-brand", "shadow-basic", "shadow-medium", "shadow-high", "shadow-focus",
    "border-width",
    "ai-bg", "ai-light", "ai-light-hover", "ai-light-active",
    "ai-general", "ai-general-hover", "ai-general-active",
    // Font
    "font-family-en", "font-family-cn", "font-family-display", "font-sans", "font-mono",
    "font-weight-400", "font-weight-600",
    "font-size-1", "font-size-2", "font-size-3", "font-size-4", "font-size-5",
    "font-size-6", "font-size-7", "font-size-8", "font-size-9",
    "line-height-1", "line-height-2", "line-height-3", "line-height-4", "line-height-5",
    "line-height-6", "line-height-7", "line-height-8", "line-height-9",
    // Spacing
    "space-1", "space-2", "space-3", "space-4", "space-5", "space-6",
    "space-7", "space-8", "space-9", "space-10", "space-11", "space-12",
    "spacing",
    "margin-com-2xs", "margin-com-xs", "margin-com-sm", "margin-com-md",
    "margin-com-lg", "margin-com-xl", "margin-com-2xl", "margin-com-3xl",
    "padding-com-2xs", "padding-com-xs", "padding-com-sm", "padding-com-md",
    "padding-com-lg", "padding-com-xl", "padding-com-2xl", "padding-com-3xl",
    "gap-2xs", "gap-xs", "gap-sm", "gap-md", "gap-lg", "gap-xl", "gap-2xl",
    "size-com-xs", "size-com-sm", "size-com-md", "size-com-lg",
  ]
  
  // Add all common variable names
  commonVariableNames.forEach(name => allVariableNames.add(name))
  
  // Get values for all variables
  for (const varName of allVariableNames) {
    const value = computedStyles.getPropertyValue(`--${varName}`).trim()
    if (value) {
      variables[varName] = value
    }
  }
  
  document.body.removeChild(tempEl)
  
  return variables
}

// Get theme colors from CSS variables (kept for backward compatibility)
function getThemeColors(isDark: boolean = false): Record<string, string> {
  const allVars = getAllCSSVariables(isDark)
  // Return only the basic color keys for backward compatibility
  const colorKeys = [
    "background", "foreground", "card", "card-foreground", "popover", "popover-foreground",
    "primary", "primary-foreground", "secondary", "secondary-foreground",
    "muted", "muted-foreground", "accent", "accent-foreground",
    "destructive", "destructive-foreground", "border", "input", "ring",
  ]
  
  const colors: Record<string, string> = {}
  for (const key of colorKeys) {
    if (allVars[key]) {
      colors[key] = allVars[key]
    }
  }
  
  return colors
}

function getThemeCodeOKLCH(
  radius: string | number,
  lightVars: Record<string, string>,
  darkVars: Record<string, string>,
): string {
  const lightBest = buildBestVarByColor(lightVars)
  const darkBest = buildBestVarByColor(darkVars)

  // Use radius as-is (should be a CSS value like "6px")
  const radiusValue = typeof radius === "number" ? `${radius}px` : radius
  
  const rootSection =
    ":root {\n" +
    `  --radius: ${radiusValue};\n` +
    Object.entries(lightVars)
      .sort(([a], [b]) => a.localeCompare(b))
      .map((entry) => {
        const key = entry[0]
        const value = entry[1]
        const norm = normalizeColorForCompare(value)
        const best = norm ? lightBest.get(norm) : null
        if (best && best !== key) {
          return "  --" + key + ": var(--" + best + ");"
        }
        if (isPaletteScaleVar(key) && (value.match(/^#[0-9A-Fa-f]{3,6}$/) || value.match(/^rgba?\(/))) {
          const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
          return "  --" + key + ": " + oklch + ";"
        }
        return "  --" + key + ": " + value + ";"
      })
      .join("\n") +
    "\n}\n\n.dark {\n" +
    Object.entries(darkVars)
      .sort(([a], [b]) => a.localeCompare(b))
      .map((entry) => {
        const key = entry[0]
        const value = entry[1]
        const norm = normalizeColorForCompare(value)
        const best = norm ? darkBest.get(norm) : null
        if (best && best !== key) {
          return "  --" + key + ": var(--" + best + ");"
        }
        if (isPaletteScaleVar(key) && (value.match(/^#[0-9A-Fa-f]{3,6}$/) || value.match(/^rgba?\(/))) {
          const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
          return "  --" + key + ": " + oklch + ";"
        }
        return "  --" + key + ": " + value + ";"
      })
      .join("\n") +
    "\n}\n"

  return rootSection
}

function getThemeCodeHSLV4(
  radius: string | number,
  lightVars: Record<string, string>,
  darkVars: Record<string, string>,
): string {
  const lightBest = buildBestVarByColor(lightVars)
  const darkBest = buildBestVarByColor(darkVars)

  // Use radius as-is (should be a CSS value like "6px")
  const radiusValue = typeof radius === "number" ? `${radius}px` : radius
  
  const rootSection =
    ":root {\n" +
    `  --radius: ${radiusValue};\n` +
    Object.entries(lightVars)
      .sort(([a], [b]) => a.localeCompare(b))
      .map((entry) => {
        const key = entry[0]
        const value = entry[1]
        const norm = normalizeColorForCompare(value)
        const best = norm ? lightBest.get(norm) : null
        if (best && best !== key) {
          return "  --" + key + ": var(--" + best + ");"
        }
        if (isPaletteScaleVar(key) && (value.match(/^#[0-9A-Fa-f]{3,6}$/) || value.match(/^rgba?\(/))) {
          // hexToHsl returns "H S% L%"; wrap into hsl(...)
          const hslTriplet = value.startsWith("hsl(") ? value : hexToHsl(value || "#000000")
          const out = value.startsWith("hsl(") ? value : `hsl(${hslTriplet})`
          return "  --" + key + ": " + out + ";"
        }
        // If user provided raw "H S% L%" value, wrap it.
        if (isPaletteScaleVar(key) && value.includes("%") && !value.startsWith("hsl(")) {
          return "  --" + key + ": hsl(" + value + ");"
        }
        return "  --" + key + ": " + value + ";"
      })
      .join("\n") +
    "\n}\n\n.dark {\n" +
    Object.entries(darkVars)
      .sort(([a], [b]) => a.localeCompare(b))
      .map((entry) => {
        const key = entry[0]
        const value = entry[1]
        const norm = normalizeColorForCompare(value)
        const best = norm ? darkBest.get(norm) : null
        if (best && best !== key) {
          return "  --" + key + ": var(--" + best + ");"
        }
        if (isPaletteScaleVar(key) && (value.match(/^#[0-9A-Fa-f]{3,6}$/) || value.match(/^rgba?\(/))) {
          const hslTriplet = value.startsWith("hsl(") ? value : hexToHsl(value || "#000000")
          const out = value.startsWith("hsl(") ? value : `hsl(${hslTriplet})`
          return "  --" + key + ": " + out + ";"
        }
        if (isPaletteScaleVar(key) && value.includes("%") && !value.startsWith("hsl(")) {
          return "  --" + key + ": hsl(" + value + ");"
        }
        return "  --" + key + ": " + value + ";"
      })
      .join("\n") +
    "\n}\n"

  return rootSection
}

function getThemeCodeV3(
  radius: string | number,
  lightColors: Record<string, string>,
  darkColors: Record<string, string>,
): string {
  // Convert radius to rem if it's in px
  let radiusRem = "0.5rem"
  if (typeof radius === "string") {
    const match = radius.match(/([\d.]+)px/)
    if (match) {
      const px = parseFloat(match[1])
      radiusRem = `${px / 16}rem`
    } else if (radius.includes("rem")) {
      radiusRem = radius
    }
  } else {
    radiusRem = `${radius}rem`
  }
  
  return `@layer base {
  :root {
    --background: ${lightColors.background || "0 0% 100%"};
    --foreground: ${lightColors.foreground || "222.2 84% 4.9%"};
    --card: ${lightColors.card || "0 0% 100%"};
    --card-foreground: ${lightColors["card-foreground"] || "222.2 84% 4.9%"};
    --popover: ${lightColors.popover || "0 0% 100%"};
    --popover-foreground: ${lightColors["popover-foreground"] || "222.2 84% 4.9%"};
    --primary: ${lightColors.primary || "222.2 47.4% 11.2%"};
    --primary-foreground: ${lightColors["primary-foreground"] || "210 40% 98%"};
    --secondary: ${lightColors.secondary || "210 40% 96.1%"};
    --secondary-foreground: ${lightColors["secondary-foreground"] || "222.2 47.4% 11.2%"};
    --muted: ${lightColors.muted || "210 40% 96.1%"};
    --muted-foreground: ${lightColors["muted-foreground"] || "215.4 16.3% 46.9%"};
    --accent: ${lightColors.accent || "210 40% 96.1%"};
    --accent-foreground: ${lightColors["accent-foreground"] || "222.2 47.4% 11.2%"};
    --destructive: ${lightColors.destructive || "0 84.2% 60.2%"};
    --destructive-foreground: ${lightColors["destructive-foreground"] || "210 40% 98%"};
    --border: ${lightColors.border || "214.3 31.8% 91.4%"};
    --input: ${lightColors.input || "214.3 31.8% 91.4%"};
    --ring: ${lightColors.ring || "222.2 84% 4.9%"};
    --radius: ${radiusRem};
  }

  .dark {
    --background: ${darkColors.background || "222.2 84% 4.9%"};
    --foreground: ${darkColors.foreground || "210 40% 98%"};
    --card: ${darkColors.card || "222.2 84% 4.9%"};
    --card-foreground: ${darkColors["card-foreground"] || "210 40% 98%"};
    --popover: ${darkColors.popover || "222.2 84% 4.9%"};
    --popover-foreground: ${darkColors["popover-foreground"] || "210 40% 98%"};
    --primary: ${darkColors.primary || "210 40% 98%"};
    --primary-foreground: ${darkColors["primary-foreground"] || "222.2 47.4% 11.2%"};
    --secondary: ${darkColors.secondary || "217.2 32.6% 17.5%"};
    --secondary-foreground: ${darkColors["secondary-foreground"] || "210 40% 98%"};
    --muted: ${darkColors.muted || "217.2 32.6% 17.5%"};
    --muted-foreground: ${darkColors["muted-foreground"] || "215 20.2% 65.1%"};
    --accent: ${darkColors.accent || "217.2 32.6% 17.5%"};
    --accent-foreground: ${darkColors["accent-foreground"] || "210 40% 98%"};
    --destructive: ${darkColors.destructive || "0 62.8% 30.6%"};
    --destructive-foreground: ${darkColors["destructive-foreground"] || "210 40% 98%"};
    --border: ${darkColors.border || "217.2 32.6% 17.5%"};
    --input: ${darkColors.input || "217.2 32.6% 17.5%"};
    --ring: ${darkColors.ring || "212.7 26.8% 83.9%"};
  }
}
`
}

function ColorIndicator({ color }: { color: string }) {
  return (
    <span
      className="border-border/50 inline-block size-3 border"
      style={{ backgroundColor: color }}
    />
  )
}

function CustomizerCode({ themeName }: { themeName: string }) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [tailwindVersion, setTailwindVersion] = React.useState("v4-oklch")
  const { resolvedTheme } = useTheme()
  
  // Get radius value from CSS (keep original value)
  const radiusValue = React.useMemo(() => {
    if (typeof window === "undefined") return "6px"
    
    const tempEl = document.createElement("div")
    tempEl.style.position = "fixed"
    tempEl.style.visibility = "hidden"
    tempEl.style.pointerEvents = "none"
    document.body.appendChild(tempEl)
    
    const radius = getComputedStyle(tempEl).getPropertyValue("--radius").trim()
    document.body.removeChild(tempEl)
    
    return radius || "6px"
  }, [])

  React.useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }
  }, [hasCopied])

  const lightVars = React.useMemo(() => getAllCSSVariables(false), [resolvedTheme])
  const darkVars = React.useMemo(() => getAllCSSVariables(true), [resolvedTheme])

  const lightColors = React.useMemo(() => {
    const keys = [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ] as const
    const out: Record<string, string> = {}
    for (const k of keys) {
      const v = lightVars[k]
      if (v) out[k] = v
    }
    return out
  }, [lightVars])

  const darkColors = React.useMemo(() => {
    const keys = [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ] as const
    const out: Record<string, string> = {}
    for (const k of keys) {
      const v = darkVars[k]
      if (v) out[k] = v
    }
    return out
  }, [darkVars])

  const codeOKLCH = React.useMemo(
    () => getThemeCodeOKLCH(radiusValue, lightVars, darkVars),
    [radiusValue, lightVars, darkVars],
  )
  const codeHSL = React.useMemo(
    () => getThemeCodeHSLV4(radiusValue, lightVars, darkVars),
    [radiusValue, lightVars, darkVars],
  )
  const codeV3 = React.useMemo(
    () => getThemeCodeV3(radiusValue, lightColors, darkColors),
    [radiusValue, lightColors, darkColors],
  )

  const getCodeForVersion = (version: string) => {
    switch (version) {
      case "v4-oklch":
        return codeOKLCH
      case "v4-hsl":
        return codeHSL
      case "v3":
        return codeV3
      default:
        return codeOKLCH
    }
  }

  const handleCopy = (version: string) => {
    navigator.clipboard.writeText(getCodeForVersion(version))
    setHasCopied(true)
  }

  const handleDownload = (version: string) => {
    const code = getCodeForVersion(version)
    const blob = new Blob([code], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `theme-${version}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Tabs
        value={tailwindVersion}
        onValueChange={setTailwindVersion}
        className="min-w-0 px-4 pb-4 md:p-0"
      >
        <TabsList>
          <TabsTrigger value="v4-oklch">OKLCH</TabsTrigger>
          <TabsTrigger value="v4-hsl">HSL</TabsTrigger>
          <TabsTrigger value="v3">Tailwind v3</TabsTrigger>
        </TabsList>
        <TabsContent value="v4-oklch">
          <figure className="!mx-0 mt-0 rounded-[var(--radius-lg)]">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <div className="absolute top-3 right-2 z-10 flex gap-1">
                <Button
                  data-slot="copy-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleCopy("v4-oklch")}
                >
                  <span className="sr-only">Copy</span>
                  {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
                <Button
                  data-slot="download-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleDownload("v4-oklch")}
                >
                  <span className="sr-only">Download</span>
                  <Download className="size-4" />
                </Button>
              </div>
              <code className="text-code-foreground whitespace-pre">
                {codeOKLCH}
              </code>
            </pre>
          </figure>
        </TabsContent>
        <TabsContent value="v4-hsl">
          <figure className="!mx-0 mt-0 rounded-[var(--radius-lg)]">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <div className="absolute top-3 right-2 z-10 flex gap-1">
                <Button
                  data-slot="copy-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleCopy("v4-hsl")}
                >
                  <span className="sr-only">Copy</span>
                  {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
                <Button
                  data-slot="download-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleDownload("v4-hsl")}
                >
                  <span className="sr-only">Download</span>
                  <Download className="size-4" />
                </Button>
              </div>
              <code className="text-code-foreground whitespace-pre">
                {codeHSL}
              </code>
            </pre>
          </figure>
        </TabsContent>
        <TabsContent value="v3">
          <figure className="!mx-0 mt-0 rounded-[var(--radius-lg)]">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <div className="absolute top-3 right-2 z-10 flex gap-1">
                <Button
                  data-slot="copy-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleCopy("v3")}
                >
                  <span className="sr-only">Copy</span>
                  {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
                <Button
                  data-slot="download-button"
                  size="icon"
                  variant="ghost"
                  className="bg-code text-code-foreground size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => handleDownload("v3")}
                >
                  <span className="sr-only">Download</span>
                  <Download className="size-4" />
                </Button>
              </div>
              <code className="text-code-foreground whitespace-pre">
                {codeV3}
              </code>
            </pre>
          </figure>
        </TabsContent>
      </Tabs>
    </>
  )
}

export function CopyCodeButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  let { activeTheme: activeThemeName = "neutral" } = useThemeConfig()
  activeThemeName = activeThemeName === "default" ? "neutral" : activeThemeName
  
  // Extract color theme name
  const colorTheme = activeThemeName.split(" ").find(t => 
    ["neutral", "brand", "success", "warning", "error"].includes(t)
  ) || "neutral"

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className={cn("sm:hidden", className)} {...props}>
            Copy Code
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-auto">
          <DrawerHeader>
            <DrawerTitle className="capitalize">{colorTheme}</DrawerTitle>
            <DrawerDescription>
              Copy and paste the following code into your CSS file.
            </DrawerDescription>
          </DrawerHeader>
          <CustomizerCode themeName={colorTheme} />
        </DrawerContent>
      </Drawer>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            data-size={props.size}
            className={cn("group/button hidden sm:flex", className)}
            {...props}
          >
            <Copy className="size-4" />
            <span className="group-data-[size=icon-sm]/button:sr-only">
              Copy Code
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-[var(--radius-xl)] border-none bg-clip-padding shadow-2xl ring-4 ring-neutral-200/80 outline-none md:max-w-2xl dark:bg-neutral-800 dark:ring-neutral-900">
          <DialogHeader>
            <DialogTitle className="capitalize">{colorTheme}</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <CustomizerCode themeName={colorTheme} />
        </DialogContent>
      </Dialog>
    </>
  )
}
