"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
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

// Helper function to convert HEX/RGB to OKLCH (simplified, approximate)
function hexToOklch(hex: string): string {
  // If already OKLCH format, return as is
  if (hex.startsWith("oklch(")) return hex
  
  // Validate input
  if (!hex || typeof hex !== "string") return "oklch(0 0 0)"
  
  // Check if it's a valid HEX color
  const hexMatch = hex.match(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
  if (!hexMatch) {
    // If not a valid HEX, try to parse as RGB/RGBA
    const rgbMatch = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10) / 255
      const g = parseInt(rgbMatch[2], 10) / 255
      const b = parseInt(rgbMatch[3], 10) / 255
      
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
      const c = Math.sqrt((r - l) ** 2 + (g - l) ** 2 + (b - l) ** 2) * 0.5
      const h = Math.atan2(b - g, r - g) * (180 / Math.PI)
      
      if (isNaN(l) || isNaN(c) || isNaN(h)) {
        return "oklch(0 0 0)"
      }
      
      return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`
    }
    // If still not valid, return default
    return "oklch(0 0 0)"
  }
  
  // Normalize 3-digit HEX to 6-digit
  const normalizedHex = hex.length === 4 
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex
  
  // Convert HEX to RGB
  const r = parseInt(normalizedHex.slice(1, 3), 16) / 255
  const g = parseInt(normalizedHex.slice(3, 5), 16) / 255
  const b = parseInt(normalizedHex.slice(5, 7), 16) / 255
  
  // Validate RGB values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "oklch(0 0 0)"
  }
  
  // Simplified conversion (this is approximate)
  // In production, you'd want a proper color conversion library
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const c = Math.sqrt((r - l) ** 2 + (g - l) ** 2 + (b - l) ** 2) * 0.5
  const h = Math.atan2(b - g, r - g) * (180 / Math.PI)
  
  // Validate final values
  if (isNaN(l) || isNaN(c) || isNaN(h)) {
    return "oklch(0 0 0)"
  }
  
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`
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

// Get theme colors from CSS variables
function getThemeColors(isDark: boolean = false): Record<string, string> {
  if (typeof window === "undefined") return {}
  
  const colorKeys = [
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
  ]
  
  const colors: Record<string, string> = {}
  
  // Create a temporary element with the appropriate dark mode class
  const tempEl = document.createElement("div")
  tempEl.style.position = "fixed"
  tempEl.style.visibility = "hidden"
  tempEl.style.pointerEvents = "none"
  
  if (isDark) {
    tempEl.classList.add("dark")
  }
  
  document.body.appendChild(tempEl)
  
  for (const key of colorKeys) {
    let value = getComputedStyle(tempEl).getPropertyValue(`--${key}`).trim()
    
    // Resolve var() references recursively (max 10 iterations to avoid infinite loops)
    let iterations = 0
    while (value.startsWith("var(") && iterations < 10) {
      const varName = value.match(/var\(--([^)]+)\)/)?.[1]
      if (varName) {
        const resolved = getComputedStyle(tempEl).getPropertyValue(`--${varName}`).trim()
        if (resolved && resolved !== value) {
          value = resolved
          iterations++
        } else {
          break
        }
      } else {
        break
      }
    }
    
    // If still a var() reference, try to get the computed color value directly
    if (value.startsWith("var(") || !value) {
      // Set the CSS variable on the element and read the computed color
      tempEl.style.backgroundColor = `var(--${key})`
      const computed = getComputedStyle(tempEl).backgroundColor
      
      if (computed && computed !== "rgba(0, 0, 0, 0)" && computed !== "transparent") {
        // Convert rgba() to hex
        const rgb = computed.match(/\d+/g)
        if (rgb && rgb.length >= 3) {
          value = `#${parseInt(rgb[0], 10).toString(16).padStart(2, "0")}${parseInt(rgb[1], 10).toString(16).padStart(2, "0")}${parseInt(rgb[2], 10).toString(16).padStart(2, "0")}`
        } else {
          value = computed
        }
      } else {
        // Fallback: try to get computed color using color property
        tempEl.style.color = `var(--${key})`
        const computedColor = getComputedStyle(tempEl).color
        if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
          const rgb = computedColor.match(/\d+/g)
          if (rgb && rgb.length >= 3) {
            value = `#${parseInt(rgb[0], 10).toString(16).padStart(2, "0")}${parseInt(rgb[1], 10).toString(16).padStart(2, "0")}${parseInt(rgb[2], 10).toString(16).padStart(2, "0")}`
          } else {
            value = computedColor
          }
        }
      }
      // Reset styles
      tempEl.style.backgroundColor = ""
      tempEl.style.color = ""
    }
    
    // Convert RGB/RGBA to hex if needed
    if (value && !value.startsWith("#") && !value.startsWith("oklch(") && !value.startsWith("hsl(") && value.match(/^rgba?\(/)) {
      const rgb = value.match(/\d+/g)
      if (rgb && rgb.length >= 3) {
        value = `#${parseInt(rgb[0], 10).toString(16).padStart(2, "0")}${parseInt(rgb[1], 10).toString(16).padStart(2, "0")}${parseInt(rgb[2], 10).toString(16).padStart(2, "0")}`
      }
    }
    
    // Ensure we have a valid color value
    if (!value || value === "" || value.startsWith("var(")) {
      // Use a fallback default color based on the key
      if (key.includes("background") || key.includes("card") || key.includes("popover")) {
        value = isDark ? "#141414" : "#ffffff"
      } else if (key.includes("foreground")) {
        value = isDark ? "#b2afba" : "#1e1d26"
      } else {
        value = "#000000"
      }
    }
    
    colors[key] = value
  }
  
  document.body.removeChild(tempEl)
  
  return colors
}

function getThemeCodeOKLCH(radius: number): string {
  const lightColors = getThemeColors(false)
  const darkColors = getThemeColors(true)
  
  const rootSection =
    ":root {\n  --radius: " +
    radius +
    "rem;\n" +
    Object.entries(lightColors)
      .map((entry) => {
        const value = entry[1]
        const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
        return "  --" + entry[0] + ": " + oklch + ";"
      })
      .join("\n") +
    "\n}\n\n.dark {\n" +
    Object.entries(darkColors)
      .map((entry) => {
        const value = entry[1]
        const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
        return "  --" + entry[0] + ": " + oklch + ";"
      })
      .join("\n") +
    "\n}\n"

  return rootSection
}

function getThemeCodeHSLV4(radius: number): string {
  const lightColors = getThemeColors(false)
  const darkColors = getThemeColors(true)
  
  const rootSection =
    ":root {\n  --radius: " +
    radius +
    "rem;\n" +
    Object.entries(lightColors)
      .map((entry) => {
        const value = entry[1]
        const hsl = value.startsWith("hsl(") || value.includes("%") ? value : hexToHsl(value || "#000000")
        return "  --" + entry[0] + ": hsl(" + hsl + ");"
      })
      .join("\n") +
    "\n}\n\n.dark {\n" +
    Object.entries(darkColors)
      .map((entry) => {
        const value = entry[1]
        const hsl = value.startsWith("hsl(") || value.includes("%") ? value : hexToHsl(value || "#000000")
        return "  --" + entry[0] + ": hsl(" + hsl + ");"
      })
      .join("\n") +
    "\n}\n"

  return rootSection
}

function getThemeCodeV3(radius: number): string {
  const lightColors = getThemeColors(false)
  const darkColors = getThemeColors(true)
  
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
    --radius: ${radius}rem;
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
  
  // Get radius value from CSS
  const radiusValue = React.useMemo(() => {
    if (typeof window === "undefined") return 0.5
    
    const tempEl = document.createElement("div")
    tempEl.style.position = "fixed"
    tempEl.style.visibility = "hidden"
    tempEl.style.pointerEvents = "none"
    document.body.appendChild(tempEl)
    
    const radius = getComputedStyle(tempEl).getPropertyValue("--radius").trim()
    document.body.removeChild(tempEl)
    
    if (radius) {
      const match = radius.match(/([\d.]+)/)
      if (match) {
        const px = parseFloat(match[1])
        return px / 16 // Convert px to rem
      }
    }
    return 0.5
  }, [])

  React.useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }
  }, [hasCopied])

  const lightColors = React.useMemo(() => getThemeColors(false), [resolvedTheme])
  const darkColors = React.useMemo(() => getThemeColors(true), [resolvedTheme])

  const getCodeForVersion = (version: string) => {
    switch (version) {
      case "v4-oklch":
        return getThemeCodeOKLCH(radiusValue)
      case "v4-hsl":
        return getThemeCodeHSLV4(radiusValue)
      case "v3":
        return getThemeCodeV3(radiusValue)
      default:
        return getThemeCodeOKLCH(radiusValue)
    }
  }

  const handleCopy = (version: string) => {
    navigator.clipboard.writeText(getCodeForVersion(version))
    setHasCopied(true)
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
          <figure className="!mx-0 mt-0 rounded-lg">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <Button
                data-slot="copy-button"
                size="icon"
                variant="ghost"
                className="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                onClick={() => handleCopy("v4-oklch")}
              >
                <span className="sr-only">Copy</span>
                {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
              <code className="text-code-foreground">
                <span className="line text-code-foreground">
                  &nbsp;:root &#123;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;&nbsp;&nbsp;--radius: {radiusValue}rem;
                </span>
                <br />
                {Object.entries(lightColors).map(([key, value]) => {
                  const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
                  return (
                    <React.Fragment key={key}>
                      <span className="line text-code-foreground">
                        &nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator color={value || "#000000"} />{" "}
                        {oklch};
                      </span>
                      <br />
                    </React.Fragment>
                  )
                })}
                <span className="line text-code-foreground">
                  &nbsp;&#125;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;.dark &#123;
                </span>
                <br />
                {Object.entries(darkColors).map(([key, value]) => {
                  const oklch = value.startsWith("oklch(") ? value : hexToOklch(value || "#000000")
                  return (
                    <React.Fragment key={key}>
                      <span className="line text-code-foreground">
                        &nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator color={value || "#000000"} />{" "}
                        {oklch};
                      </span>
                      <br />
                    </React.Fragment>
                  )
                })}
                <span className="line text-code-foreground">
                  &nbsp;&#125;
                </span>
              </code>
            </pre>
          </figure>
        </TabsContent>
        <TabsContent value="v4-hsl">
          <figure className="!mx-0 mt-0 rounded-lg">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <Button
                data-slot="copy-button"
                size="icon"
                variant="ghost"
                className="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                onClick={() => handleCopy("v4-hsl")}
              >
                <span className="sr-only">Copy</span>
                {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
              <code className="text-code-foreground">
                <span className="line text-code-foreground">
                  &nbsp;:root &#123;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;&nbsp;&nbsp;--radius: {radiusValue}rem;
                </span>
                <br />
                {Object.entries(lightColors).map(([key, value]) => {
                  const hsl = value.startsWith("hsl(") || value.includes("%") ? value : hexToHsl(value || "#000000")
                  return (
                    <React.Fragment key={key}>
                      <span className="line text-code-foreground">
                        &nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator color={value || "#000000"} />{" "}
                        hsl({hsl});
                      </span>
                      <br />
                    </React.Fragment>
                  )
                })}
                <span className="line text-code-foreground">
                  &nbsp;&#125;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;
                </span>
                <br />
                <span className="line text-code-foreground">
                  &nbsp;.dark &#123;
                </span>
                <br />
                {Object.entries(darkColors).map(([key, value]) => {
                  const hsl = value.startsWith("hsl(") || value.includes("%") ? value : hexToHsl(value || "#000000")
                  return (
                    <React.Fragment key={key}>
                      <span className="line text-code-foreground">
                        &nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator color={value || "#000000"} />{" "}
                        hsl({hsl});
                      </span>
                      <br />
                    </React.Fragment>
                  )
                })}
                <span className="line text-code-foreground">
                  &nbsp;&#125;
                </span>
              </code>
            </pre>
          </figure>
        </TabsContent>
        <TabsContent value="v3">
          <figure className="!mx-0 mt-0 rounded-lg">
            <figcaption className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70">
              <Icons.css className="fill-foreground" />
              app/globals.css
            </figcaption>
            <pre className="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none md:max-h-[450px] relative">
              <Button
                data-slot="copy-button"
                size="icon"
                variant="ghost"
                className="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
                onClick={() => handleCopy("v3")}
              >
                <span className="sr-only">Copy</span>
                {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
              <code className="text-code-foreground whitespace-pre">
                {getThemeCodeV3(radiusValue)}
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
        <DialogContent className="rounded-xl border-none bg-clip-padding shadow-2xl ring-4 ring-neutral-200/80 outline-none md:max-w-2xl dark:bg-neutral-800 dark:ring-neutral-900">
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
