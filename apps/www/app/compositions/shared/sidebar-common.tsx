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

export type SidebarCommonProps = {
  title: string;
  conversations: Array<{
    id: string;
    title: string;
    updatedAt: number;
  }>;
  currentConversationId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateConversation: () => void;
  onSwitchConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
};

export function SidebarCommon({
  title,
  conversations,
  currentConversationId,
  searchQuery,
  onSearchChange,
  onCreateConversation,
  onSwitchConversation,
  onDeleteConversation,
}: SidebarCommonProps) {
  const empty = conversations.length === 0;

  return (
    <SidebarPrimitive >
      <SidebarContentPrimitive>
        {/* Header */}
        <SidebarHeaderPrimitive>
          <SidebarHeaderLeading>
            <SidebarHeaderIcon aria-hidden="true">
              <Sparkles className="size-4" />
            </SidebarHeaderIcon>
            <SidebarHeaderTitle>{title}</SidebarHeaderTitle>
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
          <SidebarNewButtonPrimitive onClick={onCreateConversation}>
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
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </SidebarHistorySearchContainer>
          </SidebarHistorySearchPrimitive>

          {/* List */}
          <SidebarHistoryListPrimitive>
            {empty ? (
              <SidebarHistoryEmpty>暂无对话历史</SidebarHistoryEmpty>
            ) : (
              conversations.map((conv) => {
                const isSelected = conv.id === currentConversationId;
                return (
                  <HistoryItemPrimitive
                    key={conv.id}
                    className="w-full"
                    data-selected={isSelected ? "true" : undefined}
                    onClick={() => onSwitchConversation(conv.id)}
                  >
                    <HistoryItemTitlePrimitive>{conv.title}</HistoryItemTitlePrimitive>
                    {!isSelected && onDeleteConversation && (
                      <HistoryItemHoverTrailingPrimitive>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDeleteConversation(conv.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              e.preventDefault();
                              onDeleteConversation(conv.id);
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
  );
}
