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

const SINGLE_LINE_MIN_HEIGHT = 30;
const MULTI_LINE_HEIGHT = 120;
const MULTI_LINE_MAX_HEIGHT = 200;

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
  const onOverflowChangeRef = React.useRef(onOverflowChange);
  onOverflowChangeRef.current = onOverflowChange;

  const singleLineWidthRef = React.useRef<number>(0);

  const runCheck = React.useCallback(
    (textarea: HTMLTextAreaElement, measureWidth: number) => {
      const origH = textarea.style.height;
      const origW = textarea.style.width;

      textarea.style.width = `${measureWidth}px`;
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      textarea.style.height = origH;
      textarea.style.width = origW;

      const cs = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(cs.lineHeight) || 20;
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      const contentHeight = scrollHeight - pt - pb;
      const lines = Math.ceil(contentHeight / lineHeight) || 1;

      // 单行高度取 lineHeight+padding 与实测 scrollHeight 的较大值，避免硬编码导致滚动条
      const oneLineHeight = Math.ceil(lineHeight + pt + pb);
      const newHeight = Math.max(
        SINGLE_LINE_MIN_HEIGHT,
        lines === 1 ? Math.max(oneLineHeight, scrollHeight) : oneLineHeight,
      );
      setSingleLineHeight(newHeight);
      onOverflowChangeRef.current?.(lines > 1);
    },
    [],
  );

  React.useEffect(() => {
    const textarea = localRef.current;
    if (!textarea) return;

    const checkHeight = () => {
      const width =
        isOverflow && singleLineWidthRef.current > 0
          ? singleLineWidthRef.current
          : textarea.offsetWidth;
      if (!isOverflow) singleLineWidthRef.current = textarea.offsetWidth;
      runCheck(textarea, width);
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
      if (!isOverflow) singleLineWidthRef.current = textarea.offsetWidth;
      runCheck(
        textarea,
        isOverflow && singleLineWidthRef.current > 0
          ? singleLineWidthRef.current
          : textarea.offsetWidth,
      );
    });
    resizeObserver.observe(textarea);

    return () => {
      textarea.removeEventListener("input", handleInput);
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
      runCheck(textarea, textarea.offsetWidth);
    });
    return () => cancelAnimationFrame(rafId);
  }, [isOverflow, runCheck]);

  return (
    <>
      <Textarea
        ref={setRef}
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
          minHeight: `${singleLineHeight}px`,
          height: isOverflow
            ? `${MULTI_LINE_HEIGHT}px`
            : `${singleLineHeight}px`,
          maxHeight: isOverflow
            ? `${MULTI_LINE_MAX_HEIGHT}px`
            : `${singleLineHeight}px`,
          width: isOverflow ? "100%" : "auto",
          flex: isOverflow ? "none" : "1",
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
          "bg-[var(--bg-brand)]",
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
