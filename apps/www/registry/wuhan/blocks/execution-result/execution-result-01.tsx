"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Copy } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * 执行结果容器原语属性
 * @public
 */
interface ExecutionResultContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

/**
 * 执行结果标题原语属性
 * @public
 */
interface ExecutionResultTitlePrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（通常是箭头图标）
   */
  arrow?: React.ReactNode;
}

/**
 * 执行结果内容容器原语属性（包裹列表项）
 * @public
 */
interface ExecutionResultContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果列表项容器原语属性
 * @public
 */
interface ExecutionResultItemPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

/**
 * 执行结果列表项头部原语属性
 * @public
 */
interface ExecutionResultItemHeaderPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * 左侧内容（通常是图标和标题）
   */
  children?: React.ReactNode;
  /**
   * 右侧内容（通常是箭头图标）
   */
  arrow?: React.ReactNode;
}

/**
 * 执行结果列表项图标原语属性
 * @public
 */
interface ExecutionResultItemIconPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果列表项标题原语属性
 * @public
 */
interface ExecutionResultItemTitlePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果列表项图片原语属性
 * @public
 */
interface ExecutionResultItemImagePrimitiveProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 图片地址
   */
  src?: string;
  /**
   * 图片替代文本
   */
  alt?: string;
}

/**
 * 执行结果列表项工具名称原语属性
 * @public
 */
interface ExecutionResultItemToolNamePrimitiveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 工具名称
   */
  children?: React.ReactNode;
}

/**
 * 执行结果列表项内容原语属性
 * @public
 */
interface ExecutionResultItemContentPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果区块原语属性（请求/响应部分）
 * @public
 */
interface ExecutionResultSectionPrimitiveProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * 区块标题
   */
  title?: React.ReactNode;
  /**
   * 是否显示复制图标
   */
  showCopyIcon?: boolean;
  /**
   * 复制回调
   */
  onCopy?: () => void;
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果区块标题原语属性
 * @public
 */
interface ExecutionResultSectionTitlePrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 执行结果复制图标原语属性
 * @public
 */
interface ExecutionResultCopyIconPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 复制回调
   */
  onCopy?: () => void;
}

// ==================== 样式原语组件 ====================

/**
 * 执行结果容器样式原语
 * @public
 */
const ExecutionResultContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultContainerPrimitiveProps
>(
  (
    { children, defaultOpen = false, open, onOpenChange, className, ...props },
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
            "overflow-hidden",
            "flex flex-col",
            "gap-[var(--gap-md)]",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    );
  },
);
ExecutionResultContainerPrimitive.displayName =
  "ExecutionResultContainerPrimitive";

/**
 * 执行结果标题样式原语
 * @public
 */
const ExecutionResultTitlePrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultTitlePrimitiveProps
>(({ className, children, arrow, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex items-center gap-[var(--gap-md)]",
          "text-sm",
          "w-full",
          "leading-[var(--line-height-2)]",
          "text-[var(--text-secondary)]",
          "cursor-pointer",
          "group", // 添加 group 类以支持子元素的状态选择
          "hover:text-[var(--text-brand-hover)]",
          "transition-colors",
          className,
        )}
        {...props}
      >
        {arrow}
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "text-sm",
            "leading-[var(--line-height-2)]",
          )}
        >
          {children}
        </div>
      </div>
    </CollapsibleTrigger>
  );
});
ExecutionResultTitlePrimitive.displayName = "ExecutionResultTitlePrimitive";

/**
 * 执行结果内容容器样式原语（包裹列表项）
 * @public
 */
const ExecutionResultContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex flex-col",
          "rounded-[var(--radius-xl)]",
          "overflow-hidden",
          "border border-[var(--border-neutral)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
});
ExecutionResultContentPrimitive.displayName = "ExecutionResultContentPrimitive";

/**
 * 执行结果列表项容器样式原语
 * @public
 */
const ExecutionResultItemPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultItemPrimitiveProps
>(
  (
    { children, defaultOpen = false, open, onOpenChange, className, ...props },
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
            "overflow-hidden",
            "flex flex-col",
            "gap-[var(--gap-md)]",
            "p-[var(--padding-com-lg)]",
            "hover:bg-[var(--bg-neutral-light)]",
            "transition-colors",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    );
  },
);
ExecutionResultItemPrimitive.displayName = "ExecutionResultItemPrimitive";

/**
 * 执行结果列表项头部样式原语
 * @public
 */
const ExecutionResultItemHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultItemHeaderPrimitiveProps
>(({ children, arrow, className, ...props }, ref) => {
  return (
    <CollapsibleTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex items-center justify-between",
          "w-full",
          "gap-[var(--gap-xs)]",
          "cursor-pointer",
          "group", // 添加 group 类以支持子元素的状态选择
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-[var(--gap-md)] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{children}</div>
        <div className="flex items-center gap-[var(--gap-xs)] text-[var(--text-secondary)]">
          {arrow}
        </div>
      </div>
    </CollapsibleTrigger>
  );
});
ExecutionResultItemHeaderPrimitive.displayName =
  "ExecutionResultItemHeaderPrimitive";

/**
 * 执行结果列表项图标样式原语
 * @public
 */
const ExecutionResultItemIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultItemIconPrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
});
ExecutionResultItemIconPrimitive.displayName =
  "ExecutionResultItemIconPrimitive";

/**
 * 执行结果列表项标题样式原语
 * @public
 */
const ExecutionResultItemTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  ExecutionResultItemTitlePrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-primary)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ExecutionResultItemTitlePrimitive.displayName =
  "ExecutionResultItemTitlePrimitive";

/**
 * 执行结果列表项图片样式原语
 * @public
 */
const ExecutionResultItemImagePrimitive = React.forwardRef<
  HTMLImageElement,
  ExecutionResultItemImagePrimitiveProps
>(({ className, src, alt, ...props }, ref) => {
  if (!src) return null;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ""}
      className={cn(
        "size-4",
        "object-cover",
        "bg-[#D9D9D9]",
        "!m-0",
        className,
      )}
      {...props}
    />
  );
});
ExecutionResultItemImagePrimitive.displayName = "ExecutionResultItemImagePrimitive";

/**
 * 执行结果列表项工具名称样式原语
 * @public
 */
const ExecutionResultItemToolNamePrimitive = React.forwardRef<
  HTMLSpanElement,
  ExecutionResultItemToolNamePrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "text-sm",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-primary)]",
        "flex-1",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ExecutionResultItemToolNamePrimitive.displayName = "ExecutionResultItemToolNamePrimitive";

/**
 * 执行结果列表项内容样式原语
 * @public
 */
const ExecutionResultItemContentPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultItemContentPrimitiveProps
>(({ children, className, ...props }, ref) => {
  return (
    <CollapsibleContent>
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex flex-col",
          "gap-[var(--gap-md)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
});
ExecutionResultItemContentPrimitive.displayName =
  "ExecutionResultItemContentPrimitive";

/**
 * 执行结果区块样式原语（请求/响应部分）
 * @public
 */
const ExecutionResultSectionPrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultSectionPrimitiveProps
>(
  (
    { title, showCopyIcon = true, onCopy, children, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "[&_*]:!box-border",
          "flex flex-col",
          className,
        )}
        {...props}
      >
        {(title || showCopyIcon) && (

          <div className={cn("flex items-center justify-between",
            "gap-[var(--gap-md)]",
            "bg-[var(--bg-container-secondary)]",
            "p-[var(--padding-com-sm)]",
            "pr-[var(--padding-com-md)]",
            "pb-[var(--padding-com-sm)]",
            "pl-[var(--padding-com-md)]",
            "rounded-t-[var(--radius-md)]",
            "border-b-[1px] border-[var(--border-neutral)]",
            className)}>
            {title && (
              <ExecutionResultSectionTitlePrimitive>
                {title}
              </ExecutionResultSectionTitlePrimitive>
            )}
            {showCopyIcon && (
              <ExecutionResultCopyIconPrimitive onCopy={onCopy} />
            )}
          </div>
        )}
        {children && (
          // width: 776;
          // height: 32;
          // angle: 0 deg;
          // opacity: 1;
          // padding-top: Padding/padding-com-sm;
          // padding-right: Padding/padding-com-md;
          // padding-bottom: Padding/padding-com-sm;
          // padding-left: Padding/padding-com-md;
          // border-bottom-right-radius: 8px;
          // border-bottom-left-radius: 8px;
          
          <div
            className={cn(
              "font-[var(--font-family-cn)]",
              "text-xs",
              "leading-[var(--line-height-1)]",
              "text-[var(--text-secondary)]",
              "whitespace-pre-wrap",
              "bg-[var(--bg-neutral-light)]",
              "py-[var(--padding-com-sm)]",
              "px-[var(--padding-com-md)]",
              "rounded-b-[var(--radius-md)]",
              "max-h-[calc(var(--line-height-1)*8)]", // 8行的高度
              "overflow-y-auto",
              "overflow-x-hidden",
              className)}>

            {children}
          </div>
          )}
      </div>
    );
  },
);
ExecutionResultSectionPrimitive.displayName = "ExecutionResultSectionPrimitive";

/**
 * 执行结果区块标题样式原语
 * @public
 */
const ExecutionResultSectionTitlePrimitive = React.forwardRef<
  HTMLDivElement,
  ExecutionResultSectionTitlePrimitiveProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "text-xs",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-tertiary)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ExecutionResultSectionTitlePrimitive.displayName =
  "ExecutionResultSectionTitlePrimitive";

/**
 * 执行结果复制图标样式原语
 * @public
 */
const ExecutionResultCopyIconPrimitive = React.forwardRef<
  HTMLButtonElement,
  ExecutionResultCopyIconPrimitiveProps
>(({ className, onCopy, ...props }, ref) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleCopy}
      className={cn(
        "[&_*]:!box-border",
        "size-4",
        "flex items-center justify-center",
        "cursor-pointer",
        "text-[var(--text-secondary)]",
        "hover:text-[var(--text-primary)]",
        "transition-colors",
        "outline-none",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <Copy className="size-3" />
    </button>
  );
});
ExecutionResultCopyIconPrimitive.displayName =
  "ExecutionResultCopyIconPrimitive";

/**
 * 箭头图标样式原语
 * @public
 */
const ExecutionResultArrowPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "size-4",
        "text-[var(--text-secondary)]",
        "transition-transform duration-200",
        "group-data-[state=open]:rotate-180", // 当父元素 CollapsibleTrigger 的 data-state 为 open 时旋转
        "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children || ">"}
    </div>
  );
});
ExecutionResultArrowPrimitive.displayName = "ExecutionResultArrowPrimitive";

// ==================== 统一导出 ====================

export type {
  ExecutionResultContainerPrimitiveProps,
  ExecutionResultTitlePrimitiveProps,
  ExecutionResultContentPrimitiveProps,
  ExecutionResultItemPrimitiveProps,
  ExecutionResultItemHeaderPrimitiveProps,
  ExecutionResultItemIconPrimitiveProps,
  ExecutionResultItemTitlePrimitiveProps,
  ExecutionResultItemImagePrimitiveProps,
  ExecutionResultItemToolNamePrimitiveProps,
  ExecutionResultItemContentPrimitiveProps,
  ExecutionResultSectionPrimitiveProps,
  ExecutionResultSectionTitlePrimitiveProps,
  ExecutionResultCopyIconPrimitiveProps,
};

export {
  ExecutionResultContainerPrimitive,
  ExecutionResultTitlePrimitive,
  ExecutionResultContentPrimitive,
  ExecutionResultItemPrimitive,
  ExecutionResultItemHeaderPrimitive,
  ExecutionResultItemIconPrimitive,
  ExecutionResultItemTitlePrimitive,
  ExecutionResultItemImagePrimitive,
  ExecutionResultItemToolNamePrimitive,
  ExecutionResultItemContentPrimitive,
  ExecutionResultSectionPrimitive,
  ExecutionResultSectionTitlePrimitive,
  ExecutionResultCopyIconPrimitive,
  ExecutionResultArrowPrimitive,
};
