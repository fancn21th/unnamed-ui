"use client"

import * as React from "react"

import { useDesignSystemSearchParams } from "../lib/design-system-search-params"

function toThemeClass(theme: string) {
  // 项目现有主题类：theme-brand / theme-neutral / theme-success / theme-warning / theme-error
  const t = theme.toLowerCase()
  if (t === "neutral") return "theme-neutral"
  if (t === "brand" || t === "default") return "theme-brand"
  if (t === "success" || t === "green") return "theme-success"
  if (t === "warning" || t === "orange") return "theme-warning"
  if (t === "error" || t === "red") return "theme-error"
  // 默认当成品牌色
  return "theme-brand"
}

function applyThemeVars(root: HTMLElement, theme: string) {
  // 直接写 CSS 变量，确保“切换就可见”
  const t = theme.toLowerCase()

  const primary =
    t === "neutral"
      ? "var(--neutral-800)"
      : t === "success" || t === "green"
        ? "var(--success-600)"
        : t === "warning" || t === "orange"
          ? "var(--warning-600)"
          : t === "error" || t === "red"
            ? "var(--error-600)"
            : "var(--brand-600)"

  const ring =
    t === "neutral"
      ? "var(--neutral-400)"
      : t === "success" || t === "green"
        ? "var(--success-300)"
        : t === "warning" || t === "orange"
          ? "var(--warning-300)"
          : t === "error" || t === "red"
            ? "var(--error-300)"
            : "var(--brand-300)"

  root.style.setProperty("--primary", primary)
  root.style.setProperty("--primary-foreground", "var(--neutral-0)")
  root.style.setProperty("--ring", ring)
}

function toRadiusClass(radius: string) {
  const r = radius.toLowerCase()
  if (r === "none") return "theme-radius-none"
  if (r === "small") return "theme-radius-small"
  if (r === "large") return "theme-radius-large"
  // medium/default
  return "theme-radius-medium"
}

function applyRadiusVars(root: HTMLElement, radius: string) {
  const r = radius.toLowerCase()
  const isNone = r === "none"
  const isSmall = r === "small"
  const isLarge = r === "large"

  // 默认/medium
  const base = isNone ? "0px" : isSmall ? "4px" : isLarge ? "8px" : "6px"
  const sm = isNone ? "0px" : isSmall ? "2px" : "4px"
  const md = base
  const lg = isNone ? "0px" : isSmall ? "6px" : isLarge ? "12px" : "8px"
  const xl = isNone ? "0px" : isSmall ? "8px" : isLarge ? "16px" : "12px"
  const x2 = isNone ? "0px" : isSmall ? "12px" : isLarge ? "24px" : "16px"

  root.style.setProperty("--radius", base)
  root.style.setProperty("--radius-sm", sm)
  root.style.setProperty("--radius-md", md)
  root.style.setProperty("--radius-lg", lg)
  root.style.setProperty("--radius-xl", xl)
  root.style.setProperty("--radius-2xl", x2)
}

function toFontClass(font: string) {
  // 项目现有字体主题类：theme-font-pingfang / theme-font-helvetica / theme-font-display
  const f = font.toLowerCase()
  if (f === "display") return "theme-font-display"
  if (f === "pingfang") return "theme-font-pingfang"
  if (f === "helvetica") return "theme-font-helvetica"
  // inter：不额外加类，使用默认
  return ""
}

function applyFontVars(root: HTMLElement, font: string) {
  const f = font.toLowerCase()

  if (f === "pingfang") {
    root.style.setProperty(
      "--font-family-cn",
      `"Microsoft YaHei UI","Microsoft YaHei","PingFang SC",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`
    )
    root.style.setProperty("--font-sans", "var(--font-family-cn)")
    return
  }

  if (f === "helvetica") {
    root.style.setProperty(
      "--font-family-cn",
      `Arial,"Helvetica Neue",Helvetica,"Segoe UI",system-ui,sans-serif`
    )
    root.style.setProperty("--font-sans", "var(--font-family-cn)")
    return
  }

  if (f === "display") {
    root.style.setProperty(
      "--font-family-cn",
      `"Segoe UI Variable Display","Segoe UI","Microsoft YaHei UI","Microsoft YaHei","Noto Sans CJK SC","Source Han Sans SC","PingFang SC",system-ui,sans-serif`
    )
    root.style.setProperty("--font-sans", "var(--font-family-cn)")
    return
  }

  // inter/default：不强行覆盖（但如果之前设置过，回到默认要清掉）
  root.style.removeProperty("--font-family-cn")
  root.style.removeProperty("--font-sans")
}

const THEME_PREFIXES = ["theme-", "theme-radius-", "theme-font-"]

function removeOldThemeClasses(el: HTMLElement) {
  for (const cls of Array.from(el.classList)) {
    if (THEME_PREFIXES.some((p) => cls.startsWith(p))) {
      el.classList.remove(cls)
    }
  }
}

export function DesignSystemClassApplier() {
  const [params] = useDesignSystemSearchParams()

  React.useEffect(() => {
    const root = document.documentElement
    removeOldThemeClasses(root)

    const themeKey = params.theme || params.baseColor
    const themeClass = toThemeClass(themeKey)
    const radiusClass = toRadiusClass(params.radius)
    const fontClass = toFontClass(params.font)

    root.classList.add(themeClass, radiusClass)
    if (fontClass) root.classList.add(fontClass)

    applyThemeVars(root, themeKey)
    applyRadiusVars(root, params.radius)
    applyFontVars(root, params.font)

    // menuColor/menuAccent/base/style/iconLibrary 目前项目没有对应主题类，先不做处理
  }, [params.baseColor, params.font, params.radius, params.theme])

  return null
}

