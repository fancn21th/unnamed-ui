"use client";

import { ResizablePanelGroup } from "@/registry/wuhan/ui/resizable";
import { SplitPaneItem } from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export default function SplitPaneThree() {
  return (
    <ResizablePanelGroup className="h-[600px] w-full bg-[var(--bg-neutral-light)] gap-3">
      <SplitPaneItem panelTitle="左侧面板">
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
      </SplitPaneItem>

      <SplitPaneItem panelTitle="中间面板">
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
      </SplitPaneItem>
      <SplitPaneItem panelTitle="右侧面板">
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
      </SplitPaneItem>
    </ResizablePanelGroup>
  );
}
