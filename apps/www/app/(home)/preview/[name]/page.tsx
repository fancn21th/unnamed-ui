import * as React from "react"
import { notFound } from "next/navigation"
import { Index } from "@/registry/__index__"
import { getStyleComponent, getStyleItem } from "@/app/(home)/lib/api"

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

  const [item, Component] = await Promise.all([
    getCachedRegistryItem(paramBag.name),
    getCachedRegistryComponent(paramBag.name),
  ])

  if (!item || !Component) {
    return notFound()
  }

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

