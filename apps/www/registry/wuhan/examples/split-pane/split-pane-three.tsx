"use client";

import { TripleSplitPane } from "@/registry/wuhan/composed/split-pane/triple-split-pane";

export default function SplitPaneThree() {
  return (
    <TripleSplitPane
      className="h-[600px] w-full bg-[var(--bg-neutral-light)] gap-3"
      left={{
        title: "左侧面板",
        defaultSize: 20,
        collapsedSize: 0,
        children: (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              这是左侧面板的内容区域
            </p>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 1</p>
            </div>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 2</p>
            </div>
          </div>
        ),
      }}
      center={{
        title: "中间面板",
        defaultSize: 50,
        children: (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              这是中间面板的内容区域
            </p>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 A</p>
            </div>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 B</p>
            </div>
          </div>
        ),
      }}
      right={{
        title: "右侧面板",
        defaultSize: 30,
        collapsedSize: 48,
        children: (
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              这是右侧面板的内容区域
            </p>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 X</p>
            </div>
            <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
              <p className="text-xs">示例内容 Y</p>
            </div>
          </div>
        ),
      }}
    />
  );
}
