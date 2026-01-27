"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible"
import { useHomeSearchParams } from "../lib/search-params"

export function ItemExplorer({
  items,
}: {
  items: Array<{ name: string; title: string; type: string }>
}) {
  const [params, setParams] = useHomeSearchParams()
  const searchParams = useSearchParams()

  // 只显示"chat"选项
  const displayItems = React.useMemo(() => {
    return [
      { name: "all-blocks", title: "chat", type: "registry:block" },
    ]
  }, [])

  // 确保默认选中 "all-blocks"（仅在 URL 中没有参数时设置）
  React.useEffect(() => {
    const urlItem = searchParams.get("item")
    if (!urlItem) {
      setParams({ item: "all-blocks" })
    }
  }, [searchParams, setParams])

  const currentItem = React.useMemo(() => {
    // 默认选中 "all-blocks"
    return { name: "all-blocks", title: "chat", type: "registry:block" }
  }, [])

  return (
    <aside className="sticky z-30 hidden h-[calc(100svh-var(--header-height)-2rem)] w-64 overflow-y-auto overscroll-none bg-transparent xl:flex">
      <div className="-mx-1 overflow-x-hidden p-2 w-full">
        <Collapsible defaultOpen className="group/collapsible mb-4">
          <CollapsibleTrigger className="flex w-full items-center gap-1 py-1.5 text-sm font-medium [&[data-state=open]>svg]:rotate-90">
            <ChevronRightIcon className="text-muted-foreground size-3.5 transition-transform" />
            <span>Blocks</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 mt-1 space-y-1 border-l border-border/50 pl-2">
              {displayItems.map((item, index) => (
                <div key={item.name} className="relative">
                  {index === displayItems.length - 1 && (
                    <div className="bg-background absolute top-1/2 -bottom-1 -left-2.5 w-1" />
                  )}
                  <button
                    onClick={() => setParams({ item: item.name })}
                    className={cn(
                      "relative h-[26px] w-full cursor-pointer overflow-visible rounded-md border border-transparent px-2 text-left text-sm font-normal transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      item.name === currentItem?.name &&
                        "bg-accent text-accent-foreground border-accent",
                      // "chat"选项特殊样式
                      item.name === "all-blocks" && "font-semibold"
                    )}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  )
}

