"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/registry/wuhan/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/wuhan/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/wuhan/ui/tooltip"
import { cn } from "@/lib/utils"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  // 使用本地状态，每个代码块独立管理
  const [packageManager, setPackageManager] = React.useState<"npm" | "yarn" | "pnpm" | "bun">("pnpm")
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    navigator.clipboard.writeText(command)
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div 
      className="relative overflow-x-auto rounded-lg"
      style={{
        backgroundColor: "var(--color-code)",
        color: "var(--color-code-foreground)",
        borderRadius: "var(--radius-lg)",
        borderWidth: "0px",
      }}
    >
      <Tabs
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as "npm" | "yarn" | "pnpm" | "bun")
        }}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1" style={{ borderColor: "var(--border)" }}>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key, value]) => {
              if (!value) return null
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-accent h-7 rounded-sm px-2 text-xs"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            if (!value) return null
            return (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre className="m-0 border-0">
                  <code
                    className="relative font-mono text-sm leading-none border-0"
                    data-language="bash"
                    style={{ borderWidth: "0px" }}
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100"
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy to Clipboard"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

