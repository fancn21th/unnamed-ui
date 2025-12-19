"use client";

import * as React from "react";
import { buttonVariants } from "@/registry/wuhan/ui/button";
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
 * 附件卡片样式原语 Props
 * 提供单个附件卡片的基础样式配置
 */
interface AttachmentCardPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

const AttachmentCardPrimitive = React.forwardRef<
  HTMLDivElement,
  AttachmentCardPrimitiveProps
>(({ variant, size, className, children, ...props }, ref) => {
  const isInteractive = !!props.onClick;

  return (
    <div
      ref={ref}
      {...props}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (!isInteractive) return;

        // Make role="button" keyboard accessible
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
      }}
      className={cn(
        buttonVariants({ variant, size }),
        "relative",
        "flex items-center",
        "bg-[var(--bg-neutral-light)]",
        "rounded-xl",
        "transition-colors",
        "group/card",
        isInteractive && "cursor-pointer",
        "overflow-visible",
        className,
      )}
    >
      {children}
    </div>
  );
});
AttachmentCardPrimitive.displayName = "AttachmentCardPrimitive";

/**
 * AttachmentCard 子原语：左侧媒体/图标容器
 */
const AttachmentCardLeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        "flex items-center justify-center",
        "overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
AttachmentCardLeading.displayName = "AttachmentCardLeading";

/**
 * AttachmentCard 子原语：中间内容容器（标题/描述）
 */
const AttachmentCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-start min-w-0 flex-1 justify-center overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
AttachmentCardContent.displayName = "AttachmentCardContent";

/**
 * AttachmentCard 子原语：标题（默认带 hover 展开效果）
 */
const AttachmentCardTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "text-[var(--font-size-3)]",
        "leading-[var(--line-height-2)]",
        "truncate w-full",
        "transition-all",
        className,
      )}
      {...props}
    />
  );
});
AttachmentCardTitle.displayName = "AttachmentCardTitle";

/**
 * AttachmentCard 子原语：元信息（如 fileType · fileSize）
 */
const AttachmentCardMeta = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "leading-[var(--line-height-1)]",
        "text-[var(--text-tertiary)]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-1)",
        ...style,
      }}
      {...props}
    />
  );
});
AttachmentCardMeta.displayName = "AttachmentCardMeta";

/**
 * AttachmentCard 子原语：删除按钮（仅样式，不包含 stopPropagation 等行为）
 */
const AttachmentCardDeleteButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
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
        "transition-opacity duration-150",
        "hover:bg-[var(--bg-neutral-light-hover)]",
        "transition-colors",
        className,
      )}
      {...props}
    />
  );
});
AttachmentCardDeleteButton.displayName = "AttachmentCardDeleteButton";

/**
 * 附件加载指示器（默认 20px）
 * 视觉：3/4 为 brand 边框，1/4 为 divider-neutral-basic 边框
 */
const AttachmentLoadingIndicator = React.forwardRef<
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
        "bg-[var(--bg-container)]",
        "animate-spin",
        className,
      )}
      {...props}
    />
  );
});
AttachmentLoadingIndicator.displayName = "AttachmentLoadingIndicator";

/**
 * 附件列表容器样式原语 Props
 * 提供附件列表的容器样式配置
 */
interface AttachmentListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * 左侧滚动图标（可选，默认使用 ChevronLeft）
   */
  leftScrollIcon?: React.ReactNode;
  /**
   * 右侧滚动图标（可选，默认使用 ChevronRight）
   */
  rightScrollIcon?: React.ReactNode;
}

function AttachmentListPrimitive({
  children,
  className,
  leftScrollIcon,
  rightScrollIcon,
  ...props
}: AttachmentListPrimitiveProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const rafIdRef = React.useRef<number | null>(null);

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

  const scheduleCheckScrollability = React.useCallback(() => {
    if (rafIdRef.current != null) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      checkScrollability();
    });
  }, [checkScrollability]);

  // 监听滚动事件
  React.useEffect(() => {
    checkScrollability();

    // 监听窗口大小变化和内容变化（ResizeObserver 可能在部分环境不可用）
    if (typeof ResizeObserver === "undefined") return;

    const scrollContainer = scrollContainerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      scheduleCheckScrollability();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (scrollContainer) resizeObserver.observe(scrollContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkScrollability, scheduleCheckScrollability]);

  React.useEffect(() => {
    return () => {
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

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
      className={cn("relative w-full max-w-full", className)}
      {...props}
    >
      {/* 滚动容器 */}
      <div
        ref={scrollContainerRef}
        onScroll={scheduleCheckScrollability}
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

// ==================== 统一导出 ====================
// 所有导出统一在此处，遵循业界最高标准规范
// 使用别名避免与 UI 组件库中的组件重名

export type { AttachmentCardPrimitiveProps, AttachmentListPrimitiveProps };

export {
  AttachmentCardPrimitive as AttachmentCard,
  AttachmentCardContent,
  AttachmentCardDeleteButton,
  AttachmentCardLeading,
  AttachmentCardMeta,
  AttachmentCardTitle,
  AttachmentListPrimitive as AttachmentList,
  AttachmentLoadingIndicator,
};
