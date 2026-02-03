"use client";

import { useMemo } from "react";
import SourcesSidebar from "@/registry/wuhan/composed/sources-sidebar/sources-sidebar";
import type { SourceItem } from "@/registry/wuhan/composed/custom-sources/utils";

export default function SourcesSidebarDemo() {
  const sources = useMemo<SourceItem[]>(
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

  return (
    <div className="w-[420px] rounded-lg border border-[var(--border-neutral)]">
      <SourcesSidebar sources={sources} />
    </div>
  );
}
