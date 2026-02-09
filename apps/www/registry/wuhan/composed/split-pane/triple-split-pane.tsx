"use client";

import * as React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { SplitPaneItem, SplitHandle } from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export interface PanelConfig {
  /** 面板内容 */
  children?: React.ReactNode;
  /** 面板标题 */
  title?: React.ReactNode;
  /** 默认宽度（百分比）*/
  defaultSize?: number;
  /** 最小宽度（百分比）*/
  minSize?: number;
  /** 折叠后的宽度，支持：数字（百分比 0-100）、像素字符串（如 "48px"）、其他单位（如 "3rem"）。0 表示完全折叠 */
  collapsedSize?: number | string;
  /** 折叠图标 */
  collapsibleIcon?: React.ReactNode;
  /** 紧凑模式下是否显示折叠图标 */
  showIconWhenCompact?: boolean;
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
    showIconWhenCompact: leftShowIconWhenCompact = true,
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
    showIconWhenCompact: rightShowIconWhenCompact = true,
  } = right;
  const [isLeftCollapsed, setIsLeftCollapsed] = React.useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = React.useState(false);

  const leftPanelRef = ResizablePrimitive.usePanelRef();
  const rightPanelRef = ResizablePrimitive.usePanelRef();

  // 将 collapsedSize 转换为数字用于判断（提取像素值）
  const getNumericSize = (size: number | string | undefined): number => {
    if (typeof size === 'string') {
      const match = size.match(/^([0-9.]+)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return size || 0;
  };

  const leftCollapsedSizeNum = getNumericSize(leftCollapsedSize);
  const rightCollapsedSizeNum = getNumericSize(rightCollapsedSize);

  const toggleLeftPanel = React.useCallback(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;

    if (isLeftCollapsed) {
      panel.resize(leftDefaultSize);
      setIsLeftCollapsed(false);
    } else {
      // 使用 collapse() 方法折叠到 collapsedSize prop 设置的值
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
      // 使用 collapse() 方法折叠到 collapsedSize prop 设置的值
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
        collapsible={true}
        disabled={isLeftCollapsed}
        isCompact={isLeftCollapsed && leftCollapsedSizeNum > 0 && leftCollapsedSizeNum < 50}
        collapsedSize={leftCollapsedSize}
        showIconWhenCompact={leftShowIconWhenCompact}
        panelTitle={leftTitle}
        collapsibleIcon={
          leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />
        }
        onCollapsibleClick={toggleLeftPanel}
      >
        {leftChildren}
      </SplitPaneItem>

      <SplitHandle withHandle className="bg-transparent"/>

      {/* 中间面板 */}
      <SplitPaneItem
        id="center-panel"
        defaultSize={centerDefaultSize}
        minSize={centerMinSize}
        panelTitle={
          <div className="flex items-center">
            {/* 左侧收起时显示展开图标 */}
            {isLeftCollapsed && (
              <button
                type="button"
                onClick={toggleLeftPanel}
                className="mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />}
              </button>
            )}
            {centerTitle}
          </div>
        }
        showCollapsibleIcon={false}
      >
        {centerChildren}
      </SplitPaneItem>

      <SplitHandle withHandle className="bg-transparent"/>

      {/* 右侧面板 */}
      <SplitPaneItem
        ref={rightPanelRef}
        id="right-panel"
        defaultSize={rightDefaultSize}
        minSize={rightMinSize}
        collapsible={true}
        disabled={isRightCollapsed}
        isCompact={isRightCollapsed && rightCollapsedSizeNum > 0 && rightCollapsedSizeNum < 50}
        collapsedSize={rightCollapsedSize}
        showIconWhenCompact={rightShowIconWhenCompact}
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
