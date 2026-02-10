"use client";

import * as React from "react";
import {
  DividerContainerPrimitive,
  DividerLinePrimitive,
  DividerTextPrimitive,
  type DividerOrientation,
  type DividerVariant,
  type DividerTextAlign,
} from "@/registry/wuhan/blocks/divider/divider-01";

/**
 * Divider 组件的属性
 */
export interface DividerProps {
  /** 方向 */
  orientation?: DividerOrientation;
  /** 样式变体 */
  variant?: DividerVariant;
  /** 颜色 */
  color?: string;
  /** 宽度（粗细） */
  thickness?: string;
  /** 文本内容 */
  children?: React.ReactNode;
  /** 文本位置（仅在有文本时有效） */
  textAlign?: DividerTextAlign;
  /** 自定义类名 */
  className?: string;
}

/**
 * Divider 组件
 * 支持水平和垂直方向、实线和虚线样式、自定义颜色和宽度、文本内容
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      color = "var(--divider-neutral-basic)",
      thickness = "1px",
      children,
      textAlign = "center",
      className,
    },
    ref,
  ) => {
    const hasText = Boolean(children);

    // 没有文本时，渲染简单的分割线
    if (!hasText) {
      return (
        <DividerContainerPrimitive
          ref={ref}
          orientation={orientation}
          hasText={false}
          className={className}
        >
          <DividerLinePrimitive
            orientation={orientation}
            variant={variant}
            color={color}
            thickness={thickness}
          />
        </DividerContainerPrimitive>
      );
    }

    // 有文本时，根据文本位置渲染分割线
    return (
      <DividerContainerPrimitive
        ref={ref}
        orientation={orientation}
        hasText={true}
        className={className}
      >
        {/* 左侧/上方的线段 */}
        {textAlign !== "left" && (
          <DividerLinePrimitive
            orientation={orientation}
            variant={variant}
            color={color}
            thickness={thickness}
            isPartial={true}
          />
        )}

        {/* 文本内容 */}
        <DividerTextPrimitive orientation={orientation}>
          {children}
        </DividerTextPrimitive>

        {/* 右侧/下方的线段 */}
        {textAlign !== "right" && (
          <DividerLinePrimitive
            orientation={orientation}
            variant={variant}
            color={color}
            thickness={thickness}
            isPartial={true}
          />
        )}
      </DividerContainerPrimitive>
    );
  },
);

Divider.displayName = "Divider";
