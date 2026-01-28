"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type DesignSystemParams = {
  base: string
  style: string
  baseColor: string
  theme: string
  iconLibrary: string
  font: string
  radius: string
  menuColor: string
  menuAccent: string
}

export const DEFAULT_DESIGN_SYSTEM_PARAMS: DesignSystemParams = {
  base: "radix",
  style: "vega",
  baseColor: "brand",
  theme: "brand",
  iconLibrary: "lucide",
  font: "inter",
  radius: "default",
  menuColor: "default",
  menuAccent: "subtle",
}

export function useDesignSystemSearchParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const params = useMemo<DesignSystemParams>(() => {
    const get = (key: keyof DesignSystemParams) =>
      searchParams.get(key) ?? DEFAULT_DESIGN_SYSTEM_PARAMS[key]

    return {
      base: get("base"),
      style: get("style"),
      baseColor: get("baseColor"),
      theme: get("theme"),
      iconLibrary: get("iconLibrary"),
      font: get("font"),
      radius: get("radius"),
      menuColor: get("menuColor"),
      menuAccent: get("menuAccent"),
    }
  }, [searchParams])

  const setParams = useCallback(
    (next: Partial<DesignSystemParams>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(next)) {
        if (value === undefined) continue
        if (!value) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      }

      const queryString = newSearchParams.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname
      router.push(newUrl, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return [params, setParams] as const
}

