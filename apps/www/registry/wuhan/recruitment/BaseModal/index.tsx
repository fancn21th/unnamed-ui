/** 适配样式，透传 antd 的一切属性 */
import { Modal } from "antd";
import styled from "styled-components";
const BaseModal = (props: any) => {
  return <StyledBaseModal {...props}>{props.children}</StyledBaseModal>;
};

const StyledBaseModal = styled(Modal)`
  .ant-modal-container {
    padding: 20px 24px;
  }
  .ant-modal-header {
    margin-bottom: 20px;
  }
  .ant-modal-title {
    font-size: 18px;
    color: #1e1d26;
    font-weight: 500;
  }
  .ant-modal-header {
    padding: 0;
    margin-bottom: 24px;
  }
  .ant-modal-footer {
    padding: 0;
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .ant-btn {
    height: 32px;
    padding: 5px 16px;
    font-size: 14px;
  }
`;

export default BaseModal;
