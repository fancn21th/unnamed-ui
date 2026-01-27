import styled from "styled-components";

/**
 * 组件外层容器
 * 提供统一的组件包裹器
 */
export const StyledContainer = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;

/**
 * 描述文本样式
 */
export const StyledDescription = styled.div`
  font-size: 14px;
  color: #141414;
  margin-bottom: 16px;
`;

/**
 * 列表容器
 */
export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/**
 * 列表项容器
 */
export const StyledListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/**
 * 列表项第一行容器
 * 包含序号、候选人名字、推荐标签
 */
export const StyledItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/**
 * 序号样式
 * 宽高 16px，圆形背景，内嵌阴影效果
 */
export const StyledRank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background: #0597ff;
  box-shadow: inset -2px -3px 3px rgba(2, 255, 255, 0.7);
  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  flex-shrink: 0;
`;

/**
 * 候选人名字样式
 */
export const StyledCandidateName = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #141414;
`;

/**
 * 推荐标签样式
 */
export interface StyledRecommendTagProps {
  $type: "priority" | "alternative" | "notRecommended";
}

const TAG_COLORS = {
  priority: "#06BA7E", // 优先选择
  alternative: "#1890FF", // 备选
  notRecommended: "#FF494F", // 不建议
};

export const StyledRecommendTag = styled.div<StyledRecommendTagProps>`
  padding: 4px 12px;
  border-radius: 4px;
  background: ${(props) => TAG_COLORS[props.$type]};
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  flex-shrink: 0;
`;

/**
 * 列表项第二行（描述）
 */
export const StyledItemDescription = styled.div`
  font-size: 12px;
  color: #71717d;
  line-height: 1.5;
  padding-left: 28px; /* 与第一行内容对齐（序号16px + gap 12px） */
`;
