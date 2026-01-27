"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/wuhan/ui/popover"
import { Button } from "@/registry/wuhan/ui/button"
import { Input } from "@/registry/wuhan/ui/input"
import { cn } from "@/lib/utils"
import { useHomeSearchParams } from "../lib/search-params"

export function ItemPicker({
  items,
}: {
  items: Array<{ name: string; title: string; type: string }>
}) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [params, setParams] = useHomeSearchParams()

  const currentItem = React.useMemo(() => {
    if (!params.item) return null
    // 特殊处理 "all-blocks" 选项
    if (params.item === "all-blocks") {
      return { name: "all-blocks", title: "chat", type: "registry:block" }
    }
    return items.find((item) => item.name === params.item) ?? null
  }, [items, params.item])

  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentItem ? currentItem.title : "Select component..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-2">
          <Input
            placeholder="Search component..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <div className="max-h-[300px] overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                No component found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setParams({ item: item.name })
                      setOpen(false)
                      setSearchQuery("")
                    }}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      item.name === currentItem?.name &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

