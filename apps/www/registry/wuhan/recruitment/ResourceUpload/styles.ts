import styled from "styled-components";
import BaseModal from "../BaseModal";
export const StyledUploadModal = styled(BaseModal)``;

export const StyledUploadWrapper = styled.div`
  .ant-upload {
    padding: 46px 80px;
  }
  .ant-upload-text {
    margin-bottom: 8px;
    font-size: 14px;
    .upload-click-text {
      color: #7b61ff;
    }
  }
  .ant-upload-hint {
    font-size: 12px;
    color: #535862;
  }
`;
