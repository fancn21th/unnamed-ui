import styled from "styled-components";
import { Collapse, Flex } from "antd";

export const StyledThinkingCollapse = styled(Collapse)`
  background: #ffffff;
  border-radius: 8px;
  .ant-collapse-header {
    padding: 8px 12px !important;
  }
  .ant-collapse-panel {
    border-top: 0px !important;
  }
  .ant-collapse-body {
    padding: 0px 12px 8px 12px !important;
  }
`;

export const StyledThinkingHeader = styled(Flex)`
  user-select: none;
`;

export const StyledThinkingStatus = styled.div`
  background: linear-gradient(270deg, #0ba5ec 0%, #7b61ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 400;
  font-size: 14px;
`;
