"use client";

import React, { useState } from "react";
import { Typography, Table } from "antd";
import styled from "styled-components";
import RadarChart from "./RadarChart";
import type { CoreAbilityAssessmentData } from "../../index";

const { Text, Paragraph } = Typography;

export interface CoreAbilityAssessmentProps {
  data: CoreAbilityAssessmentData;
}

// 主容器
const StyledContainer = styled.div`
  background: #f0f7f6;
  border-radius: 12px;
  padding: 16px;
`;

// 标题
const StyledSectionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #6155f5;
  margin-bottom: 16px;
`;

// 评估内容容器
const StyledAssessmentContent = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
`;

// 右侧文本评估容器
const StyledTextAssessment = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 224px;
`;

// 标题栏容器
const StyledTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 24px;
`;

// 标题和竖线容器
const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

// 竖线装饰
const StyledTitleBar = styled.div`
  width: 4px;
  height: 14px;
  background: #6155f5;
  border-radius: 2px;
  flex-shrink: 0;
`;

// 标题文本
const StyledTitle = styled(Text)`
  && {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #27272a;
    flex: 1;
    min-width: 0;
  }
`;

// 指示器容器
const StyledIndicators = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

// 指示器圆点
const StyledIndicator = styled.div<{ $active?: boolean }>`
  width: ${(props) => (props.$active ? "10px" : "8px")};
  height: ${(props) => (props.$active ? "10px" : "8px")};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.$active
      ? "background: #7381FF;"
      : "border: 2px solid #CDD1D7; box-sizing: border-box;"}

  &:hover {
    transform: scale(1.2);
  }
`;

// 结论容器
const StyledConclusionWrapper = styled.div`
  display: block;
  min-height: 44px;
  font-size: 14px;
  line-height: 22px;
  color: #344054;
`;

const StyledConclusion = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: #06ba7e;
`;

const StyledNote = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #344054;
`;

// 描述文本
const StyledDescription = styled(Paragraph)`
  && {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #6b7280;
    margin: 0;
  }
`;

// 表格容器
const StyledTableWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;

  .ant-table-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-table {
    font-size: 14px;
    flex: 1;
  }

  .ant-table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-table-content {
    flex: 1;
  }

  .ant-table-thead > tr > th {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 16px;
    height: 52px;
    font-family: "PingFang SC";
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #141414;
    border-right: none;

    &::before {
      display: none;
    }

    &:first-child {
      border-right: 1px solid #e5e7eb;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #e5e7eb;
    padding: 0 16px;
    height: 52px;
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #344054;
    border-right: none;

    &:first-child {
      border-right: 1px solid #e5e7eb;
    }
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid #e5e7eb;
  }

  /* 固定列样式 */
  .ant-table-cell-fix-right {
    background: #ffffff;
    box-shadow: -4px 0px 12px rgba(2, 16, 39, 0.2);
    padding: 0 12px !important;
  }

  /* 匹配度列的特殊颜色 */
  .ant-table-tbody > tr > td.ant-table-cell-fix-right {
    font-size: 12px;
    line-height: 20px;

    &.match-high {
      color: #4a56ff;
    }

    &.match-medium {
      color: #bc68ff;
    }

    &.match-low {
      color: #6b7280;
    }
  }

  /* 移除表格边框和外边距 */
  .ant-table-container {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  /* 移除分页和空状态 */
  .ant-pagination,
  .ant-table-placeholder {
    display: none;
  }
`;

// 核心能力评估组件
const CoreAbilityAssessment: React.FC<CoreAbilityAssessmentProps> = ({
  data,
}) => {
  const { dimensions, matchConclusion, description } = data;
  const [activeView, setActiveView] = useState(0);

  // 表格数据 - 增加更多数据以展示冻结列效果
  const tableData = [
    {
      key: "1",
      ability: "大数据分析与建模能力",
      match: "4",
      matchLevel: "match-high",
    },
    {
      key: "2",
      ability: "产品需求分析与设计能力",
      match: "3",
      matchLevel: "match-high",
    },
    {
      key: "3",
      ability: "跨团队沟通协调能力",
      match: "3",
      matchLevel: "match-high",
    },
    {
      key: "4",
      ability: "敏捷项目管理能力",
      match: "2",
      matchLevel: "match-medium",
    },
    {
      key: "5",
      ability: "技术文档编写能力",
      match: "不匹配",
      matchLevel: "match-low",
    },
  ];

  const columns = [
    {
      title: "能力项",
      dataIndex: "ability",
      key: "ability",
      width: 144,
    },
    {
      title: "匹配度",
      dataIndex: "match",
      key: "match",
      width: 80,
      fixed: "right" as const,
      onCell: (record: any) => ({
        className: record.matchLevel,
      }),
    },
  ];

  // 模拟多个视图数据
  const views = [
    {
      conclusion: matchConclusion,
      note: "在当前以快速补位、业务推进为导向的招聘目标下可接受",
      description: description,
    },
  ];

  const currentView = views[0];

  return (
    <StyledContainer>
      <StyledSectionTitle>核心能力评估</StyledSectionTitle>
      <StyledAssessmentContent>
        {/* 左侧雷达图 */}
        <RadarChart dimensions={dimensions} />

        {/* 右侧内容 */}
        <StyledTextAssessment>
          {/* 标题栏 - 两个视图共用 */}
          <StyledTitleRow>
            <StyledTitleWrapper>
              <StyledTitleBar />
              <StyledTitle ellipsis={{ tooltip: "个人能力与岗位要求匹配度" }}>
                个人能力与岗位要求匹配度
              </StyledTitle>
            </StyledTitleWrapper>

            <StyledIndicators>
              <StyledIndicator
                $active={activeView === 0}
                onClick={() => setActiveView(0)}
              />
              <StyledIndicator
                $active={activeView === 1}
                onClick={() => setActiveView(1)}
              />
            </StyledIndicators>
          </StyledTitleRow>

          {/* 内容区域 - 根据 activeView 切换 */}
          {activeView === 0 ? (
            <>
              <StyledConclusionWrapper>
                <StyledConclusion>{currentView.conclusion}</StyledConclusion>
                {currentView.note && (
                  <StyledNote>（{currentView.note}）</StyledNote>
                )}
              </StyledConclusionWrapper>

              <StyledDescription>{currentView.description}</StyledDescription>
            </>
          ) : (
            <StyledTableWrapper>
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: 224 }}
                size="small"
                bordered={false}
              />
            </StyledTableWrapper>
          )}
        </StyledTextAssessment>
      </StyledAssessmentContent>
    </StyledContainer>
  );
};

export default CoreAbilityAssessment;
