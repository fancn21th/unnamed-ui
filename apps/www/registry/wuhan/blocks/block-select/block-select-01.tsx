"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select } from "radix-ui";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

//#region 共用样式常量
/**
 * 触发器和下拉框的共用样式
 */
const TRIGGER_BASE_STYLES = [
  "h-[var(--size-com-md)]",
  "border border-[var(--border-neutral)]",
  "bg-[var(--bg-container)]",
  "flex items-center gap-2",
  "px-[var(--padding-com-md)] py-[5px]",
  "cursor-pointer",
  "transition-all duration-300",
] as const;

const TRIGGER_HOVER_STYLES = ["hover:border-[var(--border-brand)]"] as const;

const TRIGGER_MULTI_DISABLED_HOVER = [
  "hover:border-[var(--border-neutral)]",
] as const;

const TRIGGER_FOCUS_STYLES = [
  "focus:outline-none",
  "focus-visible:border-[var(--border-brand)]",
  "focus-visible:ring-2",
  "focus-visible:ring-[var(--ring)]",
] as const;

const TRIGGER_OPEN_STYLES = [
  "border-[var(--border-brand)]",
  "ring-2",
  "ring-[var(--ring)]",
] as const;

const TRIGGER_DISABLED_STYLES = [
  "cursor-not-allowed",
  "opacity-50",
  "bg-[var(--bg-container-disable)]",
] as const;

const CONTENT_BASE_STYLES = [
  "rounded-[var(--radius-md)]",
  "border border-[var(--border-neutral)]",
  "bg-[var(--bg-container)]",
  "shadow-md",
] as const;

const ITEM_BASE_STYLES = [
  "flex items-center gap-2",
  "px-[var(--padding-com-md)] py-[var(--padding-com-sm)]",
  "rounded-[var(--radius-sm)]",
  "cursor-pointer",
  "transition-colors duration-200",
] as const;

const ITEM_HOVER_STYLES = ["hover:bg-[var(--bg-neutral-light)]"] as const;

const ITEM_DISABLED_STYLES = ["opacity-50", "cursor-not-allowed"] as const;
//#endregion

//#region Tag 原语
/**
 * Tag 原语组件
 * 用于在多选模式下展示选中项
 */
export interface TagPrimitiveProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const TagPrimitive = React.forwardRef<
  HTMLSpanElement,
  TagPrimitiveProps
>(({ label, onRemove, className }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1",
        "px-2 py-0.5",
        "rounded-[var(--radius-sm)]",
        "bg-[var(--bg-brand-subtle)]",
        "text-[var(--text-brand)]",
        "text-xs font-medium",
        className,
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-[var(--bg-brand-subtle-hover)] rounded-sm p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
});
TagPrimitive.displayName = "TagPrimitive";
//#endregion

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
        // 基础样式（复用常量）
        ...TRIGGER_BASE_STYLES,
        "w-[200px] rounded-[var(--radius-md)]",
        "w-full",
        // 交互状态（复用常量）
        ...TRIGGER_HOVER_STYLES,
        ...TRIGGER_FOCUS_STYLES,
        // Open 状态
        "data-[state=open]:border-[var(--border-brand)]",
        "data-[state=open]:ring-2",
        "data-[state=open]:ring-[var(--ring)]",
        // Disabled 状态
        "disabled:cursor-not-allowed",
        "disabled:border-[var(--border-neutral)]",
        "disabled:bg-[var(--bg-container-disable)]",
        "disabled:text-[var(--text-disable)]",
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
          // 基础样式（复用常量）
          "z-[9999] min-w-[8rem] overflow-hidden",
          ...CONTENT_BASE_STYLES,
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
        "relative w-full select-none pr-8",
        "outline-none",
        "font-size-2",
        "text-[var(--text-primary)]",
        // 复用共用样式
        ...ITEM_BASE_STYLES.filter((s) => !s.includes("gap-2")),
        // Hover 状态
        "data-[highlighted]:bg-[var(--bg-neutral-light)]",
        // Focus 状态
        // "focus:bg-[var(--bg-item-hover)]",
        // Selected 状态
        "data-[state=checked]:bg-[var(--bg-brand-light)]",
        "data-[state=checked]:text-[var(--text-brand)]",
        // Disabled 状态
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:text-[var(--text-disable)]",
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
 * 显示选中值，支持自定义样式
 */
export const SelectValuePrimitive = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Select.Value> & {
    className?: string;
    placeholderClassName?: string;
  }
>(({ className, placeholderClassName, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-1",
        "font-[var(--font-family-cn)]",
        "text-left",
        "[&>span[data-placeholder]]:text-[var(--text-placeholder)]",
        placeholderClassName &&
          `[&>span[data-placeholder]]:${placeholderClassName}`,
        className,
      )}
      style={{
        fontSize: "var(--font-size-2)",
      }}
    >
      <Select.Value {...props}>{children}</Select.Value>
    </div>
  );
});
SelectValuePrimitive.displayName = "SelectValuePrimitive";
//#endregion

//#region SelectGroup 原语
/**
 * Select Group 原语
 * 选项组
 */
export const SelectGroupPrimitive = Select.Group;
//#endregion

//#region MultiSelectRoot 原语
/**
 * MultiSelect Root 原语
 * 多选模式的根组件，基于 Popover.Root
 */
export const MultiSelectRootPrimitive = PopoverPrimitive.Root;
//#endregion

//#region MultiSelectTrigger 原语
/**
 * MultiSelect Trigger 原语
 * 多选模式下的触发器，基于 Popover.Trigger
 */
export interface MultiSelectTriggerPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
> {
  fullRounded?: boolean;
  disabled?: boolean;
}

export const MultiSelectTriggerPrimitive = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  MultiSelectTriggerPrimitiveProps
>(({ className, children, fullRounded, disabled, asChild, ...props }, ref) => {
  if (asChild) {
    return (
      <PopoverPrimitive.Trigger ref={ref} asChild {...props}>
        {children}
      </PopoverPrimitive.Trigger>
    );
  }

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        // 基础样式（复用常量）
        ...TRIGGER_BASE_STYLES,
        "min-w-[200px]",
        fullRounded ? "rounded-full" : "rounded-[var(--radius-md)]",
        // 交互状态（复用常量）
        ...TRIGGER_HOVER_STYLES,
        "data-[state=open]:border-[var(--border-brand)]",
        "data-[state=open]:ring-2",
        "data-[state=open]:ring-[var(--ring)]",
        disabled && TRIGGER_DISABLED_STYLES,
        className,
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
});
MultiSelectTriggerPrimitive.displayName = "MultiSelectTriggerPrimitive";
//#endregion

//#region MultiSelectTriggerContainer 原语
/**
 * MultiSelect Trigger Container 原语
 * 多选触发器的容器，用于 asChild 模式
 */
export interface MultiSelectTriggerContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  fullRounded?: boolean;
  disabled?: boolean;
}

export const MultiSelectTriggerContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  MultiSelectTriggerContainerPrimitiveProps
>(({ className, children, fullRounded, disabled, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // 复用单选触发器的基础样式
        ...TRIGGER_BASE_STYLES,
        "min-w-[200px]",
        fullRounded ? "rounded-full" : "rounded-[var(--radius-md)]",
        // 复用交互状态样式
        ...TRIGGER_HOVER_STYLES,
        // Open 状态
        "data-[state=open]:border-[var(--border-brand)]",
        "data-[state=open]:ring-2",
        "data-[state=open]:ring-[var(--ring)]",
        // Disabled 状态
        disabled && [
          ...TRIGGER_DISABLED_STYLES,
          ...TRIGGER_MULTI_DISABLED_HOVER,
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MultiSelectTriggerContainerPrimitive.displayName =
  "MultiSelectTriggerContainerPrimitive";
//#endregion

//#region MultiSelectIconContainer 原语
/**
 * MultiSelect Icon Container 原语
 * 用于包裹 icon 的容器
 */
export const MultiSelectIconContainerPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("flex-shrink-0", className)} {...props}>
      {children}
    </span>
  );
});
MultiSelectIconContainerPrimitive.displayName =
  "MultiSelectIconContainerPrimitive";
//#endregion

//#region MultiSelectValueContainer 原语
/**
 * MultiSelect Value Container 原语
 * 用于显示选中值或 placeholder 的容器
 */
export const MultiSelectValueContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 flex flex-wrap gap-1 items-center overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MultiSelectValueContainerPrimitive.displayName =
  "MultiSelectValueContainerPrimitive";
//#endregion

//#region MultiSelectPlaceholder 原语
/**
 * MultiSelect Placeholder 原语
 * 占位符显示
 */
export const MultiSelectPlaceholderPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-[var(--text-placeholder)]", className)}
      {...props}
    >
      {children}
    </span>
  );
});
MultiSelectPlaceholderPrimitive.displayName = "MultiSelectPlaceholderPrimitive";
//#endregion

//#region MultiSelectContent 原语
/**
 * MultiSelect Content 原语
 * 多选模式下的下拉内容，基于 Popover.Content
 */
export interface MultiSelectContentPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {}

export const MultiSelectContentPrimitive = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  MultiSelectContentPrimitiveProps
>(({ className, align = "start", sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] w-[var(--radix-popover-trigger-width)] p-1",
          // 复用共用样式
          ...CONTENT_BASE_STYLES,
          // 动画
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
MultiSelectContentPrimitive.displayName = "MultiSelectContentPrimitive";
//#endregion

//#region MultiSelectItem 原语
/**
 * MultiSelect Item 原语
 * 多选模式下的选项
 */
export interface MultiSelectItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const MultiSelectItemPrimitive = React.forwardRef<
  HTMLDivElement,
  MultiSelectItemPrimitiveProps
>(
  (
    { className, children, disabled, checked, onCheckedChange, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // 复用共用样式
          ...ITEM_BASE_STYLES,
          ...ITEM_HOVER_STYLES,
          disabled && ITEM_DISABLED_STYLES,
          className,
        )}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
MultiSelectItemPrimitive.displayName = "MultiSelectItemPrimitive";
//#endregion
