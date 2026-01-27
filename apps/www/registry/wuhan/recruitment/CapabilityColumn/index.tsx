"use client";

/** 能力对比柱状图 - 用于展示候选人能力维度对比分析 */
import React from "react";
import { CapabilityLevel, CAPABILITY_LEVEL_LABELS } from "./types";
import type { CapabilityData, CapabilityBarChartProps } from "./types";
import {
  StyledContainer,
  StyledDescription,
  StyledChartList,
  StyledChartWrapper,
  StyledChartTitle,
  StyledChartArea,
  StyledYAxis,
  StyledYAxisLabel,
  StyledChartBody,
  StyledBarsArea,
  StyledBar,
  StyledXAxis,
  StyledXAxisLabel,
} from "./style";

/**
 * 默认柱状图颜色
 * 前两个颜色按需求设定，后续可扩展
 */
const DEFAULT_COLORS = [
  "#7078F8",
  "#BC68FF",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

/**
 * CapabilityColumn 组件 Props
 */
export interface CapabilityColumnProps {
  /** 描述文本 */
  description?: string;
  /** 能力维度数据数组 */
  capabilities: CapabilityData[];
  /** 自定义柱状图颜色数组（可选） */
  colors?: string[];
}

export const CapabilityColumn: React.FC<CapabilityColumnProps> = ({
  description = "核心能力横向对比：",
  capabilities,
  colors = DEFAULT_COLORS,
}) => {
  return (
    <StyledContainer>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledChartList>
        {(capabilities || []).map((capability, index) => (
          <CapabilityBarChart key={index} data={capability} colors={colors} />
        ))}
      </StyledChartList>
    </StyledContainer>
  );
};

/**
 * CapabilityBarChart - 单个能力维度柱状图组件
 *
 * @description
 * 展示单个能力维度下多个候选人的能力对比
 * - 纵轴：能力等级（证据不足、低、中、高）
 * - 横轴：候选人名称
 * - 柱状图高度表示能力等级
 */
const CapabilityBarChart: React.FC<CapabilityBarChartProps> = ({
  data,
  colors,
}) => {
  /**
   * 计算柱状图高度百分比
   * level 0-3 映射到 0%-100%
   */
  const calculateHeight = (level: CapabilityLevel): number => {
    // 将 0-3 映射到 12.5%-100%（避免 0 高度不可见）
    const baseHeight = 12.5;
    const maxHeight = 100;
    const range = maxHeight - baseHeight;
    return baseHeight + (level / 3) * range;
  };

  /**
   * 获取候选人对应的颜色
   */
  const getColor = (index: number): string => {
    return colors[index % colors.length];
  };

  // 纵轴标签（从上到下）
  const yAxisLabels = [
    CAPABILITY_LEVEL_LABELS[CapabilityLevel.HIGH],
    CAPABILITY_LEVEL_LABELS[CapabilityLevel.MEDIUM],
    CAPABILITY_LEVEL_LABELS[CapabilityLevel.LOW],
    CAPABILITY_LEVEL_LABELS[CapabilityLevel.INSUFFICIENT],
  ];

  return (
    <StyledChartWrapper>
      <StyledChartTitle>{data.abilityName}</StyledChartTitle>
      <StyledChartArea>
        {/* 纵轴 */}
        <StyledYAxis>
          {yAxisLabels.map((label, index) => (
            <StyledYAxisLabel key={index}>{label}</StyledYAxisLabel>
          ))}
        </StyledYAxis>

        {/* 图表主体 */}
        <StyledChartBody>
          {/* 柱状图区域 */}
          <StyledBarsArea>
            {data.candidates.map((candidate, index) => (
              <StyledBar
                key={index}
                $height={calculateHeight(candidate.level)}
                $color={getColor(index)}
                title={`${candidate.candidateName}: ${CAPABILITY_LEVEL_LABELS[candidate.level]}`}
              />
            ))}
          </StyledBarsArea>

          {/* 横轴 */}
          <StyledXAxis>
            {data.candidates.map((candidate, index) => (
              <StyledXAxisLabel key={index} title={candidate.candidateName}>
                {candidate.candidateName}
              </StyledXAxisLabel>
            ))}
          </StyledXAxis>
        </StyledChartBody>
      </StyledChartArea>
    </StyledChartWrapper>
  );
};

export default CapabilityColumn;
