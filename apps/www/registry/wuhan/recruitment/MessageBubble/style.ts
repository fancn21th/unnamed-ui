import styled from "styled-components";

// 样式常量
const MESSAGE_GAP = "24px";
const AVATAR_GAP = "8px";

export const StyledMessageBubbleContainer = styled.div<{
  $placement: "start" | "end";
  $role?: "user" | "assistant";
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.$placement === "end" ? "flex-end" : "flex-start"};
  width: 100%;
  gap: ${MESSAGE_GAP};

  .avatar-wrapper {
    display: flex;
    align-items: center;
    gap: ${AVATAR_GAP};
    width: 100%;
    flex-direction: ${(props) =>
      props.$placement === "end" ? "row-reverse" : "row"};
  }

  .bubble-wrapper {
    display: flex;
    align-items: flex-start;
    max-width: calc(100% - 48px);
  }

  .time-wrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;

export const StyledTime = styled.div`
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0;
  color: #403f4d;
`;
