"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { Star, StarOff } from "lucide-react";

export default function HistoryItemList() {
  const [items, setItems] = React.useState([
    { id: "1", title: "周报总结 - 第12周", time: "2小时前", starred: true },
    { id: "2", title: "产品需求评审会议纪要", time: "5小时前", starred: false },
    { id: "3", title: "技术方案设计文档 v1.0", time: "昨天", starred: true },
    { id: "4", title: "UI/UX 设计规范", time: "2天前", starred: false },
    { id: "5", title: "数据库设计方案", time: "3天前", starred: false },
  ]);
  const [selected, setSelected] = React.useState("1");

  const toggleStar = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item,
      ),
    );
  };

  return (
    <div className="w-[260px] border rounded-lg p-2">
      <div className="text-sm font-medium text-muted-foreground mb-2 px-3">
        最近访问
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <HistoryItem
            key={item.id}
            title={item.title}
            trailing={
              <span className="text-xs text-muted-foreground">{item.time}</span>
            }
            hoverTrailing={
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleStar(item.id);
                  }
                }}
                className="p-1 hover:bg-muted rounded cursor-pointer"
              >
                {item.starred ? (
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <StarOff className="w-3.5 h-3.5" />
                )}
              </div>
            }
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
