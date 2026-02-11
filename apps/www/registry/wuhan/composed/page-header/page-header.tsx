"use client";

import * as React from "react";
import {
  PageHeaderPrimitive,
  PageHeaderLeftPrimitive,
  PageHeaderLogoPrimitive,
  PageHeaderTitlePrimitive,
  PageHeaderRightPrimitive,
  PageHeaderUserPrimitive,
} from "@/registry/wuhan/blocks/page-header/page-header-01";
import { cn } from "@/lib/utils";

// ==================== 类型定义 ====================

/**
 * PageHeader 组件属性
 *
 * @example
 * ```tsx
 * // 基础用法
 * <PageHeader logo={...} title="页面标题" />
 *
 * // 带操作按钮
 * <PageHeader
 *   logo={...}
 *   title="页面标题"
 *   actions={
 *     <>
 *       <PageHeaderButton>按钮</PageHeaderButton>
 *       <PageHeaderUser name="用户" />
 *     </>
 *   }
 * />
 * ```
 *
 * @public
 */
export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Logo 区域 */
  logo?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 右侧操作区域（按钮、用户等） */
  actions?: React.ReactNode;
}

// ==================== 主组件 ====================

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ logo, title, actions, className, ...props }, ref) => {
    return (
      <PageHeaderPrimitive ref={ref} className={className} {...props}>
        {/* 左侧：Logo + 标题 */}
        <PageHeaderLeftPrimitive>
          {logo && <PageHeaderLogoPrimitive>{logo}</PageHeaderLogoPrimitive>}
          <PageHeaderTitlePrimitive>{title}</PageHeaderTitlePrimitive>
        </PageHeaderLeftPrimitive>

        {/* 右侧：操作区域 */}
        <PageHeaderRightPrimitive>{actions}</PageHeaderRightPrimitive>
      </PageHeaderPrimitive>
    );
  },
);

PageHeader.displayName = "PageHeader";

// ==================== 便捷子组件 ====================

/**
 * 右侧按钮组
 */
export const PageHeaderButtonGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-center", "gap-[var(--gap-sm)]", className)}>
    {React.Children.map(children, (child, index) => (
      <span key={index} className="[&>*:not(:first-child)]:ml-[var(--gap-sm)]">
        {child}
      </span>
    ))}
  </div>
);

/**
 * 用户信息组件
 */
export interface PageHeaderUserProps {
  name: string;
  avatarSrc?: string;
  onClick?: () => void;
}

export const PageHeaderUser = ({
  name,
  avatarSrc,
  onClick,
}: PageHeaderUserProps) => (
  <PageHeaderUserPrimitive
    name={name}
    avatarSrc={avatarSrc}
    onClick={onClick}
  />
);
