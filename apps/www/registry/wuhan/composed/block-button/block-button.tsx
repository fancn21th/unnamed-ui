"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import {
  ButtonPrimitive,
  type ButtonPrimitiveProps,
} from "@/registry/wuhan/blocks/block-button/block-button-01";

export type { ButtonPrimitiveProps };

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
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /**
   * 图标组件（显示在文字后面）
   */
  iconRight?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /**
   * 自定义类名
   */
  className?: string;
}

// ==================== 组件实现 ====================

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
      icon: Icon,
      iconRight: IconRight,
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
    const isDisabled = disabled || loading || progress;

    // 组合类名
    const combinedClassName = block ? cn(className, "w-full") : className;

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={combinedClassName}
        data-slot="button"
        variant={props.variant}
        color={props.color}
        size={props.size}
        loading={loading}
        progress={progress}
        progressValue={progressValue}
        {...props}
      >
        {/* 内容容器 - 确保图标和文字居中对齐 */}
        <div className="flex items-center gap-[var(--gap-md)]">
          {/* 图标 */}
          {Icon && !loading && (
            <Icon className="size-4 shrink-0" aria-hidden="true" />
          )}

          {/* 文字内容 */}
          <span className="whitespace-nowrap">{children}</span>

          {/* 右侧图标 */}
          {IconRight && !loading && (
            <IconRight className="size-4 shrink-0" aria-hidden="true" />
          )}
        </div>
      </Comp>
    );
  },
);

Button.displayName = "Button";

// 导出
export { Button as ButtonComposed };
