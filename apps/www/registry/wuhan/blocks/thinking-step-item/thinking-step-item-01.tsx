"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";
import { ChevronDown, Loader2, CheckCircle2, XCircle, X } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * 执行步骤状态类型
 * @public
 */
type ThinkingStepItemStatus = "loading" | "success" | "error" | "cancel";

/**
 * 执行步骤容器原语属性
 * @public
 */
interface ThinkingStepItemContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤原语属性
 * @public
 */
interface ThinkingStepItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否默认展开
   */
  defaultOpen?: boolean;
  /**
   * 控制展开状态
   */
  open?: boolean;
  /**
   * 展开状态变化回调
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 步骤状态
   */
  status?: ThinkingStepItemStatus;
}

/**
 * 执行步骤头部原语属性
 * @public
 */
interface ThinkingStepItemHeaderPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 左侧内容（图标、标题等）
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（折叠箭头等）
   */
  trailing?: React.ReactNode;
}

/**
 * 执行步骤内容原语属性
 * @public
 */
interface ThinkingStepItemContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤状态图标原语属性
 * @public
 */
interface ThinkingStepItemStatusIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 状态
   */
  status?: ThinkingStepItemStatus;
}

/**
 * 执行步骤标题原语属性
 * @public
 */
interface ThinkingStepItemTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤内容列表原语属性
 * @public
 */
interface ThinkingStepItemContentListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容项列表
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤内容项原语属性
 * @public
 */
interface ThinkingStepItemContentItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否是最后一项
   */
  isLast?: boolean;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 时间轴原语属性
 * @public
 */
interface ThinkingStepItemTimelinePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否是最后一项
   */
  isLast?: boolean;
}

/**
 * 内容区域原语属性
 * @public
 */
interface ThinkingStepItemContentAreaPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 普通内容原语属性
 * @public
 */
interface ThinkingStepItemRegularContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用块原语属性
 * @public
 */
interface ThinkingStepItemToolCallPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title" | "content"
> {
  /**
   * 工具图标
   */
  icon?: React.ReactNode;
  /**
   * 工具标题
   */
  title?: React.ReactNode;
  /**
   * 工具内容
   */
  content?: React.ReactNode;
}

/**
 * 工具调用图标原语属性
 * @public
 */
interface ThinkingStepItemToolCallIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用标题原语属性
 * @public
 */
interface ThinkingStepItemToolCallTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用内容原语属性
 * @public
 */
interface ThinkingStepItemToolCallContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 文件列表原语属性
 * @public
 */
interface ThinkingStepItemFileListPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件列表数据
   */
  files?: Array<{
    /**
     * 文件图标（工具头像）
     */
    icon?: string;
    /**
     * 文件名
     */
    name: string;
  }>;
  /**
   * 默认显示的文件数量（超过后显示查看更多）
   */
  defaultVisibleCount?: number;
}

/**
 * 文件项原语属性
 * @public
 */
interface ThinkingStepItemFileItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件图标（工具头像）
   */
  icon?: string;
  /**
   * 文件名
   */
  name: string;
}

/**
 * 展开/收起按钮原语属性
 * @public
 */
interface ThinkingStepItemExpandButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 是否展开
   */
  expanded?: boolean;
  /**
   * 展开/收起回调
   */
  onToggle?: () => void;
}

// ==================== 样式原语组件 ====================

/**
 * 执行步骤容器样式原语
 * @public
 */
const ThinkingStepItemContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContainerPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[&_*]:!box-border", "w-full", "flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemContainerPrimitive.displayName =
  "ThinkingStepItemContainerPrimitive";

/**
 * 执行步骤样式原语
 * @public
 */
const ThinkingStepItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemPrimitiveProps
>(
  (
    {
      children,
      defaultOpen = false,
      open,
      onOpenChange,
      status = "loading",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div
          ref={ref}
          className={cn(
            "[&_*]:!box-border",
            "w-full",
            "group/step-item",
            className,
          )}
          data-status={status}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    );
  },
);
ThinkingStepItemPrimitive.displayName = "ThinkingStepItemPrimitive";

/**
 * 执行步骤头部样式原语
 * @public
 */
const ThinkingStepItemHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemHeaderPrimitiveProps
>(({ children, trailing, className, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex items-center",
          "w-full",
          "cursor-pointer",
          "transition-colors",
          "gap-[var(--gap-md)]",
          className,
        )}
        {...props}
      >
        {children}
        {trailing && <div className="ml-auto">{trailing}</div>}
      </div>
    </CollapsibleTrigger>
  );
});
ThinkingStepItemHeaderPrimitive.displayName = "ThinkingStepItemHeaderPrimitive";

/**
 * 执行步骤状态图标样式原语
 * @public
 */
const ThinkingStepItemStatusIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemStatusIconPrimitiveProps
>(({ status = "loading", className, ...props }, ref) => {
  const iconMap = {
    loading: <Loader2 className="size-4 animate-spin" />,
    success: <CheckCircle2 className="size-4" />,
    error: <XCircle className="size-4" />,
    cancel: <X className="size-4" />,
  };

  const colorMap = {
    loading: "text-[var(--text-icon-text-brand,#4A56FF)]",
    success: "text-[var(--text-success)]",
    error: "text-[var(--text-error)]",
    cancel: "text-[var(--text-icon-text-placeholder,#AAA8B3)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "size-4",
        colorMap[status],
        className,
      )}
      data-status={status}
      {...props}
    >
      {iconMap[status]}
    </div>
  );
});
ThinkingStepItemStatusIconPrimitive.displayName =
  "ThinkingStepItemStatusIconPrimitive";

/**
 * 执行步骤标题样式原语
 * @public
 */
const ThinkingStepItemTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingStepItemTitlePrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "font-semibold",
        "text-[var(--text-icon-text-primary,#403F4D)]",
        "group-hover/step-item:text-[var(--text-icon-text-brand,#4A56FF)]",
        "transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThinkingStepItemTitlePrimitive.displayName = "ThinkingStepItemTitlePrimitive";

/**
 * 折叠箭头样式原语
 * @public
 */
const ThinkingStepItemCollapseArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "size-4",
        "text-[var(--text-icon-text-primary,#403F4D)]",
        "group-hover/step-item:text-[var(--text-icon-text-brand,#4A56FF)]",
        "transition-all duration-200",
        "data-[state=open]:rotate-180",
        "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children || <ChevronDown className="size-4" />}
    </div>
  );
});
ThinkingStepItemCollapseArrowPrimitive.displayName =
  "ThinkingStepItemCollapseArrowPrimitive";

/**
 * 执行步骤内容样式原语
 * @public
 */
const ThinkingStepItemContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "mt-[var(--gap-md)]",
          "w-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
});
ThinkingStepItemContentPrimitive.displayName =
  "ThinkingStepItemContentPrimitive";

/**
 * 执行步骤内容列表样式原语
 * @public
 */
const ThinkingStepItemContentListPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentListPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[&_*]:!box-border", "w-full", "flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemContentListPrimitive.displayName =
  "ThinkingStepItemContentListPrimitive";

/**
 * 执行步骤内容项样式原语
 * @public
 */
const ThinkingStepItemContentItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentItemPrimitiveProps
>(({ isLast = false, children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "w-full",
        "flex",
        "gap-[var(--gap-xl)]",
        !isLast && "mb-[var(--gap-xl)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemContentItemPrimitive.displayName =
  "ThinkingStepItemContentItemPrimitive";

/**
 * 时间轴样式原语
 * @public
 */
const ThinkingStepItemTimelinePrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemTimelinePrimitiveProps
>(({ isLast = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex flex-col",
        "items-center",
        "justify-center",
        "w-4",
        className,
      )}
      {...props}
    >
      {/* 圆点 */}
      <div
        className={cn(
          "w-1 h-1",
          "rounded-full",
          "bg-[var(--text-icon-text-placeholder,#AAA8B3)]",
          "flex-shrink-0",
        )}
      />
      {/* 竖线 */}
      {(
        <div
          className={cn(
            "w-[1px]",
            "h-full",
            "min-h-[var(--gap-xl)]",
            "bg-[var(--divider-neutral-basic)]",
            "translate-x-1/2",
          )}
        />
      )}
    </div>
  );
});
ThinkingStepItemTimelinePrimitive.displayName =
  "ThinkingStepItemTimelinePrimitive";

/**
 * 内容区域样式原语
 * @public
 */
const ThinkingStepItemContentAreaPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemContentAreaPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex-1",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemContentAreaPrimitive.displayName =
  "ThinkingStepItemContentAreaPrimitive";

/**
 * 普通内容样式原语
 * @public
 */
const ThinkingStepItemRegularContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemRegularContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-icon-text-primary,#403F4D)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemRegularContentPrimitive.displayName =
  "ThinkingStepItemRegularContentPrimitive";

/**
 * 工具调用块样式原语
 * @public
 */
const ThinkingStepItemToolCallPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallPrimitiveProps
>(({ icon, title, content, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "inline-flex items-center",
        "gap-[var(--gap-xs)]",
        "rounded-[var(--radius-sm)]",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-sm)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-sm)]",
        "bg-[var(--Container-bg-neutral-light,#F6F6FA)]",
        className,
      )}
      {...props}
    >
      {/* Icon 区域 */}
      {icon && (
        <div className="flex-shrink-0">
          <ThinkingStepItemToolCallIconPrimitive>
            {icon}
          </ThinkingStepItemToolCallIconPrimitive>
        </div>
      )}
      {/* Content 区域 - 如果同时有 title 和 content，用冒号连接 */}
      <div className="flex items-center gap-[var(--gap-xs)]">
        {title && (
          <ThinkingStepItemToolCallTitlePrimitive>
            {title}
            {content && ":"}
          </ThinkingStepItemToolCallTitlePrimitive>
        )}
        {content && (
          <ThinkingStepItemToolCallContentPrimitive>
            {content}
          </ThinkingStepItemToolCallContentPrimitive>
        )}
      </div>
    </div>
  );
});
ThinkingStepItemToolCallPrimitive.displayName =
  "ThinkingStepItemToolCallPrimitive";

/**
 * 工具调用图标样式原语
 * @public
 */
const ThinkingStepItemToolCallIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallIconPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "text-xs",
        "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemToolCallIconPrimitive.displayName =
  "ThinkingStepItemToolCallIconPrimitive";

/**
 * 工具调用标题样式原语
 * @public
 */
const ThinkingStepItemToolCallTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  ThinkingStepItemToolCallTitlePrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-icon-text-secondary,#666473)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThinkingStepItemToolCallTitlePrimitive.displayName =
  "ThinkingStepItemToolCallTitlePrimitive";

/**
 * 工具调用内容样式原语
 * @public
 */
const ThinkingStepItemToolCallContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemToolCallContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-icon-text-tertiary,#9E9CA6)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThinkingStepItemToolCallContentPrimitive.displayName =
  "ThinkingStepItemToolCallContentPrimitive";

/**
 * 文件列表样式原语
 * @public
 */
const ThinkingStepItemFileListPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemFileListPrimitiveProps
>(({ files = [], defaultVisibleCount = 6, className, ...props }, ref) => {
  const [expanded, setExpanded] = React.useState(false);

  // 计算显示的文件数量（默认显示约两行的文件，假设每行3个）
  const visibleCount = expanded ? files.length : defaultVisibleCount;
  const visibleFiles = files.slice(0, visibleCount);
  const hasMore = files.length > defaultVisibleCount;

  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "flex flex-col",
        "gap-[var(--gap-xs)]",
        className,
      )}
      {...props}
    >
      {/* 文件列表 */}
      <div className="flex flex-wrap gap-[var(--gap-xs)]">
        {visibleFiles.map((file, index) => (
          <ThinkingStepItemFileItemPrimitive
            key={index}
            icon={file.icon}
            name={file.name}
          />
        ))}
      </div>
      {/* 展开/收起按钮 */}
      {hasMore && (
        <ThinkingStepItemExpandButtonPrimitive
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        >
          {expanded ? "收起" : "查看更多"}
        </ThinkingStepItemExpandButtonPrimitive>
      )}
    </div>
  );
});
ThinkingStepItemFileListPrimitive.displayName =
  "ThinkingStepItemFileListPrimitive";

/**
 * 文件项样式原语
 * @public
 */
const ThinkingStepItemFileItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemFileItemPrimitiveProps
>(({ icon, name, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "[&_*]:!box-border",
        "inline-flex items-center",
        "gap-[var(--gap-xs)]",
        "rounded-[var(--radius-circle)]",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-sm)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-sm)]",
        "bg-[var(--Container-bg-neutral-light,#F6F6FA)]",
        "border border-[var(--Border-border-neutral,#E1E0E7)]",
        className,
      )}
      {...props}
    >
      {/* 图标 */}
      <div className="size-4 flex-shrink-0 inline-flex items-center justify-center">
        {icon ? (
          typeof icon === "string" ? (
            <span className="text-sm">{icon}</span>
          ) : (
            icon
          )
        ) : (
          <div className="w-full h-full bg-[var(--Container-bg-neutral-light,#F6F6FA)] rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--text-placeholder)] rounded" />
          </div>
        )}
      </div>
      {/* 文件名 */}
      <span
        className={cn(
          "font-[var(--font-family-cn)]",
          "font-size-1",
          "leading-[var(--line-height-1)]",
          "font-normal",
          "text-[var(--text-icon-text-secondary,#666473)]",
        )}
      >
        {name}
      </span>
    </div>
  );
});
ThinkingStepItemFileItemPrimitive.displayName =
  "ThinkingStepItemFileItemPrimitive";

/**
 * 展开/收起按钮样式原语
 * @public
 */
const ThinkingStepItemExpandButtonPrimitive = React.forwardRef<
  HTMLButtonElement,
  ThinkingStepItemExpandButtonPrimitiveProps
>(({ expanded = false, onToggle, children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      className={cn(
        "[&_*]:!box-border",
        "w-[60px]",
        "h-6",
        "flex items-center justify-center",
        "gap-[var(--gap-xs)]",
        "rounded-full",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-md)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-md)]",
        "bg-[var(--Container-bg-container,#FFFFFF)]",
        "border border-[var(--Border-border-neutral,#E1E0E7)]",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-icon-text-primary,#403F4D)]",
        "cursor-pointer",
        "transition-colors",
        "hover:bg-[var(--Container-bg-neutral-light,#F6F6FA)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
ThinkingStepItemExpandButtonPrimitive.displayName =
  "ThinkingStepItemExpandButtonPrimitive";

// ==================== 业务组件层（可选） ====================

/**
 * 执行步骤组件属性
 * @public
 */
interface ThinkingStepItemProps extends Omit<
  ThinkingStepItemPrimitiveProps,
  "children" | "title"
> {
  /**
   * 步骤标题
   */
  title: React.ReactNode;
  /**
   * 步骤内容项列表
   */
  items?: Array<{
    /**
     * 普通内容
     */
    content?: React.ReactNode;
    /**
     * 工具调用
     */
    toolCall?: {
      icon?: React.ReactNode;
      title?: React.ReactNode;
      content?: React.ReactNode;
    };
    /**
     * 文件列表
     */
    files?: Array<{
      icon?: string;
      name: string;
    }>;
  }>;
  /**
   * 自定义状态图标
   */
  statusIcon?: React.ReactNode;
  /**
   * 自定义折叠箭头图标
   */
  arrowIcon?: React.ReactNode;
}

/**
 * 执行步骤业务组件
 * @public
 */
const ThinkingStepItem = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemProps
>(
  (
    {
      title,
      items = [],
      status = "loading",
      statusIcon,
      arrowIcon,
      defaultOpen,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const defaultArrowIcon = <ChevronDown className="size-4" />;

    return (
      <ThinkingStepItemContainerPrimitive>
        <ThinkingStepItemPrimitive
          ref={ref}
          status={status}
          defaultOpen={defaultOpen}
          open={open}
          onOpenChange={onOpenChange}
          {...props}
        >
          <ThinkingStepItemHeaderPrimitive
            trailing={
              <ThinkingStepItemCollapseArrowPrimitive>
                {arrowIcon || defaultArrowIcon}
              </ThinkingStepItemCollapseArrowPrimitive>
            }
          >
            <ThinkingStepItemStatusIconPrimitive status={status}>
              {statusIcon}
            </ThinkingStepItemStatusIconPrimitive>
            <ThinkingStepItemTitlePrimitive>
              {title}
            </ThinkingStepItemTitlePrimitive>
          </ThinkingStepItemHeaderPrimitive>
          {items.length > 0 && (
            <ThinkingStepItemContentPrimitive>
              <ThinkingStepItemContentListPrimitive>
                {items.map((item, index) => (
                  <ThinkingStepItemContentItemPrimitive
                    key={index}
                    isLast={index === items.length - 1}
                  >
                    <ThinkingStepItemTimelinePrimitive
                      isLast={index === items.length - 1}
                    />
                    <ThinkingStepItemContentAreaPrimitive>
                      {item.content && (
                        <ThinkingStepItemRegularContentPrimitive>
                          {item.content}
                        </ThinkingStepItemRegularContentPrimitive>
                      )}
                      {item.toolCall && (
                        <ThinkingStepItemToolCallPrimitive
                          icon={item.toolCall.icon}
                          title={item.toolCall.title}
                          content={item.toolCall.content}
                        />
                      )}
                      {item.files && item.files.length > 0 && (
                        <ThinkingStepItemFileListPrimitive files={item.files} />
                      )}
                    </ThinkingStepItemContentAreaPrimitive>
                  </ThinkingStepItemContentItemPrimitive>
                ))}
              </ThinkingStepItemContentListPrimitive>
            </ThinkingStepItemContentPrimitive>
          )}
        </ThinkingStepItemPrimitive>
      </ThinkingStepItemContainerPrimitive>
    );
  },
);
ThinkingStepItem.displayName = "ThinkingStepItem";

// ==================== 统一导出 ====================

export type {
  ThinkingStepItemStatus,
  ThinkingStepItemContainerPrimitiveProps,
  ThinkingStepItemPrimitiveProps,
  ThinkingStepItemHeaderPrimitiveProps,
  ThinkingStepItemContentPrimitiveProps,
  ThinkingStepItemStatusIconPrimitiveProps,
  ThinkingStepItemTitlePrimitiveProps,
  ThinkingStepItemContentListPrimitiveProps,
  ThinkingStepItemContentItemPrimitiveProps,
  ThinkingStepItemTimelinePrimitiveProps,
  ThinkingStepItemContentAreaPrimitiveProps,
  ThinkingStepItemRegularContentPrimitiveProps,
  ThinkingStepItemToolCallPrimitiveProps,
  ThinkingStepItemToolCallIconPrimitiveProps,
  ThinkingStepItemToolCallTitlePrimitiveProps,
  ThinkingStepItemToolCallContentPrimitiveProps,
  ThinkingStepItemFileListPrimitiveProps,
  ThinkingStepItemFileItemPrimitiveProps,
  ThinkingStepItemExpandButtonPrimitiveProps,
  ThinkingStepItemProps,
};

export {
  ThinkingStepItemContainerPrimitive,
  ThinkingStepItemPrimitive,
  ThinkingStepItemHeaderPrimitive,
  ThinkingStepItemContentPrimitive,
  ThinkingStepItemStatusIconPrimitive,
  ThinkingStepItemTitlePrimitive,
  ThinkingStepItemCollapseArrowPrimitive,
  ThinkingStepItemContentListPrimitive,
  ThinkingStepItemContentItemPrimitive,
  ThinkingStepItemTimelinePrimitive,
  ThinkingStepItemContentAreaPrimitive,
  ThinkingStepItemRegularContentPrimitive,
  ThinkingStepItemToolCallPrimitive,
  ThinkingStepItemToolCallIconPrimitive,
  ThinkingStepItemToolCallTitlePrimitive,
  ThinkingStepItemToolCallContentPrimitive,
  ThinkingStepItemFileListPrimitive,
  ThinkingStepItemFileItemPrimitive,
  ThinkingStepItemExpandButtonPrimitive,
  ThinkingStepItem,
};
