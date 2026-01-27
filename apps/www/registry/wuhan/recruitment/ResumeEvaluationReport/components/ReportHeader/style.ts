import styled from "styled-components";
import { Button } from "antd";

export const StyledReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCandidateName = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #181d27;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const StyledCloseButton = styled(Button)`
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #252b37;

  &:hover {
    color: #333333;
  }
`;
