"use client";

import * as React from "react";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, Loader2, Plus } from "lucide-react";

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
            "relative flex w-full flex-col border rounded-[var(--radius-2xl)] p-[var(--Padding-padding-com-lg)] gap-[var(--Gap-gap-md)]",
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

const SINGLE_LINE_MIN_HEIGHT = 30;
const MAX_LINES = 5;

export const ResponsiveTextarea = React.forwardRef<
  HTMLTextAreaElement,
  ResponsiveTextareaProps
>(({ isOverflow, onOverflowChange, className, ...props }, ref) => {
  const localRef = React.useRef<HTMLTextAreaElement>(null);
  const setRef = React.useCallback(
    (el: HTMLTextAreaElement | null) => {
      (localRef as React.MutableRefObject<HTMLTextAreaElement | null>).current =
        el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );
  const [singleLineHeight, setSingleLineHeight] = React.useState(
    SINGLE_LINE_MIN_HEIGHT,
  );
  const [contentHeight, setContentHeight] = React.useState(
    SINGLE_LINE_MIN_HEIGHT,
  );
  const [multiLineMaxHeight, setMultiLineMaxHeight] = React.useState(120);
  const onOverflowChangeRef = React.useRef(onOverflowChange);
  onOverflowChangeRef.current = onOverflowChange;

  const singleLineWidthRef = React.useRef<number>(0);
  const rafRef = React.useRef<number | null>(null);
  const lastHeightsRef = React.useRef({ single: 0, content: 0, multiMax: 0 });
  const lastOverflowRef = React.useRef<boolean | null>(null);
  const overflowDebounceRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const runCheck = React.useCallback(
    (
      textarea: HTMLTextAreaElement,
      measureWidth: number,
      overflowMeasureWidth?: number,
    ) => {
      const origH = textarea.style.height;
      const origW = textarea.style.width;

      // 高度计算使用当前布局宽度
      textarea.style.width = `${measureWidth}px`;
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      textarea.style.height = origH;
      textarea.style.width = origW;

      const cs = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(cs.lineHeight) || 20;
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      const contentHeightCalc = scrollHeight - pt - pb;
      const lines = Math.ceil(contentHeightCalc / lineHeight) || 1;

      // overflow 决策：始终用单行宽度测量，避免布局切换导致单行/多行宽度不同而振荡
      let overflowLines = lines;
      const widthForOverflow =
        overflowMeasureWidth && overflowMeasureWidth > 0
          ? overflowMeasureWidth
          : measureWidth;
      if (widthForOverflow !== measureWidth) {
        textarea.style.width = `${widthForOverflow}px`;
        textarea.style.height = "auto";
        const sh = textarea.scrollHeight;
        textarea.style.height = origH;
        textarea.style.width = origW;
        overflowLines = Math.ceil((sh - pt - pb) / lineHeight) || 1;
      }

      // 单行高度取 lineHeight+padding 与实测 scrollHeight 的较大值，避免硬编码导致滚动条
      const oneLineHeight = Math.ceil(lineHeight + pt + pb);
      const newSingleHeight = Math.max(
        SINGLE_LINE_MIN_HEIGHT,
        lines === 1 ? Math.max(oneLineHeight, scrollHeight) : oneLineHeight,
      );
      const fiveLineHeight = Math.ceil(lineHeight * MAX_LINES + pt + pb);
      const newContentHeight = Math.min(
        Math.max(scrollHeight, newSingleHeight),
        fiveLineHeight,
      );

      // 仅当值变化时 setState，避免 ResizeObserver 触发循环和闪烁
      const last = lastHeightsRef.current;
      if (last.single !== newSingleHeight) {
        last.single = newSingleHeight;
        setSingleLineHeight(newSingleHeight);
      }
      if (last.multiMax !== fiveLineHeight) {
        last.multiMax = fiveLineHeight;
        setMultiLineMaxHeight(fiveLineHeight);
      }
      if (last.content !== newContentHeight) {
        last.content = newContentHeight;
        setContentHeight(newContentHeight);
      }
      const newOverflow = overflowLines > 1;
      if (lastOverflowRef.current === newOverflow) return;

      if (overflowDebounceRef.current)
        clearTimeout(overflowDebounceRef.current);
      overflowDebounceRef.current = setTimeout(() => {
        overflowDebounceRef.current = null;
        if (lastOverflowRef.current === newOverflow) return;
        lastOverflowRef.current = newOverflow;
        onOverflowChangeRef.current?.(newOverflow);
      }, 50);
    },
    [],
  );

  React.useEffect(() => {
    const textarea = localRef.current;
    if (!textarea) return;

    const checkHeight = () => {
      if (!isOverflow) singleLineWidthRef.current = textarea.offsetWidth;
      // 多行时用 singleLineWidthRef 做 overflow 决策，避免布局切换导致测量宽度变化而振荡
      const overflowWidth = isOverflow ? singleLineWidthRef.current : undefined;
      runCheck(textarea, textarea.offsetWidth, overflowWidth);
    };

    checkHeight();

    const handleInput = () => {
      // 延迟到事件处理完成后再测量，避免同步修改 width/height 干扰浏览器输入，导致删除卡住
      requestAnimationFrame(() => {
        checkHeight();
      });
    };
    textarea.addEventListener("input", handleInput);

    const resizeObserver = new ResizeObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!isOverflow) singleLineWidthRef.current = textarea.offsetWidth;
        const overflowWidth = isOverflow
          ? singleLineWidthRef.current
          : undefined;
        runCheck(textarea, textarea.offsetWidth, overflowWidth);
      });
    });
    resizeObserver.observe(textarea);

    return () => {
      textarea.removeEventListener("input", handleInput);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (overflowDebounceRef.current)
        clearTimeout(overflowDebounceRef.current);
      resizeObserver.disconnect();
    };
  }, [runCheck, isOverflow]);

  // 布局切换后重新检查：从多行切回单行时，textarea 宽度会变化，需在布局稳定后重测
  React.useEffect(() => {
    if (isOverflow) return;
    const textarea = localRef.current;
    if (!textarea) return;

    const rafId = requestAnimationFrame(() => {
      singleLineWidthRef.current = textarea.offsetWidth;
      runCheck(textarea, textarea.offsetWidth, undefined);
    });
    return () => cancelAnimationFrame(rafId);
  }, [isOverflow, runCheck]);

  return (
    <>
      <Textarea
        ref={setRef}
        className={cn(
          "p-1 border !border-[transparent] rounded resize-none",
          "shadow-none focus-visible:ring-0",
          "text-sm",
          "caret-[var(--primary)]",
          className,
        )}
        placeholder="输入内容..."
        rows={1}
        style={{
          minHeight: `${singleLineHeight}px`,
          height: isOverflow ? `${contentHeight}px` : `${singleLineHeight}px`,
          maxHeight: isOverflow
            ? `${multiLineMaxHeight}px`
            : `${singleLineHeight}px`,
          width: isOverflow ? "100%" : "auto",
          flex: isOverflow ? "none" : "1",
          overflowX: "hidden",
          overflowY: isOverflow
            ? contentHeight >= multiLineMaxHeight
              ? "auto"
              : "hidden"
            : "hidden",
        }}
        {...props}
      />
    </>
  );
});
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
        "text-[var(--Text-text-primary)]",
        "rounded-[var(--radius-lg)]",
        "bg-[var(--Container-bg-container)]",
        "border-[var(--Border-border-neutral)]",
        "hover:bg-[var(--Container-bg-neutral-light)] transition-colors",
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
          "bg-[var(--Container-bg-brand)]",
          "text-[var(--Text-text-inverse)]",
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
