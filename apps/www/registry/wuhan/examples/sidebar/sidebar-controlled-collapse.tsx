"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { Button } from "@/registry/wuhan/ui/button";

export default function SidebarControlledCollapse() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState("1");

  const conversations = [
    { id: "1", title: "React 学习笔记" },
    { id: "2", title: "项目架构设计" },
    { id: "3", title: "代码审查要点" },
  ];

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-2">
        <Button onClick={() => setCollapsed(!collapsed)} size="sm">
          {collapsed ? "展开" : "收起"}
        </Button>
      </div>
      <div
        className={`h-[500px] border border-[var(--border-neutral)] rounded-lg overflow-hidden transition-all ${
          collapsed ? "w-[56px]" : "w-[240px]"
        }`}
      >
        <SidebarComposed
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          conversations={conversations.map((conv) => ({
            id: conv.id,
            title: conv.title,
            onClick: () => setSelected(conv.id),
          }))}
          selectedId={selected}
        />
      </div>
    </div>
  );
}
