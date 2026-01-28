"use client"

import * as React from "react"
import { Settings } from "lucide-react"

import { Button } from "@/registry/wuhan/ui/button"
import { Separator } from "@/registry/wuhan/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/wuhan/ui/select"
import { cn } from "@/lib/utils"

import { useDesignSystemSearchParams } from "../lib/design-system-search-params"

const BASES = [
  { value: "radix", label: "Radix" },
  { value: "base", label: "Base" },
] as const

const STYLES = [
  { value: "vega", label: "Vega" },
  { value: "nova", label: "Nova" },
  { value: "maia", label: "Maia" },
  { value: "lyra", label: "Lyra" },
  { value: "mira", label: "Mira" },
] as const

const BASE_COLORS = [
  { value: "brand", label: "Brand" },
  { value: "neutral", label: "Neutral" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
] as const

const THEMES = [
  { value: "brand", label: "Brand" },
  { value: "neutral", label: "Neutral" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
] as const

const ICON_LIBRARIES = [
  { value: "lucide", label: "Lucide" },
  { value: "tabler", label: "Tabler" },
] as const

const FONTS = [
  { value: "inter", label: "Inter" },
  { value: "display", label: "Display" },
  { value: "pingfang", label: "PingFang" },
  { value: "helvetica", label: "Helvetica" },
] as const

const RADII = [
  { value: "default", label: "Default" },
  { value: "none", label: "None" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
] as const

const MENU_COLORS = [
  { value: "default", label: "Default" },
  { value: "inverted", label: "Inverted" },
] as const

const MENU_ACCENTS = [
  { value: "subtle", label: "Subtle" },
  { value: "bold", label: "Bold" },
] as const

function PickerRow({
  label,
  value,
  onValueChange,
  options,
  className,
}: {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: ReadonlyArray<{ value: string; label: string }>
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="text-muted-foreground text-xs">{label}</div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function randomPick<T extends { value: string }>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)]?.value ?? ""
}

export function Customizer() {
  const [params, setParams] = useDesignSystemSearchParams()
  const anchorRef = React.useRef<HTMLDivElement | null>(null)

  const availableThemes = React.useMemo(() => {
    // 优先让 theme 能跟 baseColor 对齐（更贴近 create 的体验）
    const color = params.baseColor
    const baseColorTheme = THEMES.find((t) => t.value === color)
    const rest = THEMES.filter((t) => t.value !== color)
    return baseColorTheme ? [baseColorTheme, ...rest] : THEMES
  }, [params.baseColor])

  return (
    <div
      ref={anchorRef}
      className="no-scrollbar -mx-2.5 flex flex-col overflow-y-auto p-1 md:mx-0 md:h-[calc(100svh-var(--header-height)-2rem)] md:w-48 md:gap-0 md:py-0"
    >
      <div className="hidden items-center gap-2 px-[calc(--spacing(2.5))] pb-1 md:flex md:flex-col md:items-start">
        <Settings className="size-4" />
        <div className="relative flex flex-col gap-1 rounded-[var(--radius-lg)] text-[13px]/snug">
          <div className="flex items-center gap-1 font-medium text-balance">
            Build your own shadcn/ui
          </div>
          <div className="hidden md:flex">
            When you&apos;re done, click Create Project to start a new project.
          </div>
        </div>
      </div>

      <div className="no-scrollbar h-14 overflow-x-auto overflow-y-hidden p-px md:h-full md:overflow-x-hidden md:overflow-y-auto">
        <div className="flex h-full flex-1 flex-row gap-2 md:flex-col md:gap-2">
          <div className="flex min-w-[160px] flex-col gap-2 md:min-w-0">
            <PickerRow
              label="Base"
              value={params.base}
              onValueChange={(value) => setParams({ base: value })}
              options={BASES}
            />
            <PickerRow
              label="Style"
              value={params.style}
              onValueChange={(value) => setParams({ style: value })}
              options={STYLES}
            />
          </div>

          <div className="flex min-w-[160px] flex-col gap-2 md:min-w-0">
            <PickerRow
              label="Base Color"
              value={params.baseColor}
              onValueChange={(value) =>
                setParams({
                  baseColor: value,
                  theme: value, // 跟 create 一样：换 baseColor 时尽量同步 theme
                })
              }
              options={BASE_COLORS}
            />
            <PickerRow
              label="Theme"
              value={params.theme}
              onValueChange={(value) => setParams({ theme: value })}
              options={availableThemes}
            />
          </div>

          <div className="flex min-w-[160px] flex-col gap-2 md:min-w-0">
            <PickerRow
              label="Icon Library"
              value={params.iconLibrary}
              onValueChange={(value) => setParams({ iconLibrary: value })}
              options={ICON_LIBRARIES}
            />
            <PickerRow
              label="Font"
              value={params.font}
              onValueChange={(value) => setParams({ font: value })}
              options={FONTS}
            />
          </div>

          <div className="flex min-w-[160px] flex-col gap-2 md:min-w-0">
            <PickerRow
              label="Radius"
              value={params.radius}
              onValueChange={(value) => setParams({ radius: value })}
              options={RADII}
            />
            <PickerRow
              label="Menu Color"
              value={params.menuColor}
              onValueChange={(value) => setParams({ menuColor: value })}
              options={MENU_COLORS}
            />
          </div>

          <div className="flex min-w-[160px] flex-col gap-2 md:min-w-0">
            <PickerRow
              label="Menu Accent"
              value={params.menuAccent}
              onValueChange={(value) => setParams({ menuAccent: value })}
              options={MENU_ACCENTS}
            />
          </div>

          <div className="mt-auto hidden w-full flex-col items-center gap-2 md:flex">
            <Separator />
            <div className="flex w-full flex-col gap-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setParams({
                    base: randomPick(BASES),
                    style: randomPick(STYLES),
                    baseColor: randomPick(BASE_COLORS),
                    theme: randomPick(availableThemes),
                    iconLibrary: randomPick(ICON_LIBRARIES),
                    font: randomPick(FONTS),
                    radius: randomPick(RADII),
                    menuColor: randomPick(MENU_COLORS),
                    menuAccent: randomPick(MENU_ACCENTS),
                  })
                }}
              >
                Random
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setParams({
                    base: "radix",
                    style: "vega",
                    baseColor: "brand",
                    theme: "brand",
                    iconLibrary: "lucide",
                    font: "inter",
                    radius: "default",
                    menuColor: "default",
                    menuAccent: "subtle",
                  })
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

