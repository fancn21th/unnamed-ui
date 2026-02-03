"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { Trash2, Edit } from "lucide-react";

export default function HistoryItemWithActions() {
  const [items, setItems] = React.useState([
    { id: "1", title: "项目需求分析文档", time: "14:30" },
    { id: "2", title: "UI 设计稿 v2.0", time: "11:20" },
    { id: "3", title: "API 接口文档", time: "昨天" },
  ]);
  const [selected, setSelected] = React.useState("1");

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selected === id) {
      setSelected(items[0]?.id || "");
    }
  };

  const handleEdit = (id: string) => {
    console.log("编辑:", id);
  };

  return (
    <div className="w-[240px] space-y-1">
      {items.map((item) => (
        <HistoryItem
          key={item.id}
          title={item.title}
          trailing={
            <span className="text-xs text-muted-foreground">{item.time}</span>
          }
          hoverTrailing={
            <div className="flex gap-1">
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEdit(item.id);
                  }
                }}
                className="p-1 hover:bg-muted rounded cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item.id);
                  }
                }}
                className="p-1 hover:bg-destructive/10 rounded cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </div>
            </div>
          }
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        />
      ))}
    </div>
  );
}
