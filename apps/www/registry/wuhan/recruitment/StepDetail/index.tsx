"use client";

import React, { useState, useCallback } from "react";
import {
  StyledStepContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledTitle,
  StyledContent,
  StyledItem,
  StyledItemTitle,
  StyledItemContent,
  StyledTimeline,
} from "./styles";
import { CheckCircleIcon, ArrowDownIcon } from "../icons";

export interface StepDetailItem {
  /** 项目标题 */
  title: string;
  /** 项目内容 */
  content: string;
}

interface StepProps {
  /** 步骤标题 */
  title?: string;
  /** 步骤描述 */
  description?: string;
  /** 步骤内容项列表 */
  items?: StepDetailItem[];
  /** 是否可展开/收起 */
  expandable?: boolean;
  /** 默认是否展开 */
  defaultExpanded?: boolean;
  /** 是否展开（受控模式） */
  expanded?: boolean;
  /** 展开/收起回调 */
  onToggle?: (expanded: boolean) => void;
}

const StepDetail: React.FC<StepProps> = ({
  title,
  description,
  items = [{ title: "阶段判断", content: "用户当前属于招聘需求准备阶段" }],
  expandable = true,
  defaultExpanded = true,
  expanded: expandedProp,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = expandedProp !== undefined ? expandedProp : internalExpanded;

  const handleToggle = useCallback(() => {
    const newExpanded = !expanded;
    if (expandedProp === undefined) {
      setInternalExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  }, [expanded, expandedProp, onToggle]);

  /**
   * 时间轴形式渲染内容项
   */
  const renderItems = () => {
    if (!items.length) return null;
    const timelineItems = items.map((item, index) => ({
      content: (
        <StyledItem key={index}>
          <StyledItemTitle>{item.title}</StyledItemTitle>
          <StyledItemContent>{item.content}</StyledItemContent>
        </StyledItem>
      ),
      classNames: {
        icon: "item-icon",
        rail: "item-rail",
        content: "item-content",
        root: "item-root",
      },
    }));
    return <StyledTimeline items={timelineItems} />;
  };
  return (
    <StyledStepContainer>
      {/* 上部分：Header - 只有传递了 title 才显示 */}
      {title && (
        <StyledHeader>
          <StyledHeaderLeft>
            <CheckCircleIcon style={{ fontSize: "20px" }} />
            <StyledTitle>{title}</StyledTitle>
          </StyledHeaderLeft>
          {expandable && (
            <div
              onClick={handleToggle}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <ArrowDownIcon style={{ fontSize: "20px" }} />
            </div>
          )}
        </StyledHeader>
      )}
      {/* 下部分：正文内容 */}
      {expanded && (
        <StyledContent>
          {description && (
            <StyledItem>
              <StyledItemContent>{description}</StyledItemContent>
            </StyledItem>
          )}
          {/* {items.map((item, index) => (
            <StyledItem key={index}>
              <StyledItemTitle>{item.title}</StyledItemTitle>
              <StyledItemContent>{item.content}</StyledItemContent>
            </StyledItem>
          ))} */}
          {renderItems()}
        </StyledContent>
      )}
    </StyledStepContainer>
  );
};

export default StepDetail;
