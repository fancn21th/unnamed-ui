"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import { IconButtonPrimitive } from "@/registry/wuhan/blocks/icon-button/icon-button-01";

/**
 * SplitPane 容器原语组件
 */
export const SplitPaneContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex h-full w-full", className)} {...props} />
  );
});
SplitPaneContainerPrimitive.displayName = "SplitPaneContainerPrimitive";

/**
 * SplitPaneItem 原语组件
 * 提供标题和折叠图标的面板内容
 */
export interface SplitPaneItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 面板标题 */
  panelTitle?: React.ReactNode;
  /** 头部居中内容（绝对定位在头部中心） */
  centerHeaderContent?: React.ReactNode;
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
  /** 是否为紧凑模式（收起状态），紧凑模式下会移除内边距和圆角，只显示图标 */
  isCompact?: boolean;
  /** 紧凑模式下是否显示折叠图标 */
  showIconWhenCompact?: boolean;
  /** 面板宽度 */
  width?: string | number;
}

export const SplitPaneItemPrimitive = React.forwardRef<
  HTMLDivElement,
  SplitPaneItemPrimitiveProps
>(
  (
    {
      panelTitle,
      centerHeaderContent,
      collapsibleIcon,
      showCollapsibleIcon = true,
      onCollapsibleClick,
      headerClassName,
      bodyClassName,
      children,
      containerClassName,
      isCompact = false,
      showIconWhenCompact = true,
      width,
      style,
      ...props
    },
    ref,
  ) => {
    if (!parseFloat(width as string)) return null;
    return (
      <div
        ref={ref}
        className={cn("flex-shrink-0 h-full", containerClassName)}
        style={{
          width,
          ...style,
        }}
        {...props}
      >
        <div
          className={cn(
            "flex flex-col h-full bg-[var(--Container-bg-container)]",
            "rounded-[var(--radius-xl)]",
          )}
        >
          {/* Header 部分 */}
          <div
            className={cn(
              "h-[48px]",
              "flex items-center",
              "px-4 border-b border-[var(--Border-border-neutral)]",
              headerClassName,
            )}
          >
            {centerHeaderContent ? (
              // 有居中内容时：使用三栏布局
              <>
                {/* 左侧容器：固定60px，放置标题 */}
                <div className="w-[60px] flex-shrink-0 flex items-center">
                  {!isCompact && (
                    <div
                      className={cn(
                        "font-[var(--font-family-CN)]",
                        "font-semibold",
                        "font-size-3",
                        "leading-[var(--line-height-3)]",
                        "text-[var(--Text-text-title)]",
                      )}
                    >
                      {panelTitle}
                    </div>
                  )}
                </div>

                {/* 中间容器：占满剩余空间，放置居中内容 */}
                {/* <div className="flex-1 flex items-center justify-center"> */}
                <div className="flex-1 h-full">{centerHeaderContent}</div>

                {/* 右侧容器：固定60px，用于平衡布局 */}
                <div className="w-[60px] flex-shrink-0 flex items-center justify-end">
                  {/* 折叠图标 */}
                  {showCollapsibleIcon &&
                    (!isCompact || showIconWhenCompact) && (
                      <IconButtonPrimitive
                        variant="ghost"
                        color="secondary"
                        size="sm"
                        onClick={onCollapsibleClick}
                      >
                        {collapsibleIcon || <PanelLeft />}
                      </IconButtonPrimitive>
                    )}
                </div>
              </>
            ) : (
              // 无居中内容时：使用默认的两栏布局
              <>
                {/* 紧凑模式只显示图标，正常模式显示标题 */}
                {!isCompact && (
                  <div
                    className={cn(
                      "font-[var(--font-family-CN)]",
                      "font-semibold",
                      "font-size-3",
                      "leading-[var(--line-height-3)]",
                      "text-[var(--Text-text-title)]",
                    )}
                  >
                    {panelTitle}
                  </div>
                )}

                {/* 占位符，将折叠图标推到右侧 */}
                <div className="flex-1" />

                {/* 折叠图标 */}
                {showCollapsibleIcon && (!isCompact || showIconWhenCompact) && (
                  <IconButtonPrimitive
                    variant="ghost"
                    color="secondary"
                    size="md"
                    onClick={onCollapsibleClick}
                  >
                    {collapsibleIcon || <PanelLeft />}
                  </IconButtonPrimitive>
                )}
              </>
            )}
          </div>

          {/* Body 部分 - 占满剩余空间 */}
          {!isCompact && (
            <div className={cn("flex-1 overflow-auto p-4", bodyClassName)}>
              {children}
            </div>
          )}
        </div>
      </div>
    );
  },
);
SplitPaneItemPrimitive.displayName = "SplitPaneItemPrimitive";

/**
 * SplitPane 分隔符原语组件
 */
export const SplitPaneSeparatorPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-shrink-0 w-[6px]", className)}
      {...props}
    />
  );
});
SplitPaneSeparatorPrimitive.displayName = "SplitPaneSeparatorPrimitive";
