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
  /** 是否为紧凑模式（收起状态），紧凑模式下会移除内边距和圆角，只显示图标 */
  isCompact?: boolean;
  /** 紧凑模式下是否显示折叠图标 */
  showIconWhenCompact?: boolean;
  /** 折叠后的宽度，用于判断是否完全隐藏（collapsedSize=0时移除圆角和内边距） */
  collapsedSize?: number | string;
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
      isCompact = false,
      showIconWhenCompact = true,
      collapsedSize = 0,
      ...panelProps
    },
    ref,
  ) => {
    // 只有在紧凑模式且 collapsedSize 为 0 时才移除圆角
    const getNumericSize = (size: number | string | undefined): number => {
      if (typeof size === 'string') {
        const match = size.match(/^([0-9.]+)/);
        return match ? parseFloat(match[1]) : 0;
      }
      return size || 0;
    };
    const shouldRemoveBorderRadius = isCompact && getNumericSize(collapsedSize) === 0;
    
    return (
      <ResizablePanelWithRef 
        ref={ref} 
        collapsedSize={collapsedSize}
        {...panelProps}
      >
        <div
          className={cn(
            "flex flex-col h-full bg-[var(--bg-container)]",
            !shouldRemoveBorderRadius && "rounded-[var(--radius-xl)]",
            containerClassName,
          )}
        >
          {/* Header 部分 */}
          <div
            className={cn(
              "flex items-center",
              "justify-between px-4 py-3 border-b border-[var(--border-neutral)]",
              headerClassName,
            )}
          >
            {/* 紧凑模式只显示图标，正常模式显示标题 */}
            {!isCompact && (
              <div className="text-sm font-medium text-[var(--text-primary)]">
                {panelTitle}
              </div>
            )}

            {/* 折叠图标 */}
            {showCollapsibleIcon && (!isCompact || showIconWhenCompact) && (
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
          {!isCompact && (
            <div className={cn("flex-1 overflow-auto p-4", bodyClassName)}>
              {children}
            </div>
          )}
        </div>
      </ResizablePanelWithRef>
    );
  },
);
SplitPaneItem.displayName = "SplitPaneItem";

export { SplitPanelGroup, SplitHandle, SplitPaneItem };
