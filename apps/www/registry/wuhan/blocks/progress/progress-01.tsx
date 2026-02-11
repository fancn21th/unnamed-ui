"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, CircleCheck, CircleX } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * Progress 进度条类型
 * @public
 */
export type ProgressType = "line" | "circle";

/**
 * Progress 状态
 * @public
 */
export type ProgressStatus = "normal" | "success" | "exception";

/**
 * Progress 渐变色配置
 * @public
 */
export interface ProgressGradient {
  from: string;
  to: string;
  direction?: string;
}

/**
 * Progress 圆形进度条步数配置
 * @public
 */
export interface ProgressCircleSteps {
  count: number;
  gap: number;
}

/**
 * Progress 百分比位置配置
 * @public
 */
export interface ProgressPercentPosition {
  align: "start" | "center" | "end";
  type: "inner" | "outer";
}

/**
 * Progress 线性进度条原语属性
 * @public
 */
export interface ProgressLinePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 进度百分比 0-100 */
  percent?: number;
  /** 状态 */
  status?: ProgressStatus;
  /** 是否显示进度文字 */
  showInfo?: boolean;
  /** 进度条颜色 */
  strokeColor?: string | string[] | ProgressGradient;
  /** 轨道颜色 */
  trailColor?: string;
  /** 进度条线的宽度，单位 px */
  strokeWidth?: number;
  /** 步数 */
  steps?: number;
  /** 百分比位置 */
  percentPosition?: ProgressPercentPosition;
  /** 自定义文字格式 */
  format?: (percent?: number) => React.ReactNode;
}

/**
 * Progress 圆形进度条原语属性
 * @public
 */
export interface ProgressCirclePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 进度百分比 0-100 */
  percent?: number;
  /** 状态 */
  status?: ProgressStatus;
  /** 是否显示进度文字 */
  showInfo?: boolean;
  /** 圆形进度条颜色 */
  strokeColor?: string | { [key: string]: string };
  /** 轨道颜色 */
  trailColor?: string;
  /** 圆形进度条线的宽度，单位是进度条画布宽度的百分比 */
  strokeWidth?: number;
  /** 圆形进度条的画布宽度，单位 px */
  width?: number;
  /** 步数配置 */
  steps?: number | ProgressCircleSteps;
  /** 自定义文字格式 */
  format?: (percent?: number) => React.ReactNode;
}

// ==================== 工具函数 ====================

/**
 * 获取状态对应的颜色（线性进度条）
 */
const getLineStatusColor = (
  status: ProgressStatus,
  percent: number,
): string => {
  if (percent === 100 || status === "success") {
    return "var(--bg-success)";
  }
  if (status === "exception") {
    return "var(--bg-error)";
  }
  return "var(--bg-brand)";
};

/**
 * 获取状态对应的颜色（圆形进度条）
 */
const getCircleStatusColor = (
  status: ProgressStatus,
  percent: number,
): string => {
  if (percent === 100 || status === "success") {
    return "var(--border-success)";
  }
  if (status === "exception") {
    return "var(--border-error)";
  }
  return "var(--text-brand)";
};

/**
 * 获取状态对应的颜色（旧版，保留兼容）
 */
const getStatusColor = (status: ProgressStatus): string => {
  switch (status) {
    case "success":
      return "var(--text-success)";
    case "exception":
      return "var(--text-error)";
    case "normal":
    default:
      return "var(--text-brand)";
  }
};

/**
 * 解析渐变色配置
 */
const parseGradient = (gradient: ProgressGradient): string => {
  const { from, to, direction = "to right" } = gradient;
  return `linear-gradient(${direction}, ${from}, ${to})`;
};

/**
 * 解析进度条颜色
 */
const parseStrokeColor = (
  strokeColor:
    | string
    | string[]
    | ProgressGradient
    | { [key: string]: string }
    | undefined,
  status: ProgressStatus,
  percent: number,
  type: "line" | "circle" = "line",
): string | undefined => {
  if (!strokeColor) {
    return undefined; // 返回 undefined，由调用方决定默认颜色
  }

  if (typeof strokeColor === "string") {
    return strokeColor;
  }

  if (Array.isArray(strokeColor)) {
    // 线性进度条的数组颜色（多步进度条）
    return strokeColor[0] || undefined;
  }

  if ("from" in strokeColor && "to" in strokeColor) {
    // 渐变色配置
    return parseGradient(strokeColor as ProgressGradient);
  }

  if (type === "circle") {
    // 圆形进度条的渐变色配置 { '0%': '#108ee9', '100%': '#87d068' }
    const sortedKeys = Object.keys(strokeColor).sort(
      (a, b) => parseFloat(a) - parseFloat(b),
    );
    if (sortedKeys.length === 0) return undefined;

    // 找到当前进度对应的颜色
    for (let i = 0; i < sortedKeys.length; i++) {
      const key = sortedKeys[i];
      const keyPercent = parseFloat(key);
      if (percent <= keyPercent) {
        return strokeColor[key];
      }
    }
    return strokeColor[sortedKeys[sortedKeys.length - 1]];
  }

  return undefined;
};

/**
 * 默认格式化函数
 */
const defaultFormat = (percent?: number): string => {
  return `${Math.round(percent || 0)}%`;
};

// ==================== 圆形进度条 SVG 组件 ====================

interface CircularProgressSvgProps {
  percent: number;
  width: number;
  strokeWidth: number;
  strokeColor: string;
  trailColor: string;
}

const CircularProgressSvg = ({
  percent,
  width,
  strokeWidth,
  strokeColor,
  trailColor,
}: CircularProgressSvgProps) => {
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      className="transform -rotate-90"
    >
      {/* 背景轨道 */}
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        fill="none"
        stroke={trailColor}
        strokeWidth={strokeWidth}
      />
      {/* 进度 */}
      <circle
        cx={width / 2}
        cy={width / 2}
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
 * Progress 线性进度条原语
 * @public
 */
export const ProgressLinePrimitive = React.forwardRef<
  HTMLDivElement,
  ProgressLinePrimitiveProps
>(
  (
    {
      percent = 0,
      status = "normal",
      showInfo = true,
      strokeColor,
      trailColor = "var(--bg-container-placeholder)",
      strokeWidth = 8,
      steps,
      percentPosition = { align: "end", type: "outer" },
      format = defaultFormat,
      className,
      ...props
    },
    ref,
  ) => {
    const validPercent = Math.min(100, Math.max(0, percent));
    const color =
      parseStrokeColor(strokeColor, status, validPercent, "line") ||
      getLineStatusColor(status, validPercent);

    // 判断是否使用步进模式
    const isSteps = steps !== undefined && steps > 0;

    // 百分比文字位置
    const isInner = percentPosition.type === "inner";
    const alignClass =
      percentPosition.align === "start"
        ? "justify-start"
        : percentPosition.align === "center"
          ? "justify-center"
          : "justify-end";

    // 判断是否显示图标
    const showSuccessIcon = validPercent === 100 || status === "success";
    const showErrorIcon = status === "exception";
    const showIcon = showSuccessIcon || showErrorIcon;

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 w-full", className)}
        {...props}
      >
        {/* 进度条容器 */}
        <div
          className={cn(
            "flex-1 relative",
            isInner && "flex",
            isInner && alignClass,
          )}
        >
          {isSteps ? (
            // 步进进度条
            <div className="flex gap-0.5 w-full">
              {Array.from({ length: steps }).map((_, index) => {
                const stepPercent = ((index + 1) / steps) * 100;
                const isActive = validPercent >= stepPercent;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex-1 rounded-[var(--radius-circle)] transition-all duration-300",
                    )}
                    style={{
                      height: strokeWidth,
                      backgroundColor: isActive
                        ? Array.isArray(strokeColor)
                          ? strokeColor[index] || color
                          : color
                        : trailColor,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            // 普通进度条
            <div
              className={cn(
                "w-full rounded-[var(--radius-circle)] overflow-hidden",
              )}
              style={{ height: strokeWidth, backgroundColor: trailColor }}
            >
              <div
                className={cn(
                  "h-full rounded-[var(--radius-circle)] transition-all duration-300",
                )}
                style={{
                  width: `${validPercent}%`,
                  background: color,
                }}
              />
            </div>
          )}

          {/* 内部百分比文字 */}
          {showInfo && isInner && !showIcon && (
            <div
              className={cn(
                "absolute inset-0 flex items-center px-2",
                alignClass,
                "font-[var(--font-family-en)]",
                "font-[var(--font-weight-400)]",
                "font-size-1",
                "text-[var(--text-primary)]",
              )}
            >
              {format(validPercent)}
            </div>
          )}
        </div>

        {/* 外部百分比文字或图标 */}
        {showInfo && !isInner && (
          <div
            className={cn(
              "shrink-0",
              "font-[var(--font-family-en)]",
              "font-[var(--font-weight-400)]",
              "font-size-1",
            )}
          >
            {showSuccessIcon ? (
              <CircleCheck className="w-4 h-4 text-[var(--text-success)]" />
            ) : showErrorIcon ? (
              <CircleX className="w-4 h-4 text-[var(--text-error)]" />
            ) : (
              <span className="text-[var(--text-primary)]">
                {format(validPercent)}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
ProgressLinePrimitive.displayName = "ProgressLinePrimitive";

/**
 * Progress 圆形进度条原语
 * @public
 */
export const ProgressCirclePrimitive = React.forwardRef<
  HTMLDivElement,
  ProgressCirclePrimitiveProps
>(
  (
    {
      percent = 0,
      status = "normal",
      showInfo = true,
      strokeColor,
      trailColor = "var(--bg-neutral-light)",
      strokeWidth = 6,
      width = 120,
      steps,
      format = defaultFormat,
      className,
      ...props
    },
    ref,
  ) => {
    const validPercent = Math.min(100, Math.max(0, percent));
    const color =
      parseStrokeColor(strokeColor, status, validPercent, "circle") ||
      getCircleStatusColor(status, validPercent);

    // 计算实际的 strokeWidth（像素值）
    const actualStrokeWidth = (width * strokeWidth) / 100;

    // 判断是否显示图标
    const showSuccessIcon = validPercent === 100 || status === "success";
    const showErrorIcon = status === "exception";
    const showIcon = showSuccessIcon || showErrorIcon;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center relative",
          className,
        )}
        style={{ width, height: width }}
        {...props}
      >
        {/* SVG 圆形进度条 */}
        <CircularProgressSvg
          percent={validPercent}
          width={width}
          strokeWidth={actualStrokeWidth}
          strokeColor={color || getCircleStatusColor(status, validPercent)}
          trailColor={trailColor}
        />

        {/* 百分比文字或图标 */}
        {showInfo && (
          <div
            className={cn(
              "absolute inset-0",
              "flex items-center justify-center",
              "font-[var(--font-family-en)]",
              "font-[var(--font-weight-400)]",
              "text-[var(--text-primary)]",
            )}
            style={{ fontSize: showIcon ? undefined : width * 0.16 }}
          >
            {showSuccessIcon ? (
              <Check
                className="text-[var(--text-success)]"
                style={{ width: width * 0.25, height: width * 0.25 }}
              />
            ) : showErrorIcon ? (
              <X
                className="text-[var(--text-error)]"
                style={{ width: width * 0.25, height: width * 0.25 }}
              />
            ) : (
              format(validPercent)
            )}
          </div>
        )}
      </div>
    );
  },
);
ProgressCirclePrimitive.displayName = "ProgressCirclePrimitive";
