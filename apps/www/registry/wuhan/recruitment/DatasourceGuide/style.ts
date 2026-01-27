import styled from "styled-components";
import { Flex } from "antd";

export const StyledDatasourceGuide = styled(Flex)`
  background: linear-gradient(
    90deg,
    #eff7ff 0%,
    #f4f4ff 30%,
    #f8edff 60%,
    #fff2ff 100%
  );
  padding: 16px;
  border-radius: 12px;
  .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;
    width: 16px;
    height: 16px;
  }
  .desc {
    color: #414651;
    font-size: 14px;
  }
`;
