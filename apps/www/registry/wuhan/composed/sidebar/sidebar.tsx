"use client";

import * as React from "react";
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
} from "@/registry/wuhan/blocks/sidebar/sidebar-01";
import {
  HistoryItemPrimitive,
  HistoryItemTitlePrimitive,
  HistoryItemHoverTrailingPrimitive,
} from "@/registry/wuhan/blocks/history-item/history-item-01";

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
  header?: SidebarHeaderConfig;
  newButton?: SidebarNewButtonConfig;
  search?: SidebarSearchConfig;
  historyTitle?: React.ReactNode;
  conversations: SidebarConversation[];
  selectedId?: string | null;
  emptyText?: React.ReactNode;
  footer?: React.ReactNode;
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
      className,
      contentClassName,
    },
    ref,
  ) => {
    return (
      <SidebarPrimitive ref={ref} className={className}>
        <SidebarContentPrimitive className={contentClassName}>
          {header && (
            <SidebarHeaderPrimitive>
              <SidebarHeaderLeading>
                {header.icon && (
                  <SidebarHeaderIcon aria-hidden="true">
                    {header.icon}
                  </SidebarHeaderIcon>
                )}
                <SidebarHeaderTitle>{header.title}</SidebarHeaderTitle>
              </SidebarHeaderLeading>
              {header.action && (
                <SidebarHeaderAction>{header.action}</SidebarHeaderAction>
              )}
            </SidebarHeaderPrimitive>
          )}

          {newButton && (
            <div className="mt-[var(--gap-lg)]">
              <SidebarNewButtonPrimitive onClick={newButton.onClick}>
                {newButton.icon}
                {newButton.label}
              </SidebarNewButtonPrimitive>
            </div>
          )}

          {(header || newButton) && <SidebarDividerPrimitive />}

          <SidebarHistoryPrimitive>
            <SidebarHistoryTitle>{historyTitle}</SidebarHistoryTitle>

            {search && (
              <SidebarHistorySearchPrimitive>
                <SidebarHistorySearchContainer>
                  {search.icon && (
                    <SidebarHistorySearchIcon>
                      {search.icon}
                    </SidebarHistorySearchIcon>
                  )}
                  <SidebarHistorySearchInput
                    placeholder={search.placeholder ?? "搜索"}
                    value={search.value}
                    onChange={(event) => search.onChange(event.target.value)}
                    aria-label={search.placeholder ?? "搜索"}
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
        </SidebarContentPrimitive>

        {footer && <SidebarFooterPrimitive>{footer}</SidebarFooterPrimitive>}
      </SidebarPrimitive>
    );
  },
);
SidebarComposed.displayName = "SidebarComposed";

/**
 * @public
 */
export const SidebarSearchInput = SidebarHistorySearchInput;
