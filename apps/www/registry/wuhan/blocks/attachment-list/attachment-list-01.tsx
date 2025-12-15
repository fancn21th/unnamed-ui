"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ==================== 类型定义 ====================
// 完全通用的类型，不强制任何业务概念
// 用户可以根据自己的需求定义数据结构

// ==================== 常量定义 ====================
const SCROLL_THRESHOLD = 1; // 滚动检测容差（处理浮点数精度问题）
const SCROLL_RATIO = 0.8; // 每次滚动容器宽度的比例
const SCROLL_PADDING = 4; // 滚动容器的垂直内边距（px）

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 附件卡片样式原语
 * 提供单个附件卡片的基础样式
 */
export interface AttachmentCardPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "name"
> {
  /**
   * Button variant (继承自 Button 组件)
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * Button size (继承自 Button 组件)
   */
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  /**
   * 附件图标或缩略图
   */
  icon?: React.ReactNode;
  /**
   * 附件名称
   */
  name?: string;
  /**
   * 文件类型（如 PDF、JPG 等）
   */
  fileType?: string;
  /**
   * 附件大小（文件大小）
   */
  fileSize?: string;
  /**
   * 是否为图片类型（图片类型时卡片宽高均为56px）
   */
  isImage?: boolean;
  /**
   * 加载中状态（例如：上传中）
   * - true 时会用 loadingIndicator 替代 icon，并在图标/图片区域居中展示
   */
  loading?: boolean;
  /**
   * 自定义加载指示器（默认使用 AttachmentLoadingIndicator）
   */
  loadingIndicator?: React.ReactNode;
  /**
   * 删除图标
   */
  deleteIcon?: React.ReactNode;
  /**
   * 删除按钮点击事件
   */
  onDelete?: (e: React.MouseEvent) => void;
}

export const AttachmentCardPrimitive = React.forwardRef<
  HTMLDivElement,
  AttachmentCardPrimitiveProps
>(
  (
    {
      icon,
      name,
      fileType,
      fileSize,
      isImage = false,
      loading = false,
      loadingIndicator,
      deleteIcon,
      onDelete,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const displayText =
      fileType && fileSize ? `${fileType}·${fileSize}` : fileSize || fileType;

    const renderedIcon = loading
      ? (loadingIndicator ?? <AttachmentLoadingIndicator />)
      : icon;

    return (
      <div
        ref={ref}
        {...props}
        role="button"
        aria-busy={loading || undefined}
        tabIndex={props.onClick ? 0 : undefined}
        className={cn(
          buttonVariants({ variant, size }),
          "relative",
          "flex items-center",
          !isImage && "gap-[var(--gap-sm)]",
          !isImage && "px-[var(--padding-com-md)]",
          "bg-[var(--bg-neutral-light)]",
          "rounded-xl",
          "transition-colors",
          isImage ? "w-14 h-14 p-0" : "max-w-[200px] h-14",
          "group/card",
          "cursor-pointer",
          "overflow-visible",
          className,
        )}
      >
        {/* 左侧图片/图标 */}
        {renderedIcon && (
          <div
            className={cn(
              "shrink-0",
              isImage
                ? "w-full h-full rounded-xl"
                : "rounded-lg bg-[var(--bg-container)] w-10 h-10",
              "flex items-center justify-center",
              "overflow-hidden",
            )}
          >
            {renderedIcon}
          </div>
        )}

        {/* 右侧文件信息（仅非图片类型显示） */}
        {!isImage && (name || displayText) && (
          <div className="flex flex-col items-start min-w-0 flex-1 justify-center overflow-hidden">
            {name && (
              <span
                className={cn(
                  "font-[var(--font-family-cn)]",
                  "font-[var(--font-weight-400)]",
                  "text-[var(--font-size-3)]",
                  "leading-[var(--line-height-2)]",
                  "truncate w-full",
                  "group-hover/card:whitespace-normal group-hover/card:break-words group-hover/card:overflow-visible",
                  "transition-all",
                )}
                title={name}
              >
                {name}
              </span>
            )}
            {displayText && (
              <span
                className={cn(
                  "font-[var(--font-family-cn)]",
                  "font-[var(--font-weight-400)]",
                  "leading-[var(--line-height-1)]",
                  "text-[var(--text-tertiary)]",
                )}
                style={{
                  fontSize: "var(--font-size-1)",
                }}
              >
                {displayText}
              </span>
            )}
          </div>
        )}

        {deleteIcon && onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
            className={cn(
              "absolute",
              "-top-1 -right-1",
              "z-10",
              "w-5 h-5",
              "rounded-full",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "shadow-sm",
              "flex items-center justify-center",
              "opacity-0 pointer-events-none",
              "group-hover/card:opacity-100 group-hover/card:pointer-events-auto",
              "transition-opacity duration-150",
              "hover:bg-[var(--bg-neutral-light-hover)]",
              "transition-colors",
            )}
            aria-label="Delete attachment"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {deleteIcon}
          </button>
        )}

        {children}
      </div>
    );
  },
);
AttachmentCardPrimitive.displayName = "AttachmentCardPrimitive";

/**
 * 附件加载指示器（默认 20px）
 * 视觉：3/4 为 brand 边框，1/4 为 divider-neutral-basic 边框
 */
export const AttachmentLoadingIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        "w-5 h-5 rounded-full",
        "border-2 border-[var(--border-brand)]",
        "border-t-[var(--divider-neutral-basic)]",
        "animate-spin",
        className,
      )}
      {...props}
    />
  );
});
AttachmentLoadingIndicator.displayName = "AttachmentLoadingIndicator";

/**
 * 附件列表容器样式原语
 * 提供附件列表的容器样式
 */
export interface AttachmentListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 是否显示底部边框
   */
  bordered?: boolean;
  /**
   * 垂直内边距
   */
  verticalPadding?: "none" | "sm" | "md" | "lg";
  /**
   * 左侧滚动图标（可选，默认使用 ChevronLeft）
   */
  leftScrollIcon?: React.ReactNode;
  /**
   * 右侧滚动图标（可选，默认使用 ChevronRight）
   */
  rightScrollIcon?: React.ReactNode;
}

export function AttachmentListPrimitive({
  children,
  bordered = true,
  verticalPadding = "sm",
  className,
  leftScrollIcon,
  rightScrollIcon,
  ...props
}: AttachmentListPrimitiveProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const paddingClasses = {
    none: "",
    sm: "py-1",
    md: "py-2",
    lg: "py-3",
  };

  const borderClasses = bordered
    ? "border-b border-[var(--border-neutral)]"
    : "";

  // 检查滚动状态
  const checkScrollability = React.useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;

    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    // 检查内容是否超出容器宽度（添加容差处理浮点数精度问题）
    const needsScroll = scrollWidth > clientWidth + SCROLL_THRESHOLD;

    if (needsScroll) {
      setCanScrollLeft(scrollLeft > SCROLL_THRESHOLD);
      setCanScrollRight(
        scrollLeft < scrollWidth - clientWidth - SCROLL_THRESHOLD,
      );
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  // 监听滚动事件
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    checkScrollability();
    scrollContainer.addEventListener("scroll", checkScrollability);

    // 监听窗口大小变化和内容变化
    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollability);
      resizeObserver.disconnect();
    };
  }, [checkScrollability]);

  // 滚动函数
  const scroll = React.useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = scrollContainer.clientWidth * SCROLL_RATIO;

    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const showScrollButtons = canScrollLeft || canScrollRight;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-full",
        borderClasses,
        paddingClasses[verticalPadding],
        className,
      )}
      {...props}
    >
      {/* 滚动容器 */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-visible no-scrollbar relative"
        style={{
          paddingTop: `${SCROLL_PADDING}px`,
          paddingBottom: `${SCROLL_PADDING}px`,
        }}
      >
        <div className="flex items-center gap-2 w-max min-w-full">
          {children}
        </div>
      </div>

      {/* 左侧滚动按钮 */}
      {showScrollButtons && canScrollLeft && (
        <>
          {/* 渐变背景 */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-[5] pointer-events-none flex items-center"
            style={{
              width: "40px",
              height: "56px",
              padding: "8px",
              background: `linear-gradient(90deg, var(--bg-container) 0%, var(--bg-container) 40%, transparent 100%)`,
            }}
          />
          {/* 按钮 */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "w-6 h-6",
              "rounded-[var(--radius-md)]",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "p-[var(--padding-com-xs)]",
              "flex items-center justify-center",
              "hover:bg-[var(--bg-neutral-light-hover)]",
              "transition-colors",
            )}
            aria-label="Scroll left"
          >
            {leftScrollIcon || <ChevronLeft className="w-4 h-4" />}
          </button>
        </>
      )}

      {/* 右侧滚动按钮 */}
      {showScrollButtons && canScrollRight && (
        <>
          {/* 渐变背景 */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-[5] pointer-events-none flex items-center"
            style={{
              width: "40px",
              height: "56px",
              padding: "8px",
              background: `linear-gradient(270deg, var(--bg-container) 0%, var(--bg-container) 40%, transparent 100%)`,
            }}
          />
          {/* 按钮 */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "w-6 h-6",
              "rounded-[var(--radius-md)]",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "p-[var(--padding-com-xs)]",
              "flex items-center justify-center",
              "hover:bg-[var(--bg-neutral-light-hover)]",
              "transition-colors",
            )}
            aria-label="Scroll right"
          >
            {rightScrollIcon || <ChevronRight className="w-4 h-4" />}
          </button>
        </>
      )}
    </div>
  );
}

// ==================== 导出所有原语 ====================
// 使用 AttachmentList 前缀避免与 UI 组件库中的组件重名

export {
  AttachmentCardPrimitive as AttachmentCard,
  AttachmentListPrimitive as AttachmentList,
};
