"use client";

import {
  ReportCardList,
  type ReportCardItem,
} from "@/registry/wuhan/composed/report-card/report-card";

export default function ReportCardListDemo() {
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
        title="我的报告"
        cards={cards}
        onEdit={(id) => console.log("编辑", id)}
        onDelete={(id) => console.log("删除", id)}
        onDuplicate={(id) => console.log("复制", id)}
      />
    </div>
  );
}
