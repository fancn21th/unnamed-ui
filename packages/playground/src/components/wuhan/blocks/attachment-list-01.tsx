"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
} from "@/components/wuhan/blocks/tooltip-01";

// ==================== 类型定义 ====================
// 完全通用的类型，不强制任何业务概念
// 用户可以根据自己的需求定义数据结构

// ==================== 常量定义 ====================
const SCROLL_THRESHOLD = 1; // 滚动检测容差（处理浮点数精度问题）
const SCROLL_RATIO = 0.8; // 每次滚动容器宽度的比例
const SCROLL_PADDING = 0; // 滚动容器的垂直内边距（px）
const SCROLL_CONTAINER_PADDING_TOP = 4; // 删除按钮向上偏移 4px，需要至少 4px 的 padding-top 才能完整显示

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
        "rounded-[var(--radius-xl)]",
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
>(({ className, children, ...props }, ref) => {
  const titleRef = React.useRef<HTMLSpanElement>(null);

  const titleText = typeof children === "string" ? children : undefined;
  const shouldShowTooltip = titleText;

  const titleElement = (
    <span
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        titleRef.current = node;
      }}
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
    >
      {children}
    </span>
  );

  if (shouldShowTooltip) {
    return (
      <BlockTooltip>
        <BlockTooltipTrigger asChild>{titleElement}</BlockTooltipTrigger>
        <BlockTooltipContent side="top">{titleText}</BlockTooltipContent>
      </BlockTooltip>
    );
  }

  return titleElement;
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
        "appearance-none border-0 bg-transparent p-0",
        "absolute",
        "-top-1 -right-1",
        "z-10",
        "w-5 h-5",
        "rounded-full",
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        "shadow-sm",
        "flex items-center justify-center",
        "cursor-pointer",
        "opacity-0 pointer-events-none",
        "group-hover/card:opacity-100 group-hover/card:pointer-events-auto",
        "transition-opacity duration-150",
        "hover:bg-[var(--bg-neutral-light)]",
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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const rafIdRef = React.useRef<number | null>(null);

  // 判断 children 是否有内容
  const hasContent = React.useMemo(() => {
    if (children == null) return false;
    if (typeof children === "string") return children.trim().length > 0;
    if (typeof children === "number") return true;
    if (Array.isArray(children)) {
      return children.some((child) => {
        if (child == null) return false;
        if (typeof child === "string") return child.trim().length > 0;
        if (typeof child === "number") return true;
        return true;
      });
    }
    return true;
  }, [children]);

  // 检查内容高度
  const checkContentHeight = React.useCallback(() => {
    const contentContainer = contentRef.current;
    if (!contentContainer) {
      setContentHeight(0);
      return;
    }
    const height = contentContainer.offsetHeight;
    setContentHeight(height);
  }, []);

  // 判断是否需要应用 SCROLL_PADDING
  // 滚动按钮高度为56px，使用居中定位，需要至少28px的上边距和下边距
  // 只有当内容高度足够（大于滚动按钮高度56px的一半，即28px）时才应用
  const SCROLL_BUTTON_HEIGHT = 56;
  const MIN_CONTENT_HEIGHT_FOR_PADDING = SCROLL_BUTTON_HEIGHT / 2; // 28px
  const shouldApplyPadding =
    hasContent && contentHeight >= MIN_CONTENT_HEIGHT_FOR_PADDING;

  // 检查滚动状态
  const checkScrollability = React.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    const needsScroll = scrollWidth > clientWidth + SCROLL_THRESHOLD;

    if (needsScroll) {
      setCanScrollLeft(scrollLeft > SCROLL_THRESHOLD);
      setCanScrollRight(
        scrollLeft < scrollWidth - clientWidth - SCROLL_THRESHOLD,
      );
    } else {
      // 如果内容不足以滚动，重置滚动位置并隐藏按钮
      if (scrollLeft > 0) {
        scrollContainer.scrollLeft = 0;
      }
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }

    // 同时检查内容高度
    checkContentHeight();
  }, [checkContentHeight]);

  // 调度滚动检查
  const scheduleCheckScrollability = React.useCallback(() => {
    if (rafIdRef.current != null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      checkScrollability();
    });
  }, [checkScrollability]);

  // 监听滚动和尺寸变化
  React.useEffect(() => {
    checkScrollability();

    if (typeof ResizeObserver === "undefined") return;

    const scrollContainer = scrollContainerRef.current;
    const contentContainer = contentRef.current;
    const resizeObserver = new ResizeObserver(() => {
      scheduleCheckScrollability();
    });

    if (scrollContainer) resizeObserver.observe(scrollContainer);
    if (contentContainer) resizeObserver.observe(contentContainer);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkScrollability, scheduleCheckScrollability]);

  // 监听 children 变化
  React.useEffect(() => {
    let rafId1: number | null = null;
    const rafId2 = requestAnimationFrame(() => {
      rafId1 = requestAnimationFrame(() => {
        scheduleCheckScrollability();
      });
    });

    return () => {
      cancelAnimationFrame(rafId2);
      if (rafId1 != null) cancelAnimationFrame(rafId1);
    };
  }, [children, scheduleCheckScrollability]);

  // 清理 RAF
  React.useEffect(() => {
    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // 滚动函数
  const scroll = React.useCallback((direction: "left" | "right") => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

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
        className="overflow-x-auto overflow-y-visible no-scrollbar relative [&::-webkit-scrollbar]:hidden"
        style={{
          paddingTop: `${SCROLL_CONTAINER_PADDING_TOP}px`,
          paddingBottom: shouldApplyPadding ? `${SCROLL_PADDING}px` : "0px",
          marginTop: "-4px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          ref={contentRef}
          className="flex items-center gap-2 w-max min-w-full"
        >
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
            aria-hidden="true"
          />
          {/* 按钮 */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={cn(
              "appearance-none border-0 bg-transparent p-0",
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "w-6 h-6",
              "rounded-[var(--radius-md)]",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "p-[var(--padding-com-xs)]",
              "flex items-center justify-center",
              "hover:bg-[var(--bg-neutral-light)]",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
            aria-hidden="true"
          />
          {/* 按钮 */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className={cn(
              "appearance-none border-0 bg-transparent p-0",
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "w-6 h-6",
              "rounded-[var(--radius-md)]",
              "bg-[var(--bg-container)]",
              "border border-[var(--border-neutral)]",
              "p-[var(--padding-com-xs)]",
              "flex items-center justify-center",
              "hover:bg-[var(--bg-neutral-light)]",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
