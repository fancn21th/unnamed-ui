"use client";

import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import {
  ReportCardHeaderPrimitive,
  ReportCardContainerPrimitive,
  ReportCardDefaultIcon,
} from "@/registry/wuhan/blocks/report-card/report-card-01";
import { MoreHorizontal, Trash2, Pencil, Copy } from "lucide-react";

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
  width?: string | number;
  /** 是否显示复选框 */
  showCheckbox?: boolean;
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
  /** 是否显示复选框 */
  showCheckbox?: boolean;
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
  /** 列表容器自定义类名 */
  listClassName?: string;
  /** 卡片宽度 */
  cardWidth?: string | number;
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
        "rounded-[var(--radius-xl)]",
        "border border-[var(--Border-border-neutral)]",
        "bg-[var(--Container-bg-container)]",
        "shadow-[var(--shadow-basic)]",
        "p-[var(--Padding-padding-com-xs)]",
      )}
    >
      <div className="flex flex-col">
        {onEdit && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={onEdit}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-primary)]",
              "hover:bg-[var(--Container-bg-neutral-light)]",
            )}
          >
            <Pencil className="size-4 text-[var(--Text-text-secondary)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              编辑
            </span>
          </Button>
        )}
        {onDuplicate && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={onDuplicate}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-primary)]",
              "hover:bg-[var(--Container-bg-neutral-light)]",
            )}
          >
            <Copy className="size-4 text-[var(--Text-text-secondary)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              复制
            </span>
          </Button>
        )}
        {onDelete && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={onDelete}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-error)]",
              "hover:bg-[var(--Container-bg-error-light)]",
            )}
          >
            <Trash2 className="size-4 text-[var(--Text-text-error)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              删除
            </span>
          </Button>
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
      showCheckbox = false,
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
    const [open, setOpen] = React.useState(false);

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
        className={cn("group/report-card", className)}
        style={{ width }}
      >
        {/* 左侧：复选框 + 图标 + 标题 + 描述 */}
        <ReportCardHeaderPrimitive
          icon={icon ?? <ReportCardDefaultIcon />}
          title={title}
          description={description}
          showCheckbox={showCheckbox}
          selected={selected}
          disabled={disabled}
          onSelectChange={handleSelectChange}
        />

        {/* 右侧：自定义操作区域 或 默认操作按钮 */}
        {action ? (
          // 用户自定义操作区域
          <div onClick={(e) => e.stopPropagation()}>{action}</div>
        ) : showDefaultAction ? (
          // 默认操作按钮（与 file-card 一致：默认隐藏，hover 卡片时显示，点击打开菜单）
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label="更多操作"
                aria-disabled={disabled}
                className={cn(
                  "w-6 h-6",
                  "flex items-center justify-center",
                  "rounded-[var(--radius-md)]",
                  "p-[var(--Gap-gap-xs)]",
                  "transition-all duration-200",
                  "flex-shrink-0",
                  // 默认隐藏，hover 卡片时显示（此时无底色）
                  "opacity-0",
                  "group-hover/report-card:opacity-100",
                  // popover 展开时 icon 保持显示且保持底色
                  open && "opacity-100",
                  open && "bg-[var(--Container-bg-neutral-light-hover)]",
                  // 仅 hover icon 时底色变化
                  "hover:bg-[var(--Container-bg-neutral-light-hover)]",
                  // 禁用状态
                  disabled && "cursor-not-allowed opacity-50",
                  // 焦点状态（非禁用）
                  !disabled &&
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                  "cursor-pointer",
                )}
                onKeyDown={(e) => {
                  if (disabled) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen((prev) => !prev);
                  }
                }}
              >
                <MoreHorizontal className="size-4 text-[var(--Text-text-secondary)]" />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                align="end"
                sideOffset={8}
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
    cards = [],
    showCheckbox = false,
    onSelectChange,
    onEdit,
    onDelete,
    onDuplicate,
    cardAction,
    showCardAction,
    className,
    listClassName,
    cardWidth,
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
      {/* {title && (
        <div
          className={cn(
            "font-[var(--font-family-CN)]",
            "font-[var(--font-weight-600)]",
            "font-size-2",
            "leading-[var(--line-height-2)]",
            "text-[var(--Text-text-primary)]",
            "mb-[var(--Margin-margin-com-md)]",
          )}
        >
          {title}
        </div>
      )} */}
      <div
        className={cn("flex flex-col gap-[var(--Gap-gap-md)]", listClassName)}
      >
        {cards.map((card) => (
          <ReportCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            showCheckbox={showCheckbox}
            selected={card.selected}
            disabled={card.disabled}
            action={cardAction?.(card)}
            showAction={showCardAction}
            onSelectChange={handleSelectChange}
            onEdit={onEdit ? () => onEdit(card.id) : undefined}
            onDelete={onDelete ? () => onDelete(card.id) : undefined}
            onDuplicate={onDuplicate ? () => onDuplicate(card.id) : undefined}
            width={cardWidth}
          />
        ))}
      </div>
    </div>
  );
});
ReportCardList.displayName = "ReportCardList";
