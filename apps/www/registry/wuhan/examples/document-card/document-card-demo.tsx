"use client";

import * as React from "react";
import {
  DocumentCard,
  DocumentCardList,
} from "@/registry/wuhan/composed/document-card/document-card";
import { FileSearch, Target } from "lucide-react";

export default function DocumentCardDemo() {
  const cards = [
    {
      id: "1",
      title: "AI趋势研究",
      updateTime: "18:21",
      researchTopic: "标签",
      researchField: "商业投资",
      researchPeriod: "2015-2025",
      icon: <FileSearch className="text-[var(--text-primary)]" size={24} />,
    },
    {
      id: "2",
      title: "数据分析报告",
      updateTime: "17:30",
      researchTopic: "可视化",
      researchField: "消费品",
      researchPeriod: "2020-2024",
    },
    {
      id: "3",
      title: "市场洞察",
      updateTime: "16:45",
      researchTopic: "洞察",
      researchField: "科技行业",
    },
    {
      id: "4",
      title: "行业研究报告",
      generating: {
        progress: 60,
        generatingInfo: "正在生成研究报告 · 预计5-10分钟",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 标题 */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[var(--text-primary)] font-medium">
          Document Card
        </h2>
        <p className="text-[var(--text-tertiary)] text-sm">
          文档卡片组件，支持三种状态
        </p>
      </div>

      {/* 三种状态 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">生成中</h3>
        <DocumentCard
          title="AI趋势研究"
          generating={{
            progress: 60,
            generatingInfo: "正在生成研究报告 · 预计5-10分钟",
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">完成</h3>
        <DocumentCard title="AI趋势研究" updateTime="18:21" />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">有额外信息</h3>
        <DocumentCard
          icon={<Target className="text-[var(--text-primary)]" size={24} />}
          title="行业洞察"
          updateTime="14:15"
          researchTopic="洞察报告"
          researchField="金融服务"
          researchPeriod="2019-2025"
        />
      </div>

      {/* 卡片列表 */}
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-[var(--text-primary)]">卡片列表</h3>
        <DocumentCardList
          title="我的文档"
          cards={cards}
          onCardClick={(id) => console.log("点击卡片", id)}
        />
      </div>
    </div>
  );
}
