"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

export type UploadStatus = "idle" | "uploading" | "success" | "error";

// ==================== 上传容器原语 ====================

export interface UploadContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadContainerPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full space-y-3", className)} {...props} />
  );
});

UploadContainerPrimitive.displayName = "UploadContainerPrimitive";

// ==================== 上传触发器原语 ====================

export interface UploadTriggerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadTriggerPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadTriggerPrimitiveProps
>(({ className, disabled = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-block",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    />
  );
});

UploadTriggerPrimitive.displayName = "UploadTriggerPrimitive";

// ==================== 上传输入框原语 ====================

export interface UploadInputPrimitiveProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * 是否支持多文件上传
   */
  multiple?: boolean;
  /**
   * 接受的文件类型
   */
  accept?: string;
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadInputPrimitive = React.forwardRef<
  HTMLInputElement,
  UploadInputPrimitiveProps
>(({ className, multiple = false, accept, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="file"
      multiple={multiple}
      accept={accept}
      className={cn("hidden", className)}
      {...props}
    />
  );
});

UploadInputPrimitive.displayName = "UploadInputPrimitive";

// ==================== 文件列表容器原语 ====================

export interface UploadFileListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileListPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadFileListPrimitiveProps
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

UploadFileListPrimitive.displayName = "UploadFileListPrimitive";

// ==================== 文件列表项原语 ====================

export interface UploadFileItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件状态
   */
  status?: UploadStatus;
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileItemPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadFileItemPrimitiveProps
>(({ className, status = "idle", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  );
});

UploadFileItemPrimitive.displayName = "UploadFileItemPrimitive";

// ==================== 文件图标容器原语 ====================

export interface UploadFileIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件状态
   */
  status?: UploadStatus;
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileIconPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadFileIconPrimitiveProps
>(({ className, status = "idle", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-5 w-5 items-center justify-center text-[var(--text-tertiary)]",
        status === "uploading" && "text-[var(--text-brand)]",
        status === "success" && "text-[var(--text-tertiary)]",
        status === "error" && "text-[var(--text-danger)]",
        className,
      )}
      {...props}
    />
  );
});

UploadFileIconPrimitive.displayName = "UploadFileIconPrimitive";

// ==================== 文件名原语 ====================

export interface UploadFileNamePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileNamePrimitive = React.forwardRef<
  HTMLSpanElement,
  UploadFileNamePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        // "flex-1 truncate text-sm text-[var(--text-secondary)]",
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-2",
        "leading-[var(--line-height-1)]",
        "text-[var(--text-primary)]",
        "truncate",
        className,
      )}
      {...props}
    />
  );
});

UploadFileNamePrimitive.displayName = "UploadFileNamePrimitive";

// ==================== 文件大小原语 ====================

export interface UploadFileSizePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileSizePrimitive = React.forwardRef<
  HTMLSpanElement,
  UploadFileSizePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-xs text-[var(--text-tertiary)]", className)}
      {...props}
    />
  );
});

UploadFileSizePrimitive.displayName = "UploadFileSizePrimitive";

// ==================== 删除按钮原语 ====================

export interface UploadFileRemovePrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileRemovePrimitive = React.forwardRef<
  HTMLButtonElement,
  UploadFileRemovePrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-4 w-4 items-center justify-center cursor-pointer text-[var(--text-tertiary)] ",
        className,
      )}
      {...props}
    />
  );
});

UploadFileRemovePrimitive.displayName = "UploadFileRemovePrimitive";

// ==================== 错误信息原语 ====================

export interface UploadFileErrorPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 自定义类名
   */
  className?: string;
}

export const UploadFileErrorPrimitive = React.forwardRef<
  HTMLDivElement,
  UploadFileErrorPrimitiveProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-1 text-xs text-[var(--text-danger)]", className)}
      {...props}
    />
  );
});

UploadFileErrorPrimitive.displayName = "UploadFileErrorPrimitive";
