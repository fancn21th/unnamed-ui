"use client";

import React, { useState, useCallback } from "react";
import { ExpandIcon } from "../icons";
import {
  StyledJobCardContainer,
  StyledSubtitle,
  StyledContentWrapper,
  StyledTitle,
  StyledDescription,
} from "./styles";

export interface JobCardProps {
  /** 副标题文本 */
  subtitle?: string;
  /** 主标题文本 */
  title?: string;
  /** 描述文本 */
  description?: string;
  /** 是否可展开/收起 */
  expandable?: boolean;
  /** 默认是否展开 */
  defaultExpanded?: boolean;
  /** 副标题点击事件 */
  onSubtitleClick?: () => void;
  /** 卡片点击事件 */
  onClick?: () => void;
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 是否显示描述文本 */
  showDescription?: boolean;
  /** 描述文本最大显示行数 */
  descriptionMaxLines?: number;
}

const JobCard: React.FC<JobCardProps> = ({
  subtitle = "相似JD参考",
  title = "高级前端工程师",
  description = "负责公司核心产品的前端开发工作，要求熟练掌握 React、TypeScript 等技术栈，具备良好的代码规范和团队协作能力。",
  expandable = false,
  defaultExpanded = false,
  onSubtitleClick,
  onClick,
  expandIcon,
  className,
  showDescription = true,
  descriptionMaxLines = 2,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleSubtitleClick = useCallback(() => {
    if (expandable) {
      setExpanded((prev) => !prev);
    }
    onSubtitleClick?.();
  }, [expandable, onSubtitleClick]);

  const handleCardClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const renderExpandIcon = () => {
    if (expandIcon) {
      return expandIcon;
    }
    return (
      <ExpandIcon
        style={{
          fontSize: "20px",
          color: "#9E9FAA",
          transition: "transform 0.3s ease",
        }}
      />
    );
  };

  return (
    <StyledJobCardContainer className={className} onClick={handleCardClick}>
      {/* 上部分：副标题 */}
      <StyledSubtitle
        onClick={handleSubtitleClick}
        style={{
          cursor: expandable || onSubtitleClick ? "pointer" : "default",
        }}
      >
        <span>{subtitle}</span>
        {renderExpandIcon()}
      </StyledSubtitle>

      {/* 中间部分：主标题和描述文本 */}
      <StyledContentWrapper>
        <StyledTitle>{title}</StyledTitle>
        {showDescription && description && (
          <StyledDescription
            $expanded={expanded}
            $maxLines={descriptionMaxLines}
            $expandable={expandable}
          >
            {description}
          </StyledDescription>
        )}
      </StyledContentWrapper>
    </StyledJobCardContainer>
  );
};

export default JobCard;
