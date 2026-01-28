"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Index } from "@/registry/__index__"
import { useHomeSearchParams } from "../lib/search-params"

export function Preview() {
  const [params] = useHomeSearchParams()
  const searchParams = useSearchParams()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const iframeSrc = React.useMemo(() => {
    if (!params.item) {
      return null
    }

    // 特殊处理 "all-blocks" 和 "recruitment-blocks"
    if (params.item === "all-blocks") {
      return "/preview/all-blocks"
    }

    if (params.item === "recruitment-blocks") {
      return "/preview/recruitment-blocks"
    }

    // 方案A：block 统一走 /preview/block/[name]，/preview/[name] 只渲染 example
    const itemType = Index.wuhan?.[params.item]?.type
    if (itemType === "registry:block") {
      return `/preview/block/${params.item}`
    }

    // 其他情况（example）使用原来的路径
    return `/preview/${params.item}`
  }, [params.item])

  const iframeSrcWithParams = React.useMemo(() => {
    if (!iframeSrc) return null
    const qs = searchParams.toString()
    return qs ? `${iframeSrc}?${qs}` : iframeSrc
  }, [iframeSrc, searchParams])

  if (!iframeSrcWithParams) {
    return (
      <div className="relative -mx-1 flex flex-1 flex-col items-center justify-center sm:mx-0">
        <div className="text-muted-foreground text-center">
          <p className="text-lg font-medium">Select a component</p>
          <p className="text-sm mt-2">Choose a component from the sidebar to preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
      <div className="ring-foreground/15 relative -z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl ring-1">
        <div className="bg-muted dark:bg-muted/30 absolute inset-0 rounded-2xl" />
        <iframe
          key={params.item}
          ref={iframeRef}
          src={iframeSrcWithParams}
          className="z-10 size-full flex-1"
          title="Preview"
        />
        <div className="absolute right-2 bottom-2 isolate z-10 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          Preview
        </div>
      </div>
    </div>
  )
}

