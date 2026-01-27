import styled from "styled-components";
import BaseModal from "../BaseModal";

export const StyledRepeatFileModal = styled(BaseModal)`
  .modal-content {
    .hint-text {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  .ant-modal-footer {
    padding: 0;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
`;

export const StyledFileList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  .file-item {
    display: flex;
    align-items: center;
    border: 1px solid #e9eaeb;
    border-radius: 8px;
    padding: 8px 12px;

    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      overflow: hidden;

      .file-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }

      .file-name {
        color: #252b37;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
