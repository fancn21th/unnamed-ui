"use client";

import * as React from "react";
import { SidebarComposed } from "@/registry/wuhan/composed/sidebar/sidebar";
import { Search } from "lucide-react";

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
    <div className="w-[240px] h-[500px]">
      <SidebarComposed
        search={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: "搜索",
          icon: <Search className="size-4" />,
        }}
        conversations={filteredConversations.map((conv) => ({
          id: conv.id,
          title: conv.title,
          onClick: () => setSelected(conv.id),
        }))}
        selectedId={selected}
        emptyText="未找到匹配的对话"
      />
    </div>
  );
}
