"use client";

import { TripleSplitPane } from "@/registry/wuhan/composed/split-pane/triple-split-pane";
import { Search, Bell, Settings } from "lucide-react";

export default function SplitPaneCenterHeaderDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[var(--Text-text-primary)]">
        中间面板头部居中内容
      </h3>
      <p className="text-xs text-[var(--Text-text-secondary)]">
        通过 centerHeaderContent
        属性可以在中间面板头部添加居中显示的内容，如搜索框、导航标签等
      </p>

      <TripleSplitPane
        className="h-[500px] w-full bg-[var(--Container-bg-neutral-light)] gap-[6px] p-3"
        left={{
          title: "文件列表",
          width: "220px",
          collapsedWidth: "0px",
          children: (
            <div className="space-y-2">
              <div className="p-3 bg-[var(--Container-bg-neutral-light-hover)] rounded-md cursor-pointer hover:bg-[var(--Container-bg-neutral-light-active)]">
                <p className="text-sm">项目文件 1</p>
              </div>
              <div className="p-3 bg-[var(--Container-bg-neutral-light-hover)] rounded-md cursor-pointer hover:bg-[var(--Container-bg-neutral-light-active)]">
                <p className="text-sm">项目文件 2</p>
              </div>
              <div className="p-3 bg-[var(--Container-bg-neutral-light-hover)] rounded-md cursor-pointer hover:bg-[var(--Container-bg-neutral-light-active)]">
                <p className="text-sm">项目文件 3</p>
              </div>
            </div>
          ),
        }}
        center={{
          title: "编辑器",
          minWidth: "280px",
          /**
           * centerHeaderContent - 在中间面板头部添加居中显示的内容
           * 该内容会通过绝对定位的方式完美居中，不受左侧展开按钮或标题文本的影响
           * 适合放置搜索框、导航标签、状态指示器等需要居中显示的元素
           */
          centerHeaderContent: (
            <div className="flex items-center gap-2 px-4 py-1 bg-[var(--Container-bg-neutral-light)] rounded-md border border-[var(--Border-border-neutral)]">
              <Search className="h-3.5 w-3.5 text-[var(--Text-text-secondary)]" />
              <input
                type="text"
                placeholder="搜索文件..."
                className="bg-transparent border-none outline-none text-sm text-[var(--Text-text-primary)] placeholder:text-[var(--Text-text-tertiary)] w-32"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ),
          children: (
            <div className="space-y-4">
              <div className="p-4 bg-[var(--Container-bg-container)] rounded-md border border-[var(--Border-border-neutral)]">
                <p className="text-sm text-[var(--Text-text-secondary)] mb-2">
                  这是中间面板的主要内容区域
                </p>
                <p className="text-xs text-[var(--Text-text-tertiary)]">
                  头部的搜索框会始终保持居中显示，不会受到左侧展开按钮的影响
                </p>
              </div>
              <div className="p-4 bg-[var(--Container-bg-container)] rounded-md border border-[var(--Border-border-neutral)]">
                <pre className="text-xs text-[var(--Text-text-secondary)] font-mono">
                  {`// 示例代码
function Example() {
  return <div>Hello World</div>;
}`}
                </pre>
              </div>
            </div>
          ),
        }}
        right={{
          title: "工具栏",
          width: "220px",
          collapsedWidth: "0px",
          minWidth: "180px",
          children: (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-[var(--Container-bg-neutral-light-hover)] rounded-md cursor-pointer hover:bg-[var(--Container-bg-neutral-light-active)]">
                <Bell className="h-4 w-4 text-[var(--Text-text-secondary)]" />
                <span className="text-sm">通知</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[var(--Container-bg-neutral-light-hover)] rounded-md cursor-pointer hover:bg-[var(--Container-bg-neutral-light-active)]">
                <Settings className="h-4 w-4 text-[var(--Text-text-secondary)]" />
                <span className="text-sm">设置</span>
              </div>
            </div>
          ),
        }}
      />

      {/* 示例 2: 导航标签居中 */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-medium text-[var(--Text-text-primary)]">
          导航标签居中示例
        </h3>
        <TripleSplitPane
          className="h-[400px] w-full bg-[var(--Container-bg-neutral-light)] gap-[6px] p-3"
          left={{
            title: "侧边栏",
            width: "220px",
            collapsedWidth: "0px",
            children: (
              <div className="p-4">
                <p className="text-sm text-[var(--Text-text-secondary)]">
                  侧边栏内容
                </p>
              </div>
            ),
          }}
          center={{
            title: "主内容",
            minWidth: "280px",
            /**
             * 使用 centerHeaderContent 放置导航标签
             * 标签组会在头部居中显示，提供更好的视觉平衡
             */
            centerHeaderContent: (
              <div className="flex items-center gap-1 bg-[var(--Container-bg-neutral-light)] rounded-lg p-1">
                <button className="px-3 py-1 text-xs rounded-md bg-[var(--Container-bg-brand)] text-white">
                  概览
                </button>
                <button className="px-3 py-1 text-xs rounded-md hover:bg-[var(--Container-bg-neutral-light-hover)] text-[var(--Text-text-secondary)]">
                  详情
                </button>
                <button className="px-3 py-1 text-xs rounded-md hover:bg-[var(--Container-bg-neutral-light-hover)] text-[var(--Text-text-secondary)]">
                  设置
                </button>
              </div>
            ),
            children: (
              <div className="p-4">
                <p className="text-sm text-[var(--Text-text-secondary)]">
                  主内容区域，头部导航标签保持居中
                </p>
              </div>
            ),
          }}
          right={{
            title: "详情",
            width: "220px",
            collapsedWidth: "0px",
            minWidth: "180px",
            children: (
              <div className="p-4">
                <p className="text-sm text-[var(--Text-text-secondary)]">
                  详情内容
                </p>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
