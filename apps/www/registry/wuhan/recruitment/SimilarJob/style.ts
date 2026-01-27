import { styled } from "styled-components";

export const StyledSimilarJob = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;

  .similar-job-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    flex: none;
    order: 0;
    flex-grow: 1;
    transition: all 0.2s ease-in-out;

    /* hover 效果增强用户体验 */
    &:hover {
      background: #f0f2f5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 14px;
      color: #71717d;
      line-height: 20px;

      .icon-fullscreen {
        font-size: 14px;
        color: #8c8c8c;
        cursor: pointer;
        transition: color 0.2s ease-in-out;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .title {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 500;
      color: #27272a;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .desc {
      margin-top: 8px;
      font-size: 12px;
      color: #71717d;
      line-height: 20px;
      width: 100%;
      flex: 1;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      word-break: break-word;
    }
  }
`;
