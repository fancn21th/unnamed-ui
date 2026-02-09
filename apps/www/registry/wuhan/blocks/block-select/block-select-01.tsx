"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

//#region SelectTrigger 原语
/**
 * Select Trigger 原语
 * 包含四种状态：默认、hover、focus、disabled
 */
export const SelectTriggerPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <Select.Trigger
      ref={ref}
      className={cn(
        // 尺寸和基础样式
        "h-[var(--size-com-md)] w-[200px] rounded-[var(--radius-md)]",
        "border border-[var(--border-neutral)] bg-[var(--bg-container)]",
        "flex w-full items-center justify-between",
        "px-[var(--padding-com-md)] py-[5px]",
        "font-size-2",
        "font-[var(--font-family-cn)]",
        // Hover 状态
        "hover:border-[var(--border-brand)]",
        // 过渡动画
        "transition-all",
        "duration-300",
        // Focus 状态
        "focus:outline-none",
        "focus-visible:border-[var(--border-brand)]",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--ring)]",
        // Open 状态
        "data-[state=open]:border-[var(--border-brand)]",
        "data-[state=open]:ring-2",
        "data-[state=open]:ring-[var(--ring)]",
        // Disabled 状态
        "disabled:cursor-not-allowed",
        "disabled:border-[var(--border-neutral)]",
        "disabled:bg-[var(--bg-container-disable)]",
        // Placeholder 样式
        "placeholder:text-[var(--text-placeholder)]",
        "data-[placeholder]:text-[var(--text-placeholder)]",
        className,
      )}
      {...props}
    >
      {children}
    </Select.Trigger>
  );
});
SelectTriggerPrimitive.displayName = "SelectTriggerPrimitive";
//#endregion

//#region SelectIcon 原语
/**
 * Select Icon 原语
 * 用于 Trigger 中的图标
 */
export const SelectIconPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Icon>,
  React.ComponentPropsWithoutRef<typeof Select.Icon>
>(({ className, children, ...props }, ref) => {
  return (
    <Select.Icon ref={ref} className={cn(className)} {...props}>
      {children || <ChevronDown className="h-4 w-4 opacity-50" />}
    </Select.Icon>
  );
});
SelectIconPrimitive.displayName = "SelectIconPrimitive";
//#endregion

//#region SelectContent 原语
/**
 * Select Content 原语
 * 下拉内容容器
 */
export const SelectContentPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Content>,
  React.ComponentPropsWithoutRef<typeof Select.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  return (
    <Select.Portal>
      <Select.Content
        ref={ref}
        position={position}
        className={cn(
          // 基础样式
          "z-50 min-w-[8rem] overflow-hidden",
          "rounded-[var(--radius-md)]",
          "border border-[var(--border-neutral)]",
          "bg-[var(--bg-container)]",
          "shadow-md",
          // 动画
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
          <ChevronUp className="h-4 w-4" />
        </Select.ScrollUpButton>
        <Select.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
          <ChevronDown className="h-4 w-4" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  );
});
SelectContentPrimitive.displayName = "SelectContentPrimitive";
//#endregion

//#region SelectItem 原语
/**
 * Select Item 原语
 * 包含四种状态：默认、hover、focus、disabled
 */
export const SelectItemPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Select.Item
      ref={ref}
      className={cn(
        // 基础样式
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-[var(--radius-sm)]",
        "py-[var(--padding-com-sm)] pl-[var(--padding-com-md)] pr-8",
        "text-sm outline-none",
        // 过渡动画
        "transition-colors duration-200",
        // Hover 状态
        "hover:bg-[var(--bg-item-hover)]",
        "hover:text-[var(--text-primary)]",
        // Focus 状态
        "focus:bg-[var(--bg-item-hover)]",
        "focus:text-[var(--text-primary)]",
        // Selected 状态
        "data-[state=checked]:bg-[var(--bg-item-active)]",
        "data-[state=checked]:text-[var(--text-brand)]",
        // Disabled 状态
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:opacity-50",
        "data-[disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="h-4 w-4" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});
SelectItemPrimitive.displayName = "SelectItemPrimitive";
//#endregion

//#region SelectLabel 原语
/**
 * Select Label 原语
 * 选项组标签
 */
export const SelectLabelPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Label>,
  React.ComponentPropsWithoutRef<typeof Select.Label>
>(({ className, ...props }, ref) => {
  return (
    <Select.Label
      ref={ref}
      className={cn(
        "px-[var(--padding-com-md)] py-[var(--padding-com-sm)]",
        "text-sm font-semibold",
        "text-[var(--text-secondary)]",
        className,
      )}
      {...props}
    />
  );
});
SelectLabelPrimitive.displayName = "SelectLabelPrimitive";
//#endregion

//#region SelectSeparator 原语
/**
 * Select Separator 原语
 * 选项分隔线
 */
export const SelectSeparatorPrimitive = React.forwardRef<
  React.ElementRef<typeof Select.Separator>,
  React.ComponentPropsWithoutRef<typeof Select.Separator>
>(({ className, ...props }, ref) => {
  return (
    <Select.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px", "bg-[var(--border-neutral)]", className)}
      {...props}
    />
  );
});
SelectSeparatorPrimitive.displayName = "SelectSeparatorPrimitive";
//#endregion

//#region SelectValue 原语
/**
 * Select Value 原语
 * 显示选中值
 */
export const SelectValuePrimitive = Select.Value;
//#endregion

//#region SelectGroup 原语
/**
 * Select Group 原语
 * 选项组
 */
export const SelectGroupPrimitive = Select.Group;
//#endregion
