"use client";

import * as React from "react";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { MessageSquare, Code, FileText, Image } from "lucide-react";

export default function HistoryItemWithIcons() {
  const [selected, setSelected] = React.useState("1");

  const items = [
    {
      id: "1",
      title: "聊天对话记录",
      icon: <MessageSquare className="w-4 h-4" />,
      badge: (
        <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
          3
        </span>
      ),
    },
    {
      id: "2",
      title: "代码片段收藏",
      icon: <Code className="w-4 h-4" />,
      badge: (
        <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">
          新
        </span>
      ),
    },
    {
      id: "3",
      title: "文档草稿",
      icon: <FileText className="w-4 h-4" />,
      badge: null,
    },
    {
      id: "4",
      title: "设计稿",
      icon: <Image className="w-4 h-4" />,
      badge: (
        <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">
          5
        </span>
      ),
    },
  ];

  return (
    <div className="w-[240px] space-y-1">
      {items.map((item) => (
        <HistoryItem
          key={item.id}
          title={
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="truncate">{item.title}</span>
            </div>
          }
          trailing={item.badge}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        />
      ))}
    </div>
  );
}
