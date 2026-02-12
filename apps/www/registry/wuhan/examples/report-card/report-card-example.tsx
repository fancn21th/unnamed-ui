"use client";

import * as React from "react";
import {
  ReportCard,
  ReportCardList,
} from "@/registry/wuhan/composed/report-card/report-card";
import { FileText, MoreVertical, Star, CheckCircle } from "lucide-react";

export default function ReportCardExample() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const cards = [
    {
      id: "1",
      title: "候选人评估报告",
      description: "更新时间：08-04 13:56",
      icon: <FileText className="text-[var(--text-brand)]" size={16} />,
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

  const handleSelectChange = (selected: boolean, id: string) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 选中状态示例 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">选中状态</h3>

        {/* 单个卡片选中示例 */}
        <ReportCard
          id="card-1"
          title="候选人评估报告"
          description="点击checkbox切换选中状态"
          selected={selectedIds.includes("card-1")}
          onSelectChange={(selected, id) => handleSelectChange(selected, id!)}
        />

        {/* 禁用状态示例 */}
        <ReportCard
          id="card-disabled"
          title="禁用的卡片"
          description="无法进行选中操作"
          disabled={true}
        />
      </div>

      {/* 单个卡片示例 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">单个卡片</h3>

        {/* 默认示例 */}
        <ReportCard
          title="候选人评估报告"
          description="更新时间：08-04 13:56"
          onEdit={() => console.log("编辑")}
          onDelete={() => console.log("删除")}
          onDuplicate={() => console.log("复制")}
        />

        {/* 自定义图标示例 */}
        <ReportCard
          icon={<FileText className="text-[var(--text-brand)]" size={16} />}
          title="数据分析报告"
          description="包含本月所有数据统计信息"
        />

        {/* 自定义右侧操作区域示例 - 开关 */}
        <ReportCard
          title="已收藏报告"
          description="收藏后可在侧边栏快速访问"
          action={
            <button
              className="flex items-center justify-center w-6 h-6 rounded-md cursor-pointer bg-[var(--bg-neutral-light-hover)]"
              onClick={() => console.log("切换收藏")}
            >
              <Star
                className="size-4 text-[var(--text-warning)]"
                fill="currentColor"
              />
            </button>
          }
        />

        {/* 自定义右侧操作区域示例 - 状态切换 */}
        <ReportCard
          title="已启用监控"
          description="该报告已开启实时监控"
          action={
            <button
              className="flex items-center justify-center w-8 h-6 rounded-full cursor-pointer bg-[var(--bg-success)]"
              onClick={() => console.log("关闭监控")}
            >
              <CheckCircle className="size-4 text-white" />
            </button>
          }
        />

        {/* 隐藏默认操作按钮示例 */}
        <ReportCard
          title="只读报告"
          description="不可编辑和删除"
          showAction={false}
        />
      </div>

      {/* 卡片列表示例 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">卡片列表</h3>

        {/* 卡片列表 - 带选中功能 */}
        <ReportCardList
          title="我的报告（可选中）"
          cards={cards.map((card) => ({
            ...card,
            selected: selectedIds.includes(card.id),
          }))}
          onSelectChange={(selected, id) => handleSelectChange(selected, id)}
          onEdit={(id) => console.log("编辑", id)}
          onDelete={(id) => console.log("删除", id)}
        />

        {/* 卡片列表 - 自定义每个卡片的操作 */}
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

      {/* 选中的卡片 ID */}
      {selectedIds.length > 0 && (
        <div className="p-4 rounded-lg bg-[var(--bg-neutral-light)]">
          <p className="text-sm text-[var(--text-secondary)]">
            选中的卡片 ID: {selectedIds.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
