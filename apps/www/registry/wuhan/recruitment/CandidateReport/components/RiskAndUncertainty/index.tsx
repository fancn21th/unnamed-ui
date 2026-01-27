import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import styled from "styled-components";
import type { RiskAndUncertaintyData } from "../../index";
import {
  StyledMainContainer,
  StyledCardContainer,
  StyledSectionTitle,
  StyledCardTitleRow,
  StyledTitleBar,
  StyledSubTitle,
  StyledNumberIcon,
  StyledBodyText,
  StyledInterviewerComment,
  StyledDetailItem,
  StyledLabel,
  StyledFlexColumn,
} from "../common";

export interface RiskAndUncertaintyProps {
  data: RiskAndUncertaintyData;
}

// 主容器 - 蓝色背景
const StyledRiskContainer = styled(StyledMainContainer)`
  background: #edf4ff;
`;

// 内容块容器
const StyledBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 卡片网格容器
const StyledCardsGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
`;

// 风险卡片
const StyledRiskCard = styled(StyledCardContainer)`
  flex: 1;
  min-width: 244px;
  width: 244px;
  gap: 12px;
`;

// 卡片标题行
const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

// 卡片标题文本容器
const StyledCardTitleText = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

// 警告图标容器
const StyledWarningIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background: #ff9800;
  border-radius: 50%;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 12px;
`;

// Plus 图标
const StyledPlusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background: #0597ff;
  box-shadow: inset -2px -3px 3px rgba(2, 255, 255, 0.7);
  border-radius: 50%;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  font-weight: 600;
  margin-top: 6px;
`;

// 风险等级内联文本
const StyledRiskLevelInline = styled.span<{
  level?: "high" | "medium" | "low";
}>`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${(props) => {
    switch (props.level) {
      case "high":
        return "#F59E0B";
      case "medium":
        return "#0EA5E9";
      case "low":
        return "#06BA7E";
      default:
        return "#0EA5E9";
    }
  }};
`;

// 详情文本容器
const StyledDetailTextWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

// 风险与不确定性组件
const RiskAndUncertainty: React.FC<RiskAndUncertaintyProps> = ({ data }) => {
  const { risks = [], uncertainties = [] } = data || {};

  return (
    <StyledRiskContainer>
      <StyledSectionTitle>风险与不确定性</StyledSectionTitle>

      {/* 已识别风险部分 */}
      <StyledBlockContainer>
        <StyledCardTitleRow>
          <StyledTitleBar />
          <StyledSubTitle>已识别风险</StyledSubTitle>
        </StyledCardTitleRow>

        <StyledCardsGrid>
          {risks.map((risk, index) => (
            <StyledRiskCard key={risk.id || index}>
              <StyledFlexColumn gap={12}>
                <StyledCardHeader>
                  {risk.iconType === "warning" ? (
                    <StyledWarningIcon>
                      <WarningOutlined />
                    </StyledWarningIcon>
                  ) : (
                    <StyledNumberIcon>{risk.number}</StyledNumberIcon>
                  )}

                  <StyledCardTitleText>
                    <StyledSubTitle>
                      {risk.title}
                      {risk.riskLevel && (
                        <>
                          ：
                          <StyledRiskLevelInline level={risk?.riskLevelType}>
                            {risk.riskLevel}
                          </StyledRiskLevelInline>
                        </>
                      )}
                    </StyledSubTitle>
                  </StyledCardTitleText>
                </StyledCardHeader>

                <StyledBodyText>{risk.description}</StyledBodyText>

                {risk.interviewerComment && (
                  <StyledInterviewerComment>
                    面试官{risk.interviewerComment.name}："
                    {risk.interviewerComment.comment}"
                  </StyledInterviewerComment>
                )}
              </StyledFlexColumn>
            </StyledRiskCard>
          ))}
        </StyledCardsGrid>
      </StyledBlockContainer>

      {/* 不确定性因素部分 */}
      <StyledBlockContainer>
        <StyledCardTitleRow>
          <StyledTitleBar />
          <StyledSubTitle>不确定性因素</StyledSubTitle>
        </StyledCardTitleRow>

        <StyledCardsGrid>
          {uncertainties.map((uncertainty, index) => (
            <StyledRiskCard key={uncertainty.id || index}>
              <StyledFlexColumn gap={12}>
                <StyledCardHeader>
                  <StyledNumberIcon>{uncertainty.number}</StyledNumberIcon>
                  <StyledCardTitleText>
                    <StyledSubTitle>{uncertainty.title}</StyledSubTitle>
                  </StyledCardTitleText>
                </StyledCardHeader>

                <StyledBodyText>{uncertainty.description}</StyledBodyText>

                {uncertainty.reason && (
                  <StyledDetailItem>
                    <StyledPlusIcon>+</StyledPlusIcon>
                    <StyledDetailTextWrapper>
                      <StyledLabel>产生原因：</StyledLabel>
                      <StyledBodyText as="span">
                        {uncertainty.reason}
                      </StyledBodyText>
                    </StyledDetailTextWrapper>
                  </StyledDetailItem>
                )}

                {uncertainty.impact && (
                  <StyledDetailItem>
                    <StyledPlusIcon>+</StyledPlusIcon>
                    <StyledDetailTextWrapper>
                      <StyledLabel>潜在影响：</StyledLabel>
                      <StyledBodyText as="span">
                        {uncertainty.impact}
                      </StyledBodyText>
                    </StyledDetailTextWrapper>
                  </StyledDetailItem>
                )}
              </StyledFlexColumn>
            </StyledRiskCard>
          ))}
        </StyledCardsGrid>
      </StyledBlockContainer>
    </StyledRiskContainer>
  );
};

export default RiskAndUncertainty;
