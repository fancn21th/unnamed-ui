"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/registry/wuhan/ui/tabs";
import { cn } from "@/lib/utils";
import { VariantKey, getScopedBrandVars, SidebarCommon } from "./shared";
import { useChatHistory } from "./hooks/use-chat-history";
import { WenxueChat } from "./variants/wenxue-chat";
import { ZijinChat } from "./variants/zijin-chat";
import { XiaoboChat } from "./variants/xiaobo-chat";

// =========================
// Page
// =========================

export default function CompositionsPage() {
  const [variant, setVariant] = React.useState<VariantKey>("wenxue");
  const brandStyle = React.useMemo(() => getScopedBrandVars(variant), [variant]);

  // 为每个 variant 创建独立的对话历史
  const wenxueHistory = useChatHistory({ variant: "wenxue" });
  const zijinHistory = useChatHistory({ variant: "zijin" });
  const medicalHistory = useChatHistory({ variant: "medical" });

  // 根据当前 variant 选择对应的历史记录
  const currentHistory = React.useMemo(() => {
    if (variant === "wenxue") return wenxueHistory;
    if (variant === "zijin") return zijinHistory;
    return medicalHistory;
  }, [variant, wenxueHistory, zijinHistory, medicalHistory]);

  const getTitle = (v: VariantKey) => {
    if (v === "wenxue") return "问学";
    if (v === "zijin") return "紫金矿业";
    return "和小铂";
  };

  return (
    <div
      data-compositions-page
      className="relative flex flex-col flex-1 min-h-0 overflow-hidden"
      style={brandStyle}
    >
      <div className="absolute right-0 top-0 z-10">
        <Tabs value={variant} onValueChange={(v) => setVariant(v as VariantKey)}>
          <TabsList>
            <TabsTrigger value="wenxue">问学</TabsTrigger>
            <TabsTrigger value="zijin">紫金矿业</TabsTrigger>
            <TabsTrigger value="medical">医药</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 外层结构（先按 plan：左侧侧边栏 + 右侧聊天内容；具体 demo 内容稍后再填） */}
      <div className="flex flex-1 min-h-0 gap-4">
        <aside
          className={cn(
            "shrink-0 w-[240px] p-[var(--padding-com-lg)] opacity-100",
            variant === "zijin" || variant === "medical"
              ? "bg-[var(--bg-page)]"
              : "bg-[var(--bg-page-neutral)]"
          )}
        >
          <SidebarCommon
            title={getTitle(variant)}
            conversations={currentHistory.conversations.map((conv) => ({
              id: conv.id,
              title: conv.title,
              updatedAt: conv.updatedAt,
            }))}
            currentConversationId={currentHistory.currentConversationId}
            searchQuery={currentHistory.searchQuery}
            onSearchChange={currentHistory.setSearchQuery}
            onCreateConversation={currentHistory.createConversation}
            onSwitchConversation={currentHistory.switchConversation}
            onDeleteConversation={currentHistory.deleteConversation}
          />
        </aside>
        <main
          className={cn(
            "flex-1 min-w-0 min-h-0 flex flex-col pt-[60px]",
            variant === "zijin" || variant === "medical"
              ? "bg-[var(--bg-page-brand)]"
              : ""
          )}
        >
          {variant === "wenxue" && <WenxueChat />}
          {variant === "zijin" && <ZijinChat />}
          {variant === "medical" && <XiaoboChat />}
        </main>
      </div>
    </div>
  );
}


