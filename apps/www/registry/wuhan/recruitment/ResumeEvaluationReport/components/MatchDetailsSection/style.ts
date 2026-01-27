import styled from "styled-components";
import { Progress } from "antd";
import { cssVar } from "../../../utils/cssVar";

export const StyledMatchDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledMatchItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledMatchItemHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const StyledMatchItemTitle = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #27272a;
`;

export const StyledMatchItemPercentage = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #27272a;
`;

export const StyledProgress = styled(Progress)`
  .ant-progress-bg {
    background: ${cssVar("blue-03")};
  }
`;

export const StyledMatchItemDescription = styled.div`
  font-size: 13px;
  color: #999999;
  line-height: 1.6;
`;
