"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/wuhan/ui/button";
import {
  SidebarPrimitive,
  SidebarContentPrimitive,
  SidebarDividerPrimitive,
  SidebarHeaderPrimitive,
  SidebarHeaderLeading,
  SidebarHeaderIcon,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarNewButtonPrimitive,
  SidebarHistoryPrimitive,
  SidebarHistoryTitle,
  SidebarHistorySearchPrimitive,
  SidebarHistorySearchContainer,
  SidebarHistorySearchIcon,
  SidebarHistorySearchInput,
  SidebarHistoryListPrimitive,
  SidebarHistoryEmpty,
  SidebarFooterPrimitive,
} from "@/components/wuhan/blocks/sidebar-01";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/components/wuhan/blocks/history-item-01";
import {
  BlockTooltip,
  BlockTooltipContent,
  BlockTooltipTrigger,
} from "../blocks/tooltip-01";
import { cn } from "@/lib/utils";

/**
 * @public
 */
export interface SidebarHeaderConfig {
  title: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * @public
 */
export interface SidebarNewButtonConfig {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * @public
 */
export interface SidebarSearchConfig {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

/**
 * @public
 */
export interface SidebarConversation {
  id: string;
  title: React.ReactNode;
  hoverTrailing?: React.ReactNode;
  onClick?: () => void;
}

/**
 * @public
 */
export interface SidebarProps {
  header?: SidebarHeaderConfig | null;
  newButton?: SidebarNewButtonConfig | null;
  search?: SidebarSearchConfig | null;
  historyTitle?: React.ReactNode;
  conversations: SidebarConversation[];
  selectedId?: string | null;
  emptyText?: React.ReactNode;
  footer?:
    | React.ReactNode
    | null
    | ((state: { collapsed: boolean }) => React.ReactNode);
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  className?: string;
  contentClassName?: string;
}

/**
 * @public
 */
export const SidebarComposed = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      header,
      newButton,
      search,
      historyTitle = "历史对话",
      conversations,
      selectedId,
      emptyText = "暂无对话历史",
      footer,
      collapsed,
      defaultCollapsed,
      onCollapsedChange,
      collapsible = true,
      className,
      contentClassName,
    },
    ref,
  ) => {
    const [internalSearchValue, setInternalSearchValue] = React.useState("");
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(
      defaultCollapsed ?? false,
    );

    const isCollapsed = collapsed ?? uncontrolledCollapsed;

    const setCollapsed = React.useCallback(
      (next: boolean) => {
        if (collapsed == null) {
          setUncontrolledCollapsed(next);
        }
        onCollapsedChange?.(next);
      },
      [collapsed, onCollapsedChange],
    );

    const toggleCollapsed = React.useCallback(() => {
      setCollapsed(!isCollapsed);
    }, [isCollapsed, setCollapsed]);

    const defaultHeaderAction = collapsible ? (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={toggleCollapsed}
        aria-label="收起侧边栏"
        className="text-[var(--text-secondary)] hover:bg-[var(--bg-neutral-light)]"
      >
        <ChevronLeft className="size-4" />
      </Button>
    ) : null;

    const resolvedHeader =
      header === null
        ? null
        : {
            title: header?.title ?? "对话",
            icon: header?.icon ?? <Sparkles className="size-4" />,
            action:
              header?.action === null
                ? null
                : (header?.action ?? defaultHeaderAction),
          };

    const resolvedNewButton =
      newButton === null
        ? null
        : {
            label: newButton?.label ?? "新对话",
            icon: newButton?.icon ?? <Plus className="size-4" />,
            onClick: newButton?.onClick,
          };

    const resolvedSearch =
      search === null
        ? null
        : {
            value: search?.value ?? internalSearchValue,
            onChange: search?.onChange ?? setInternalSearchValue,
            placeholder: search?.placeholder ?? "搜索",
            icon: search?.icon ?? <Search className="size-4" />,
          };

    const iconButtonClassName =
      "text-[var(--text-secondary)] hover:bg-[var(--bg-neutral-light)] appearance-none border-0 bg-transparent";

    const resolvedClassName = cn(
      "w-[240px] min-h-[360px]",
      "rounded-lg border border-[var(--border-neutral)] overflow-hidden bg-[var(--bg-page-secondary)]",
      "transition-[width,padding] duration-200",
      isCollapsed && "w-[56px]",
      className,
    );

    const resolvedContentClassName = cn(
      "p-[var(--padding-com-lg)]",
      isCollapsed && "p-2",
      contentClassName,
    );

    const resolvedFooterClassName = cn(
      "px-[var(--padding-com-lg)] pb-[var(--padding-com-lg)]",
      isCollapsed && "p-2",
    );

    const showDetails = !isCollapsed;
    const resolvedFooter =
      typeof footer === "function" ? footer({ collapsed: isCollapsed }) : footer;

    return (
      <SidebarPrimitive
        ref={ref}
        className={resolvedClassName}
        data-collapsed={isCollapsed ? "true" : undefined}
      >
        <SidebarContentPrimitive className={resolvedContentClassName}>
          {resolvedHeader && (
            <SidebarHeaderPrimitive
              className={cn(
                isCollapsed && "flex-col gap-[var(--gap-sm)] items-center",
              )}
            >
              {isCollapsed ? (
                <>
                  {collapsible && (
                    <BlockTooltip>
                      <BlockTooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={toggleCollapsed}
                          aria-label="展开侧边栏"
                          className={iconButtonClassName}
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                      </BlockTooltipTrigger>
                      <BlockTooltipContent side="right">
                        展开侧边栏
                      </BlockTooltipContent>
                    </BlockTooltip>
                  )}
                  {resolvedNewButton && (
                    <BlockTooltip>
                      <BlockTooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={resolvedNewButton.onClick}
                          aria-label={
                            typeof resolvedNewButton.label === "string"
                              ? resolvedNewButton.label
                              : "新对话"
                          }
                          className={iconButtonClassName}
                        >
                          {resolvedNewButton.icon}
                        </Button>
                      </BlockTooltipTrigger>
                      <BlockTooltipContent side="right">
                        {typeof resolvedNewButton.label === "string"
                          ? resolvedNewButton.label
                          : "新对话"}
                      </BlockTooltipContent>
                    </BlockTooltip>
                  )}
                </>
              ) : (
                <>
                  <SidebarHeaderLeading>
                    {resolvedHeader.icon && (
                      <SidebarHeaderIcon aria-hidden="true">
                        {resolvedHeader.icon}
                      </SidebarHeaderIcon>
                    )}
                    <SidebarHeaderTitle>{resolvedHeader.title}</SidebarHeaderTitle>
                  </SidebarHeaderLeading>
                  {resolvedHeader.action && (
                    <SidebarHeaderAction>
                      {resolvedHeader.action}
                    </SidebarHeaderAction>
                  )}
                </>
              )}
            </SidebarHeaderPrimitive>
          )}

          {showDetails && resolvedNewButton && (
            <div className="mt-[var(--gap-lg)]">
              <SidebarNewButtonPrimitive onClick={resolvedNewButton.onClick}>
                {resolvedNewButton.icon}
                {resolvedNewButton.label}
              </SidebarNewButtonPrimitive>
            </div>
          )}

          {showDetails && (resolvedHeader || resolvedNewButton) && (
            <SidebarDividerPrimitive />
          )}

          {showDetails && (
            <SidebarHistoryPrimitive>
              <SidebarHistoryTitle>{historyTitle}</SidebarHistoryTitle>

              {resolvedSearch && (
                <SidebarHistorySearchPrimitive>
                  <SidebarHistorySearchContainer>
                    {resolvedSearch.icon && (
                      <SidebarHistorySearchIcon>
                        {resolvedSearch.icon}
                      </SidebarHistorySearchIcon>
                    )}
                    <SidebarHistorySearchInput
                      placeholder={resolvedSearch.placeholder ?? "搜索"}
                      value={resolvedSearch.value}
                      onChange={(event) =>
                        resolvedSearch.onChange(event.target.value)
                      }
                      aria-label={resolvedSearch.placeholder ?? "搜索"}
                    />
                  </SidebarHistorySearchContainer>
                </SidebarHistorySearchPrimitive>
              )}

              <SidebarHistoryListPrimitive aria-label="历史对话列表">
                {conversations.length === 0 ? (
                  <SidebarHistoryEmpty>{emptyText}</SidebarHistoryEmpty>
                ) : (
                  conversations.map((conv) => {
                    const isSelected = conv.id === selectedId;
                    return (
                      <HistoryItemPrimitive
                        key={conv.id}
                        className="w-full"
                        data-selected={isSelected ? "true" : undefined}
                        onClick={conv.onClick}
                      >
                        <HistoryItemTitlePrimitive>
                          {conv.title}
                        </HistoryItemTitlePrimitive>
                        {conv.hoverTrailing && (
                          <HistoryItemHoverTrailingPrimitive>
                            {conv.hoverTrailing}
                          </HistoryItemHoverTrailingPrimitive>
                        )}
                      </HistoryItemPrimitive>
                    );
                  })
                )}
              </SidebarHistoryListPrimitive>
            </SidebarHistoryPrimitive>
          )}
        </SidebarContentPrimitive>

        {resolvedFooter && (
          <SidebarFooterPrimitive className={resolvedFooterClassName}>
            {resolvedFooter}
          </SidebarFooterPrimitive>
        )}
      </SidebarPrimitive>
    );
  },
);
SidebarComposed.displayName = "SidebarComposed";

/**
 * @public
 */
export const SidebarSearchInput = SidebarHistorySearchInput;
