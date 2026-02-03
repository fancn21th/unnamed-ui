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
  SidebarHistoryEmpty,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { Sparkles, Plus } from "lucide-react";

export default function SidebarEmptyState() {
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
          <SidebarNewButtonPrimitive onClick={() => console.log("新建")}>
            <Plus className="size-4" />
            新对话
          </SidebarNewButtonPrimitive>

          <SidebarHistoryPrimitive>
            <SidebarHistoryTitle>历史对话</SidebarHistoryTitle>
            <SidebarHistoryListPrimitive>
              <SidebarHistoryEmpty>暂无对话历史</SidebarHistoryEmpty>
            </SidebarHistoryListPrimitive>
          </SidebarHistoryPrimitive>
        </SidebarContentPrimitive>
      </SidebarPrimitive>
    </div>
  );
}
