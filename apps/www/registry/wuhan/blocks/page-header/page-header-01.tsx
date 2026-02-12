"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ButtonPrimitive,
  type ButtonPrimitiveProps,
} from "@/registry/wuhan/blocks/block-button/block-button-01";
import {
  AvatarHeaderPrimitive,
  DefaultAvatarIcon,
  AvatarNamePrimitive,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";
import { User } from "lucide-react";

// ==================== 样式原语层 ====================

/**
 * PageHeader 容器原语
 * 结构：左侧 Logo + 名称，右侧 按钮群 + 头像
 */
const PageHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex items-center",
        "justify-between",
        "w-full",
        "px-[var(--padding-com-xl)]",
        className,
      )}
      {...props}
    />
  );
});
PageHeaderPrimitive.displayName = "PageHeaderPrimitive";

/**
 * 左侧区域原语
 * 包含 Logo 和名称
 */
const PageHeaderLeftPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", "gap-[var(--gap-md)]", className)}
      {...props}
    />
  );
});
PageHeaderLeftPrimitive.displayName = "PageHeaderLeftPrimitive";

/**
 * Logo 原语
 * 默认尺寸 32x32
 */
const PageHeaderLogoPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: number;
  }
>(({ className, size = 24, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0",
        "rounded-[var(--radius-md)]",
        "flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    />
  );
});
PageHeaderLogoPrimitive.displayName = "PageHeaderLogoPrimitive";

/**
 * 标题原语
 */
const PageHeaderTitlePrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-600)]",
        "font-size-4",
        "leading-[var(--line-height-4)]",
        "text-[var(--text-title)]",
        "tracking-[0px]",
        className,
      )}
      style={{
        fontSize: "var(--font-size-4)",
        ...props.style,
      }}
      {...props}
    />
  );
});
PageHeaderTitlePrimitive.displayName = "PageHeaderTitlePrimitive";

/**
 * 右侧区域原语
 * 包含按钮群和头像
 */
const PageHeaderRightPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", "gap-[var(--gap-lg)]", className)}
      {...props}
    />
  );
});
PageHeaderRightPrimitive.displayName = "PageHeaderRightPrimitive";

/**
 * 按钮群原语
 */
const PageHeaderButtonGroupPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", "gap-[var(--gap-sm)]", className)}
      {...props}
    />
  );
});
PageHeaderButtonGroupPrimitive.displayName = "PageHeaderButtonGroupPrimitive";

// ==================== 按钮组件 ====================

export type { ButtonPrimitiveProps };

/**
 * PageHeader 按钮组件
 * 包装 ButtonPrimitive，提供简洁的 API
 */
export const PageHeaderButton = React.forwardRef<
  HTMLButtonElement,
  ButtonPrimitiveProps & {
    /** 按钮文字 */
    children: React.ReactNode;
  }
>(
  (
    {
      children,
      variant = "outline",
      color = "secondary",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    );
  },
);
PageHeaderButton.displayName = "PageHeaderButton";

// ==================== 头像组件 ====================

/**
 * PageHeader 头像组件
 */
const PageHeaderAvatarPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** 头像大小 */
    size?: number;
    /** 图片资源 */
    src?: string | React.ReactNode;
    /** 替代文本 */
    alt?: string;
  }
>(({ className, size = 24, src, alt, ...props }, ref) => {
  const [imgError, setImgError] = React.useState(false);

  // 处理图片加载错误
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
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
            style={{ width: size, height: size }}
          >
            <img
              src={src}
              alt={alt}
              onError={handleImgError}
              className="w-full h-full object-cover m-0!"
            />
          </DefaultAvatarIcon>
        );
      }
      // src 是 ReactNode
      return (
        <DefaultAvatarIcon style={{ width: size, height: size }}>
          {src}
        </DefaultAvatarIcon>
      );
    }

    // 默认占位头像
    return (
      <DefaultAvatarIcon
        aria-hidden="true"
        className={cn("flex items-center justify-center")}
        style={{ width: size, height: size }}
      >
        <User className="w-1/2 h-1/2 text-gray-400" />
      </DefaultAvatarIcon>
    );
  };

  return (
    <div ref={ref} className={cn("shrink-0", className)} {...props}>
      {renderAvatar()}
    </div>
  );
});
PageHeaderAvatarPrimitive.displayName = "PageHeaderAvatarPrimitive";

/**
 * PageHeader 用户信息组件
 * 包含头像和名称
 */
const PageHeaderUserPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** 头像大小 */
    avatarSize?: number;
    /** 头像图片 */
    avatarSrc?: string | React.ReactNode;
    /** 用户名称 */
    name: React.ReactNode;
  }
>(({ className, avatarSize = 24, avatarSrc, name, ...props }, ref) => {
  return (
    <AvatarHeaderPrimitive
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <PageHeaderAvatarPrimitive size={avatarSize} src={avatarSrc} />
      <AvatarNamePrimitive>{name}</AvatarNamePrimitive>
    </AvatarHeaderPrimitive>
  );
});
PageHeaderUserPrimitive.displayName = "PageHeaderUserPrimitive";

// ==================== 完整 PageHeader 组件 ====================

export interface PageHeaderBlockProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> {
  /** Logo 区域内容（ReactNode，可传图片或图标） */
  logo?: React.ReactNode;
  /** 标题文字 */
  title?: React.ReactNode;
  /** 右侧按钮组 */
  buttons?: React.ReactNode;
  /** 用户头像区域 */
  user?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * 完整 PageHeader Block 组件
 *
 * @example
 * ```tsx
 * <PageHeaderBlock
 *   logo={<LogoIcon />}
 *   title="页面标题"
 *   buttons={
 *     <>
 *       <PageHeaderButton>按钮一</PageHeaderButton>
 *       <PageHeaderButton>按钮二</PageHeaderButton>
 *     </>
 *   }
 *   user={<PageHeaderUser name="用户名" avatarSrc="/avatar.jpg" />}
 * />
 * ```
 */
export const PageHeaderBlock = React.forwardRef<
  HTMLDivElement,
  PageHeaderBlockProps
>(({ logo, title, buttons, user, className, ...props }, ref) => {
  return (
    <PageHeaderPrimitive ref={ref} className={className} {...props}>
      {/* 左侧区域 */}
      <PageHeaderLeftPrimitive>
        {logo && <PageHeaderLogoPrimitive>{logo}</PageHeaderLogoPrimitive>}
        {title && <PageHeaderTitlePrimitive>{title}</PageHeaderTitlePrimitive>}
      </PageHeaderLeftPrimitive>

      {/* 右侧区域 */}
      <PageHeaderRightPrimitive>
        {buttons && (
          <PageHeaderButtonGroupPrimitive>
            {buttons}
          </PageHeaderButtonGroupPrimitive>
        )}
        {user}
      </PageHeaderRightPrimitive>
    </PageHeaderPrimitive>
  );
});
PageHeaderBlock.displayName = "PageHeaderBlock";

// ==================== 统一导出 ====================

export {
  PageHeaderPrimitive,
  PageHeaderLeftPrimitive,
  PageHeaderLogoPrimitive,
  PageHeaderTitlePrimitive,
  PageHeaderRightPrimitive,
  PageHeaderButtonGroupPrimitive,
  PageHeaderAvatarPrimitive,
  PageHeaderUserPrimitive,
};
