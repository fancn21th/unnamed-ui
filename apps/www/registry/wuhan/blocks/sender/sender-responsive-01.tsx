"use client";

import * as React from "react";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, Loader2, Plus } from "lucide-react";

// ==================== 常量定义 ====================

/** 单行高度阈值（px） */
const SINGLE_LINE_HEIGHT = 36;

/** 多行→单行的容差（px） */
const RECOVER_TOLERANCE = 30;

/** 模式切换的稳定延迟（ms） */
const STABILIZE_DELAY = 0;

// ==================== 类型定义 ====================

export interface ResponsiveContainerProps extends React.ComponentPropsWithoutRef<"form"> {
  children?: React.ReactNode;
  maxWidth?: string;
  forceSingleLine?: boolean;
  onOverflowChange?: (isOverflow: boolean) => void;
}

export interface ResponsiveInputRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isOverflow?: boolean;
}

export interface ResponsiveTextareaProps extends React.ComponentProps<
  typeof Textarea
> {
  isOverflow?: boolean | null; // null = 未传入，使用内部状态
  /** 当检测到溢出状态变化时回调 */
  onOverflowChange?: (isOverflow: boolean) => void;
}

export interface ResponsiveButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isOverflow?: boolean;
}

export type ResponsiveAttachmentButtonProps = React.ComponentProps<
  typeof Button
>;

export interface ResponsiveSendButtonProps extends React.ComponentProps<
  typeof Button
> {
  generating?: boolean;
  generatingContent?: React.ReactNode;
}

const calculateRows = (textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  const textarea = textareaRef?.current;
  if (!textarea) return;

  // 1. 获取预设行数（rows属性）
  const presetRows = Number(textarea.rows) || 0;

  // 2. 获取显式换行行数（按换行符分割）
  const textContent = textarea.value.trim();
  const lineBreakRows = textContent ? textContent.split(/\r?\n/).length : 0;

  // 3. 获取实际渲染行数（含自动换行）
  const computedStyle = window.getComputedStyle(textarea);
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

  // 处理line-height为"normal"的情况（兼容浏览器默认值）
  let lineHeight = parseFloat(computedStyle.lineHeight);
  if (!lineHeight || computedStyle.lineHeight === "normal") {
    // 若line-height为normal，取font-size的1.5倍（浏览器默认行高）
    const fontSize = parseFloat(computedStyle.fontSize) || 16;
    lineHeight = fontSize * 1.5;
  }

  // 计算内容实际高度（减去内边距）
  const contentHeight = textarea.scrollHeight - paddingTop - paddingBottom;
  // 实际渲染行数（向上取整，避免小数行）
  const actualRenderRows = Math.ceil(Math.max(contentHeight / lineHeight, 1));

  // 更新行数信息
  return actualRenderRows;
};

// ==================== 响应式容器 ====================

export const ResponsiveContainer = React.forwardRef<
  HTMLFormElement,
  ResponsiveContainerProps
>(
  (
    {
      children,
      className,
      maxWidth = "100%",
      forceSingleLine,
      onOverflowChange,
      ...props
    },
    ref,
  ) => {
    const [isOverflow, setIsOverflow] = React.useState(false);

    const handleOverflowChange = React.useCallback(
      (newIsOverflow: boolean) => {
        setIsOverflow(newIsOverflow);
        onOverflowChange?.(newIsOverflow);
      },
      [onOverflowChange],
    );

    return (
      <div
        data-sender-responsive
        data-sender-overflow={isOverflow}
        className={cn("relative w-full", className)}
        style={{ maxWidth }}
      >
        <form
          ref={ref}
          className={cn(
            "relative flex w-full flex-col border rounded-[var(--radius-2xl)] p-[var(--padding-com-lg)] gap-[var(--gap-md)]",
          )}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const propsWithOverflow: Record<string, unknown> = {};
              // 只在溢出时传递 isOverflow=true，避免 false 覆盖内部状态
              if (isOverflow) {
                propsWithOverflow.isOverflow = true;
              }
              // 传递 onOverflowChange，使用 data-* 属性标识需要此 prop 的组件
              // 这样避免了在运行时直接比较组件类型，修复 Turbopack 的模块导出上下文问题
              const childProps = (child as React.ReactElement).props as Record<
                string,
                unknown
              >;
              if (childProps["data-needs-overflow-change"]) {
                propsWithOverflow.onOverflowChange = handleOverflowChange;
              }
              return React.cloneElement(
                child as React.ReactElement,
                propsWithOverflow,
              );
            }
            return child;
          })}
        </form>
      </div>
    );
  },
);
ResponsiveContainer.displayName = "ResponsiveContainer";

// ==================== 响应式输入行 ====================

export const ResponsiveInputRow = React.forwardRef<
  HTMLDivElement,
  ResponsiveInputRowProps
>(({ children, className, isOverflow, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sender-input-row
      className={cn(
        !isOverflow && "flex flex-row items-center gap-2",
        isOverflow && "flex flex-col gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ResponsiveInputRow.displayName = "ResponsiveInputRow";

// ==================== 响应式文本域 ====================

export const ResponsiveTextarea = React.forwardRef<
  HTMLTextAreaElement,
  ResponsiveTextareaProps
>(
  (
    { isOverflow: externalIsOverflow, onOverflowChange, className, ...props },
    ref,
  ) => {
    const localRef = React.useRef<HTMLTextAreaElement>(null);
    // 合并外部 ref 和本地 ref
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        (
          localRef as React.MutableRefObject<HTMLTextAreaElement | null>
        ).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // 内部状态（只在本地维护）
    const [internalIsOverflow, setInternalIsOverflow] = React.useState(false);

    // 使用 ref 存储最新的 isOverflow，解决闭包问题
    const isOverflowRef = React.useRef(false);
    // 优先使用外部传入的值，null 表示未传入
    const resolvedExternal = externalIsOverflow ?? null;
    isOverflowRef.current =
      resolvedExternal !== null ? resolvedExternal : internalIsOverflow;

    // 使用外部传入的 isOverflow，如果没有（为 null）则使用内部的
    const isOverflow = isOverflowRef.current;

    // 差值宽度 ref
    const availableWidthRef = React.useRef<number>(0);

    // 隐藏的测量元素，用于测量内容的真实宽度
    const measureRef = React.useRef<HTMLSpanElement>(null);

    // 延迟切换的定时器 ref
    const stabilizeTimerRef = React.useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

    // React.useEffect(() => {
    //   if (!localRef.current) return;

    //   const textarea = localRef.current;
    //   const container = textarea.closest("[data-sender-responsive]");
    //   const buttonGroup = textarea.closest("[data-sender-input-row]")?.querySelector("[data-sender-button-group]") as HTMLElement;

    //   if (!container || !buttonGroup) {
    //     console.log('❌ container or buttonGroup not found');
    //     return;
    //   }

    //   /**
    //    * 计算差值宽度
    //    * 差值宽度 = container宽度 - button区域宽度 - 间距
    //    */
    //   const calculateAvailableWidth = () => {
    //     const containerWidth = (container as HTMLElement).clientWidth;
    //     const buttonWidth = buttonGroup.clientWidth;
    //     return containerWidth - buttonWidth - 100;
    //   };

    //   /**
    //    * 检测溢出（带延迟稳定）
    //    */
    //   const checkOverflow = () => {
    //     // 清除之前的定时器
    //     if (stabilizeTimerRef.current) {
    //       clearTimeout(stabilizeTimerRef.current);
    //       stabilizeTimerRef.current = null;
    //     }

    //     // 延迟执行，稳定状态
    //     stabilizeTimerRef.current = setTimeout(() => {
    //       const currentIsOverflow = isOverflowRef.current;
    //       const currentAvailableWidth = calculateAvailableWidth();

    //       // 获取内容的真实宽度（使用隐藏元素测量）
    //       let contentWidth = textarea.scrollWidth;
    //       if (measureRef.current) {
    //         // 将 textarea 的值复制到隐藏元素
    //         measureRef.current.textContent = textarea.value || ' ';
    //         // 获取隐藏元素的滚动宽度（即内容真实宽度）
    //         contentWidth = measureRef.current.scrollWidth;
    //       }

    //       console.log('==========');
    //       console.log('currentAvailableWidth:', currentAvailableWidth);
    //       console.log('contentWidth:', contentWidth);
    //       console.log('textarea.scrollHeight:', textarea.scrollHeight);
    //       console.log('currentIsOverflow:', currentIsOverflow);

    //       if (!currentIsOverflow) {
    //         // 单行 → 多行检查
    //         // 条件1: 内容宽度超过可用宽度 + 2倍容差
    //         // 条件2: 内容高度超过单行高度（自动换行导致）
    //         const textContent = textarea.value.trim();
    //         const lineBreakRows = textContent ? textContent.split(/\r?\n/).length : 0;
    //         const exceedsWidth = contentWidth > currentAvailableWidth + 2 * RECOVER_TOLERANCE;
    //         const exceedsHeight = textarea.scrollHeight > SINGLE_LINE_HEIGHT;
    //         const shouldOverflow = exceedsWidth || (exceedsHeight);

    //         console.log('exceedsWidth:', exceedsWidth, '(', contentWidth, '>', currentAvailableWidth + 2 * RECOVER_TOLERANCE, ')');
    //         console.log('exceedsHeight:', exceedsHeight, '(', textarea.scrollHeight, '>', SINGLE_LINE_HEIGHT, ')');
    //         console.log('shouldOverflow:', shouldOverflow);

    //         if (shouldOverflow) {
    //           availableWidthRef.current = currentAvailableWidth;
    //           setInternalIsOverflow(true);
    //           onOverflowChange?.(true);
    //         }
    //       } else {
    //         // 多行 → 单行检查（宽松判断）
    //         // 只要满足任一条件就可以恢复：
    //         // 条件1: 内容高度恢复到单行高度
    //         // 条件2: 内容真实宽度小于之前记录的可用宽度 - 容差
    //         const canRecoverHeight = textarea.scrollHeight <= SINGLE_LINE_HEIGHT;
    //         const canRecoverWidth = contentWidth < availableWidthRef.current - RECOVER_TOLERANCE;
    //         const canRecover = canRecoverHeight || canRecoverWidth;

    //         console.log('canRecoverHeight:', canRecoverHeight);
    //         console.log('canRecoverWidth:', canRecoverWidth, '(', contentWidth, '<', availableWidthRef.current - RECOVER_TOLERANCE, ')');
    //         console.log('多行 → 单行检查:', canRecover);
    //         const textContent = textarea.value;
    //         const lineBreakCount = (textContent.match(/\r?\n/g) || []).length;

    //         if (canRecover&&lineBreakCount<=0) {
    //           setInternalIsOverflow(false);
    //           onOverflowChange?.(false);
    //         }
    //       }
    //     }, STABILIZE_DELAY);
    //   };

    //   // 监听输入事件
    //   textarea.addEventListener("input", checkOverflow);

    //   // 监听尺寸变化
    //   const observer = new ResizeObserver(() => {
    //     requestAnimationFrame(checkOverflow);
    //   });
    //   observer.observe(textarea);

    //   // 初始检查
    //   requestAnimationFrame(checkOverflow);

    //   return () => {
    //     textarea.removeEventListener("input", checkOverflow);
    //     observer.disconnect();
    //     // 清理定时器
    //     if (stabilizeTimerRef.current) {
    //       clearTimeout(stabilizeTimerRef.current);
    //     }
    //   };
    // }, [onOverflowChange]);

    React.useEffect(() => {
      if (!localRef.current) return;
      const textarea = localRef.current;
      // 保存初始宽度（flex-row 时的宽度）
      let baseWidth = 0;

      const checkHeight = () => {
        // 保存当前样式
        const originalHeight = textarea.style.height;
        const originalWidth = textarea.style.width;

        // 如果还没有基准宽度，保存当前宽度
        if (baseWidth === 0) {
          baseWidth = textarea.offsetWidth;
        }

        // 固定宽度为基准宽度，重置高度以获取真实的 scrollHeight
        textarea.style.width = `${baseWidth}px`;
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;

        // 恢复原样式
        textarea.style.height = originalHeight;
        textarea.style.width = originalWidth;

        // 计算单行高度（包括 padding）
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);

        const contentHeight = scrollHeight - paddingTop - paddingBottom;
        const lines = Math.ceil(contentHeight / lineHeight);

        console.log(
          "scrollHeight:",
          scrollHeight,
          "lines:",
          lines,
          "baseWidth:",
          baseWidth,
        );

        // 当超过 1 行时，切换为列布局
        setInternalIsOverflow(lines > 1);
        onOverflowChange?.(lines > 1);
        console.log("lines > 1:", lines > 1);
      };

      // 初始检查
      checkHeight();

      // 监听输入事件
      textarea.addEventListener("input", checkHeight);

      return () => {
        textarea.removeEventListener("input", checkHeight);
      };
    }, []);
    return (
      <>
        {/* <Textarea
        ref={setRefs}
        data-sender-textarea
        data-needs-overflow-change
        {...props}
        className={cn(
          "resize-none border-none p-0 shadow-none focus-visible:ring-0",
          !isOverflow && " flex-1",
          isOverflow && "max-h-[180px] w-full",
          "overflow-y-auto",
          "leading-[var(--line-height-2)]",
          "text-sm",
          "caret-[var(--primary)]",
          className,
        )}
      /> */}
        <Textarea
          ref={setRefs}
          className={cn(
            "p-1 border !border-[transparent] rounded resize-none overflow-auto",
            "shadow-none focus-visible:ring-0",
            "text-sm",
            "caret-[var(--primary)]",
            className,
          )}
          placeholder="输入内容..."
          rows={1}
          style={{
            minHeight: "30px",
            height: isOverflow ? "120px" : "30px",
            maxHeight: isOverflow ? "200px" : "30px",
            width: isOverflow ? "100%" : "auto",
            flex: isOverflow ? "none" : "1",
          }}
        />
        {/* 隐藏的测量元素，用于测量内容的真实宽度 */}
        <span
          ref={measureRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            whiteSpace: "pre",
            pointerEvents: "none",
            overflow: "hidden",
            // 复制 textarea 的样式
            font: "inherit",
            fontSize: "0.875rem",
            lineHeight: "var(--line-height-2)",
          }}
        />
      </>
    );
  },
);
ResponsiveTextarea.displayName = "ResponsiveTextarea";

// ==================== 响应式按钮组 ====================

export const ResponsiveButtonGroup = React.forwardRef<
  HTMLDivElement,
  ResponsiveButtonGroupProps
>(({ children, className, isOverflow, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sender-button-group
      className={cn(
        "flex items-center gap-2",
        isOverflow && "self-end",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ResponsiveButtonGroup.displayName = "ResponsiveButtonGroup";

// ==================== 响应式附件按钮 ====================

export const ResponsiveAttachmentButton = React.forwardRef<
  HTMLButtonElement,
  ResponsiveAttachmentButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(
        "p-2 gap-2 border",
        "h-[var(--size-com-md)]",
        "w-[var(--size-com-md)]",
        "text-[var(--text-primary)]",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--bg-container)]",
        "border-[var(--border-neutral)]",
        "hover:bg-[var(--bg-neutral-light)] transition-colors",
        className,
      )}
    >
      {children ?? <Plus className="size-4" />}
    </Button>
  );
});
ResponsiveAttachmentButton.displayName = "ResponsiveAttachmentButton";

// ==================== 响应式发送按钮 ====================

export const ResponsiveSendButton = React.forwardRef<
  HTMLButtonElement,
  ResponsiveSendButtonProps
>(
  (
    {
      generating = false,
      generatingContent,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={disabled}
        className={cn(
          "w-8 h-8 rounded-full p-2 gap-2",
          "bg-[var(--primary)]",
          "text-[var(--text-inverse)]",
          "transition-opacity",
          disabled && "opacity-80",
          className,
        )}
        aria-label={generating ? "Generating" : "Send"}
      >
        {generating
          ? (generatingContent ??
            children ?? <Loader2 className="size-4 animate-spin" />)
          : (children ?? <ArrowUp className="size-4" />)}
      </Button>
    );
  },
);
ResponsiveSendButton.displayName = "ResponsiveSendButton";

// ==================== 导出 ====================

export {
  ResponsiveContainer as SenderResponsiveContainer,
  ResponsiveTextarea as SenderResponsiveTextarea,
  ResponsiveInputRow as SenderResponsiveInputRow,
  ResponsiveButtonGroup as SenderResponsiveButtonGroup,
  ResponsiveAttachmentButton as SenderResponsiveAttachmentButton,
  ResponsiveSendButton as SenderResponsiveSendButton,
};
