"use client";

import { TripleSplitPane } from "@/registry/wuhan/composed/split-pane/triple-split-pane";

export default function TripleSplitPaneDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* 基础三栏布局 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          基础三栏布局
        </h3>
        <TripleSplitPane
          className="h-[500px] w-full bg-[var(--bg-neutral-light)] p-3"
          left={{
            title: "左侧面板",
            width: "220px",
            collapsedWidth: "0px",
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
            minWidth: "280px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  这是中间面板的内容区域，会自动占满剩余空间
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
            width: "220px",
            collapsedWidth: "0px",
            minWidth: "180px",
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
      </div>

      {/* 收起时保留宽度 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          收起时保留宽度（右侧面板收起后显示48px宽度）
        </h3>
        <TripleSplitPane
          className="h-[500px] w-full bg-[var(--bg-neutral-light)] gap-[6px] p-3"
          left={{
            title: "左侧面板",
            width: "180px",
            collapsedWidth: "0px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  左侧面板内容
                </p>
              </div>
            ),
          }}
          center={{
            title: "中间面板",
            minWidth: "250px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  中间面板内容
                </p>
              </div>
            ),
          }}
          right={{
            title: "右侧面板",
            width: "250px",
            collapsedWidth: "48px",
            minWidth: "180px",
            showIconWhenCompact: true,
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  右侧面板可以收起为48px宽度，仍然显示折叠图标
                </p>
              </div>
            ),
          }}
        />
      </div>

      {/* 默认收起状态 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          默认收起状态（左侧面板默认收起）
        </h3>
        <TripleSplitPane
          className="h-[500px] w-full bg-[var(--bg-neutral-light)] gap-[6px] p-3"
          left={{
            title: "左侧面板",
            width: "200px",
            collapsedWidth: "0px",
            defaultCollapsed: true,
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  左侧面板默认收起
                </p>
              </div>
            ),
          }}
          center={{
            title: "中间面板",
            minWidth: "280px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  中间面板内容
                </p>
              </div>
            ),
          }}
          right={{
            title: "右侧面板",
            width: "220px",
            collapsedWidth: "48px",
            minWidth: "180px",
            children: (
              <div className="space-y-4">
                <p className="text-sm text-[var(--text-secondary)]">
                  右侧面板内容
                </p>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
