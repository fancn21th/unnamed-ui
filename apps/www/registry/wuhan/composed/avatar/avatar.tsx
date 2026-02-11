"use client";

import * as React from "react";
import {
  AvatarPrimitive,
  AvatarImagePrimitive,
  AvatarTextPrimitive,
  AvatarIconPrimitive,
  AvatarGroupPrimitive,
  AvatarHeaderPrimitive,
  AvatarNamePrimitive,
  AvatarTimePrimitive,
  type AvatarPrimitiveProps,
} from "@/registry/wuhan/blocks/avatar/avatar-01";

// ==================== Avatar 组件 ====================

export interface AvatarProps extends Omit<AvatarPrimitiveProps, "children"> {
  /**
   * 图片 URL（仅支持文本类型）
   */
  src?: string;
  /**
   * 图片加载失败时的替代文本
   */
  alt?: string;
  /**
   * 显示的文本内容
   */
  children?: React.ReactNode;
  /**
   * 图标元素
   */
  icon?: React.ReactNode;
  /**
   * 头像尺寸
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * 自定义样式（主要用于背景色）
   */
  style?: React.CSSProperties;
  /**
   * 自定义类名
   */
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt, children, icon, size = "md", style, className, ...props },
    ref,
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // 当 src 变化时重置错误状态
    React.useEffect(() => {
      setImageError(false);
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <AvatarPrimitive
        ref={ref}
        size={size}
        style={style}
        className={className}
        {...props}
      >
        {/* 优先级：src > icon > children */}
        {src && !imageError ? (
          <AvatarImagePrimitive
            src={src}
            alt={alt || ""}
            onError={handleImageError}
          />
        ) : icon ? (
          <AvatarIconPrimitive>{icon}</AvatarIconPrimitive>
        ) : children ? (
          <AvatarTextPrimitive>{children}</AvatarTextPrimitive>
        ) : null}
      </AvatarPrimitive>
    );
  },
);

Avatar.displayName = "Avatar";

// ==================== AvatarGroup 组件 ====================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar 组件列表
   */
  children: React.ReactNode;
  /**
   * 最大显示数量，超出部分显示 +N
   */
  maxCount?: number;
  /**
   * 头像之间的间距（负值表示重叠）
   * @default -8
   */
  spacing?: number;
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, maxCount, spacing = -8, className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const displayChildren = maxCount
      ? childArray.slice(0, maxCount)
      : childArray;
    const remainingCount = maxCount ? childArray.length - maxCount : 0;

    return (
      <AvatarGroupPrimitive ref={ref} className={className} {...props}>
        {displayChildren.map((child, index) => (
          <div
            key={index}
            style={{
              marginLeft: index === 0 ? 0 : spacing,
              zIndex: displayChildren.length - index,
            }}
          >
            {child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            style={{
              marginLeft: spacing,
              zIndex: 0,
            }}
          >
            <Avatar size="md" style={{ backgroundColor: "#f5f5f5" }}>
              +{remainingCount}
            </Avatar>
          </div>
        )}
      </AvatarGroupPrimitive>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

// ==================== AvatarHeader 组件 ====================

export interface AvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * Avatar 组件的 props
   */
  avatar?: AvatarProps;
  /**
   * 自定义 Avatar 元素（优先级高于 avatar props）
   */
  avatarRender?: React.ReactNode;
  /**
   * 名称内容
   */
  name: React.ReactNode;
  /**
   * 时间内容
   */
  time?: React.ReactNode;
  /**
   * 名称自定义样式
   */
  nameStyle?: React.CSSProperties;
  /**
   * 名称自定义类名
   */
  nameClassName?: string;
  /**
   * 时间自定义样式
   */
  timeStyle?: React.CSSProperties;
  /**
   * 时间自定义类名
   */
  timeClassName?: string;
  /**
   * 自定义类名
   */
  className?: string;
}

export const AvatarHeader = React.forwardRef<HTMLDivElement, AvatarHeaderProps>(
  (
    {
      avatar,
      avatarRender,
      name,
      time,
      nameStyle,
      nameClassName,
      timeStyle,
      timeClassName,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <AvatarHeaderPrimitive ref={ref} className={className} {...props}>
        {avatarRender || (avatar ? <Avatar {...avatar} /> : <Avatar />)}
        <AvatarNamePrimitive style={nameStyle} className={nameClassName}>
          {name}
        </AvatarNamePrimitive>
        {time && (
          <AvatarTimePrimitive style={timeStyle} className={timeClassName}>
            {time}
          </AvatarTimePrimitive>
        )}
      </AvatarHeaderPrimitive>
    );
  },
);

AvatarHeader.displayName = "AvatarHeader";
