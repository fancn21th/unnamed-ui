"use client";

import { TripleSplitPane } from "@/registry/wuhan/composed/split-pane/triple-split-pane";

export default function SplitPaneClassnamesDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[var(--text-primary)]">
        自定义面板样式
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">
        通过 classNames 属性可以自定义每个面板的容器、头部和内容区域样式
      </p>
      <TripleSplitPane
        className="h-[500px] w-full bg-[var(--bg-neutral-light)] gap-[6px] p-3"
        left={{
          title: "左侧面板",
          width: "220px",
          collapsedWidth: "0px",
          children: (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                这个面板使用了自定义的头部和内容区域样式
              </p>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">导航菜单</p>
              </div>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">文件树</p>
              </div>
            </div>
          ),
          classNames: {
            container: "shadow-lg",
            header: "bg-gradient-to-r from-blue-50 to-indigo-50",
            body: "bg-blue-50/30 p-6",
          },
        }}
        center={{
          title: "中间面板",
          minWidth: "280px",
          children: (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                这是中间面板的内容区域，使用了自定义的内边距
              </p>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">主要内容 A</p>
              </div>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">主要内容 B</p>
              </div>
            </div>
          ),
          classNames: {
            container: "border-2 border-green-200",
            header: "bg-green-50 border-b-2 border-green-200",
            body: "p-8",
          },
        }}
        right={{
          title: "右侧面板",
          width: "220px",
          collapsedWidth: "0px",
          minWidth: "180px",
          children: (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                这个面板的内容区域使用了不同的内边距
              </p>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">属性 1</p>
              </div>
              <div className="p-4 bg-[var(--bg-item-hover)] rounded-md">
                <p className="text-xs">属性 2</p>
              </div>
            </div>
          ),
          classNames: {
            header: "bg-purple-50",
            body: "bg-purple-50/20 p-4",
          },
        }}
      />
    </div>
  );
}
