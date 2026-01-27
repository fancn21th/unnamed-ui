import styled from "styled-components";
import { Rate } from "antd";

export const StyledOverallMatchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledStarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledMatchLabel = styled.span`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #27272a;
`;

export const StyledRate = styled(Rate)`
  .ant-rate-star {
    font-size: 20px;
    color: #ffc53d;
    margin-right: 4px;
  }
`;

export const StyledMatchInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const StyledPercentageContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const StyledPercentageLabel = styled.span`
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #6155f5;
`;

export const StyledPercentageValue = styled.span`
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #6155f5;
`;

export const StyledConclusion = styled.div<{ $isRecommended?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #6155f5;
`;

export const StyledConclusionLabel = styled.span`
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #6155f5;
`;

export const StyledConclusionText = styled.span<{ $isRecommended?: boolean }>`
  font-weight: ${({ $isRecommended }) => ($isRecommended ? 600 : 500)};
  color: ${({ $isRecommended }) => ($isRecommended ? "#12b76a" : "#666666")};
`;

export const StyledDescription = styled.div`
  font-size: 14px;
  color: #27272a;
  line-height: 22px;
`;
