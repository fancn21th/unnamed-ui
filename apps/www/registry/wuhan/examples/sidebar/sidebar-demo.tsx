"use client";

import * as React from "react";
import {
  SidebarPrimitive,
  SidebarContentPrimitive,
  SidebarDividerPrimitive,
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarNewButtonPrimitive,
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistorySearchPrimitive,
  SidebarHistorySearchContainer,
  SidebarHistorySearchIcon,
  SidebarHistorySearchInput,
  SidebarHistoryListPrimitive,
  SidebarHistoryEmpty,
  SidebarFooterPrimitive,
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";
import { MessageAvatarHeader } from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { Button } from "@/registry/wuhan/ui/button";
import { Menu, Plus, Search, Sparkles, Trash2 } from "lucide-react";

export default function SidebarDemo() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [conversations] = React.useState([
    { id: "1", title: "如何学习 React", updatedAt: Date.now() },
    { id: "2", title: "TypeScript 最佳实践", updatedAt: Date.now() },
    { id: "3", title: "前端性能优化技巧", updatedAt: Date.now() },
  ]);
  const [currentConversationId, setCurrentConversationId] = React.useState<
    string | null
  >("1");

  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter((conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [conversations, searchQuery]);

  return (
    <div className="w-full max-w-[240px] h-[600px] border border-[var(--border-neutral)] rounded-lg overflow-hidden">
      <div className="h-full p-[var(--padding-com-lg)] bg-[var(--bg-page-secondary)]">
        <SidebarPrimitive>
          <SidebarContentPrimitive>
            {/* Header */}
            <SidebarHeaderPrimitive>
              <SidebarHeaderLeading>
                <SidebarHeaderIcon aria-hidden="true">
                  <Sparkles className="size-4" />
                </SidebarHeaderIcon>
                <SidebarHeaderTitle>问学</SidebarHeaderTitle>
              </SidebarHeaderLeading>
              <SidebarHeaderAction>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="展开/收起侧边栏"
                  className="hover:bg-[var(--bg-neutral-light)] text-[var(--text-secondary)]"
                >
                  <Menu className="size-4" />
                </Button>
              </SidebarHeaderAction>
            </SidebarHeaderPrimitive>

            {/* New Button */}
            <div className="mt-[var(--gap-lg)]">
              <SidebarNewButtonPrimitive
                onClick={() => {
                  console.log("创建新对话");
                }}
              >
                <Plus className="size-4" />
                新对话
              </SidebarNewButtonPrimitive>
            </div>

            {/* Divider */}
            <SidebarDividerPrimitive />

            {/* History */}
            <SidebarHistoryPrimitive>
              <SidebarHistoryTitle>历史对话</SidebarHistoryTitle>

              {/* Search */}
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

              {/* List */}
              <SidebarHistoryListPrimitive>
                {filteredConversations.length === 0 ? (
                  <SidebarHistoryEmpty>
                    {searchQuery ? "未找到匹配的对话" : "暂无对话历史"}
                  </SidebarHistoryEmpty>
                ) : (
                  filteredConversations.map((conv) => {
                    const isSelected = conv.id === currentConversationId;
                    return (
                      <HistoryItemPrimitive
                        key={conv.id}
                        className="w-full"
                        data-selected={isSelected ? "true" : undefined}
                        onClick={() => {
                          setCurrentConversationId(conv.id);
                          console.log("切换到对话:", conv.id);
                        }}
                      >
                        <HistoryItemTitlePrimitive>
                          {conv.title}
                        </HistoryItemTitlePrimitive>
                        {!isSelected && (
                          <HistoryItemHoverTrailingPrimitive>
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                console.log("删除对话:", conv.id);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  console.log("删除对话:", conv.id);
                                }
                              }}
                              className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-[var(--bg-neutral-light-hover)] text-[var(--text-secondary)] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-1"
                              aria-label="删除对话"
                            >
                              <Trash2 className="size-3" />
                            </span>
                          </HistoryItemHoverTrailingPrimitive>
                        )}
                      </HistoryItemPrimitive>
                    );
                  })
                )}
              </SidebarHistoryListPrimitive>
            </SidebarHistoryPrimitive>
          </SidebarContentPrimitive>

          {/* Footer */}
          <SidebarFooterPrimitive>
            <MessageAvatarHeader name="User" />
          </SidebarFooterPrimitive>
        </SidebarPrimitive>
      </div>
    </div>
  );
}
