"use client";

import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { StyledUploadWrapper, StyledUploadModal } from "./styles";

const { Dragger } = Upload;

interface ResourceUploadProps {
  visible?: boolean;
  onClose?: () => void;
  onUpload?: (file: File) => Promise<void> | void;
  maxSize?: number;
  maxCount?: number;
  accept?: string;
}

const ResourceUpload: React.FC<ResourceUploadProps> = ({
  visible: externalVisible,
  onClose: externalOnClose,
  onUpload,
  maxSize = 20,
  maxCount = 20,
  accept = ".txt,.md,.pdf,.doc,.docx,.jpg,.jpeg,.png",
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 如果外部传入了 visible 和 onClose，使用外部控制；否则使用内部状态
  const visible =
    externalVisible !== undefined ? externalVisible : internalVisible;
  const handleClose = externalOnClose || (() => setInternalVisible(false));

  /**
   * 文件上传前的验证逻辑
   * - 验证文件大小
   * - 验证文件数量
   * - 验证通过后立即调用外部的 onUpload 方法
   */
  const handleBeforeUpload = async (file: File, fileListToUpload: File[]) => {
    // 验证文件大小
    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`文件 ${file.name} 大小不能超过 ${maxSize}MB!`);
      return Upload.LIST_IGNORE; // 忽略该文件，不添加到列表
    }

    // 验证文件数量（包括已选择的文件）
    const totalCount = fileList.length + fileListToUpload.length;
    if (totalCount > maxCount) {
      message.error(`单次最多上传 ${maxCount} 个文件!`);
      return Upload.LIST_IGNORE;
    }

    // 验证通过，立即调用外部上传方法
    if (onUpload) {
      try {
        await onUpload(file);
        message.success(`${file.name} 上传成功`);
      } catch (error) {
        // 其他错误正常处理
        message.error(
          `${file.name} 上传失败: ${error instanceof Error ? error.message : "未知错误"}`,
        );
        return Upload.LIST_IGNORE;
      }
    }

    // 阻止 antd 的默认上传行为，在 onUpload 中处理了
    return false;
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    fileList,
    accept,
    beforeUpload: handleBeforeUpload,
    onChange: (info) => {
      // 更新文件列表状态
      setFileList(info.fileList);
    },
    onRemove: (file) => {
      // 从列表中移除文件
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
  };

  const handleCancel = () => {
    setFileList([]);
    handleClose();
  };

  return (
    <>
      {/* 如果没有外部控制，显示触发按钮 */}
      {externalVisible === undefined && (
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setInternalVisible(true)}
        >
          打开上传弹窗
        </Button>
      )}

      <StyledUploadModal
        title="添加来源"
        open={visible}
        centered
        width={600}
        footer={null}
        closable
        onCancel={handleCancel}
      >
        <StyledUploadWrapper>
          <Dragger {...uploadProps}>
            <div className="ant-upload-text">
              拖拽文件到这里，或者
              <span className="upload-click-text">点击此处选择文件</span>
            </div>
            <div className="ant-upload-hint">
              支持格式：txt、markdown、pdf、doc、docx、jpg、jpeg、png{" "}
            </div>
            <div className="ant-upload-hint">
              （每份文档大小不超过{maxSize}MB，单次最多上传{maxCount}个文档）
            </div>
          </Dragger>
        </StyledUploadWrapper>
      </StyledUploadModal>
    </>
  );
};

export default ResourceUpload;
