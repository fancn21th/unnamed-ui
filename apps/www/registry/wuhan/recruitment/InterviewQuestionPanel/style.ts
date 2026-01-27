import styled from "styled-components";

export const StyledInterviewQuestionPanel = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 24px;
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .panel-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .close-button {
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999999;

      &:hover {
        color: #333333;
      }
    }
  }

  .panel-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .question-item {
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    .question-title {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .ability-tags {
      font-size: 14px;
      color: #666666;
      margin-bottom: 8px;

      .ability-tags-text {
        color: #1a1a1a;
        font-weight: 500;
      }
    }

    .question-context {
      font-size: 12px;
      color: #999999;
      margin-bottom: 12px;
    }

    .follow-up-section {
      .follow-up-title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 8px;
      }

      .follow-up-questions {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .follow-up-item {
        font-size: 12px;
      }
    }
  }
`;
