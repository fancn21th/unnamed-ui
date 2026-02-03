"use client";

import { useMemo, useState } from "react";
import CustomSources from "@/registry/wuhan/composed/custom-sources/custom-sources";
import SourcesSidebar from "@/registry/wuhan/composed/sources-sidebar/sources-sidebar";
import type { SourceItem } from "@/registry/wuhan/composed/custom-sources/utils";

const useMockSources = () =>
  useMemo<SourceItem[]>(
    () => [
      {
        key: 1,
        title: "内部知识库 - AI技术趋势",
        content: "内部资料汇总了 2026 年 AI 技术的发展重点与落地方向。",
        sourceType: "internal",
        domain: "internal.knowledge.base",
      },
      {
        key: 2,
        title: "产品设计规范 v3.2",
        content: "包含交互、视觉与组件规范，供团队统一设计语言。",
        sourceType: "internal",
        url: "/docs/design-system",
      },
      {
        key: 3,
        title: "2026 AI 产业趋势报告",
        content: "外部报告总结了行业规模、技术演进与应用场景。",
        url: "https://example.com/ai-trends",
        favicon: "https://www.google.com/s2/favicons?domain=example.com&sz=16",
        sourceType: "external",
        domain: "example.com",
        sourceName: "电子创新网",
      },
    ],
    [],
  );

export default function CustomSourcesDemo() {
  const sources = useMockSources();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-6">
      <div className="min-w-[280px] flex-1 rounded-lg border border-[var(--border-neutral)] p-4">
        <p className="text-sm text-[var(--text-secondary)]">
          这是一个带有来源标记的文本示例
          <CustomSources sources={sources} onOpenSidebar={handleOpenSidebar}>
            1
          </CustomSources>
          ，点击角标可打开引用来源侧边栏。
        </p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          外部引用示例
          <CustomSources sources={sources} onOpenSidebar={handleOpenSidebar}>
            3
          </CustomSources>
          ，支持弹出卡片预览与来源区分。
        </p>
      </div>

      {sidebarOpen && (
        <div className="shrink-0 rounded-lg border border-[var(--border-neutral)]">
          <SourcesSidebar
            sources={sources}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
