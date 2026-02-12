"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * Agent Card 容器原语属性
 * @public
 */
interface AgentCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
}

/**
 * Agent Card 头部原语属性
 * @public
 */
interface AgentCardHeaderPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  [key: string]: any;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
}

/**
 * Agent Card 完整原语属性
 * @public
 */
interface AgentCardPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ==================== 原语组件 ====================

/**
 * Agent Card 容器原语
 * @public
 */
export const AgentCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  AgentCardContainerPrimitiveProps
>(({ children, size = "md", className, ...props }, ref) => {
  // 根据尺寸配置 padding 和 gap
  const sizeConfig: Record<
    "sm" | "md" | "lg",
    { padding: string; gap: string }
  > = {
    sm: { padding: "var(--padding-com-sm)", gap: "var(--gap-sm)" },
    md: { padding: "var(--padding-com-md)", gap: "var(--gap-md)" },
    lg: { padding: "var(--padding-com-lg)", gap: "var(--gap-lg)" },
  };

  const sizeKey: "sm" | "md" | "lg" = size;
  const { padding, gap } = sizeConfig[sizeKey];

  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "rounded-[var(--radius-xl)]",
        "[background-color:var(--bg-brand-light)]",
        "border border-[var(--border-neutral)]",
        "flex items-center",
        "justify-between",
        "transition-all",
        "duration-200",
        "hover:[background-image:linear-gradient(0deg,var(--bg-mask-soft,rgba(0,0,0,0.08)),var(--bg-mask-soft,rgba(0,0,0,0.08)))]",
        className,
      )}
      style={{ padding, gap }}
      {...props}
    >
      {children}
    </div>
  );
});
AgentCardContainerPrimitive.displayName = "AgentCardContainerPrimitive";

/**
 * Agent Card 头部原语
 * @public
 */
export const AgentCardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  AgentCardHeaderPrimitiveProps
>(({ title, icon, size = "md", className, ...props }, ref) => {
  // 根据尺寸配置图标和字体大小
  const sizeConfig: Record<
    "sm" | "md" | "lg",
    { iconSize: number; titleFontSize: string }
  > = {
    sm: { iconSize: 14, titleFontSize: "font-size-1" },
    md: { iconSize: 16, titleFontSize: "font-size-2" },
    lg: { iconSize: 20, titleFontSize: "font-size-3" },
  };

  const sizeKey: "sm" | "md" | "lg" = size;
  const { iconSize, titleFontSize } = sizeConfig[sizeKey];

  return (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {/* 图标 - 第一行 */}
      {icon && (
        <div className="flex items-center justify-start mb-1">
          <span className="text-[var(--text-brand)]">
            {React.isValidElement(icon)
              ? React.cloneElement(
                  icon as React.ReactElement<{ size?: number }>,
                  {
                    size: iconSize,
                  },
                )
              : icon}
          </span>
        </div>
      )}

      {/* 标题 - 第二行 */}
      {title && (
        <span
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-400)]",
            titleFontSize,
            "leading-[var(--line-height-2)]",
            "text-[var(--text-primary)]",
            "truncate",
          )}
        >
          {title}
        </span>
      )}
    </div>
  );
});
AgentCardHeaderPrimitive.displayName = "AgentCardHeaderPrimitive";

// ==================== 默认图标 ====================

/**
 * 默认 AI 图标
 */
export const AgentCardAiIcon = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <Sparkles
    className={className}
    size={size}
    style={{ color: "var(--text-brand)" }}
  />
);

// ==================== 完整 AgentCard 原语 ====================

/**
 * Agent Card 完整原语
 * @public
 */
export const AgentCardPrimitive = React.forwardRef<
  HTMLDivElement,
  AgentCardPrimitiveProps
>(({ title, description, icon, size = "md", className, ...props }, ref) => {
  return (
    <AgentCardContainerPrimitive
      ref={ref}
      size={size}
      className={className}
      {...props}
    >
      {/* 左侧：图标 + 标题 */}
      <AgentCardHeaderPrimitive
        size={size}
        icon={
          icon ??
          (size === "sm" ? (
            <AgentCardAiIcon size={14} />
          ) : size === "lg" ? (
            <AgentCardAiIcon size={20} />
          ) : (
            <AgentCardAiIcon size={16} />
          ))
        }
        title={title}
      />
    </AgentCardContainerPrimitive>
  );
});
AgentCardPrimitive.displayName = "AgentCardPrimitive";

// ==================== 类型导出 ====================

export type {
  AgentCardContainerPrimitiveProps,
  AgentCardHeaderPrimitiveProps,
  AgentCardPrimitiveProps,
};
