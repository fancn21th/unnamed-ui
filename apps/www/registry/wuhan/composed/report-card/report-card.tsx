"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import {
  ReportCardHeaderPrimitive,
  ReportCardContainerPrimitive,
  ReportCardDefaultIcon,
} from "@/registry/wuhan/blocks/report-card/report-card-01";
import { Ellipsis, Trash2, Pencil, Copy } from "lucide-react";

// ==================== 类型定义 ====================

/**
 * Report Card Item 类型
 * @public
 */
export interface ReportCardItem {
  /** 唯一标识符 */
  id: string;
  /** 卡片标题 */
  title: string;
  /** 描述文本 */
  description?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * ReportCard 组件属性
 * @public
 */
export interface ReportCardProps {
  /** 唯一标识（用于列表中的识别和事件回调） */
  id?: string;
  /** 标题 */
  title?: string;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 宽度 */
  width?: string;
  /** 选中状态 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id?: string) => void;
  /** 编辑回调 */
  onEdit?: () => void;
  /** 删除回调 */
  onDelete?: () => void;
  /** 复制回调 */
  onDuplicate?: () => void;
  /** 自定义右侧操作区域（完全自定义） */
  action?: React.ReactNode;
  /** 是否显示默认操作按钮（仅 action 未提供时生效） */
  showAction?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * ReportCardList 组件属性
 * @public
 */
export interface ReportCardListProps {
  /** 标题 */
  title?: string;
  /** 卡片列表数据 */
  cards?: ReportCardItem[];
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id: string) => void;
  /** 编辑回调 */
  onEdit?: (id: string) => void;
  /** 删除回调 */
  onDelete?: (id: string) => void;
  /** 复制回调 */
  onDuplicate?: (id: string) => void;
  /** 自定义单个卡片右侧操作区域 */
  cardAction?: (item: ReportCardItem) => React.ReactNode;
  /** 是否显示默认操作按钮 */
  showCardAction?: boolean;
  /** 自定义类名 */
  className?: string;
}

// ==================== 操作菜单内容 ====================

const CardActionsMenu = ({
  onEdit,
  onDelete,
  onDuplicate,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}) => {
  return (
    <div
      className={cn(
        "min-w-[120px]",
        "rounded-[var(--radius-lg)]",
        "border border-[var(--border-neutral)]",
        "bg-[var(--bg-container)]",
        "shadow-[var(--shadow-basic)]",
        "p-[var(--padding-com-sm)]",
      )}
    >
      <div className="flex flex-col">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className={cn(
              "flex items-center gap-2",
              "px-2 py-1 rounded-md",
              "cursor-pointer",
              "outline-none",
              "hover:bg-[var(--bg-neutral-light)]",
            )}
          >
            <Pencil className="size-4 text-[var(--text-secondary)]" />
            <span
              className={cn(
                "text-[var(--text-primary)]",
                "text-[var(--font-size-1)]",
                "leading-[var(--line-height-1)]",
              )}
            >
              编辑
            </span>
          </button>
        )}
        {onDuplicate && (
          <button
            type="button"
            onClick={onDuplicate}
            className={cn(
              "flex items-center gap-2",
              "px-2 py-1 rounded-md",
              "cursor-pointer",
              "outline-none",
              "hover:bg-[var(--bg-neutral-light)]",
            )}
          >
            <Copy className="size-4 text-[var(--text-secondary)]" />
            <span
              className={cn(
                "text-[var(--text-primary)]",
                "text-[var(--font-size-1)]",
                "leading-[var(--line-height-1)]",
              )}
            >
              复制
            </span>
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className={cn(
              "flex items-center gap-2",
              "px-2 py-1 rounded-md",
              "cursor-pointer",
              "outline-none",
              "hover:bg-[var(--bg-error-light)]",
            )}
          >
            <Trash2 className="size-4 text-[var(--text-error)]" />
            <span
              className={cn(
                "text-[var(--text-error)]",
                "text-[var(--font-size-1)]",
                "leading-[var(--line-height-1)]",
              )}
            >
              删除
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

// ==================== 主组件：ReportCard ====================

/**
 * ReportCard 组合组件
 * 提供完整的报告卡片功能，包含 hover 操作菜单
 *
 * @example
 * ```tsx
 * <ReportCard
 *   title="候选人评估报告"
 *   description="更新时间：08-04 13:56"
 *   onEdit={() => {...}}
 *   onDelete={() => {...}}
 * />
 * ```
 *
 * @public
 */
export const ReportCard = React.forwardRef<HTMLDivElement, ReportCardProps>(
  (props, ref) => {
    const {
      id,
      title,
      description,
      icon,
      width = "280px",
      selected = false,
      disabled = false,
      onSelectChange,
      onEdit,
      onDelete,
      onDuplicate,
      action,
      showAction = true,
      className,
    } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const closeTimer = React.useRef<number | null>(null);

    // 清除关闭定时器
    const clearCloseTimer = () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };

    // 延迟关闭
    const scheduleClose = () => {
      clearCloseTimer();
      closeTimer.current = window.setTimeout(() => {
        setOpen(false);
      }, 150); // 150ms 延迟，给用户时间跨过间隙
    };

    // 清理定时器
    React.useEffect(() => {
      return () => clearCloseTimer();
    }, []);

    // 处理 checkbox 变化
    const handleSelectChange = React.useCallback(
      (checked: boolean) => {
        if (disabled) return;
        onSelectChange?.(checked === true, id);
      },
      [disabled, id, onSelectChange],
    );

    // 判断是否显示默认操作按钮
    const showDefaultAction =
      showAction && !action && (onEdit || onDelete || onDuplicate);

    return (
      <ReportCardContainerPrimitive
        ref={ref}
        selected={selected}
        disabled={disabled}
        className={className}
        style={{ width }}
        onMouseEnter={() => {
          setIsHovered(true);
          clearCloseTimer();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          scheduleClose();
        }}
      >
        {/* 左侧：复选框 + 图标 + 标题 + 描述 */}
        <ReportCardHeaderPrimitive
          icon={icon ?? <ReportCardDefaultIcon />}
          title={title}
          description={description}
          showCheckbox={true}
          selected={selected}
          disabled={disabled}
          onSelectChange={handleSelectChange}
        />

        {/* 右侧：自定义操作区域 或 默认操作按钮 */}
        {action ? (
          // 用户自定义操作区域
          <div onClick={(e) => e.stopPropagation()}>{action}</div>
        ) : showDefaultAction ? (
          // 默认操作按钮 (hover 时显示)
          isHovered && (
            <Popover.Root open={open} onOpenChange={setOpen}>
              <Popover.Trigger asChild>
                <span
                  className={cn(
                    "flex items-center justify-center",
                    "w-6 h-6",
                    "rounded-[var(--radius-md)]",
                    "p-[var(--gap-xs)]",
                    "cursor-pointer",
                    "bg-[var(--bg-neutral-light-hover)]",
                  )}
                  aria-label="更多操作"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpen(true);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Ellipsis className="size-4 text-[var(--text-secondary)]" />
                </span>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={scheduleClose}
                  className={cn("z-50")}
                >
                  <CardActionsMenu
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )
        ) : null}
      </ReportCardContainerPrimitive>
    );
  },
);
ReportCard.displayName = "ReportCard";

// ==================== ReportCardList 组件 ====================

/**
 * ReportCardList 组件
 * 展示多个报告卡片列表
 *
 * @example
 * ```tsx
 * const cards = [
 *   { id: "1", title: "候选人评估报告", description: "更新时间：08-04" },
 *   { id: "2", title: "数据分析报告", description: "包含本月统计" },
 * ];
 *
 * <ReportCardList title="我的报告" cards={cards} onDelete={(id) => {...}} />
 * ```
 *
 * @public
 */
export const ReportCardList = React.forwardRef<
  HTMLDivElement,
  ReportCardListProps
>((props, ref) => {
  const {
    title = "报告列表",
    cards = [],
    onSelectChange,
    onEdit,
    onDelete,
    onDuplicate,
    cardAction,
    showCardAction,
    className,
  } = props;

  // 处理选中变化
  const handleSelectChange = React.useCallback(
    (selected: boolean, id?: string) => {
      onSelectChange?.(selected, id ?? "");
    },
    [onSelectChange],
  );

  return (
    <div ref={ref} className={className}>
      {title && (
        <div
          className={cn(
            "font-[var(--font-family-cn)]",
            "font-[var(--font-weight-600)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--text-primary)]",
            "mb-[var(--margin-com-md)]",
          )}
        >
          {title}
        </div>
      )}
      <div className="flex flex-col gap-[var(--gap-md)]">
        {cards.map((card) => (
          <ReportCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            selected={card.selected}
            disabled={card.disabled}
            action={cardAction?.(card)}
            showAction={showCardAction}
            onSelectChange={handleSelectChange}
            onEdit={onEdit ? () => onEdit(card.id) : undefined}
            onDelete={onDelete ? () => onDelete(card.id) : undefined}
            onDuplicate={onDuplicate ? () => onDuplicate(card.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
});
ReportCardList.displayName = "ReportCardList";
