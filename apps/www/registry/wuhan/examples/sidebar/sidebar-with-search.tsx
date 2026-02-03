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
  SidebarHistorySearchPrimitive,
  SidebarHistorySearchContainer,
  SidebarHistorySearchIcon,
  SidebarHistorySearchInput,
  SidebarHistoryListPrimitive,
  SidebarHistoryEmpty,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import { HistoryItem } from "@/registry/wuhan/composed/history-item/history-item";
import { Sparkles, Plus, Search } from "lucide-react";

export default function SidebarWithSearch() {
  const [selected, setSelected] = React.useState("1");
  const [searchQuery, setSearchQuery] = React.useState("");

  const allConversations = [
    { id: "1", title: "如何学习 React" },
    { id: "2", title: "TypeScript 最佳实践" },
    { id: "3", title: "CSS Grid 布局" },
    { id: "4", title: "Next.js 路由配置" },
    { id: "5", title: "前端性能优化" },
  ];

  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return allConversations;
    return allConversations.filter((conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

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
            <SidebarHistorySearchPrimitive>
              <SidebarHistorySearchContainer>
                <SidebarHistorySearchIcon>
                  <Search className="size-4" />
                </SidebarHistorySearchIcon>
                <SidebarHistorySearchInput
                  placeholder="搜索"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SidebarHistorySearchContainer>
            </SidebarHistorySearchPrimitive>
            <SidebarHistoryListPrimitive>
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <HistoryItem
                    key={conv.id}
                    title={conv.title}
                    selected={selected === conv.id}
                    onClick={() => setSelected(conv.id)}
                  />
                ))
              ) : (
                <SidebarHistoryEmpty>未找到匹配的对话</SidebarHistoryEmpty>
              )}
            </SidebarHistoryListPrimitive>
          </SidebarHistoryPrimitive>
        </SidebarContentPrimitive>
      </SidebarPrimitive>
    </div>
  );
}
