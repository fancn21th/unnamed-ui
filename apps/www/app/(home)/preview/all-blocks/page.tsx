import * as React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Index } from "@/registry/__index__"
import { getAllBlockDemos } from "@/app/(home)/lib/api"
import { getBlockDocPath } from "@/lib/source"
import { DesignSystemClassApplier } from "@/app/(home)/components/design-system-class-applier"

const getCachedBlockDemos = React.cache(async () => {
  return await getAllBlockDemos("wuhan")
})

function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="bg-background w-full">
      <div
        data-slot="example-wrapper"
        className={cn(
          "mx-auto grid min-h-screen w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 md:grid-cols-2 md:gap-8 lg:p-12 2xl:max-w-6xl",
          className
        )}
        {...props}
      />
    </div>
  )
}

function Example({
  title,
  docHref,
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  docHref?: string | null
  containerClassName?: string
}) {
  return (
    <div
      data-slot="example"
      className={cn(
        "mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none",
        containerClassName
      )}
      {...props}
    >
      {title && (
        <div className="text-muted-foreground px-1.5 py-2 text-xs font-medium">
          {docHref ? (
            <Link
              href={docHref}
              className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
            >
              {title}
              <ExternalLink className="size-3" />
            </Link>
          ) : (
            title
          )}
        </div>
      )}
      <div
        data-slot="example-content"
        className={cn(
          "bg-background text-foreground flex min-w-0 flex-1 flex-col items-start gap-6 border border-dashed p-4 sm:p-6 *:[div:not([class*='w-'])]:w-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default async function AllBlocksPage() {
  const demos = await getCachedBlockDemos()

  return (
    <ExampleWrapper>
      <React.Suspense fallback={null}>
        <DesignSystemClassApplier />
      </React.Suspense>
      {demos.map(({ blockName, demoName }) => {
        const Component = Index.wuhan?.[demoName]?.component

        if (!Component) {
          return null
        }

        const title = blockName.replace(/-01$/, "").replace(/-/g, " ")
        const docHref = getBlockDocPath(blockName, false)

        return (
          <Example key={blockName} title={title} docHref={docHref}>
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground">
                  Loading...
                </div>
              }
            >
              <Component />
            </React.Suspense>
          </Example>
        )
      })}
    </ExampleWrapper>
  )
}

