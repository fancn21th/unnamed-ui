import type { RegistryItem } from "shadcn/schema"

export function groupItemsByType(
  items: Pick<RegistryItem, "name" | "title" | "type">[]
) {
  const groups = new Map<string, typeof items>()

  for (const item of items) {
    const type = item.type === "registry:block" ? "Blocks" : "Examples"
    if (!groups.has(type)) {
      groups.set(type, [])
    }
    groups.get(type)!.push(item)
  }

  return Array.from(groups.entries()).map(([type, items]) => ({
    type,
    title: type,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
  }))
}

