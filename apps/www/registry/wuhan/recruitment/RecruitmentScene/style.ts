import styled from "styled-components";

export const StyledRecruitmentSceneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledSceneHeader = styled.div`
  color: #9e9faa;
  font-size: 12px;
  line-height: 20px;
`;

export const StyledRecruitmentScene = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  .scene-card {
    border: 1px solid #e9eaeb;
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }

  .scene-title {
    font-size: 14px;
    color: #414651;
    line-height: 1.5;
  }
`;
