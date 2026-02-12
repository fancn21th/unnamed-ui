"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== Avatar 原语组件 ====================

/**
 * 头像容器原语
 * 提供基础的圆形头像样式
 */
export interface AvatarPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 头像尺寸
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarPrimitive = React.forwardRef<
  HTMLDivElement,
  AvatarPrimitiveProps
>(({ className, size = "md", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0 rounded-full overflow-hidden flex items-center justify-center",
        "bg-[#D9D9D9] text-[var(--text-primary)]",
        size === "sm" && "size-6 text-xs",
        size === "md" && "size-8 text-sm",
        size === "lg" && "size-10 text-base",
        className,
      )}
      {...props}
    />
  );
});
AvatarPrimitive.displayName = "AvatarPrimitive";

/**
 * 头像图片原语
 */
export interface AvatarImagePrimitiveProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarImagePrimitive = React.forwardRef<
  HTMLImageElement,
  AvatarImagePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <img
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      {...props}
    />
  );
});
AvatarImagePrimitive.displayName = "AvatarImagePrimitive";

/**
 * 头像文本原语
 */
export interface AvatarTextPrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarTextPrimitive = React.forwardRef<
  HTMLSpanElement,
  AvatarTextPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-normal",
        "font-[var(--font-family-cn)]",
        "leading-[var(--line-height-2)]",
        className,
      )}
      {...props}
    />
  );
});
AvatarTextPrimitive.displayName = "AvatarTextPrimitive";

/**
 * 头像图标原语
 */
export interface AvatarIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarIconPrimitive = React.forwardRef<
  HTMLDivElement,
  AvatarIconPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  );
});
AvatarIconPrimitive.displayName = "AvatarIconPrimitive";

// ==================== AvatarGroup 原语组件 ====================

/**
 * 头像组容器原语
 */
export interface AvatarGroupPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  AvatarGroupPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  );
});
AvatarGroupPrimitive.displayName = "AvatarGroupPrimitive";

// ==================== AvatarHeader 原语组件 ====================

/**
 * 头像栏容器原语
 */
export interface AvatarHeaderPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  AvatarHeaderPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border flex items-center gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
AvatarHeaderPrimitive.displayName = "AvatarHeaderPrimitive";

/**
 * 名称样式原语
 */
export interface AvatarNamePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarNamePrimitive = React.forwardRef<
  HTMLSpanElement,
  AvatarNamePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)] font-[var(--font-weight-400)]",
        "text-[var(--font-size-2)] leading-[var(--line-height-2)]",
        "tracking-[0px] text-[var(--text-primary)]",
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
 */
export interface AvatarTimePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarTimePrimitive = React.forwardRef<
  HTMLSpanElement,
  AvatarTimePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)] font-[var(--font-weight-400)]",
        "text-[var(--font-size-1)] leading-[var(--line-height-1)]",
        "tracking-[0px] text-[var(--text-secondary)]",
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
