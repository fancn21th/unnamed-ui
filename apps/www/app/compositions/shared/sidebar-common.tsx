"use client";

import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { Input } from "@/registry/wuhan/ui/input";
import { MessageAvatarHeader } from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { HistoryItem } from "@/registry/wuhan/blocks/history-item/history-item-01";
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
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="min-h-0 flex flex-col gap-[var(--gap-md)]">
        {/* header */}
        <div className="flex items-center justify-between gap-[var(--gap-md)]">
          <div className="inline-flex items-center gap-[var(--gap-sm)]">
            <span
              className="inline-flex items-center justify-center size-8 rounded-md bg-[var(--bg-neutral-light)] text-[var(--text-primary)]"
              aria-hidden="true"
            >
              <Sparkles className="size-4" />
            </span>
            <span className="text-[var(--text-primary)] font-[var(--font-family-cn)] font-[var(--font-weight-600)] font-size-2 leading-[var(--line-height-2)] tracking-[0px]">
              {title}
            </span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="展开/收起侧边栏"
            className="hover:bg-[var(--bg-neutral-light)] text-[var(--text-secondary)]"
          >
            <Menu className="size-4" />
          </Button>
        </div>

        {/* newButton */}
        <div className="mt-[var(--gap-lg)]">
          <Button
            type="button"
            onClick={onCreateConversation}
            className="w-full h-8 gap-[var(--gap-md)] rounded-[var(--radius-circle)] px-[var(--padding-com-xl)] bg-[var(--bg-brand)] text-[var(--text-inverse)] hover:bg-[var(--bg-brand-hover)] active:bg-[var(--bg-brand-active)] transition-colors font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-2 leading-[var(--line-height-2)] tracking-[0px]"
          >
            <Plus className="size-4" />
            新对话
          </Button>
        </div>

        {/* divider */}
        <div className="my-[var(--gap-lg)] border-t border-t-[var(--divider-neutral-basic)]" />

        {/* history */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="mb-[var(--gap-sm)] text-[var(--text-secondary)] font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-1 leading-[var(--line-height-1)] tracking-[0px]">
            历史对话
          </div>

          {/* search */}
          <div className="mb-[var(--gap-md)]">
            <div className="w-[214px] h-8 gap-[var(--gap-md)] opacity-100 rounded-[var(--radius-circle)] px-[var(--padding-com-lg)] border border-[var(--border-neutral)] bg-[var(--bg-container)] flex items-center">
              <Search className="size-4 text-[var(--text-secondary)] shrink-0" />
              <Input
                placeholder="搜索"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-full border-0 bg-[var(--bg-container)] px-0 py-0 shadow-none focus-visible:ring-0 focus-visible:border-0 rounded-none font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-2 leading-[var(--line-height-2)] tracking-[0px] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 gap-[var(--gap-md)] overflow-y-auto pr-1">
            {conversations.length === 0 ? (
              <div className="text-center text-[var(--text-secondary)] font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-1 leading-[var(--line-height-1)] py-4">
                暂无对话历史
              </div>
            ) : (
              conversations.map((conv) => (
                <HistoryItem
                  key={conv.id}
                  className="w-full"
                  title={conv.title}
                  selected={conv.id === currentConversationId}
                  onClick={() => onSwitchConversation(conv.id)}
                  hoverTrailing={
                    onDeleteConversation ? (
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
                    ) : undefined
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-[var(--gap-lg)] shrink-0">
        <MessageAvatarHeader name="User" />
      </div>
    </div>
  );
}


