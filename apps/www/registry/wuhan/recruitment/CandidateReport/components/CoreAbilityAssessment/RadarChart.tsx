import React from "react";
import styled from "styled-components";

export interface RadarChartDimension {
  name: string;
  score: number;
}

export interface RadarChartProps {
  dimensions: RadarChartDimension[];
  maxScore?: number;
}

const StyledRadarChartContainer = styled.div`
  flex-shrink: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRadarChart = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRadarSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

// 雷达图组件
const RadarChart: React.FC<RadarChartProps> = ({ dimensions, maxScore }) => {
  // 计算雷达图的最大值（用于归一化）
  const calculatedMaxScore =
    maxScore || Math.max(...dimensions.map((d) => d.score), 100);
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100; // 减小雷达图半径，为标签和分数留出空间

  // 计算角度（从顶部开始，顺时针）
  const getAngle = (index: number) =>
    (index * (360 / dimensions.length) - 90) * (Math.PI / 180);

  // 计算坐标点
  const getPoint = (angle: number, radius: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  });

  return (
    <StyledRadarChartContainer>
      <StyledRadarChart>
        <StyledRadarSvg viewBox="0 0 300 300">
          {/* 绘制同心圆网格 */}
          {[0, 25, 50, 75, 100].map((level) => {
            const radius = (level / 100) * maxRadius;
            return (
              <circle
                key={level}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            );
          })}

          {/* 绘制轴线 */}
          {dimensions.map((_, index) => {
            const angle = getAngle(index);
            const point = getPoint(angle, maxRadius);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke="#e5e5e5"
                strokeWidth="1"
              />
            );
          })}

          {/* 绘制数据区域（紫色填充） */}
          <polygon
            points={dimensions
              .map((dimension, index) => {
                const angle = getAngle(index);
                const radius =
                  (dimension.score / calculatedMaxScore) * maxRadius;
                const point = getPoint(angle, radius);
                return `${point.x},${point.y}`;
              })
              .join(" ")}
            fill="#6155f5"
            fillOpacity="0.3"
            stroke="#6155f5"
            strokeWidth="2"
          />

          {/* 绘制数据点 */}
          {dimensions.map((dimension, index) => {
            const angle = getAngle(index);
            const radius = (dimension.score / calculatedMaxScore) * maxRadius;
            const point = getPoint(angle, radius);
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#6155f5"
              />
            );
          })}

          {/* 绘制标签和分数 */}
          {dimensions.map((dimension, index) => {
            const angle = getAngle(index);
            // 标签在最外层，距离中心 135
            const labelRadius = 135;
            const labelPoint = getPoint(angle, labelRadius);

            // 分数跟随雷达图数据点，在数据点外侧 10-15 的位置
            const dataRadius =
              (dimension.score / calculatedMaxScore) * maxRadius;
            const scoreOffset = 22; // 分数距离数据点的偏移量，增大避免被圆点盖住
            const scoreRadius = dataRadius + scoreOffset;
            const scorePoint = getPoint(angle, scoreRadius);

            // 根据角度调整文本对齐方式，使其更自然
            let textAnchor: "start" | "middle" | "end" = "middle";
            const angleDeg = (angle * 180) / Math.PI;
            if (angleDeg > -90 && angleDeg < 90) {
              textAnchor = "start";
            } else if (angleDeg > 90 || angleDeg < -90) {
              textAnchor = "end";
            }

            return (
              <g key={index}>
                {/* 标签文本 */}
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#666666"
                  fontWeight="500"
                >
                  {dimension.name}
                </text>
                {/* 分数文本 - 跟随数据点位置 */}
                <text
                  x={scorePoint.x}
                  y={scorePoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#7B61FF"
                  fontWeight="600"
                >
                  {dimension.score}分
                </text>
              </g>
            );
          })}
        </StyledRadarSvg>
      </StyledRadarChart>
    </StyledRadarChartContainer>
  );
};

export default RadarChart;
