"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

// ==================== 类型定义 ====================

/**
 * 深度思考容器原语属性
 * @public
 */
interface DeepThinkingContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否默认展开
   */
  defaultOpen?: boolean;
  /**
   * 控制展开状态
   */
  open?: boolean;
  /**
   * 展开状态变化回调
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * 深度思考头部原语属性
 * @public
 */
interface DeepThinkingHeaderPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * 左侧内容（通常是图标和标题）
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（通常是箭头图标）
   */
  arrow?: React.ReactNode;
}

/**
 * 深度思考标题原语属性
 * @public
 */
interface DeepThinkingTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 深度思考图标容器原语属性
 * @public
 */
interface DeepThinkingIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children?: React.ReactNode;
}

/**
 * 深度思考内容原语属性
 * @public
 */
interface DeepThinkingContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 思考点动画原语属性
 * @public
 */
interface ThinkingDotsPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

// ==================== 样式原语组件 ====================

/**
 * 思考中的脉冲动画圆点
 * @public
 */
const ThinkingDotsPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingDotsPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes thinking-pulse {
              0%, 100% {
                opacity: 0.4;
              }
              50% {
                opacity: 1;
              }
            }
          `,
        }}
      />
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-pulse 1.4s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-pulse 1.4s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        />
        <div
          className="w-1 h-1 rounded-full bg-[var(--bg-brand)]"
          style={{
            animation: "thinking-pulse 1.4s ease-in-out infinite",
            animationDelay: "0.4s",
          }}
        />
      </div>
    </>
  );
});
ThinkingDotsPrimitive.displayName = "ThinkingDotsPrimitive";

/**
 * 深度思考容器样式原语
 * @public
 */
const DeepThinkingContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  DeepThinkingContainerPrimitiveProps
>(
  (
    { children, defaultOpen = false, open, onOpenChange, className, ...props },
    ref,
  ) => {
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div
          ref={ref}
          className={cn(
            "[&_*]:!box-border",
            "w-full",
            "rounded-[var(--radius-lg)]",
            "overflow-hidden",
            "flex flex-col",
            "gap-[var(--gap-xs)]",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    );
  },
);
DeepThinkingContainerPrimitive.displayName = "DeepThinkingContainerPrimitive";

/**
 * 深度思考头部样式原语
 * @public
 */
const DeepThinkingHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  DeepThinkingHeaderPrimitiveProps
>(({ children, arrow, className, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex items-center gap-[var(--gap-md)]",
          "w-full",
          "cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
        {arrow}
      </div>
    </CollapsibleTrigger>
  );
});
DeepThinkingHeaderPrimitive.displayName = "DeepThinkingHeaderPrimitive";

/**
 * 深度思考标题样式原语
 * @public
 */
const DeepThinkingTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  DeepThinkingTitlePrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-primary)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
DeepThinkingTitlePrimitive.displayName = "DeepThinkingTitlePrimitive";

/**
 * 深度思考图标容器样式原语
 * @public
 */
const DeepThinkingIconPrimitive = React.forwardRef<
  HTMLDivElement,
  DeepThinkingIconPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});
DeepThinkingIconPrimitive.displayName = "DeepThinkingIconPrimitive";

/**
 * 深度思考内容样式原语
 * @public
 */
const DeepThinkingContentPrimitive = React.forwardRef<
  HTMLDivElement,
  DeepThinkingContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn("[&_*]:!box-border", "flex flex-col", className)}
        {...props}
      >
        {/* 内容  竖线和内容区域 */}
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "text-sm",
            "leading-[var(--line-height-2)]",
            "text-[var(--text-secondary)]",
            "whitespace-pre-wrap",
            "flex items-stretch gap-[var(--gap-md)]",
          )}
        >
          <div className="w-0 ml-[calc(var(--margin-com-md)-1px)] mr-[var(--margin-com-md)] self-stretch border border-[var(--divider-neutral-basic)]" />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </CollapsibleContent>
  );
});
DeepThinkingContentPrimitive.displayName = "DeepThinkingContentPrimitive";

/**
 * 箭头图标样式原语
 * @public
 */
const DeepThinkingArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "size-4",
        "text-[var(--text-secondary)]",
        "transition-transform duration-200",
        "[data-state=open]_&:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DeepThinkingArrowPrimitive.displayName = "DeepThinkingArrowPrimitive";

// ==================== 统一导出 ====================

export type {
  DeepThinkingContainerPrimitiveProps,
  DeepThinkingHeaderPrimitiveProps,
  DeepThinkingTitlePrimitiveProps,
  DeepThinkingIconPrimitiveProps,
  DeepThinkingContentPrimitiveProps,
  ThinkingDotsPrimitiveProps,
};

export {
  DeepThinkingContainerPrimitive,
  DeepThinkingHeaderPrimitive,
  DeepThinkingTitlePrimitive,
  DeepThinkingIconPrimitive,
  DeepThinkingContentPrimitive,
  DeepThinkingArrowPrimitive,
  ThinkingDotsPrimitive,
};
