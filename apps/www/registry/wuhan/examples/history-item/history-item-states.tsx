"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";

export default function HistoryItemStates() {
  const [selected, setSelected] = React.useState("item-2");
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="w-[240px] space-y-1">
      <HistoryItem
        title="普通状态"
        trailing={<span className="text-xs text-muted-foreground">10:30</span>}
        onClick={() => setSelected("item-1")}
        onMouseEnter={() => setActive("item-1")}
        onMouseLeave={() => setActive(null)}
      />
      <HistoryItem
        title="选中状态"
        trailing={<span className="text-xs text-muted-foreground">09:15</span>}
        selected={selected === "item-2"}
        onClick={() => setSelected("item-2")}
        onMouseEnter={() => setActive("item-2")}
        onMouseLeave={() => setActive(null)}
      />
      <HistoryItem
        title="活动状态"
        trailing={<span className="text-xs text-muted-foreground">昨天</span>}
        active={active === "item-3"}
        onClick={() => setSelected("item-3")}
        onMouseEnter={() => setActive("item-3")}
        onMouseLeave={() => setActive(null)}
      />
      <HistoryItem
        title="选中且活动"
        trailing={<span className="text-xs text-muted-foreground">2天前</span>}
        selected={selected === "item-4"}
        active={active === "item-4"}
        onClick={() => setSelected("item-4")}
        onMouseEnter={() => setActive("item-4")}
        onMouseLeave={() => setActive(null)}
      />
    </div>
  );
}
