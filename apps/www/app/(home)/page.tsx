import { type Metadata } from "next"
import Link from "next/link"
import { Button } from "@/registry/wuhan/ui/button"
import { Separator } from "@/registry/wuhan/ui/separator"
import { Customizer } from "./components/customizer"
import { DesignSystemClassApplier } from "./components/design-system-class-applier"
import { ItemExplorer } from "./components/item-explorer"
import { ItemPicker } from "./components/item-picker"
import { Preview } from "./components/preview"
import { getItemsForStyle } from "./lib/api"

export const revalidate = false
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Component Preview",
  description: "Preview and explore components",
}

export default async function HomePage() {
  const items = await getItemsForStyle("wuhan")

  // 只显示 blocks，过滤掉 examples
  const filteredItems = items
    .filter((item) => item !== null && item.type === "registry:block")
    .map((item) => ({
      name: item.name,
      title: item.title || item.name,
      type: item.type,
    }))

  const navLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/themes", label: "Themes" },
    { href: "/libs", label: "Libs" },
    { href: "/compositions", label: "Compositions" },
  ]

  return (
    <div
      data-slot="layout"
      className="relative z-10 flex min-h-svh flex-col"
    >
      <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4 px-8 !w-full !max-w-full">
          <div className="mr-4 flex items-center gap-2">
            <Link href="/">
              <span className="font-bold text-lg">unnamed-ui</span>
            </Link>
          </div>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="h-9 px-3">
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ItemPicker items={filteredItems} />
            <Separator orientation="vertical" className="h-6" />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">
        <div className="flex w-full flex-1 flex-col gap-2 p-6 pt-1 pb-4 sm:gap-2 sm:pt-2 md:flex-row md:pb-6 2xl:gap-6">
          <DesignSystemClassApplier />
          <ItemExplorer items={filteredItems} />
          <Preview />
          <aside className="sticky top-[calc(var(--header-height)+1rem)] hidden h-[calc(100svh-var(--header-height)-2rem)] shrink-0 md:flex">
            <Customizer />
          </aside>
        </div>
      </main>
    </div>
  )
}
