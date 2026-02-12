"use client";

import * as React from "react";
import {
  ReportCard,
  ReportCardList,
  type ReportCardItem,
} from "@/registry/wuhan/composed/report-card/report-card";
import { FileText, BarChart3, Users } from "lucide-react";

export default function ReportCardSelectionDemo() {
  // 单个卡片的选中状态
  const [singleSelected, setSingleSelected] = React.useState(false);

  // 列表卡片的选中状态
  const [listCards, setListCards] = React.useState<ReportCardItem[]>([
    {
      id: "1",
      title: "候选人评估报告",
      description: "更新时间：08-04 13:56",
      icon: <FileText className="text-[var(--text-brand)]" size={16} />,
      selected: false,
    },
    {
      id: "2",
      title: "数据分析报告",
      description: "包含本月所有数据统计信息",
      icon: <BarChart3 className="text-[var(--text-success)]" size={16} />,
      selected: false,
    },
    {
      id: "3",
      title: "团队绩效报告",
      description: "2024年Q4绩效数据汇总",
      icon: <Users className="text-[var(--text-warning)]" size={16} />,
      selected: false,
    },
  ]);

  // 处理单个卡片选择
  const handleSingleSelectChange = (selected: boolean) => {
    setSingleSelected(selected);
    console.log("单个卡片选中状态:", selected);
  };

  // 处理列表卡片选择
  const handleListSelectChange = (selected: boolean, id: string) => {
    setListCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, selected } : card)),
    );
    console.log(`卡片 ${id} 选中状态:`, selected);
  };

  // 计算已选中的卡片数量
  const selectedCount = listCards.filter((card) => card.selected).length;

  return (
    <div className="w-full space-y-8">
      {/* 单个卡片选择 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            单个卡片选择
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            选中状态: {singleSelected ? "已选中" : "未选中"}
          </p>
        </div>
        <ReportCard
          title="候选人评估报告"
          description="更新时间：08-04 13:56"
          icon={<FileText className="text-[var(--text-brand)]" size={16} />}
          showCheckbox={true}
          selected={singleSelected}
          onSelectChange={handleSingleSelectChange}
        />
      </div>

      {/* 列表卡片选择 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            列表卡片选择
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            已选中 {selectedCount} / {listCards.length} 个卡片
          </p>
        </div>
        <ReportCardList
          title="我的报告"
          cards={listCards}
          showCheckbox={true}
          onSelectChange={handleListSelectChange}
          onEdit={(id) => console.log("编辑", id)}
          onDelete={(id) => console.log("删除", id)}
        />
      </div>
    </div>
  );
}
