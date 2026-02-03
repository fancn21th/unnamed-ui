"use client";

import * as React from "react";
import {
  SidebarPrimitive,
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarContentPrimitive,
  SidebarNewButtonPrimitive,
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistoryListPrimitive,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { MessageSquare, Settings, Plus } from "lucide-react";

export default function SidebarCustomHeader() {
  const [selected, setSelected] = React.useState("1");

  const conversations = [
    { id: "1", title: "项目讨论" },
    { id: "2", title: "技术方案" },
    { id: "3", title: "需求评审" },
  ];

  return (
    <div className="w-[240px] h-[500px] border border-[var(--border-neutral)] rounded-lg overflow-hidden">
      <SidebarPrimitive>
        <SidebarHeaderPrimitive>
          <SidebarHeaderLeading>
            <SidebarHeaderIcon>
              <MessageSquare className="size-4" />
            </SidebarHeaderIcon>
            <SidebarHeaderTitle>消息中心</SidebarHeaderTitle>
          </SidebarHeaderLeading>
          <SidebarHeaderAction>
            <button
              type="button"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-[var(--bg-neutral-light-hover)] text-[var(--text-secondary)] transition-colors"
              aria-label="设置"
            >
              <Settings className="size-4" />
            </button>
          </SidebarHeaderAction>
        </SidebarHeaderPrimitive>

        <SidebarContentPrimitive>
          <SidebarNewButtonPrimitive onClick={() => console.log("新建")}>
            <Plus className="size-4" />
            新建对话
          </SidebarNewButtonPrimitive>

          <SidebarHistoryPrimitive>
            <SidebarHistoryTitle>历史对话</SidebarHistoryTitle>
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
