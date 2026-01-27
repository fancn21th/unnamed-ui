import styled from "styled-components";

interface StyledReportCardContainerProps {
  $hasDetails?: boolean;
  $loading?: boolean;
}

export const StyledReportCardContainer = styled.div<StyledReportCardContainerProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$loading ? "center" : "flex-start")};
  align-items: flex-start;
  padding: 16px;
  gap: ${(props) => (props.$hasDetails ? "16px" : "10px")};
  width: ${(props) => (props.$loading ? "280px" : "352px")};
  min-height: ${(props) => (props.$hasDetails ? "172px" : "80px")};
  background: ${(props) =>
    props.$loading
      ? "linear-gradient(90deg, rgba(246, 245, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%), #ffffff"
      : "linear-gradient(90deg, #f6f5ff 0%, #ffffff 100%), #ffffff"};
  border: 1px solid #e9eaeb;
  border-radius: 16px;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  transition: all 0.2s ease;

  &:hover {
    ${(props) =>
      props.onClick &&
      `
      box-shadow: 0 2px 8px rgba(123, 97, 255, 0.1);
      border-color: #d9d9ff;
    `}
  }
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 16px;
  width: 100%;
  flex: none;
  align-self: stretch;
`;

interface StyledIconWrapperProps {
  $loading?: boolean;
}

export const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  //background: #eae5ff;
  opacity: ${(props) => (props.$loading ? 0.4 : 1)};
  transition: opacity 0.2s ease;

  /* 如果是 SVG 或图片，调整大小 */
  & > svg,
  & > img {
    width: 24px;
    height: 24px;
  }
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 6px;
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
`;

interface StyledTitleProps {
  $loading?: boolean;
}

export const StyledTitle = styled.div<StyledTitleProps>`
  width: 100%;
  font-family: "Source Han Sans SC", "PingFang SC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #181d27;
  opacity: ${(props) => (props.$loading ? 0.3 : 1)};
  transition: opacity 0.2s ease;
  flex: none;
  align-self: stretch;

  /* 文本溢出处理 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledUpdateTime = styled.div`
  width: 100%;
  font-family: "Source Han Sans SC", "PingFang SC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #a4a7ae;
  flex: none;
  align-self: stretch;
`;

export const StyledDetailSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0 0;
  width: 100%;
  border-top: 1px solid #e9eaeb;
  flex: none;
  align-self: stretch;
`;

export const StyledDetailItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 20px;
`;

export const StyledDetailLabel = styled.span`
  font-family: "PingFang SC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #a4a7ae;
`;

export const StyledDetailValue = styled.span`
  font-family: "PingFang SC", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #a4a7ae;
`;
