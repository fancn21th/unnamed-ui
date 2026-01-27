import React from "react";
import styled from "styled-components";
import type { CostBenefitAssessmentData } from "../../index";
import {
  StyledMainContainer,
  StyledCardContainer,
  StyledSectionTitle,
  StyledCardTitleRow,
  StyledTitleBar,
  StyledSubTitle,
  StyledFlexColumn,
  StyledLabel,
  StyledBodyText,
} from "../common";

export interface CostBenefitAssessmentProps {
  data: CostBenefitAssessmentData;
}

// 主容器 - 紫色背景
const StyledCostContainer = styled(StyledMainContainer)`
  background: #efeefe;
`;

// 区块容器
const StyledBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 评级盒子 - 绿色背景
const StyledRatingBox = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  background: #06ba7e;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  flex-shrink: 0;
`;

// 描述文本容器
const StyledDescriptionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

// 描述文本
const StyledDescriptionText = styled.span`
  font-size: 14px;
  color: #344054;
  line-height: 22px;
`;

// 内容项标签
const StyledItemLabel = styled(StyledLabel)``;

// 内容项容器
const StyledContentItem = styled(StyledFlexColumn)`
  gap: 12px;
`;

// 薪资信息容器
const StyledSalaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #fafafa;
  border-radius: 4px;
`;

// 薪资项
const StyledSalaryItem = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;

// 薪资标签
const StyledSalaryLabel = styled.span`
  color: #333333;
`;

// 薪资值
const StyledSalaryValue = styled.span`
  color: #1a1a1a;
  font-weight: 600;
`;

// 详情项容器
const StyledDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  margin-top: 8px;
`;

// Plus 图标
const StyledPlusIcon = styled.div`
  flex-shrink: 0;
  color: #fff;
  margin-top: 2px;
  background: #0597ff;
  box-shadow: -2px -3px 3px 0px #02ffffb2 inset;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
`;

// 详情标签
const StyledDetailLabel = styled.span`
  color: #333333;
  font-weight: 500;
`;

// 详情文本
const StyledDetailText = styled.span`
  color: #666666;
  flex: 1;
`;

// 成本与性价比评估组件
const CostBenefitAssessment: React.FC<CostBenefitAssessmentProps> = ({
  data,
}) => {
  const {
    overallRating,
    overallDescription,
    recommendations,
    positionSalaryRange,
    expectedSalary,
    costPressure,
    hiddenCosts,
    shortTermValue,
    recruitmentGoalSupport,
  } = data || {};

  return (
    <StyledCostContainer>
      <StyledSectionTitle>成本与性价比评估</StyledSectionTitle>

      {/* 综合性价比部分 */}
      <StyledBlockContainer>
        <StyledCardTitleRow>
          <StyledTitleBar />
          <StyledSubTitle>综合性价比</StyledSubTitle>
        </StyledCardTitleRow>

        <StyledCardContainer>
          <StyledFlexColumn gap={12}>
            <StyledDescriptionWrapper>
              <StyledRatingBox>{overallRating}</StyledRatingBox>
              <StyledDescriptionText>
                {overallDescription}
              </StyledDescriptionText>
            </StyledDescriptionWrapper>

            <StyledContentItem>
              <StyledItemLabel>决策建议：</StyledItemLabel>
              <StyledFlexColumn gap={8}>
                {recommendations &&
                  recommendations.length > 0 &&
                  recommendations.map((recommendation, index) => (
                    <StyledDetailItem key={index}>
                      <StyledPlusIcon>+</StyledPlusIcon>
                      <StyledDetailText>{recommendation}</StyledDetailText>
                    </StyledDetailItem>
                  ))}
              </StyledFlexColumn>
            </StyledContentItem>
          </StyledFlexColumn>
        </StyledCardContainer>
      </StyledBlockContainer>

      {/* 直接成本评估部分 */}
      <StyledBlockContainer>
        <StyledCardTitleRow>
          <StyledTitleBar />
          <StyledSubTitle>直接成本评估</StyledSubTitle>
        </StyledCardTitleRow>

        <StyledCardContainer>
          <StyledFlexColumn gap={12}>
            <StyledSalaryInfo>
              <StyledSalaryItem>
                <StyledSalaryLabel>岗位薪资区间：</StyledSalaryLabel>
                <StyledSalaryValue>{positionSalaryRange}</StyledSalaryValue>
              </StyledSalaryItem>
              <StyledSalaryItem>
                <StyledSalaryLabel>期望薪资：</StyledSalaryLabel>
                <StyledSalaryValue>{expectedSalary}</StyledSalaryValue>
              </StyledSalaryItem>
            </StyledSalaryInfo>

            {costPressure && (
              <StyledDetailItem>
                <StyledPlusIcon>+</StyledPlusIcon>
                <StyledDetailLabel>成本压力：</StyledDetailLabel>
                <StyledDetailText>{costPressure}</StyledDetailText>
              </StyledDetailItem>
            )}

            {hiddenCosts && (
              <StyledDetailItem>
                <StyledPlusIcon>+</StyledPlusIcon>
                <StyledDetailLabel>隐性成本：</StyledDetailLabel>
                <StyledDetailText>{hiddenCosts}</StyledDetailText>
              </StyledDetailItem>
            )}
          </StyledFlexColumn>
        </StyledCardContainer>
      </StyledBlockContainer>

      {/* 价值评估部分 */}
      <StyledBlockContainer>
        <StyledCardTitleRow>
          <StyledTitleBar />
          <StyledSubTitle>价值评估</StyledSubTitle>
        </StyledCardTitleRow>

        <StyledCardContainer>
          <StyledFlexColumn gap={12}>
            {shortTermValue && (
              <StyledDetailItem>
                <StyledPlusIcon>+</StyledPlusIcon>
                <StyledDetailLabel>短期可交付价值：</StyledDetailLabel>
                <StyledDetailText>{shortTermValue}</StyledDetailText>
              </StyledDetailItem>
            )}

            {recruitmentGoalSupport && (
              <StyledDetailItem>
                <StyledPlusIcon>+</StyledPlusIcon>
                <StyledDetailLabel>对招聘目标的支持度：</StyledDetailLabel>
                <StyledDetailText>{recruitmentGoalSupport}</StyledDetailText>
              </StyledDetailItem>
            )}
          </StyledFlexColumn>
        </StyledCardContainer>
      </StyledBlockContainer>
    </StyledCostContainer>
  );
};

export default CostBenefitAssessment;
