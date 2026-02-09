"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Check, X } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * Goal Card 语义状态
 * @public
 */
type GoalCardSemanticStatus =
  | "in_progress" // 进行中 - 品牌色
  | "completed" // 已完成 - 绿色 + 对号
  | "failed"; // 已失败 - 错误色 + 叉号

/**
 * Goal Card 进度类型
 * @public
 */
interface GoalCardProgress {
  /** 当前值 */
  value: number;
  /** 最大值，默认为 100 */
  max?: number;
}

/**
 * Goal Card 容器原语属性
 * @public
 */
interface GoalCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
}

/**
 * Goal Card 头部原语属性
 * @public
 */
interface GoalCardHeaderPrimitiveProps {
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
 * Goal Card 进度原语属性
 * @public
 */
interface GoalCardProgressPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 进度值 0-100 */
  progress: number;
  /** 状态 */
  status?: GoalCardSemanticStatus;
  /** 是否显示百分比文字 */
  showPercentage?: boolean;
  /** 100% 时显示对号而不是百分比 */
  showCheckmarkOnComplete?: boolean;
  /** 失败时显示叉号而不是百分比 */
  showCrossOnFailed?: boolean;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
}

/**
 * Goal Card 完整原语属性
 * @public
 */
interface GoalCardPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 进度值 0-100 */
  progress?: number;
  /** 最大值 */
  max?: number;
  /** 状态 */
  status?: GoalCardSemanticStatus;
  /** 尺寸 */
  size?: "sm" | "md" | "lg";
  /** 100% 时显示对号而不是百分比 */
  showCheckmarkOnComplete?: boolean;
  /** 失败时显示叉号而不是百分比 */
  showCrossOnFailed?: boolean;
  className?: string;
}

// ==================== 工具函数 ====================

/**
 * 解析进度值为百分比
 */
const getProgressPercentage = (value: number, max: number): number => {
  return Math.min(100, Math.max(0, Math.round((value / max) * 100)));
};

/**
 * 获取状态对应的颜色
 */
const getStatusColor = (
  status: GoalCardSemanticStatus,
): { stroke: string; text: string; bg: string } => {
  switch (status) {
    case "completed":
      return {
        stroke: "var(--text-success)",
        text: "var(--text-success)",
        bg: "var(--bg-success-light)",
      };
    case "failed":
      return {
        stroke: "var(--text-error)",
        text: "var(--text-error)",
        bg: "var(--bg-error-light)",
      };
    case "in_progress":
    default:
      return {
        stroke: "var(--text-brand)",
        text: "var(--text-brand)",
        bg: "var(--bg-brand-light)",
      };
  }
};

// ==================== 环形进度条组件 ====================

/**
 * 环形进度条 SVG 组件（内部使用）
 */
interface CircularProgressSvgProps {
  progress: number;
  size: number;
  strokeWidth: number;
  strokeColor: string;
  trackColor: string;
}

const CircularProgressSvg = ({
  progress,
  size,
  strokeWidth,
  strokeColor,
  trackColor,
}: CircularProgressSvgProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* 背景轨道 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* 进度 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
};

// ==================== 原语组件 ====================

/**
 * Goal Card 容器原语
 * @public
 */
export const GoalCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  GoalCardContainerPrimitiveProps
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
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        "flex items-center",
        "justify-between",
        "transition-colors",
        "duration-200",
        "hover:bg-[var(--bg-neutral-light)]",
        className,
      )}
      style={{ padding, gap }}
      {...props}
    >
      {children}
    </div>
  );
});
GoalCardContainerPrimitive.displayName = "GoalCardContainerPrimitive";

/**
 * Goal Card 头部原语
 * @public
 */
export const GoalCardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  GoalCardHeaderPrimitiveProps
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
GoalCardHeaderPrimitive.displayName = "GoalCardHeaderPrimitive";

/**
 * Goal Card 进度原语
 * @public
 */
export const GoalCardProgressPrimitive = React.forwardRef<
  HTMLDivElement,
  GoalCardProgressPrimitiveProps
>(
  (
    {
      progress = 0,
      status = "in_progress",
      showPercentage = true,
      showCheckmarkOnComplete = true,
      showCrossOnFailed = true,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    // 根据尺寸配置进度条大小和线宽
    const sizeConfig: Record<
      "sm" | "md" | "lg",
      {
        fixedSize: number;
        strokeWidth: number;
        iconSize: number;
        fontSize: string;
      }
    > = {
      sm: { fixedSize: 28, strokeWidth: 2.5, iconSize: 12, fontSize: "10px" },
      md: { fixedSize: 36, strokeWidth: 3, iconSize: 16, fontSize: "12px" },
      lg: { fixedSize: 48, strokeWidth: 4, iconSize: 20, fontSize: "14px" },
    };

    const sizeKey: "sm" | "md" | "lg" = size;
    const { fixedSize, strokeWidth, iconSize, fontSize } = sizeConfig[sizeKey];

    const percentage = Math.min(100, Math.max(0, progress));

    // 获取状态对应的颜色
    const statusColor = getStatusColor(status);

    // 拆分百分比为数字和符号
    const percentageStr = percentage.toString();
    const percentSymbol = "%";

    // 判断是否显示对号（完成状态且开启）
    const showCheckmark = showCheckmarkOnComplete && status === "completed";
    // 判断是否显示叉号（失败状态且开启）
    const showCross = showCrossOnFailed && status === "failed";

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          "flex items-center",
          "justify-center",
          className,
        )}
        style={{ width: fixedSize, height: fixedSize }}
        {...props}
      >
        {/* SVG 进度条 */}
        <CircularProgressSvg
          progress={percentage}
          size={fixedSize}
          strokeWidth={strokeWidth}
          strokeColor={statusColor.stroke}
          trackColor="var(--bg-neutral-light)"
        />

        {/* 100% 完成时显示对号 */}
        {showCheckmark && (
          <div
            className={cn("absolute", "flex items-center", "justify-center")}
            style={{ color: statusColor.text }}
          >
            <Check size={iconSize} strokeWidth={3} />
          </div>
        )}

        {/* 失败时显示叉号 */}
        {showCross && (
          <div
            className={cn("absolute", "flex items-center", "justify-center")}
            style={{ color: statusColor.text }}
          >
            <X size={iconSize} strokeWidth={3} />
          </div>
        )}

        {/* 百分比文字 - 不显示对号或叉号时 */}
        {!showCheckmark && !showCross && (
          <div
            className={cn(
              "absolute",
              "flex items-baseline",
              "justify-center",
              "leading-none",
            )}
            style={{ color: statusColor.text }}
          >
            <span
              className={cn(
                "font-[var(--font-family-en)]",
                "font-[var(--font-weight-400)]",
              )}
              style={{ fontSize }}
            >
              {percentageStr}
            </span>
            <span
              className={cn(
                "font-[var(--font-weight-400)]",
                "text-[var(--text-secondary)]",
              )}
              style={{
                fontSize: `${parseInt(fontSize) * 0.65}px`,
                lineHeight: 1,
              }}
            >
              {percentSymbol}
            </span>
          </div>
        )}
      </div>
    );
  },
);
GoalCardProgressPrimitive.displayName = "GoalCardProgressPrimitive";

// ==================== 默认图标 ====================

/**
 * 默认 AI 图标
 */
export const GoalCardAiIcon = ({
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

// ==================== 完整 GoalCard 原语 ====================

/**
 * Goal Card 完整原语
 * @public
 */
export const GoalCardPrimitive = React.forwardRef<
  HTMLDivElement,
  GoalCardPrimitiveProps
>(
  (
    {
      title,
      description,
      icon,
      progress = 0,
      max = 100,
      status,
      size = "md",
      showCheckmarkOnComplete = true,
      showCrossOnFailed = true,
      className,
      ...props
    },
    ref,
  ) => {
    const percentage = getProgressPercentage(progress, max);

    // 根据进度自动推断状态（除非用户已指定状态）
    const inferredStatus: GoalCardSemanticStatus =
      status ?? (percentage >= 100 ? "completed" : "in_progress");

    // 根据实际状态获取颜色
    const statusColor = getStatusColor(inferredStatus);

    return (
      <GoalCardContainerPrimitive
        ref={ref}
        size={size}
        className={className}
        {...props}
      >
        {/* 左侧：图标 + 标题 */}
        <GoalCardHeaderPrimitive
          size={size}
          icon={
            icon ??
            (size === "sm" ? (
              <GoalCardAiIcon size={14} />
            ) : size === "lg" ? (
              <GoalCardAiIcon size={20} />
            ) : (
              <GoalCardAiIcon size={16} />
            ))
          }
          title={title}
        />

        {/* 右侧：进度 */}
        <GoalCardProgressPrimitive
          progress={percentage}
          status={inferredStatus}
          size={size}
          showPercentage={true}
          showCheckmarkOnComplete={showCheckmarkOnComplete}
          showCrossOnFailed={showCrossOnFailed}
        />
      </GoalCardContainerPrimitive>
    );
  },
);
GoalCardPrimitive.displayName = "GoalCardPrimitive";

// ==================== 类型导出 ====================

export type {
  GoalCardSemanticStatus,
  GoalCardProgress,
  GoalCardContainerPrimitiveProps,
  GoalCardHeaderPrimitiveProps,
  GoalCardProgressPrimitiveProps,
  GoalCardPrimitiveProps,
};
