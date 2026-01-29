"use client";

import {
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleAlert,
  Loader2,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/wuhan/ui/collapsible";

const BOX_BORDER = "[&_*]:!box-border";

// ==================== 类型定义 ====================

/**
 * 执行步骤状态类型
 * @public
 */
type ThinkingStepItemStatus = "loading" | "success" | "error" | "cancel";

/**
 * 文件项状态类型
 *
 * 说明：文件项的状态与步骤状态语义不同（例如文件上传/解析中），因此单独抽出。
 *
 * @public
 */
type ThinkingStepItemFileStatus = "loading" | "ready" | "error";

/**
 * 执行步骤容器原语属性
 * @public
 */
interface ThinkingStepItemContainerPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤原语属性
 * @public
 */
interface ThinkingStepItemPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 是否启用折叠/展开交互
   *
   * - `false`：不显示箭头，不可点击，内容（若有）直接展示
   * - `true`：启用 Collapsible（支持受控/非受控）
   *
   * @default false
   */
  collapsible?: boolean;
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
interface ThinkingStepItemHeaderPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 左侧内容（图标、标题等）
   */
  children?: React.ReactNode;
  /**
   * 是否启用折叠/展开交互
   *
   * @default false
   */
  collapsible?: boolean;
  /**
   * 右侧内容（折叠箭头等）
   */
  trailing?: React.ReactNode;
}

/**
 * 执行步骤内容原语属性
 * @public
 */
interface ThinkingStepItemContentPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否启用折叠/展开交互
   *
   * @default false
   */
  collapsible?: boolean;
}

/**
 * 执行步骤状态图标原语属性
 * @public
 */
interface ThinkingStepItemStatusIconPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 状态
   */
  status?: ThinkingStepItemStatus;
  /**
   * 自定义图标内容（优先级高于内置图标）
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤标题原语属性
 * @public
 */
interface ThinkingStepItemTitlePrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤内容列表原语属性
 * @public
 */
interface ThinkingStepItemContentListPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容项列表
   */
  children?: React.ReactNode;
}

/**
 * 执行步骤内容项原语属性
 * @public
 */
interface ThinkingStepItemContentItemPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
interface ThinkingStepItemTimelinePrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否是最后一项
   */
  isLast?: boolean;
}

/**
 * 内容区域原语属性
 * @public
 */
interface ThinkingStepItemContentAreaPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 普通内容原语属性
 * @public
 */
interface ThinkingStepItemRegularContentPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用块原语属性
 * @public
 */
interface ThinkingStepItemToolCallPrimitiveProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
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
interface ThinkingStepItemToolCallIconPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 图标内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用标题原语属性
 * @public
 */
interface ThinkingStepItemToolCallTitlePrimitiveProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标题内容
   */
  children?: React.ReactNode;
}

/**
 * 工具调用内容原语属性
 * @public
 */
interface ThinkingStepItemToolCallContentPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 内容
   */
  children?: React.ReactNode;
}

/**
 * 文件列表原语属性
 * @public
 */
interface ThinkingStepItemFileListPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件列表数据
   */
  files?: Array<{
    /**
     * 文件图标（工具头像）
     */
    icon?: React.ReactNode;
    /**
     * 文件状态
     */
    status?: ThinkingStepItemFileStatus;
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
interface ThinkingStepItemFileItemPrimitiveProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 文件图标（工具头像）
   */
  icon?: React.ReactNode;
  /**
   * 文件状态
   */
  status?: ThinkingStepItemFileStatus;
  /**
   * 文件名
   */
  name: string;
}

/**
 * 展开/收起按钮原语属性
 * @public
 */
interface ThinkingStepItemExpandButtonPrimitiveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      className={cn(
        BOX_BORDER,
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-xl)]",
        className,
      )}
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
      collapsible = false,
      defaultOpen = false,
      open,
      onOpenChange,
      status = "loading",
      className,
      ...props
    },
    ref,
  ) => {
    const node = (
      <div
        ref={ref}
        className={cn(BOX_BORDER, "w-full", "group/step-item", className)}
        data-status={status}
        data-collapsible={collapsible ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    );

    if (!collapsible) return node;

    return (
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        {node}
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
>(({ children, trailing, collapsible = false, className, ...props }, ref) => {
  const headerNode = (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "flex items-center",
        "w-full",
        collapsible ? "cursor-pointer" : "cursor-default",
        "transition-colors",
        "gap-[var(--gap-md)]",
        className,
      )}
      data-collapsible={collapsible ? "true" : "false"}
      {...props}
    >
      {children}
      {trailing && <div className="ml-auto">{trailing}</div>}
    </div>
  );

  if (!collapsible) return headerNode;

  return <CollapsibleTrigger asChild>{headerNode}</CollapsibleTrigger>;
});
ThinkingStepItemHeaderPrimitive.displayName = "ThinkingStepItemHeaderPrimitive";

/**
 * 执行步骤状态图标样式原语
 * @public
 */
const ThinkingStepItemStatusIconPrimitive = React.forwardRef<
  HTMLDivElement,
  ThinkingStepItemStatusIconPrimitiveProps
>(({ status = "loading", className, children, ...props }, ref) => {
  const iconMap = {
    loading: <Loader2 className="size-4 animate-spin" />,
    success: <CheckCircle2 className="size-4" />,
    error: <CircleAlert className="size-4" />,
    cancel: <Circle className="size-4" />,
  };

  const colorMap = {
    loading: "text-[var(--text-brand)]",
    success: "text-[var(--text-success)]",
    error: "text-[var(--text-error)]",
    cancel: "text-[var(--text-tertiary)]",
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
      {children || iconMap[status]}
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
        "text-[var(--text-primary)]",
        "group-hover/step-item:text-[var(--text-brand)]",
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
        "text-[var(--text-primary)]",
        "group-hover/step-item:text-[var(--text-brand)]",
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
>(({ children, collapsible = false, className, ...props }, ref) => {
  const contentNode = (
    <div
      ref={ref}
      className={cn(BOX_BORDER, "mt-[var(--gap-md)]", "w-full", className)}
      data-collapsible={collapsible ? "true" : "false"}
      {...props}
    >
      {children}
    </div>
  );

  if (!collapsible) return contentNode;

  return <CollapsibleContent>{contentNode}</CollapsibleContent>;
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
      className={cn(
        BOX_BORDER,
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-xl)]",
        className,
      )}
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
        BOX_BORDER,
        "w-full",
        "flex",
        "gap-[var(--gap-md)]",
        "relative",
        "pl-[calc(var(--space-6)+var(--gap-md))]",
        className,
      )}
      data-last={isLast ? "true" : "false"}
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
        BOX_BORDER,
        "flex flex-col",
        "items-center",
        "w-[var(--space-6)]",
        "absolute",
        "top-0",
        "left-0",
        "pt-[var(--padding-com-md)]",
        isLast ? "h-full" : "h-[calc(100%+var(--gap-xl))]",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        className,
      )}
      data-last={isLast ? "true" : "false"}
      {...props}
    >
      {/* 圆点 */}
      <div
        className={cn(
          "w-[var(--space-2)] h-[var(--space-2)]",
          "rounded-full",
          "bg-[var(--text-placeholder)]",
          "flex-shrink-0",
        )}
      />
      {/* 竖线 */}
      <div
        className={cn(
          "w-[var(--border-width)]",
          isLast ? "h-full" : "h-[calc(100%+var(--gap-xs))]",
          "bg-[var(--divider-neutral-basic)]",
        )}
      />
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
        BOX_BORDER,
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
        BOX_BORDER,
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-primary)]",
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
        BOX_BORDER,
        "inline-flex items-center",
        "gap-[var(--gap-xs)]",
        "rounded-[var(--radius-sm)]",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-sm)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-sm)]",
        "bg-[var(--bg-neutral-light)]",
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
        BOX_BORDER,
        "font-size-1",
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
        "text-[var(--text-secondary)]",
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
        BOX_BORDER,
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-tertiary)]",
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
  const [needsToggle, setNeedsToggle] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(() => files.length);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const prevWidthRef = React.useRef<number | null>(null);

  const getRowCount = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el) return 0;
    const children = Array.from(el.children) as HTMLElement[];
    const tops = new Set(children.map((c) => c.offsetTop));
    return tops.size;
  }, []);

  // 计算：是否超过两行（只看文件项本身；此阶段不渲染按钮）
  React.useLayoutEffect(() => {
    if (expanded) return;
    // 重置到“渲染全部文件项（无按钮）”的测量态
    setNeedsToggle(false);
    setVisibleCount(files.length);
  }, [expanded, files.length]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    // 仅在“测量态（渲染全部文件项且无按钮）”下计算是否溢出两行
    if (needsToggle) return;
    if (visibleCount !== files.length) return;

    const rowCount = getRowCount();
    if (rowCount > 2) {
      setNeedsToggle(true);
      // 进入折叠态计算：从最大值开始收敛，确保“刚好两排（含按钮）”
      setVisibleCount(files.length);
    }
  }, [expanded, files.length, getRowCount, needsToggle, visibleCount]);

  // 折叠态：确保（文件项 + 更多按钮）最多两行，并且按钮与文件项处于同一行（flex-wrap）
  React.useLayoutEffect(() => {
    if (expanded) return;
    if (!needsToggle) return;

    const el = wrapRef.current;
    if (!el) return;

    // 仅在“宽度变化”时才重算；避免高度变化触发回调导致收起过程被反复打断
    prevWidthRef.current = Math.round(el.getBoundingClientRect().width);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextWidth = Math.round(entry.contentRect.width);
      const prevWidth = prevWidthRef.current;
      if (prevWidth !== null && nextWidth === prevWidth) return;

      prevWidthRef.current = nextWidth;
      setNeedsToggle(false);
      setVisibleCount(files.length);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [expanded, files.length, needsToggle]);

  React.useLayoutEffect(() => {
    if (expanded) return;
    if (!needsToggle) return;

    // 逐步减少 visibleCount，直到（文件 + 按钮）不超过两行
    if (visibleCount <= 0) return;

    const rowCount = getRowCount();
    if (rowCount <= 2) return;

    setVisibleCount((c) => Math.max(0, c - 1));
  }, [expanded, getRowCount, needsToggle, visibleCount]);

  const resolvedVisibleCount = expanded ? files.length : visibleCount;
  const visibleFiles = files.slice(0, resolvedVisibleCount);

  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "flex flex-col",
        "gap-[var(--gap-xs)]",
        className,
      )}
      {...props}
    >
      {/* 文件列表 + 更多按钮：同一行（flex-wrap），默认最多两排 */}
      <div
        ref={wrapRef}
        className={cn("flex flex-wrap", "gap-[var(--gap-xs)]")}
      >
        {visibleFiles.map((file, index) => (
          <ThinkingStepItemFileItemPrimitive
            key={`${file.name}-${index}`}
            icon={file.icon}
            status={file.status}
            name={file.name}
          />
        ))}
        {needsToggle && (
          <ThinkingStepItemExpandButtonPrimitive
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          >
            {expanded ? "收起" : "查看更多"}
          </ThinkingStepItemExpandButtonPrimitive>
        )}
      </div>
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
>(({ icon, status = "ready", name, className, ...props }, ref) => {
  const statusIconMap: Record<
    ThinkingStepItemFileStatus,
    { node: React.ReactNode; className: string } | null
  > = {
    loading: {
      node: <Loader2 className="size-4 animate-spin" />,
      className: "text-[var(--text-brand)]",
    },
    error: {
      node: <CircleAlert className="size-4" />,
      className: "text-[var(--text-error)]",
    },
    ready: null,
  };

  const statusIcon = statusIconMap[status];

  return (
    <div
      ref={ref}
      className={cn(
        BOX_BORDER,
        "inline-flex items-center",
        "gap-[var(--gap-xs)]",
        "h-6",
        "rounded-[var(--radius-circle)]",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-sm)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-sm)]",
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        className,
      )}
      {...props}
    >
      {/* 图标 */}
      <div className="size-4 flex-shrink-0 inline-flex items-center justify-center">
        {statusIcon ? (
          <div
            className={cn(
              "flex items-center justify-center",
              statusIcon.className,
            )}
          >
            {statusIcon.node}
          </div>
        ) : icon ? (
          <span className="text-sm leading-none">{icon}</span>
        ) : (
          <div className="w-full h-full bg-[var(--bg-neutral-light)] rounded flex items-center justify-center">
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
          "text-[var(--text-secondary)]",
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
        BOX_BORDER,
        "h-6",
        "flex items-center justify-center",
        "gap-[var(--gap-xs)]",
        "rounded-full",
        "pt-[var(--padding-com-2xs)]",
        "pr-[var(--padding-com-md)]",
        "pb-[var(--padding-com-2xs)]",
        "pl-[var(--padding-com-md)]",
        "bg-[var(--bg-container)]",
        "border border-[var(--border-neutral)]",
        "font-[var(--font-family-cn)]",
        "font-size-1",
        "leading-[var(--line-height-1)]",
        "font-normal",
        "text-[var(--text-primary)]",
        "cursor-pointer",
        "transition-colors",
        "hover:bg-[var(--bg-neutral-light-hover)]",
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
interface ThinkingStepItemProps
  extends Omit<ThinkingStepItemPrimitiveProps, "children" | "title"> {
  /**
   * 步骤标题
   */
  title: React.ReactNode;
  /**
   * 步骤内容项列表
   */
  items?: Array<{
    /**
     * 用于 React 渲染的稳定 key（推荐传入，避免使用数组下标）
     */
    key?: React.Key;
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
      icon?: React.ReactNode;
      status?: ThinkingStepItemFileStatus;
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
      collapsible = false,
      defaultOpen,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const defaultArrowIcon = <ChevronDown className="size-4" />;

    return (
      <ThinkingStepItemPrimitive
        ref={ref}
        status={status}
        collapsible={collapsible}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        <ThinkingStepItemHeaderPrimitive
          collapsible={collapsible}
          trailing={
            collapsible ? (
              <ThinkingStepItemCollapseArrowPrimitive>
                {arrowIcon || defaultArrowIcon}
              </ThinkingStepItemCollapseArrowPrimitive>
            ) : null
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
          <ThinkingStepItemContentPrimitive collapsible={collapsible}>
            <ThinkingStepItemContentListPrimitive>
              {items.map((item, index) => (
                <ThinkingStepItemContentItemPrimitive
                  key={item.key ?? index}
                  isLast={index === items.length - 1}
                >
                  <ThinkingStepItemTimelinePrimitive
                    isLast={index === items.length - 1}
                  />
                  <ThinkingStepItemContentAreaPrimitive>
                    {(item.content ?? null) !== null &&
                    item.content !== undefined ? (
                      <ThinkingStepItemRegularContentPrimitive>
                        {item.content}
                      </ThinkingStepItemRegularContentPrimitive>
                    ) : status === "loading" ? (
                      <ThinkingStepItemRegularContentPrimitive className="animate-pulse">
                        思考中...
                      </ThinkingStepItemRegularContentPrimitive>
                    ) : null}
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
    );
  },
);
ThinkingStepItem.displayName = "ThinkingStepItem";

// ==================== 统一导出 ====================

export type {
  ThinkingStepItemStatus,
  ThinkingStepItemFileStatus,
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
