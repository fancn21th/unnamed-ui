"use client";

import * as React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { SplitPaneItem } from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export interface PanelConfig {
  /** 面板内容 */
  children?: React.ReactNode;
  /** 面板标题 */
  title?: React.ReactNode;
  /** 默认宽度（百分比）*/
  defaultSize?: number;
  /** 最小宽度（百分比）*/
  minSize?: number;
  /** 折叠后的宽度（像素），设为 0 表示完全折叠 */
  collapsedSize?: number;
  /** 折叠图标 */
  collapsibleIcon?: React.ReactNode;
}

export interface TripleSplitPaneProps {
  /**
   * 左侧面板配置
   */
  left?: PanelConfig;
  /**
   * 中间面板配置
   */
  center?: PanelConfig;
  /**
   * 右侧面板配置
   */
  right?: PanelConfig;
  /**
   * 容器的类名
   */
  className?: string;
}

export const TripleSplitPane: React.FC<TripleSplitPaneProps> = ({
  left = {},
  center = {},
  right = {},
  className,
}) => {
  const {
    children: leftChildren,
    title: leftTitle,
    defaultSize: leftDefaultSize = 20,
    minSize: leftMinSize = 15,
    collapsedSize: leftCollapsedSize = 0,
    collapsibleIcon: leftCollapsibleIcon,
  } = left;

  const {
    children: centerChildren,
    title: centerTitle,
    defaultSize: centerDefaultSize = 50,
    minSize: centerMinSize = 30,
  } = center;

  const {
    children: rightChildren,
    title: rightTitle,
    defaultSize: rightDefaultSize = 30,
    minSize: rightMinSize = 15,
    collapsedSize: rightCollapsedSize = 0,
    collapsibleIcon: rightCollapsibleIcon,
  } = right;
  const [isLeftCollapsed, setIsLeftCollapsed] = React.useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = React.useState(false);

  const leftPanelRef = ResizablePrimitive.usePanelRef();
  const rightPanelRef = ResizablePrimitive.usePanelRef();

  const toggleLeftPanel = React.useCallback(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;

    if (isLeftCollapsed) {
      panel.resize(leftDefaultSize);
      setIsLeftCollapsed(false);
    } else {
      panel.collapse();
      setIsLeftCollapsed(true);
    }
  }, [isLeftCollapsed, leftDefaultSize, leftPanelRef]);

  const toggleRightPanel = React.useCallback(() => {
    const panel = rightPanelRef.current;
    if (!panel) return;

    if (isRightCollapsed) {
      panel.resize(rightDefaultSize);
      setIsRightCollapsed(false);
    } else {
      panel.collapse();
      setIsRightCollapsed(true);
    }
  }, [isRightCollapsed, rightDefaultSize, rightPanelRef]);

  return (
    <ResizablePrimitive.Group orientation="horizontal" className={className}>
      {/* 左侧面板 */}
      <SplitPaneItem
        ref={leftPanelRef}
        id="left-panel"
        defaultSize={leftDefaultSize}
        minSize={leftMinSize}
        collapsible={leftCollapsedSize === 0}
        panelTitle={leftTitle}
        collapsibleIcon={
          leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />
        }
        onCollapsibleClick={toggleLeftPanel}
      >
        {leftChildren}
      </SplitPaneItem>

      {/* <SplitHandle withHandle /> */}

      {/* 中间面板 */}
      <SplitPaneItem
        id="center-panel"
        defaultSize={centerDefaultSize}
        minSize={centerMinSize}
        panelTitle={centerTitle}
        showCollapsibleIcon={false}
      >
        {centerChildren}
      </SplitPaneItem>

      {/* <SplitHandle withHandle /> */}

      {/* 右侧面板 */}
      <SplitPaneItem
        ref={rightPanelRef}
        id="right-panel"
        defaultSize={rightDefaultSize}
        minSize={rightMinSize}
        collapsible={rightCollapsedSize === 0}
        panelTitle={rightTitle}
        collapsibleIcon={
          rightCollapsibleIcon || <PanelRight className="h-4 w-4" />
        }
        onCollapsibleClick={toggleRightPanel}
      >
        {rightChildren}
      </SplitPaneItem>
    </ResizablePrimitive.Group>
  );
};

TripleSplitPane.displayName = "TripleSplitPane";
