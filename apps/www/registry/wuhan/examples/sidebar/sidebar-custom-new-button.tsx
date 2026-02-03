"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { Plus } from "lucide-react";

export default function SidebarCustomNewButton() {
  const [selected, setSelected] = React.useState("1");
  const [conversations, setConversations] = React.useState([
    { id: "1", title: "对话 1" },
    { id: "2", title: "对话 2" },
  ]);

  const handleCreate = () => {
    const newId = String(conversations.length + 1);
    setConversations([{ id: newId, title: `对话 ${newId}` }, ...conversations]);
    setSelected(newId);
  };

  return (
    <div className="w-[240px] h-[500px]">
      <SidebarComposed
        newButton={{
          label: "开始新对话",
          icon: <Plus className="size-4" />,
          onClick: handleCreate,
        }}
        historyTitle="最近对话"
        conversations={conversations.map((conv) => ({
          id: conv.id,
          title: conv.title,
          onClick: () => setSelected(conv.id),
        }))}
        selectedId={selected}
      />
    </div>
  );
}
