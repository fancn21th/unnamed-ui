import styled from "styled-components";
import { Progress, Button } from "antd";
import { cssVar } from "../../../utils/cssVar";

export const StyledIntroductionRisk = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #6b7280;
`;

export const StyledProgress = styled(Progress)`
  width: 120px;
  .ant-progress-bg {
    background: ${cssVar("blue-03")};
  }
  .process-indicator {
    color: #fff !important;
    font-size: 12px;
    font-weight: 600;
  }
`;

export const StyledDescriptionText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0%;
  color: #27272a;
`;

export const StyledIntroductionStatusLabel = styled.div`
  border: 1px solid #ffb987;
  height: 18px;
  padding: 2px 4px;
  gap: 8px;
  border-radius: 3px;
  font-family: Font-family/font family-CN;
  font-weight: 600;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  box-sizing: border-box;

  &.risk {
    border: 1px solid #ffb987;
    color: #ffb987;
  }
`;

export const StyledIntroductionDetailButton = styled(Button)`
  font-size: 14px;
  padding: 0;
  color: #4c56f6;
`;
