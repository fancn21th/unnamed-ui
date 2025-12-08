"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function Steps({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[&>h3]:step steps mb-12 [counter-reset:step] *:[h3]:first:!mt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Step({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
}
