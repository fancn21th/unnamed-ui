"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
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
 * ResizablePanel 封装
 */
const ResizablePanelWithRef = React.forwardRef<
  ResizablePrimitive.PanelImperativeHandle,
  ResizablePrimitive.PanelProps
>((props, ref) => {
  return (
    <ResizablePrimitive.Panel
      panelRef={ref}
      data-slot="resizable-panel"
      {...props}
    />
  );
});
ResizablePanelWithRef.displayName = "ResizablePanelWithRef";

/**
 * SplitPaneItem 原语组件
 * 提供标题和折叠图标的面板内容
 */
export interface SplitPaneItemProps extends ResizablePrimitive.PanelProps {
  /** 面板标题 */
  panelTitle?: React.ReactNode;
  /** 折叠图标，默认使用 PanelLeft */
  collapsibleIcon?: React.ReactNode;
  /** 是否显示折叠图标 */
  showCollapsibleIcon?: boolean;
  /** 折叠图标点击事件 */
  onCollapsibleClick?: () => void;
  /** header 的自定义类名 */
  headerClassName?: string;
  /** body 的自定义类名 */
  bodyClassName?: string;
  /** 容器的自定义类名 */
  containerClassName?: string;
  /** 内容区域的子元素 */
  children?: React.ReactNode;
}

const SplitPaneItem = React.forwardRef<
  ResizablePrimitive.PanelImperativeHandle,
  SplitPaneItemProps
>(
  (
    {
      panelTitle,
      collapsibleIcon,
      showCollapsibleIcon = true,
      onCollapsibleClick,
      headerClassName,
      bodyClassName,
      children,
      containerClassName,
      ...panelProps
    },
    ref,
  ) => {
    return (
      <ResizablePanelWithRef ref={ref} {...panelProps}>
        <div
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
            {showCollapsibleIcon && (
              <button
                type="button"
                onClick={onCollapsibleClick}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {collapsibleIcon || <PanelLeft className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Body 部分 - 占满剩余空间 */}
          <div className={cn("flex-1 overflow-auto p-4", bodyClassName)}>
            {children}
          </div>
        </div>
      </ResizablePanelWithRef>
    );
  },
);
SplitPaneItem.displayName = "SplitPaneItem";

export { SplitPanelGroup, SplitHandle, SplitPaneItem };
