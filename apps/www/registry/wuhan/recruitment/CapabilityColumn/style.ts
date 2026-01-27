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
  font-size: 16px;
  font-weight: 600;
  color: #252b37;
  margin-bottom: 12px;
`;

/**
 * 柱状图列表容器
 * 使用 grid 布局，支持响应式
 */
export const StyledChartList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
  gap: 24px;
`;

/**
 * 单个柱状图容器
 */
export const StyledChartWrapper = styled.div`
  padding: 16px;
  background: #fff;
`;

/**
 * 柱状图标题
 * 展示能力维度名称
 */
export const StyledChartTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #141414;
  margin-bottom: 16px;
  text-align: center;
`;

/**
 * 图表区域容器
 * 包含纵轴、横轴和柱状图主体
 */
export const StyledChartArea = styled.div`
  display: flex;
  gap: 8px;
  height: 240px;
`;

/**
 * 纵轴容器
 */
export const StyledYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  min-width: 60px;
`;

/**
 * 纵轴标签
 */
export const StyledYAxisLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: right;
  padding-right: 8px;
`;

/**
 * 图表主体容器
 */
export const StyledChartBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

/**
 * 柱状图区域
 */
export const StyledBarsArea = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 0 8px;
  position: relative;

  /* 网格线 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to top, #e5e7eb 1px, transparent 1px);
    background-size: 100% 25%;
    pointer-events: none;
    z-index: 0;
  }
`;

/**
 * 单个柱状图项
 */
export interface StyledBarProps {
  $height: number; // 0-100，表示百分比
  $color: string;
}

export const StyledBar = styled.div<StyledBarProps>`
  flex: 1;
  height: ${(props) => props.$height}%;
  background: ${(props) => props.$color};
  border-radius: 4px 4px 0 0;
  min-height: 8px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

/**
 * 横轴容器
 */
export const StyledXAxis = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 8px 0 8px;
  margin-top: 8px;
`;

/**
 * 横轴标签（候选人名称）
 */
export const StyledXAxisLabel = styled.div`
  flex: 1;
  font-size: 12px;
  color: #344054;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
