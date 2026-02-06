"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/registry/wuhan/ui/resizable";
import * as ResizablePrimitive from "react-resizable-panels";
import { PanelLeft } from "lucide-react";

const SplitPanelGroup = ResizablePanelGroup;
const SplitHandle = ResizableHandle;
export const SplitPaneContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />;
});
SplitPaneContainerPrimitive.displayName = "SplitPaneContainerPrimitive";

/**
 * SplitPaneItem 原语组件
 * 提供标题和折叠图标的面板内容
 * 注意：不包含 Pane 组件，需要配合 Pane 或直接作为 SplitPane 的子元素使用
 */
export interface SplitPaneItemProps extends ResizablePrimitive.PanelProps {
  /** 面板标题 */
  panelTitle?: React.ReactNode;
  /** 折叠图标，默认使用 PanelLeft */
  collapsibleIcon?: React.ReactNode;
  /** header 的自定义类名 */
  headerClassName?: string;
  /** body 的自定义类名 */
  bodyClassName?: string;
  /** 容器的自定义类名 */
  containerClassName?: string;
  /** 内容区域的子元素 */
  children?: React.ReactNode;
}

const SplitPaneItem = React.forwardRef<HTMLDivElement, SplitPaneItemProps>(
  (
    {
      panelTitle,
      collapsibleIcon,
      headerClassName,
      bodyClassName,
      children,
      containerClassName,
      ...panelProps
    },
    ref,
  ) => {
    return (
      <ResizablePanel {...panelProps}>
        <div
          ref={ref}
          className={cn(
            "flex flex-col h-full bg-[var(--bg-container)] rounded-[var(--radius-xl)]",
            containerClassName,
          )}
        >
          {/* Header 部分 */}
          <div
            className={cn(
              "flex items-center justify-between",
              "px-4 py-3",
              "border-b border-[var(--border-neutral)]",
              headerClassName,
            )}
          >
            {/* 左侧标题 */}
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {panelTitle}
            </div>

            {/* 右侧折叠图标 */}
            <button
              type="button"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {collapsibleIcon || <PanelLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Body 部分 - 占满剩余空间 */}
          <div className={cn("flex-1 overflow-auto p-4", bodyClassName)}>
            {children}
          </div>
        </div>
      </ResizablePanel>
    );
  },
);
SplitPaneItem.displayName = "SplitPaneItem";

export { SplitPanelGroup, SplitHandle, SplitPaneItem };
