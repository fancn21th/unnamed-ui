"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";

export default function SidebarFooterCollapse() {
  const [selected, setSelected] = React.useState("1");

  const conversations = [
    { id: "1", title: "对话 1" },
    { id: "2", title: "对话 2" },
    { id: "3", title: "对话 3" },
  ];

  return (
    <div className="w-[240px] h-[500px] border border-[var(--border-neutral)] rounded-lg overflow-hidden">
      <SidebarComposed
        conversations={conversations.map((conv) => ({
          id: conv.id,
          title: conv.title,
          onClick: () => setSelected(conv.id),
        }))}
        selectedId={selected}
        footer={({ collapsed }) =>
          collapsed ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            </div>
          ) : (
            <AvatarHeader name="用户名" time="在线" />
          )
        }
      />
    </div>
  );
}
