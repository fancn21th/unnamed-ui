"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { MessageSquare, Settings } from "lucide-react";

export default function SidebarCustomHeader() {
  const [selected, setSelected] = React.useState("1");

  const conversations = [
    { id: "1", title: "项目讨论", onClick: () => setSelected("1") },
    { id: "2", title: "技术方案", onClick: () => setSelected("2") },
    { id: "3", title: "需求评审", onClick: () => setSelected("3") },
  ];

  return (
    <div className="w-[240px] h-[500px]">
      <SidebarComposed
        header={{
          title: "消息中心",
          icon: <MessageSquare className="size-4" />,
          action: (
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-[var(--bg-neutral-light-hover)] text-[var(--text-secondary)] transition-colors"
              aria-label="设置"
            >
              <Settings className="size-4" />
            </button>
          ),
        }}
        conversations={conversations}
        selectedId={selected}
      />
    </div>
  );
}
