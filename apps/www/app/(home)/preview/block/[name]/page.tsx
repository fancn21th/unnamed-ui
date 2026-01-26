import * as React from "react"
import { notFound } from "next/navigation"
import { Index } from "@/registry/__index__"
import { getBlockExamples, getStyleItem } from "@/app/(home)/lib/api"

const getCachedBlockExamples = React.cache(
  async (blockName: string) => {
    return await getBlockExamples(blockName, "wuhan")
  }
)

const getCachedBlockItem = React.cache(
  async (blockName: string) => {
    return await getStyleItem(blockName, "wuhan")
  }
)

export async function generateStaticParams() {
  const index = Index.wuhan

  if (!index) {
    return []
  }

  const params: Array<{ name: string }> = []

  // 获取所有 block
  for (const itemName in index) {
    const item = index[itemName]
    if (item.type === "registry:block") {
      params.push({
        name: itemName,
      })
    }
  }

  return params
}

export default async function BlockExamplesPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const paramBag = await params

  const [blockItem, examples] = await Promise.all([
    getCachedBlockItem(paramBag.name),
    getCachedBlockExamples(paramBag.name),
  ])

  if (!blockItem) {
    return notFound()
  }

  return (
    <div className="relative min-h-screen p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold capitalize">
          {blockItem.title || paramBag.name.replace(/-01$/, "").replace(/-/g, " ")}
        </h1>
        {blockItem.description && (
          <p className="text-muted-foreground">{blockItem.description}</p>
        )}
      </div>

      {examples.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No examples found for this block.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {examples.map((example) => {
            const Component = Index.wuhan?.[example.name]?.component

            if (!Component) {
              return null
            }

            return (
              <div key={example.name} className="space-y-2">
                <h2 className="text-lg font-semibold capitalize">
                  {example.title.replace(/-/g, " ")}
                </h2>
                <div className="border rounded-lg p-4">
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

