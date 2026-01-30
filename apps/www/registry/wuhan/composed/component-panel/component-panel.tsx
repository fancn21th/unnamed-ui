"use client";

import * as React from "react";
import {
  ComponentPanelContainerPrimitive,
  ComponentPanelTabsListPrimitive,
  ComponentPanelTabsTriggerPrimitive,
  ComponentPanelTabsContentPrimitive,
  ComponentPanelListPrimitive,
  ComponentPanelListItemPrimitive,
  ComponentPanelListItemIconPrimitive,
} from "@/registry/wuhan/blocks/component-panel/component-panel-01";
import {
  BlockTooltip,
  BlockTooltipTrigger,
  BlockTooltipContent,
} from "@/registry/wuhan/blocks/tooltip/tooltip-01";

/**
 * @public
 */
export interface ComponentPanelItem {
  id: string;
  label: React.ReactNode;
  selected?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
}

/**
 * @public
 */
export interface ComponentPanelTab {
  id: string;
  label: React.ReactNode;
  items: ComponentPanelItem[];
}

/**
 * @public
 */
export interface ComponentPanelProps {
  tabs: ComponentPanelTab[];
  defaultTab?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

/**
 * @public
 */
export const ComponentPanel = React.forwardRef<
  HTMLDivElement,
  ComponentPanelProps
>(({ tabs, defaultTab, value, onValueChange }, ref) => {
  return (
    <ComponentPanelContainerPrimitive
      ref={ref}
      defaultValue={defaultTab}
      value={value}
      onValueChange={onValueChange}
    >
      <ComponentPanelTabsListPrimitive aria-label="Component panel tabs">
        {tabs.map((tab) => (
          <ComponentPanelTabsTriggerPrimitive key={tab.id} value={tab.id}>
            {tab.label}
          </ComponentPanelTabsTriggerPrimitive>
        ))}
      </ComponentPanelTabsListPrimitive>

      {tabs.map((tab) => (
        <ComponentPanelTabsContentPrimitive key={tab.id} value={tab.id}>
          <ComponentPanelListPrimitive>
            {tab.items.map((item) => (
              <ComponentPanelListItemPrimitive
                key={item.id}
                selected={item.selected}
                aria-selected={item.selected}
                onClick={item.onSelect ?? item.onToggle}
              >
                {item.icon ? (
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                    {item.icon}
                  </span>
                ) : (
                  <ComponentPanelListItemIconPrimitive />
                )}
                {item.tooltip ? (
                  <BlockTooltip>
                    <BlockTooltipTrigger asChild>
                      <span className="truncate">{item.label}</span>
                    </BlockTooltipTrigger>
                    <BlockTooltipContent>{item.tooltip}</BlockTooltipContent>
                  </BlockTooltip>
                ) : (
                  <span className="truncate">{item.label}</span>
                )}
              </ComponentPanelListItemPrimitive>
            ))}
          </ComponentPanelListPrimitive>
        </ComponentPanelTabsContentPrimitive>
      ))}
    </ComponentPanelContainerPrimitive>
  );
});
ComponentPanel.displayName = "ComponentPanel";
