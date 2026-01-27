import * as React from "react"
import { notFound } from "next/navigation"
import { Index } from "@/registry/__index__"
import { getStyleComponent, getStyleItem } from "@/app/(home)/lib/api"

function getDemoNameForBlock(blockName: string) {
  // Keep in sync with the demo naming rules used elsewhere.
  if (blockName === "prompt-01") return "prompt-horizontal"
  if (blockName === "prompt-02") return "prompt-vertical"

  if (blockName.endsWith("-01")) {
    return `${blockName.replace(/-01$/, "")}-demo`
  }

  return `${blockName}-demo`
}

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
    if (item.type === "registry:block" || item.type === "registry:example") {
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

  // Blocks often require props, so for block routes we render their demo example
  // (which provides props) when available.
  let renderName = paramBag.name
  if (item.type === "registry:block") {
    const demoName = getDemoNameForBlock(paramBag.name)
    const demo = Index.wuhan?.[demoName]
    if (demo?.type === "registry:example" && demo.component) {
      renderName = demoName
    } else {
      return notFound()
    }
  }

  const Component = await getCachedRegistryComponent(renderName)
  if (!Component) return notFound()

  return (
    <div className="relative min-h-screen p-8">
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

