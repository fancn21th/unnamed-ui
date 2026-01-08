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

export default function ComponentPanelDefault() {
  const [allItems, setAllItems] = React.useState({
    组件1: true,
    组件2: false,
    组件3: true,
    组件4: false,
    组件5: true,
    组件6: false,
    组件7: true,
    组件8: false,
  });

  const [mcpItems, setMcpItems] = React.useState({
    MCP组件1: true,
    MCP组件2: false,
    MCP组件3: true,
    MCP组件4: false,
  });

  const [toolItems, setToolItems] = React.useState({
    工具1: true,
    工具2: false,
    工具3: true,
    工具4: false,
    工具5: true,
  });

  const [workflowItems, setWorkflowItems] = React.useState({
    工作流1: true,
    工作流2: false,
    工作流3: true,
    工作流4: false,
    工作流5: true,
    工作流6: false,
  });

  return (
    <div className="space-y-4 w-full h-full max-w-4xl">
      <ComponentPanelContainerPrimitive defaultValue="all">
        <ComponentPanelTabsListPrimitive>
          <ComponentPanelTabsTriggerPrimitive value="all">
            全部
          </ComponentPanelTabsTriggerPrimitive>
          <ComponentPanelTabsTriggerPrimitive value="mcp">
            MCP
          </ComponentPanelTabsTriggerPrimitive>
          <ComponentPanelTabsTriggerPrimitive value="tool">
            工具
          </ComponentPanelTabsTriggerPrimitive>
          <ComponentPanelTabsTriggerPrimitive value="workflow">
            工作流
          </ComponentPanelTabsTriggerPrimitive>
        </ComponentPanelTabsListPrimitive>

        <ComponentPanelTabsContentPrimitive value="all">
          <ComponentPanelListPrimitive>
            {Object.entries(allItems).map(([label, selected]) => (
              <ComponentPanelListItemPrimitive
                key={label}
                selected={selected}
                onClick={() => {
                  setAllItems((prev) => ({
                    ...prev,
                    [label]: !prev[label as keyof typeof prev],
                  }));
                }}
              >
                <ComponentPanelListItemIconPrimitive />
                <BlockTooltip>
                  <BlockTooltipTrigger asChild>
                    <span className="truncate">{label}</span>
                  </BlockTooltipTrigger>
                  <BlockTooltipContent>{label}</BlockTooltipContent>
                </BlockTooltip>
              </ComponentPanelListItemPrimitive>
            ))}
          </ComponentPanelListPrimitive>
        </ComponentPanelTabsContentPrimitive>

        <ComponentPanelTabsContentPrimitive value="mcp">
          <ComponentPanelListPrimitive>
            {Object.entries(mcpItems).map(([label, selected]) => (
              <ComponentPanelListItemPrimitive
                key={label}
                selected={selected}
                onClick={() => {
                  setMcpItems((prev) => ({
                    ...prev,
                    [label]: !prev[label as keyof typeof prev],
                  }));
                }}
              >
                <ComponentPanelListItemIconPrimitive />
                <BlockTooltip>
                  <BlockTooltipTrigger asChild>
                    <span className="truncate">{label}</span>
                  </BlockTooltipTrigger>
                  <BlockTooltipContent>{label}</BlockTooltipContent>
                </BlockTooltip>
              </ComponentPanelListItemPrimitive>
            ))}
          </ComponentPanelListPrimitive>
        </ComponentPanelTabsContentPrimitive>

        <ComponentPanelTabsContentPrimitive value="tool">
          <ComponentPanelListPrimitive>
            {Object.entries(toolItems).map(([label, selected]) => (
              <ComponentPanelListItemPrimitive
                key={label}
                selected={selected}
                onClick={() => {
                  setToolItems((prev) => ({
                    ...prev,
                    [label]: !prev[label as keyof typeof prev],
                  }));
                }}
              >
                <ComponentPanelListItemIconPrimitive />
                <BlockTooltip>
                  <BlockTooltipTrigger asChild>
                    <span className="truncate">{label}</span>
                  </BlockTooltipTrigger>
                  <BlockTooltipContent>{label}</BlockTooltipContent>
                </BlockTooltip>
              </ComponentPanelListItemPrimitive>
            ))}
          </ComponentPanelListPrimitive>
        </ComponentPanelTabsContentPrimitive>

        <ComponentPanelTabsContentPrimitive value="workflow">
          <ComponentPanelListPrimitive>
            {Object.entries(workflowItems).map(([label, selected]) => (
              <ComponentPanelListItemPrimitive
                key={label}
                selected={selected}
                onClick={() => {
                  setWorkflowItems((prev) => ({
                    ...prev,
                    [label]: !prev[label as keyof typeof prev],
                  }));
                }}
              >
                <ComponentPanelListItemIconPrimitive />
                <BlockTooltip>
                  <BlockTooltipTrigger asChild>
                    <span className="truncate">{label}</span>
                  </BlockTooltipTrigger>
                  <BlockTooltipContent>{label}</BlockTooltipContent>
                </BlockTooltip>
              </ComponentPanelListItemPrimitive>
            ))}
          </ComponentPanelListPrimitive>
        </ComponentPanelTabsContentPrimitive>
      </ComponentPanelContainerPrimitive>
    </div>
  );
}
