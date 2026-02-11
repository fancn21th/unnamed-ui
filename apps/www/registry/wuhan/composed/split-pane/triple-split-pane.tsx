"use client";

import * as React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import {
  SplitPaneContainerPrimitive,
  SplitPaneItemPrimitive,
  SplitPaneSeparatorPrimitive,
} from "@/registry/wuhan/blocks/split-pane/split-pane-01";

export interface PanelConfig {
  /** 面板内容 */
  children?: React.ReactNode;
  /** 面板标题 */
  title?: React.ReactNode;
  /** 展开时的宽度（像素或百分比字符串，如 "300px" 或 "20%" ）*/
  width?: string;
  /** 最小宽度（像素或百分比字符串）*/
  minWidth?: string;
  /** 折叠后的宽度（像素或百分比字符串，如 "48px" ），0 表示完全折叠 */
  collapsedWidth?: string;
  /** 折叠图标 */
  collapsibleIcon?: React.ReactNode;
  /** 紧凑模式下是否显示折叠图标 */
  showIconWhenCompact?: boolean;
  /** 初始是否折叠 */
  defaultCollapsed?: boolean;
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

/**
 * 将宽度字符串转换为像素数值（用于计算）
 * 支持 px、%、rem 等单位，百分比基于容器宽度 containerWidth
 */
const parseWidth = (
  width: string | undefined,
  containerWidth: number,
): number => {
  if (!width) return 0;

  // 匹配数字和单位
  const match = width.match(/^([\d.]+)(px|%|rem|em)?$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2] || "px";

  switch (unit) {
    case "px":
      return value;
    case "%":
      return (value / 100) * containerWidth;
    case "rem":
      return value * 16; // 假设 1rem = 16px
    case "em":
      return value * 16;
    default:
      return value;
  }
};

export const TripleSplitPane = React.forwardRef<
  HTMLDivElement,
  TripleSplitPaneProps
>(({ left = {}, center = {}, right = {}, className }, ref) => {
  const {
    children: leftChildren,
    title: leftTitle,
    width: leftWidth = "300px",
    minWidth: leftMinWidth = "200px",
    collapsedWidth: leftCollapsedWidth = "0px",
    collapsibleIcon: leftCollapsibleIcon,
    showIconWhenCompact: leftShowIconWhenCompact = true,
    defaultCollapsed: leftDefaultCollapsed = false,
  } = left;

  const {
    children: centerChildren,
    title: centerTitle,
    minWidth: centerMinWidth = "400px",
  } = center;

  const {
    children: rightChildren,
    title: rightTitle,
    width: rightWidth = "300px",
    minWidth: rightMinWidth = "200px",
    collapsedWidth: rightCollapsedWidth = "0px",
    collapsibleIcon: rightCollapsibleIcon,
    showIconWhenCompact: rightShowIconWhenCompact = true,
    defaultCollapsed: rightDefaultCollapsed = false,
  } = right;

  const [isLeftCollapsed, setIsLeftCollapsed] =
    React.useState(leftDefaultCollapsed);
  const [isRightCollapsed, setIsRightCollapsed] = React.useState(
    rightDefaultCollapsed,
  );

  // 保存计算后的约束宽度
  const [constrainedWidths, setConstrainedWidths] = React.useState({
    leftWidth: isLeftCollapsed ? leftCollapsedWidth : leftWidth,
    rightWidth: isRightCollapsed ? rightCollapsedWidth : rightWidth,
  });

  const internalRef = React.useRef<HTMLDivElement>(null);

  // 合并外部 ref 和内部 ref
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  // 计算并约束宽度
  const calculateConstrainedWidths = React.useCallback(() => {
    if (!internalRef.current) {
      return {
        leftWidth: isLeftCollapsed ? leftCollapsedWidth : leftWidth,
        rightWidth: isRightCollapsed ? rightCollapsedWidth : rightWidth,
      };
    }

    const containerWidth = internalRef.current.offsetWidth;

    // 解析所有宽度为像素值
    const leftExpandedPx = parseWidth(leftWidth, containerWidth);
    const leftCollapsedPx = parseWidth(leftCollapsedWidth, containerWidth);
    const leftMinPx = parseWidth(leftMinWidth, containerWidth);

    const rightExpandedPx = parseWidth(rightWidth, containerWidth);
    const rightCollapsedPx = parseWidth(rightCollapsedWidth, containerWidth);
    const rightMinPx = parseWidth(rightMinWidth, containerWidth);

    const centerMinPx = parseWidth(centerMinWidth, containerWidth);

    // 当前左右面板实际宽度
    let currentLeftPx = isLeftCollapsed ? leftCollapsedPx : leftExpandedPx;
    let currentRightPx = isRightCollapsed ? rightCollapsedPx : rightExpandedPx;

    // 计算剩余空间
    const remainingSpace = containerWidth - currentLeftPx - currentRightPx;

    // 约束条件：左宽度 + 右宽度 + 中间最小宽度 <= 容器宽度
    if (remainingSpace < centerMinPx) {
      // 空间不足，需要调整左右面板宽度
      const totalRequired = currentLeftPx + currentRightPx + centerMinPx;
      const excessWidth = totalRequired - containerWidth;

      // 按比例缩小左右面板（保证不小于各自的最小宽度或折叠宽度）
      const leftRatio = currentLeftPx / (currentLeftPx + currentRightPx);
      const rightRatio = currentRightPx / (currentLeftPx + currentRightPx);

      const leftReduction = excessWidth * leftRatio;
      const rightReduction = excessWidth * rightRatio;

      currentLeftPx = Math.max(
        isLeftCollapsed ? leftCollapsedPx : leftMinPx,
        currentLeftPx - leftReduction,
      );
      currentRightPx = Math.max(
        isRightCollapsed ? rightCollapsedPx : rightMinPx,
        currentRightPx - rightReduction,
      );
    }

    return {
      leftWidth: `${currentLeftPx}px`,
      rightWidth: `${currentRightPx}px`,
    };
  }, [
    isLeftCollapsed,
    isRightCollapsed,
    leftWidth,
    leftCollapsedWidth,
    leftMinWidth,
    rightWidth,
    rightCollapsedWidth,
    rightMinWidth,
    centerMinWidth,
  ]);

  // 在布局效果中计算约束宽度
  React.useLayoutEffect(() => {
    const widths = calculateConstrainedWidths();
    setConstrainedWidths(widths);
  }, [calculateConstrainedWidths]);

  // 监听窗口大小变化
  React.useEffect(() => {
    const handleResize = () => {
      const widths = calculateConstrainedWidths();
      setConstrainedWidths(widths);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateConstrainedWidths]);

  const { leftWidth: constrainedLeftWidth, rightWidth: constrainedRightWidth } =
    constrainedWidths;

  const toggleLeftPanel = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
  };

  const toggleRightPanel = () => {
    setIsRightCollapsed(!isRightCollapsed);
  };

  // 判断是否为紧凑模式
  const isLeftCompact =
    isLeftCollapsed && parseWidth(leftCollapsedWidth, 0) > 0;
  const isRightCompact =
    isRightCollapsed && parseWidth(rightCollapsedWidth, 0) > 0;

  return (
    <SplitPaneContainerPrimitive
      ref={mergedRef}
      className={`gap-3 ${className}`}
    >
      {/* 左侧面板 */}
      <SplitPaneItemPrimitive
        width={constrainedLeftWidth}
        isCompact={isLeftCompact}
        showIconWhenCompact={leftShowIconWhenCompact}
        panelTitle={leftTitle}
        collapsibleIcon={
          leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />
        }
        onCollapsibleClick={toggleLeftPanel}
      >
        {leftChildren}
      </SplitPaneItemPrimitive>

      {/* 分隔符 */}
      {/* <SplitPaneSeparatorPrimitive /> */}

      {/* 中间面板 */}
      <div className="flex-1 min-w-0 h-full">
        <SplitPaneItemPrimitive
          width="100%"
          panelTitle={
            <div className="flex items-center">
              {/* 左侧收起时显示展开图标 */}
              {isLeftCollapsed && (
                <button
                  type="button"
                  onClick={toggleLeftPanel}
                  className="mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {leftCollapsibleIcon || <PanelLeft className="h-4 w-4" />}
                </button>
              )}
              {centerTitle}
            </div>
          }
          showCollapsibleIcon={false}
          style={{ minWidth: centerMinWidth }}
        >
          {centerChildren}
        </SplitPaneItemPrimitive>
      </div>

      {/* 分隔符 */}
      {/* <SplitPaneSeparatorPrimitive /> */}

      {/* 右侧面板 */}
      <SplitPaneItemPrimitive
        width={constrainedRightWidth}
        isCompact={isRightCompact}
        showIconWhenCompact={rightShowIconWhenCompact}
        panelTitle={rightTitle}
        collapsibleIcon={
          rightCollapsibleIcon || <PanelRight className="h-4 w-4" />
        }
        onCollapsibleClick={toggleRightPanel}
      >
        {rightChildren}
      </SplitPaneItemPrimitive>
    </SplitPaneContainerPrimitive>
  );
});

TripleSplitPane.displayName = "TripleSplitPane";
