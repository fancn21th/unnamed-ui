"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";

export default function HistoryItemBasic() {
  const [selected, setSelected] = React.useState("item-1");

  return (
    <div className="w-[240px] space-y-1">
      <HistoryItem
        title="如何学习 React？"
        trailing={<span className="text-xs text-muted-foreground">10:30</span>}
        selected={selected === "item-1"}
        onClick={() => setSelected("item-1")}
      />
      <HistoryItem
        title="TypeScript 最佳实践"
        trailing={<span className="text-xs text-muted-foreground">09:15</span>}
        selected={selected === "item-2"}
        onClick={() => setSelected("item-2")}
      />
      <HistoryItem
        title="CSS Grid 布局指南"
        trailing={<span className="text-xs text-muted-foreground">昨天</span>}
        selected={selected === "item-3"}
        onClick={() => setSelected("item-3")}
      />
    </div>
  );
}
