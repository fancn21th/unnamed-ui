import React from "react";
import styled from "styled-components";
import { Typography, Space } from "antd";

const { Text, Paragraph } = Typography;

// ==================== 容器组件 ====================

/**
 * 主容器 - 浅绿色背景
 * 对应 Figma: background: #F0F7F6
 */
export const StyledMainContainer = styled.div`
  background: #f0f7f6;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/**
 * 卡片容器 - 白色背景
 * 对应 Figma: background: #FFFFFF, border-radius: 12px, padding: 16px
 */
export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
  background: #ffffff;
  border-radius: 12px;
  isolation: isolate;
`;

/**
 * 内容区域容器
 */
export const StyledContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  align-self: stretch;
  flex-grow: 0;
`;

// ==================== 标题组件 ====================

/**
 * 主标题 - 紫色
 * 对应 Figma: font-size: 20px, color: #6155F5
 */
export const StyledSectionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #6155f5;
  line-height: 28px;
`;

/**
 * 卡片标题容器
 */
export const StyledCardTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 4px;
`;

/**
 * 标题装饰竖线
 * 对应 Figma: width: 4px, background: #6155F5
 */
export const StyledTitleBar = styled.div`
  width: 4px;
  height: 14px;
  background: #6155f5;
  border-radius: 2px;
  flex-shrink: 0;
`;

/**
 * 二级标题文本
 * 对应 Figma: font-size: 14px, font-weight: 500, color: #27272A
 */
export const StyledSubTitle = styled(Text)`
  && {
    color: #27272a;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    display: flex;
    align-items: center;
  }
`;

// ==================== 图标/装饰组件 ====================

/**
 * 圆形图标容器 - 蓝色背景，带数字
 */
export const StyledNumberIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  width: 22px;
  height: 22px;
  background: #0597ff;
  box-shadow: inset -2px -3px 3px rgba(2, 255, 255, 0.7);
  border-radius: 16px;
  flex-shrink: 0;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
`;

/**
 * 二级装饰图标 - 渐变圆形
 */
export const StyledGradientIcon = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    width: 10.91px;
    height: 10.91px;
    left: 5px;
    top: 5px;
    background: linear-gradient(141.34deg, #ffd699 14.2%, #ff661a 63.98%);
    box-shadow: inset 0px 0px 3.8px rgba(255, 212, 172, 0.96);
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    width: 10.91px;
    height: 10.91px;
    left: 5px;
    top: 5px;
    background: linear-gradient(
      141.34deg,
      #b795fc 14.2%,
      #8447ff 66.9%,
      #86c4ff 90.12%
    );
    box-shadow: inset 0px 0px 3.8px rgba(196, 166, 255, 0.96);
    border-radius: 50%;
  }
`;

/**
 * Plus 图标 - 用于列表项
 */
export const StyledPlusIcon = styled.div`
  font-size: 12px;
  color: #4c56f6;
  flex-shrink: 0;
  margin-top: 4px;
`;

// ==================== 文本组件 ====================

/**
 * 正文文本
 * 对应 Figma: font-size: 14px, color: #71717D
 */
export const StyledBodyText = styled(Text)`
  && {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #71717d;
  }
`;

/**
 * 描述文本 - 灰色
 */
export const StyledDescriptionText = styled(Paragraph)`
  && {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #6b7280;
    margin: 0;
  }
`;

/**
 * 标签文本 - 深灰色
 */
export const StyledLabel = styled(Text)`
  && {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #344054;
  }
`;

/**
 * 面试官评论文本
 * 对应 Figma: font-size: 12px, color: #9E9CA6
 */
export const StyledInterviewerComment = styled(Text)`
  && {
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    color: #9e9ca6;
  }
`;

// ==================== 状态/等级标签 ====================

/**
 * 成功状态文本 - 绿色
 */
export const StyledSuccessText = styled(Text)`
  && {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #06ba7e;
  }
`;

/**
 * 中等风险文本 - 蓝色
 */
export const StyledMediumRiskText = styled(Text)`
  && {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #0ea5e9;
  }
`;

/**
 * 警告状态文本 - 橙色
 */
export const StyledWarningText = styled(Text)`
  && {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    color: #f59e0b;
  }
`;

// ==================== 列表/项目组件 ====================

/**
 * 详情项容器 - 带 Plus 图标的列表项
 */
export const StyledDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

/**
 * 卡片内容块
 */
export const StyledContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
`;

/**
 * 水平分割线
 */
export const StyledDivider = styled.div`
  height: 1px;
  background: #e0e0e0;
  align-self: stretch;
`;

// ==================== 徽章/标记组件 ====================

/**
 * 面试官标签 - 灰色背景
 */
export const StyledInterviewerBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 4px;
  height: 20px;
  background: #f3f4f6;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: #414651;
`;

// ==================== 布局组件 ====================

/**
 * Flex 行容器
 */
export const StyledFlexRow = styled.div<{ gap?: number; align?: string }>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.align || "center"};
  gap: ${(props) => props.gap || 8}px;
`;

/**
 * Flex 列容器
 */
export const StyledFlexColumn = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.gap || 12}px;
  align-self: stretch;
`;

// ==================== 特殊组件 ====================

/**
 * 薪资信息行
 */
export const StyledSalaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

/**
 * 评分盒子
 */
export const StyledRatingBox = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  background: #fef3c7;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  color: #92400e;
`;
