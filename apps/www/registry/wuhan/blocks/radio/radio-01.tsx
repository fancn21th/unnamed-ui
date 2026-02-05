"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RadioGroup } from "radix-ui";
import { Circle } from "lucide-react";

//#region RadioGroupRoot 原语
/**
 * 单选框组根元素原语
 * 用于包裹所有单选框选项
 */
const RadioGroupRootPrimitive = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Root
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
});
RadioGroupRootPrimitive.displayName = "RadioGroupRootPrimitive";
//#endregion

//#region RadioGroupItem 原语
/**
 * 单选框选项原语
 * 包含完整的样式配置：边框、hover、选中、禁用等状态
 */
const RadioGroupItemPrimitive = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full",
        // 默认边框颜色
        "border border-[var(--border-neutral)]",
        // 背景色
        "bg-[var(--bg-container)]",
        // 过渡动画
        "transition-all duration-200",
        // Hover 状态
        "hover:border-[var(--border-brand)]",
        // Focus 状态
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--ring)]",
        "focus-visible:ring-offset-2",
        // 选中状态
        "data-[state=checked]:border-[var(--border-brand)]",
        "data-[state=checked]:bg-[var(--bg-brand)]",
        // 禁用状态
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:hover:border-[var(--border-neutral)]",
        "disabled:data-[state=checked]:bg-[var(--bg-neutral)]",
        "disabled:data-[state=checked]:border-[var(--border-neutral)]",
        className,
      )}
      {...props}
    />
  );
});
RadioGroupItemPrimitive.displayName = "RadioGroupItemPrimitive";
//#endregion

//#region RadioGroupIndicator 原语
/**
 * 单选框选中指示器原语
 * 在选中时显示圆点图标
 */
const RadioGroupIndicatorPrimitive = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Indicator>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup.Indicator
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Circle className="h-2 w-2 fill-current text-white" />
    </RadioGroup.Indicator>
  );
});
RadioGroupIndicatorPrimitive.displayName = "RadioGroupIndicatorPrimitive";
//#endregion

//#region RadioLabel 原语
/**
 * 单选框标签原语
 * 用于显示单选框的文本标签
 */
const RadioLabelPrimitive = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        "cursor-pointer",
        "peer-disabled:cursor-not-allowed",
        "peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
RadioLabelPrimitive.displayName = "RadioLabelPrimitive";
//#endregion

export {
  RadioGroupRootPrimitive,
  RadioGroupItemPrimitive,
  RadioGroupIndicatorPrimitive,
  RadioLabelPrimitive,
};
