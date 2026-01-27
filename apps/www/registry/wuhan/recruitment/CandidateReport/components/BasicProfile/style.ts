import styled from "styled-components";

export const StyledBasicProfile = styled.div`
  width: 100%;
  background: #f0f7f6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #6155f5;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .profile-avatar {
    flex-shrink: 0;
    background: #e5f4ff;
  }

  .profile-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;

    gap: 8px;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .name {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .status-tag {
    margin: 0;
    border-radius: 4px;
  }

  .details-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666666;
    flex-wrap: wrap;

    .separator {
      color: #d9d9d9;
    }
  }

  .experience-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #f0f0f0;
  }

  .experience-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .experience-icon {
    flex-shrink: 0;
    color: #4c56f6;
    font-size: 12px;
    margin-top: 4px;
  }

  .experience-text {
    flex: 1;
    font-size: 14px;
    color: #666666;
    line-height: 1.6;
  }
`;
