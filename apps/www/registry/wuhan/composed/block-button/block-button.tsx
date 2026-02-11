"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import {
  ButtonPrimitive,
  type ButtonPrimitiveProps,
} from "@/registry/wuhan/blocks/block-button/block-button-01";

export type { ButtonPrimitiveProps };

// ==================== 图标类型定义 ====================

/**
 * 支持的图标类型
 * - React.ReactNode: 任何 React 节点（如 Lucide 图标）
 * - React.ComponentType: SVG 组件
 */
export type ButtonIcon =
  | React.ReactNode
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

// ==================== 组合按钮Props类型 ====================

export interface ButtonProps extends ButtonPrimitiveProps {
  /**
   * 作为子组件渲染（支持 asChild）
   * @default false
   */
  asChild?: boolean;
  /**
   * 是否为全宽按钮
   * @default false
   */
  block?: boolean;
  /**
   * 图标组件（显示在文字前面）
   */
  icon?: ButtonIcon;
  /**
   * 图标组件（显示在文字后面）
   */
  iconRight?: ButtonIcon;
  /**
   * 自定义类名
   */
  className?: string;
}

// ==================== 组件实现 ====================

/**
 * 渲染图标组件
 * 支持 React.ReactNode 和 React.ComponentType 两种类型
 */
const renderIcon = (icon: ButtonIcon, loading: boolean): React.ReactNode => {
  if (!icon || loading) return null;

  // 如果是 React 元素，直接返回并添加样式类
  if (React.isValidElement(icon)) {
    return (
      <span className="size-4 shrink-0 flex items-center justify-center">
        {icon}
      </span>
    );
  }

  // 如果是组件类型（如 SVG 组件）
  const IconComponent = icon as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  if (
    typeof IconComponent === "function" ||
    typeof IconComponent === "object"
  ) {
    return <IconComponent className="size-4 shrink-0" aria-hidden="true" />;
  }

  return null;
};

/**
 * 组合按钮组件
 * 在原语按钮基础上添加便捷 props 和更好的类型支持
 * @public
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      asChild = false,
      block = false,
      icon,
      iconRight,
      className,
      disabled,
      loading,
      progress,
      progressValue,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : ButtonPrimitive;

    // 处理禁用状态
    const isDisabled = Boolean(disabled || loading || progress);

    // 组合类名
    const combinedClassName = block ? cn(className, "w-full") : className;

    // 判断是否有文字内容
    const hasChildren = children != null && children !== "";

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={combinedClassName}
        data-slot="button"
        variant={props.variant}
        color={props.color}
        size={props.size}
        loading={Boolean(loading)}
        progress={Boolean(progress)}
        progressValue={progressValue}
        {...props}
      >
        {/* 内容容器 - 确保图标和文字居中对齐 */}
        <div
          className={cn(
            "flex items-center",
            hasChildren && "gap-[var(--gap-md)]",
          )}
        >
          {/* 左侧图标 */}
          {renderIcon(icon, Boolean(loading))}

          {/* 文字内容 */}
          <span className="whitespace-nowrap">{children}</span>

          {/* 右侧图标 */}
          {renderIcon(iconRight, Boolean(loading))}
        </div>
      </Comp>
    );
  },
);

Button.displayName = "Button";

// 导出
export { Button as ButtonComposed };
