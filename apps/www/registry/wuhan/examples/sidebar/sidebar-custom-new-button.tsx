"use client";

import * as React from "react";
import {
  SidebarPrimitive,
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarContentPrimitive,
  SidebarNewButtonPrimitive,
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistoryListPrimitive,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { Sparkles, Plus } from "lucide-react";

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
    <div className="w-[240px] h-[500px] border border-[var(--border-neutral)] rounded-lg overflow-hidden">
      <SidebarPrimitive>
        <SidebarHeaderPrimitive>
          <SidebarHeaderLeading>
            <SidebarHeaderIcon>
              <Sparkles className="size-4" />
            </SidebarHeaderIcon>
            <SidebarHeaderTitle>对话</SidebarHeaderTitle>
          </SidebarHeaderLeading>
        </SidebarHeaderPrimitive>

        <SidebarContentPrimitive>
          <SidebarNewButtonPrimitive onClick={handleCreate}>
            <Plus className="size-4" />
            开始新对话
          </SidebarNewButtonPrimitive>

          <SidebarHistoryPrimitive>
            <SidebarHistoryTitle>最近对话</SidebarHistoryTitle>
            <SidebarHistoryListPrimitive>
              {conversations.map((conv) => (
                <HistoryItem
                  key={conv.id}
                  title={conv.title}
                  selected={selected === conv.id}
                  onClick={() => setSelected(conv.id)}
                />
              ))}
            </SidebarHistoryListPrimitive>
          </SidebarHistoryPrimitive>
        </SidebarContentPrimitive>
      </SidebarPrimitive>
    </div>
  );
}
