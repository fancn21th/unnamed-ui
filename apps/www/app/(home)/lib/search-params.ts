"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

export function useHomeSearchParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const item = searchParams.get("item") || "all-blocks"

  const setParams = useCallback(
    (params: { item?: string }) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      
      if (params.item !== undefined) {
        if (params.item) {
          newSearchParams.set("item", params.item)
        } else {
          newSearchParams.delete("item")
        }
      }

      const queryString = newSearchParams.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname
      
      router.push(newUrl, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return [
    { item },
    setParams,
  ] as const
}

export function serializeHomeSearchParams(basePath: string, item: string) {
  const params = new URLSearchParams()
  if (item) {
    params.set("item", item)
  }
  const queryString = params.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

