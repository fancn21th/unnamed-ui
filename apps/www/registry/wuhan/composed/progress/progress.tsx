"use client";

import * as React from "react";
import {
  ProgressLinePrimitive,
  ProgressCirclePrimitive,
  type ProgressLinePrimitiveProps,
  type ProgressCirclePrimitiveProps,
  type ProgressType,
  type ProgressStatus,
  type ProgressGradient,
  type ProgressCircleSteps,
  type ProgressPercentPosition,
} from "@/registry/wuhan/blocks/progress/progress-01";

// ==================== 类型定义 ====================

/**
 * Progress 通用属性
 * @public
 */
interface ProgressCommonProps {
  /** 进度条类型 */
  type?: ProgressType;
  /** 进度百分比 0-100 */
  percent?: number;
  /** 状态 */
  status?: ProgressStatus;
  /** 是否显示进度文字 */
  showInfo?: boolean;
  /** 自定义文字格式 */
  format?: (percent?: number) => React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

/**
 * Progress 线性进度条属性
 * @public
 */
interface ProgressLineProps extends ProgressCommonProps {
  type?: "line";
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
}

/**
 * Progress 圆形进度条属性
 * @public
 */
interface ProgressCircleProps extends ProgressCommonProps {
  type: "circle";
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
}

/**
 * Progress 组件属性
 * @public
 */
export type ProgressProps = ProgressLineProps | ProgressCircleProps;

// ==================== 组合组件 ====================

/**
 * Progress 进度条组件
 *
 * 支持两种类型的进度条：
 * - line: 线性进度条（默认）
 * - circle: 圆形进度条
 *
 * @example
 * // 线性进度条
 * <Progress percent={50} />
 *
 * @example
 * // 圆形进度条
 * <Progress type="circle" percent={75} />
 *
 * @example
 * // 渐变色进度条
 * <Progress
 *   percent={60}
 *   strokeColor={{ from: "#108ee9", to: "#87d068" }}
 * />
 *
 * @example
 * // 步进进度条
 * <Progress percent={50} steps={5} />
 *
 * @public
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ type = "line", ...props }, ref) => {
    if (type === "circle") {
      const {
        percent = 0,
        status = "normal",
        showInfo = true,
        strokeColor,
        trailColor,
        strokeWidth,
        width,
        steps,
        format,
        className,
      } = props as ProgressCircleProps;

      return (
        <ProgressCirclePrimitive
          ref={ref}
          percent={percent}
          status={status}
          showInfo={showInfo}
          strokeColor={strokeColor}
          trailColor={trailColor}
          strokeWidth={strokeWidth}
          width={width}
          steps={steps}
          format={format}
          className={className}
        />
      );
    }

    // 线性进度条
    const {
      percent = 0,
      status = "normal",
      showInfo = true,
      strokeColor,
      trailColor,
      strokeWidth,
      steps,
      percentPosition,
      format,
      className,
    } = props as ProgressLineProps;

    return (
      <ProgressLinePrimitive
        ref={ref}
        percent={percent}
        status={status}
        showInfo={showInfo}
        strokeColor={strokeColor}
        trailColor={trailColor}
        strokeWidth={strokeWidth}
        steps={steps}
        percentPosition={percentPosition}
        format={format}
        className={className}
      />
    );
  },
);

Progress.displayName = "Progress";

// 导出类型
export type {
  ProgressType,
  ProgressStatus,
  ProgressGradient,
  ProgressCircleSteps,
  ProgressPercentPosition,
};
