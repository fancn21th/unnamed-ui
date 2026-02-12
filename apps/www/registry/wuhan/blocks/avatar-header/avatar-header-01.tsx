"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 样式原语层（Primitives）====================
// 这些组件只提供样式，不包含任何逻辑和业务假设

/**
 * 头像栏容器样式原语
 * 结构建议：Avatar + Name + Time
 */
const AvatarHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex items-center",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
AvatarHeaderPrimitive.displayName = "AvatarHeaderPrimitive";

/**
 * 头像样式原语（默认 24px，背景 #D9D9D9）
 * - 默认用作“占位头像”，用户可传入 <img /> 或任意内容
 */
const DefaultAvatarIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        "size-[24px]",
        "rounded-full",
        "bg-[#D9D9D9]",
        className,
      )}
      {...props}
    />
  );
});
DefaultAvatarIcon.displayName = "DefaultAvatarIcon";

/**
 * 名称样式原语
 * 对齐 `plan.md`：font-family-cn / weight-400 / size-2 / line-height-2 / text-primary
 */
const AvatarNamePrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "tracking-[0px]",
        "text-[var(--text-primary)]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-2)",
        ...props.style,
      }}
      {...props}
    />
  );
});
AvatarNamePrimitive.displayName = "AvatarNamePrimitive";

/**
 * 时间样式原语
 * 对齐 `plan.md`：font-family-cn / weight-400 / size-1 / line-height-1 / text-secondary
 */
const AvatarTimePrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "tracking-[0px]",
        "text-[var(--text-secondary)]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-1)",
        ...props.style,
      }}
      {...props}
    />
  );
});
AvatarTimePrimitive.displayName = "AvatarTimePrimitive";

// ==================== 业务组件层 ====================

export interface MessageAvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * 头像内容（未传则使用默认占位圆形）
   */
  avatar?: React.ReactNode;
  /**
   * 名称内容（必填）
   */
  name: React.ReactNode;
  /**
   * 时间内容（可选）
   */
  time?: React.ReactNode;
}

/**
 * 消息头像组件（组合组件）
 * 默认结构：Avatar + Name + Time
 */
const MessageAvatarHeader = React.forwardRef<
  HTMLDivElement,
  MessageAvatarHeaderProps
>(({ avatar, name, time, className, ...props }, ref) => {
  return (
    <AvatarHeaderPrimitive ref={ref} className={className} {...props}>
      {avatar ?? <DefaultAvatarIcon aria-hidden="true" />}
      <AvatarNamePrimitive>{name}</AvatarNamePrimitive>
      {time != null && <AvatarTimePrimitive>{time}</AvatarTimePrimitive>}
    </AvatarHeaderPrimitive>
  );
});
MessageAvatarHeader.displayName = "MessageAvatarHeader";

// ==================== 统一导出 ====================
// 使用 Avatar 前缀避免未来与 UI 组件库中的 avatar 重名

export {
  AvatarHeaderPrimitive,
  DefaultAvatarIcon,
  DefaultAvatarIcon as Avatar,
  AvatarNamePrimitive,
  AvatarTimePrimitive,
  MessageAvatarHeader,
};
