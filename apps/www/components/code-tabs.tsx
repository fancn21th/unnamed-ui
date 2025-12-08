"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/wuhan/ui/tabs"
import { cn } from "@/lib/utils"

export function CodeTabs({
  children,
  className,
  defaultValue = "cli",
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </Tabs>
  )
}

// Re-export Tabs components for convenience
export { TabsList, TabsTrigger, TabsContent }

