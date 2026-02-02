"use client";

import * as React from "react";
import {
  AvatarHeaderPrimitive,
  DefaultAvatarIcon,
  AvatarNamePrimitive,
  AvatarTimePrimitive,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * 头像大小类型
 * @public
 */
export type AvatarSize =
  | number
  | "large"
  | "small"
  | "default"
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };

/**
 * CORS 属性类型
 * @public
 */
export type CrossOrigin = "anonymous" | "use-credentials" | "";

/**
 * Avatar Header 组件属性
 * @public
 */
export interface AvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** 图像无法显示时的替代文本 */
  alt?: string;
  /** 设置头像的自定义图标 */
  icon?: React.ReactNode;
  /** 设置头像的大小 */
  size?: AvatarSize;
  /** 图片类头像的资源地址或者图片元素 */
  src?: string | React.ReactNode;
  /** CORS 属性设置 */
  crossOrigin?: CrossOrigin;
  /** 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 */
  onError?: () => boolean;
  /** 头像标签 */
  name?: React.ReactNode;
  /** 时间标签 */
  time?: React.ReactNode;
}

// ==================== 辅助函数 ====================

/**
 * 获取头像大小的像素值
 */
const getAvatarSize = (size?: AvatarSize): number => {
  if (typeof size === "number") return size;
  if (typeof size === "object") {
    // 响应式尺寸，默认返回 md
    return size.md ?? size.sm ?? size.lg ?? 24;
  }
  // 预设尺寸
  switch (size) {
    case "large":
      return 40;
    case "small":
      return 20;
    case "default":
    default:
      return 24;
  }
};

// ==================== 主组件 ====================

/**
 * Avatar Header 组合组件
 * 用于展示"头像 + 名称 + 时间"的一行头部信息
 *
 * @example
 * ```tsx
 * // 基础用法
 * <AvatarHeader name="User" time="12:25" />
 *
 * // 带图片头像
 * <AvatarHeader
 *   src="https://example.com/avatar.jpg"
 *   name="John Doe"
 *   time="10:30"
 * />
 *
 * // 自定义图标
 * <AvatarHeader
 *   icon={<UserIcon />}
 *   name="AI Assistant"
 * />
 *
 * // 自定义大小
 * <AvatarHeader
 *   size="large"
 *   name="Admin"
 * />
 * ```
 *
 * @public
 */
export const AvatarHeader = React.forwardRef<HTMLDivElement, AvatarHeaderProps>(
  (
    {
      alt,
      icon,
      size,
      src,
      crossOrigin,
      onError,
      name,
      time,
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const avatarSize = getAvatarSize(size);
    const onlyAvatar = !name && !time;

    // 处理图片加载错误
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      // 立即隐藏破损的图片，避免显示裂图
      e.currentTarget.style.display = 'none';
      
      if (onError) {
        const shouldUseFallback = onError();
        if (shouldUseFallback === false) return;
      }
      setImgError(true);
    };

    // 渲染头像内容
    const renderAvatar = () => {
      // 如果有 src 且未加载失败，渲染图片
      if (src && !imgError) {
        if (typeof src === "string") {
          return (
            <DefaultAvatarIcon
              className={cn("overflow-hidden")}
              style={{ width: avatarSize, height: avatarSize }}
            >
              <img
                src={src}
                alt={alt}
                crossOrigin={crossOrigin}
                onError={handleImgError}
                className="w-full h-full object-cover m-0!"
              />
            </DefaultAvatarIcon>
          );
        }
        // src 是 ReactNode
        return (
          <DefaultAvatarIcon style={{ width: avatarSize, height: avatarSize }}>
            {src}
          </DefaultAvatarIcon>
        );
      }

      // 使用自定义图标或默认图标
      if (icon) {
        return (
          <DefaultAvatarIcon
            className={cn("flex items-center justify-center")}
            style={{ width: avatarSize, height: avatarSize }}
          >
            {icon}
          </DefaultAvatarIcon>
        );
      }

      // 默认占位头像
      return (
        <DefaultAvatarIcon
          aria-hidden="true"
          className={cn("flex items-center justify-center")}
          style={{ width: avatarSize, height: avatarSize }}
        >
          <User className="w-1/2 h-1/2 text-gray-400" />
        </DefaultAvatarIcon>
      );
    };

    return (
      <AvatarHeaderPrimitive
        ref={ref}
        className={cn(onlyAvatar && "justify-center", className)}
        {...props}
      >
        {renderAvatar()}
        {!!name && <AvatarNamePrimitive>{name}</AvatarNamePrimitive>}
        {!!time && <AvatarTimePrimitive>{time}</AvatarTimePrimitive>}
      </AvatarHeaderPrimitive>
    );
  },
);
AvatarHeader.displayName = "AvatarHeader";
