"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/wuhan/ui/tabs";
import { ToggleButtonPrimitive } from "@/registry/wuhan/blocks/toggle-button/toggle-button-01";

// ==================== 类型定义 ====================

/**
 * 组件面板容器原语属性
 * @public
 */
interface ComponentPanelContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 默认激活的 tab
   */
  defaultValue?: string;
  /**
   * 当前激活的 tab
   */
  value?: string;
  /**
   * tab 变化回调
   */
  onValueChange?: (value: string) => void;
}

/**
 * 组件面板标签列表原语属性
 * @public
 */
interface ComponentPanelTabsListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 组件面板标签触发器原语属性
 * @public
 */
interface ComponentPanelTabsTriggerPrimitiveProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * 标签值
   */
  value: string;
  /**
   * 标签内容
   */
  children?: React.ReactNode;
}

/**
 * 组件面板标签内容原语属性
 * @public
 */
interface ComponentPanelTabsContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 标签值
   */
  value: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 组件面板列表原语属性
 * @public
 */
interface ComponentPanelListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 组件面板列表项原语属性
 * @public
 */
type ComponentPanelListItemPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToggleButtonPrimitive>;

/**
 * 组件面板列表项图标占位符原语属性
 * @public
 */
type ComponentPanelListItemIconPrimitiveProps = React.HTMLAttributes<HTMLDivElement>;

// ==================== 样式原语组件 ====================

/**
 * 组件面板容器样式原语
 * @public
 */
const ComponentPanelContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ComponentPanelContainerPrimitiveProps
>(
  (
    { children, defaultValue, value, onValueChange, className, ...props },
    ref,
  ) => {
    return (
      <Tabs
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        <div
          ref={ref}
          className={cn(
            "[&_*]:!box-border",
            "w-full",
            "cursor-pointer",
            "rounded-[var(--radius-2xl)]",
            "overflow-hidden",
            "bg-[var(--bg-container)]",
            "shadow-[var(--shadow-medium)]",
            "flex flex-col",
            "gap-[var(--gap-xs)]",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Tabs>
    );
  },
);
ComponentPanelContainerPrimitive.displayName =
  "ComponentPanelContainerPrimitive";

/**
 * 组件面板标签列表样式原语
 * @public
 */
const ComponentPanelTabsListPrimitive = React.forwardRef<
  HTMLDivElement,
  ComponentPanelTabsListPrimitiveProps
>(({ children, className, ...props }, ref) => {
  // height: 58;
  // gap: 24;
  // angle: 0 deg;
  // opacity: 1;
  // padding-top: Padding/padding-com-md;
  // padding-right: Padding/padding-com-xl;
  // padding-bottom: Padding/padding-com-xl;
  // padding-left: Padding/padding-com-xl;

  return (
    <TabsList
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "w-full",
        "h-[58px]",
        "gap-[var(--gap-2xl)]",
        "p-[var(--padding-com-xl)]",
        "pt-[var(--padding-com-md)]",
        "justify-start",
        "bg-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </TabsList>
  );
});
ComponentPanelTabsListPrimitive.displayName = "ComponentPanelTabsListPrimitive";

/**
 * 组件面板标签触发器样式原语
 * @public
 */
const ComponentPanelTabsTriggerPrimitive = React.forwardRef<
  HTMLButtonElement,
  ComponentPanelTabsTriggerPrimitiveProps
>(({ value, children, className, ...props }, ref) => {
  //选中字体颜色为品牌色，下边框为品牌色
  return (
    <TabsTrigger
      ref={ref}
      value={value}
      className={cn(
        "[&_*]:!box-border",
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-[var(--line-height-2)]",
        "bg-transparent",
        "border-b-[2px]",
        "border-transparent",
        "text-[var(--text-secondary)]",
        "data-[state=active]:text-[var(--text-brand)]",
        "hover:text-[var(--text-brand)]",
        "data-[state=active]:border-b-[var(--border-brand)]",
        "hover:border-[var(--border-brand)]",
        "rounded-none",
        "px-0",
        "py-[var(--padding-com-sm)]",
        "!shadow-none",
        "transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
});
ComponentPanelTabsTriggerPrimitive.displayName =
  "ComponentPanelTabsTriggerPrimitive";

/**
 * 组件面板标签内容样式原语
 * @public
 */
const ComponentPanelTabsContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ComponentPanelTabsContentPrimitiveProps
>(({ value, children, className, ...props }, ref) => {
  return (
    <TabsContent
      ref={ref}
      value={value}
      className={cn(
        "[&_*]:!box-border",
        "mt-0",
        "ring-0",
        "focus-visible:ring-0",
        className,
      )}
      {...props}
    >
      {children}
    </TabsContent>
  );
});
ComponentPanelTabsContentPrimitive.displayName =
  "ComponentPanelTabsContentPrimitive";

/**
 * 组件面板列表样式原语
 * @public
 */
const ComponentPanelListPrimitive = React.forwardRef<
  HTMLDivElement,
  ComponentPanelListPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "grid",
        "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
        "max-h-[160px]",
        "overflow-y-auto",
        "gap-[var(--gap-lg)]",
        "pb-[var(--padding-com-xl)]",
        "pr-[var(--padding-com-xl)]",
        "pl-[var(--padding-com-xl)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ComponentPanelListPrimitive.displayName = "ComponentPanelListPrimitive";

/**
 * 组件面板列表项样式原语
 * 提供列表项的布局样式，基于 ToggleButtonPrimitive
 * 只提供样式，不包含任何业务逻辑和状态管理
 * 用户完全控制内容结构
 * @public
 */
const ComponentPanelListItemPrimitive = React.forwardRef<
  HTMLButtonElement,
  ComponentPanelListItemPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <ToggleButtonPrimitive
      ref={ref}
      variant="compact"
      className={cn(
        "h-[40px]",
        "w-full",
        "gap-[var(--gap-md)]",
        "rounded-[var(--radius-lg)]",
        "px-[var(--padding-com-lg)]",
        "py-[var(--margin-com-md)]",
        "justify-start",
        className,
      )}
      {...props}
    />
  );
});
ComponentPanelListItemPrimitive.displayName = "ComponentPanelListItemPrimitive";

/**
 * 组件面板列表项图标占位符样式原语
 * 提供图标占位符的基础样式
 * 只提供样式，不包含任何业务逻辑
 * @public
 */
const ComponentPanelListItemIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ComponentPanelListItemIconPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-6 h-6 shrink-0", className)}
      style={{ backgroundColor: "#D9D9D9", ...props.style }}
      {...props}
    />
  );
});
ComponentPanelListItemIconPrimitive.displayName =
  "ComponentPanelListItemIconPrimitive";

// ==================== 统一导出 ====================

export type {
  ComponentPanelContainerPrimitiveProps,
  ComponentPanelTabsListPrimitiveProps,
  ComponentPanelTabsTriggerPrimitiveProps,
  ComponentPanelTabsContentPrimitiveProps,
  ComponentPanelListPrimitiveProps,
  ComponentPanelListItemPrimitiveProps,
  ComponentPanelListItemIconPrimitiveProps,
};

export {
  ComponentPanelContainerPrimitive,
  ComponentPanelTabsListPrimitive,
  ComponentPanelTabsTriggerPrimitive,
  ComponentPanelTabsContentPrimitive,
  ComponentPanelListPrimitive,
  ComponentPanelListItemPrimitive,
  ComponentPanelListItemIconPrimitive,
};
