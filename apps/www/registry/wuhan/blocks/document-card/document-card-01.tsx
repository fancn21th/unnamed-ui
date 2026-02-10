"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * Document Card 容器原语属性
 * @public
 */
interface DocumentCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Document Card 头部原语属性
 * @public
 */
interface DocumentCardHeaderPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 更新时间 */
  updateTime?: React.ReactNode;
  [key: string]: any;
}

/**
 * Document Card 属性行原语属性
 * @public
 */
interface DocumentCardFieldPrimitiveProps {
  /** 标签文本 */
  label?: React.ReactNode;
  /** 数值内容 */
  value?: React.ReactNode;
  /** 是否为带边框的值容器（用于特殊字段如研究主题） */
  hasBorderValue?: boolean;
  className?: string;
}

/**
 * Document Card 生成中状态属性
 * @public
 */
interface DocumentCardGeneratingPrimitiveProps {
  /** 进度百分比 (0-100) */
  progress?: number;
  /** 生成信息文本（如：正在生成研究报告 · 预计5-10分钟） */
  generatingInfo?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * Document Card 完整原语属性
 * @public
 */
interface DocumentCardPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 更新时间 */
  updateTime?: React.ReactNode;
  /** 头部区域（可选自定义） */
  header?: React.ReactNode;
  /** 属性列表 */
  fields?: {
    label: string;
    value: React.ReactNode;
    hasBorderValue?: boolean;
  }[];
  /** 生成中状态配置 */
  generating?: {
    progress?: number;
    generatingInfo?: React.ReactNode;
  };
  /** 自定义类名 */
  className?: string;
}

// ==================== 原语组件 ====================

/**
 * Document Card 容器原语
 * @public
 */
export const DocumentCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  DocumentCardContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "min-w-[320px]",
        "gap-[var(--gap-md)]",
        "flex flex-col",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-page-brand)]",
        "border border-[var(--border-brand-light)]",
        "shadow-[var(--shadow-sm)]",
        "p-[var(--padding-com-xl)]",
        "transition-all",
        "duration-200",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DocumentCardContainerPrimitive.displayName = "DocumentCardContainerPrimitive";

/**
 * Document Card 头部原语
 * @public
 */
export const DocumentCardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  DocumentCardHeaderPrimitiveProps
>(({ title, icon, updateTime, className, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-col gap-[var(--gap-md)] min-w-0", className)}
      {...props}
    >
      {/* 第一行：图标 + 标题 */}
      <div className="flex items-center gap-[var(--gap-md)] min-w-0 overflow-hidden">
        {/* 图标 */}
        {icon && (
          <span className="text-[var(--text-title)] flex-shrink-0">
            {React.isValidElement(icon)
              ? React.cloneElement(
                  icon as React.ReactElement<{ size?: number }>,
                  {
                    size: 24,
                  },
                )
              : icon}
          </span>
        )}

        {/* 标题 */}
        {title && (
          <span
            className={cn(
              "font-[var(--font-family-cn)]",
              "font-semibold",
              "font-size-4",
              "leading-[var(--line-height-4)]",
              "text-[var(--text-title)]",
              "truncate",
            )}
          >
            {title}
          </span>
        )}
      </div>

      {/* 第二行：更新时间 */}
      {updateTime && (
        <div className="flex items-center text-[var(--text-secondary)] font-[var(--font-family-cn)] font-[var(--font-weight-400)] font-size-1 leading-[var(--line-height-1)] gap-[var(--gap-sm)]">
          {updateTime}
        </div>
      )}
    </div>
  );
});
DocumentCardHeaderPrimitive.displayName = "DocumentCardHeaderPrimitive";

/**
 * Document Card 分割线原语
 * @public
 */
export const DocumentCardSeparatorPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "h-[1px]",
        "bg-[var(--divider-neutral-basic)]",
        className,
      )}
      {...props}
    />
  );
});
DocumentCardSeparatorPrimitive.displayName = "DocumentCardSeparatorPrimitive";

/**
 * Document Card 属性行原语
 * @public
 */
export const DocumentCardFieldPrimitive = React.forwardRef<
  HTMLDivElement,
  DocumentCardFieldPrimitiveProps
>(({ label, value, hasBorderValue = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-[var(--gap-xs)]", className)}
      {...props}
    >
      {/* 标签 */}
      {label && (
        <span
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-400)]",
            "font-size-1",
            "leading-[var(--line-height-1)]",
            "text-[var(--text-tertiary)]",
            "flex-shrink-0",
          )}
        >
          {label}
        </span>
      )}

      {/* 数值内容 */}
      {value &&
        (hasBorderValue ? (
          <span
            className={cn(
              "inline-flex",
              "items-center",
              "px-[var(--padding-com-xs)]",
              "py-[var(--padding-com-2xs)]",
              "rounded-[var(--radius-sm)]",
              "border border-[var(--border-neutral)]",
              "bg-[var(--bg-container)]",
              "font-[var(--font-family-cn)]",
              "font-[var(--font-weight-400)]",
              "font-size-1",
              "leading-[var(--line-height-1)]",
              "text-[var(--text-primary)]",
              "truncate",
            )}
          >
            {value}
          </span>
        ) : (
          <span
            className={cn(
              "font-[var(--font-family-cn)]",
              "font-[var(--font-weight-400)]",
              "font-size-1",
              "leading-[var(--line-height-1)]",
              "text-[var(--text-primary)]",
              "truncate",
            )}
          >
            {value}
          </span>
        ))}
    </div>
  );
});
DocumentCardFieldPrimitive.displayName = "DocumentCardFieldPrimitive";

/**
 * Document Card 生成中原语
 * @public
 */
export const DocumentCardGeneratingPrimitive = React.forwardRef<
  HTMLDivElement,
  DocumentCardGeneratingPrimitiveProps
>(({ progress = 0, generatingInfo, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-[var(--gap-md)]", className)}
    >
      {/* 进度条 */}
      <div className="w-full">
        <div
          className={cn(
            "w-full",
            "h-[var(--space-2)]",
            "rounded-[var(--radius-circle)]",
            "bg-[var(--bg-container-placeholder)]",
            "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "h-full",
              "rounded-[var(--radius-circle)]",
              "bg-[var(--bg-brand)]",
              "transition-all duration-300",
            )}
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      </div>
      {/* 生成信息文本 */}
      {generatingInfo && (
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-400)]",
            "font-size-1",
            "leading-[var(--line-height-1)]",
            "text-[var(--text-secondary)]",
          )}
        >
          {generatingInfo}
        </div>
      )}
    </div>
  );
});
DocumentCardGeneratingPrimitive.displayName = "DocumentCardGeneratingPrimitive";

// ==================== 默认图标 ====================

/**
 * 默认文档图标（显微镜+节点意象）
 * @public
 */
export const DocumentCardDefaultIcon = ({
  className,
  size = 24,
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
    {/* 显微镜意象 */}
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
    {/* 节点意象 */}
    <circle cx="11" cy="11" r="2" fill="currentColor" />
  </svg>
);

// ==================== 完整 DocumentCard 原语 ====================

/**
 * Document Card 完整原语
 * @public
 */
export const DocumentCardPrimitive = React.forwardRef<
  HTMLDivElement,
  DocumentCardPrimitiveProps
>(
  (
    {
      title,
      icon,
      updateTime,
      header,
      fields = [],
      generating,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <DocumentCardContainerPrimitive
        ref={ref}
        className={className}
        {...props}
      >
        {/* 生成中状态 */}
        {generating ? (
          <div className="flex flex-col gap-[var(--gap-md)]">
            {/* 头部区域 */}
            {header || (
              <DocumentCardHeaderPrimitive
                icon={icon ?? <DocumentCardDefaultIcon />}
                title={title}
              />
            )}

            {/* 生成进度区域 */}
            <DocumentCardGeneratingPrimitive
              progress={generating.progress}
              generatingInfo={generating.generatingInfo}
            />
          </div>
        ) : (
          <>
            {/* 头部区域 */}
            {header || (
              <div>
                <DocumentCardHeaderPrimitive
                  icon={icon ?? <DocumentCardDefaultIcon />}
                  title={title}
                  updateTime={updateTime}
                />
              </div>
            )}

            {/* 分割线 */}
            <DocumentCardSeparatorPrimitive />

            {/* 详细属性区 */}
            {fields.length > 0 && (
              <div className="flex flex-col gap-1">
                {fields.map((field, index) => (
                  <DocumentCardFieldPrimitive
                    key={index}
                    label={field.label}
                    value={field.value}
                    hasBorderValue={field.hasBorderValue}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </DocumentCardContainerPrimitive>
    );
  },
);
DocumentCardPrimitive.displayName = "DocumentCardPrimitive";

// ==================== 类型导出 ====================

export type {
  DocumentCardContainerPrimitiveProps,
  DocumentCardHeaderPrimitiveProps,
  DocumentCardFieldPrimitiveProps,
  DocumentCardGeneratingPrimitiveProps,
  DocumentCardPrimitiveProps,
};
