"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * Report Card 容器原语属性
 * @public
 */
interface ReportCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Report Card 头部原语属性
 * @public
 */
interface ReportCardHeaderPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  [key: string]: any;
  /** 描述文本 */
  description?: React.ReactNode;
}

/**
 * Report Card 完整原语属性
 * @public
 */
interface ReportCardPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  className?: string;
}

// ==================== 原语组件 ====================

/**
 * Report Card 容器原语
 * @public
 */
export const ReportCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-row",
        "items-center",
        "justify-between",
        "gap-[var(--gap-lg)]",
        "p-[var(--padding-com-lg)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        "transition-all",
        "duration-200",
        "hover:bg-[var(--bg-neutral-light)]",
        "group",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ReportCardContainerPrimitive.displayName = "ReportCardContainerPrimitive";

/**
 * Report Card 头部原语
 * @public
 */
export const ReportCardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardHeaderPrimitiveProps
>(({ title, icon, description, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 min-w-0", className)}
      {...props}
    >
      {/* 图标 + 标题容器 */}
      <div className="flex items-center gap-[var(--gap-md)] min-w-0 overflow-hidden">
        {/* 图标 */}
        {icon && (
          <span className="text-[var(--text-brand)] flex-shrink-0">
            {React.isValidElement(icon)
              ? React.cloneElement(
                  icon as React.ReactElement<{ size?: number }>,
                  {
                    size: 16,
                  },
                )
              : icon}
          </span>
        )}

        {/* 标题 */}
        {title && (
          <span
            className={cn(
              "font-[var(--font-family-en)]",
              "font-[var(--font-weight-400)]",
              "font-size-2",
              "leading-[var(--line-height-2)]",
              "text-[var(--text-primary)]",
              "truncate",
            )}
          >
            {title}
          </span>
        )}
      </div>

      {/* 描述 */}
      {description && (
        <span
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-400)]",
            "font-size-1",
            "leading-[var(--line-height-1)]",
            "text-[var(--text-tertiary)]",
            "truncate",
          )}
        >
          {description}
        </span>
      )}
    </div>
  );
});
ReportCardHeaderPrimitive.displayName = "ReportCardHeaderPrimitive";

// ==================== 默认图标 ====================

/**
 * 默认报告图标
 * @public
 */
export const ReportCardDefaultIcon = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

// ==================== 完整 ReportCard 原语 ====================

/**
 * Report Card 完整原语
 * @public
 */
export const ReportCardPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardPrimitiveProps
>(({ title, description, icon, className, ...props }, ref) => {
  return (
    <ReportCardContainerPrimitive ref={ref} className={className} {...props}>
      {/* 左侧：图标 + 标题 + 描述 */}
      <ReportCardHeaderPrimitive
        icon={icon ?? <ReportCardDefaultIcon />}
        title={title}
        description={description}
      />
    </ReportCardContainerPrimitive>
  );
});
ReportCardPrimitive.displayName = "ReportCardPrimitive";

// ==================== 类型导出 ====================

export type {
  ReportCardContainerPrimitiveProps,
  ReportCardHeaderPrimitiveProps,
  ReportCardPrimitiveProps,
};
