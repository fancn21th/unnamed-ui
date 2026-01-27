import React from "react";
import { Button } from "antd";
import { StyledDeleteConfirmModal } from "./style";

interface DeleteConfirmModalProps {
  /** 可以由外部直接控制 Modal 组件挂载 */
  open?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open = true,
  onClose,
  onConfirm,
}) => {
  return (
    <StyledDeleteConfirmModal
      title="确认移除吗？"
      open={open}
      onCancel={onClose}
      closable
      width={416}
      centered
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" danger onClick={onConfirm}>
            删除
          </Button>
        </>
      }
    >
      <div className="modal-content">文档移除后，不可恢复，确认删除吗？</div>
    </StyledDeleteConfirmModal>
  );
};

export default DeleteConfirmModal;
