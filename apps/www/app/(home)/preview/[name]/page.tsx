import * as React from "react"
import { notFound } from "next/navigation"
import { Index } from "@/registry/__index__"
import { getStyleComponent, getStyleItem } from "@/app/(home)/lib/api"
import { DesignSystemClassApplier } from "@/app/(home)/components/design-system-class-applier"

const getCachedRegistryItem = React.cache(
  async (name: string) => {
    return await getStyleItem(name, "wuhan")
  }
)

const getCachedRegistryComponent = React.cache(
  async (name: string) => {
    return await getStyleComponent(name, "wuhan")
  }
)

export async function generateStaticParams() {
  const index = Index.wuhan

  if (!index) {
    return []
  }

  const params: Array<{ name: string }> = []

  for (const itemName in index) {
    const item = index[itemName]
    // 方案A：/preview/[name] 只生成 example 静态路由
    if (item.type === "registry:example") {
      params.push({
        name: itemName,
      })
    }
  }

  return params
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const paramBag = await params
  const item = await getCachedRegistryItem(paramBag.name)
  if (!item) return notFound()

  // 方案A：block 不在这里渲染，统一走 /preview/block/[name]
  if (item.type === "registry:block") return notFound()

  const Component = await getCachedRegistryComponent(paramBag.name)
  if (!Component) return notFound()

  return (
    <div className="relative min-h-screen p-8">
      <React.Suspense fallback={null}>
        <DesignSystemClassApplier />
      </React.Suspense>
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground">
            Loading...
          </div>
        }
      >
        <Component />
      </React.Suspense>
    </div>
  )
}

