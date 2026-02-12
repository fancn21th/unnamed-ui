"use client";

import {
  ReportCardList,
  type ReportCardItem,
} from "@/registry/wuhan/composed/report-card/report-card";
import { MoreVertical } from "lucide-react";

export default function ReportCardListCustomDemo() {
  const cards: ReportCardItem[] = [
    {
      id: "1",
      title: "候选人评估报告",
      description: "更新时间：08-04 13:56",
    },
    {
      id: "2",
      title: "数据分析报告",
      description: "包含本月所有数据统计信息",
    },
    {
      id: "3",
      title: "绩效评估报告",
      description: "2024年Q4绩效数据汇总",
    },
  ];

  return (
    <div className="w-full max-w-[650px]">
      <ReportCardList
        title="可管理的报告"
        cards={cards}
        cardAction={(card) => (
          <button
            className="flex items-center justify-center w-6 h-6 rounded-md cursor-pointer bg-[var(--bg-neutral-light-hover)]"
            onClick={() => console.log("自定义操作", card.id)}
          >
            <MoreVertical className="size-4 text-[var(--text-secondary)]" />
          </button>
        )}
        showCardAction={false}
      />
    </div>
  );
}
