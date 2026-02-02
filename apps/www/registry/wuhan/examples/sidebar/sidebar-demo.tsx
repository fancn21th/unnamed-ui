"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { AvatarHeader } from "@/registry/wuhan/composed/avatar-header/avatar-header";
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
        <SidebarComposed
          header={{
            title: "问学",
            icon: <Sparkles className="size-4" />,
            action: (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="展开/收起侧边栏"
                className="hover:bg-[var(--bg-neutral-light)] text-[var(--text-secondary)]"
              >
                <Menu className="size-4" />
              </Button>
            ),
          }}
          newButton={{
            label: "新对话",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("创建新对话");
            },
          }}
          search={{
            value: searchQuery,
            onChange: setSearchQuery,
            placeholder: "搜索",
            icon: <Search className="size-4" />,
          }}
          historyTitle="历史对话"
          conversations={filteredConversations.map((conv) => {
            const isSelected = conv.id === currentConversationId;
            return {
              id: conv.id,
              title: conv.title,
              onClick: () => {
                setCurrentConversationId(conv.id);
                console.log("切换到对话:", conv.id);
              },
              hoverTrailing: !isSelected ? (
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
              ) : undefined,
            };
          })}
          selectedId={currentConversationId}
          emptyText={searchQuery ? "未找到匹配的对话" : "暂无对话历史"}
          footer={<AvatarHeader name="User" />}
        />
      </div>
    </div>
  );
}
