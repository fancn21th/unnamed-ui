"use client";

import * as React from "react";
import {
  Upload as UploadIcon,
  Loader2,
  X,
  FileX,
  FileText,
} from "lucide-react";
import {
  UploadContainerPrimitive,
  UploadTriggerPrimitive,
  UploadInputPrimitive,
  UploadFileListPrimitive,
  UploadFileItemPrimitive,
  UploadFileIconPrimitive,
  UploadFileNamePrimitive,
  // UploadFileSizePrimitive,
  UploadFileRemovePrimitive,
  UploadFileErrorPrimitive,
  type UploadStatus,
} from "@/registry/wuhan/blocks/upload/upload-01";
import { Button } from "@/registry/wuhan/composed/block-button/block-button";

// ==================== 类型定义 ====================

export type { UploadStatus };

export interface UploadFile {
  /**
   * 文件唯一标识
   */
  uid: string;
  /**
   * 文件对象
   */
  file: File;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件大小（字节）
   */
  size: number;
  /**
   * 文件类型
   */
  type: string;
  /**
   * 上传状态
   */
  status: UploadStatus;
  /**
   * 上传进度（0-100）
   */
  progress?: number;
  /**
   * 错误信息
   */
  error?: string;
  /**
   * 响应数据
   */
  response?: any;
}

export interface UploadProps {
  /**
   * 文件列表（受控模式）
   */
  fileList?: UploadFile[];
  /**
   * 默认文件列表（非受控模式）
   */
  defaultFileList?: UploadFile[];
  /**
   * 是否支持多文件上传
   * @default false
   */
  multiple?: boolean;
  /**
   * 接受的文件类型，例如: "image/*" 或 ".jpg,.png"
   */
  accept?: string;
  /**
   * 文件大小限制（字节），例如: 5 * 1024 * 1024 (5MB)
   */
  maxSize?: number;
  /**
   * 最大文件数量
   */
  maxCount?: number;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 上传按钮文本
   * @default "上传文件"
   */
  buttonText?: string;
  /**
   * 文件选择时的回调
   */
  onSelect?: (files: File[]) => void;
  /**
   * 文件列表变化时的回调
   */
  onChange?: (fileList: UploadFile[]) => void;
  /**
   * 删除文件时的回调
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 自定义上传请求
   * 返回 Promise，resolve 时传入响应数据，reject 时传入错误信息
   */
  customRequest?: (file: File) => Promise<any>;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义文件列表渲染
   */
  itemRender?: (
    file: UploadFile,
    defaultRender: React.ReactNode,
  ) => React.ReactNode;
}

// ==================== Upload 组件 ====================

export const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      fileList: controlledFileList,
      defaultFileList = [],
      multiple = false,
      accept,
      maxSize,
      maxCount,
      disabled = false,
      buttonText = "上传文件",
      onSelect,
      onChange,
      onRemove,
      customRequest,
      className,
      itemRender,
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // 内部状态管理（支持受控和非受控模式）
    const [internalFileList, setInternalFileList] =
      React.useState<UploadFile[]>(defaultFileList);

    const isControlled = controlledFileList !== undefined;
    const fileList = isControlled ? controlledFileList : internalFileList;

    // 更新文件列表
    const updateFileList = React.useCallback(
      (newFileList: UploadFile[]) => {
        if (!isControlled) {
          setInternalFileList(newFileList);
        }
        onChange?.(newFileList);
      },
      [isControlled, onChange],
    );

    // 点击上传按钮
    const handleButtonClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    // 文件选择
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      // 触发 onSelect 回调
      onSelect?.(files);

      // 检查文件数量限制
      if (maxCount && fileList.length + files.length > maxCount) {
        console.warn(`最多只能上传 ${maxCount} 个文件`);
        return;
      }

      // 创建文件对象
      const newFiles: UploadFile[] = files.map((file) => {
        // 检查文件大小
        let status: UploadStatus = "idle";
        let error: string | undefined;

        if (maxSize && file.size > maxSize) {
          status = "error";
          error = `文件大小不能超过 ${formatFileSize(maxSize)}`;
        }

        return {
          uid: generateUid(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status,
          error,
        };
      });

      // 更新文件列表
      const updatedFileList = [...fileList, ...newFiles];
      updateFileList(updatedFileList);

      // 如果提供了自定义上传函数，自动触发上传
      if (customRequest) {
        newFiles.forEach((uploadFile) => {
          if (uploadFile.status === "error") return; // 跳过验证失败的文件

          handleUpload(uploadFile);
        });
      }

      // 清空 input 值，允许重复选择同一文件
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    // 执行上传
    const handleUpload = async (uploadFile: UploadFile) => {
      if (!customRequest) return;

      // 更新状态为上传中
      updateFileStatus(uploadFile.uid, "uploading");

      try {
        const response = await customRequest(uploadFile.file);

        // 更新状态为成功
        updateFileStatus(uploadFile.uid, "success", undefined, response);
      } catch (error) {
        // 更新状态为失败
        const errorMessage =
          error instanceof Error ? error.message : "上传失败";
        updateFileStatus(uploadFile.uid, "error", errorMessage);
      }
    };

    // 更新文件状态
    const updateFileStatus = (
      uid: string,
      status: UploadStatus,
      error?: string,
      response?: any,
    ) => {
      const updatedFileList = fileList.map((file) =>
        file.uid === uid ? { ...file, status, error, response } : file,
      );
      updateFileList(updatedFileList);
    };

    // 删除文件
    const handleRemove = (uploadFile: UploadFile) => {
      onRemove?.(uploadFile);

      const updatedFileList = fileList.filter(
        (file) => file.uid !== uploadFile.uid,
      );
      updateFileList(updatedFileList);
    };

    // 渲染文件图标
    const renderFileIcon = (status: UploadStatus) => {
      switch (status) {
        case "uploading":
          return <Loader2 className="h-4 w-4 animate-spin" />;
        case "error":
          return <FileX className="h-4 w-4" />;
        default:
          return <FileText className="h-4 w-4 text-[var(--text-secondary)]" />;
      }
    };

    // 渲染默认文件项
    const renderDefaultFileItem = (uploadFile: UploadFile) => (
      <UploadFileItemPrimitive key={uploadFile.uid} status={uploadFile.status}>
        <UploadFileIconPrimitive status={uploadFile.status}>
          {renderFileIcon(uploadFile.status)}
        </UploadFileIconPrimitive>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <UploadFileNamePrimitive>{uploadFile.name}</UploadFileNamePrimitive>
            {/* <UploadFileSizePrimitive>
              {formatFileSize(uploadFile.size)}
            </UploadFileSizePrimitive> */}
          </div>

          {uploadFile.error && (
            <UploadFileErrorPrimitive>
              {uploadFile.error}
            </UploadFileErrorPrimitive>
          )}
        </div>

        <UploadFileRemovePrimitive
          onClick={() => handleRemove(uploadFile)}
          aria-label="删除文件"
        >
          <X className="h-4 w-4" />
        </UploadFileRemovePrimitive>
      </UploadFileItemPrimitive>
    );

    return (
      <UploadContainerPrimitive ref={ref} className={className}>
        <UploadTriggerPrimitive disabled={disabled}>
          <Button
            onClick={handleButtonClick}
            disabled={disabled}
            icon={UploadIcon}
            variant="outline"
            color="secondary"
          >
            {buttonText}
          </Button>

          <UploadInputPrimitive
            ref={inputRef}
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </UploadTriggerPrimitive>

        {fileList.length > 0 && (
          <UploadFileListPrimitive>
            {fileList.map((file) => {
              const defaultRender = renderDefaultFileItem(file);
              return itemRender
                ? itemRender(file, defaultRender)
                : defaultRender;
            })}
          </UploadFileListPrimitive>
        )}
      </UploadContainerPrimitive>
    );
  },
);

Upload.displayName = "Upload";

// ==================== 工具函数 ====================

/**
 * 格式化文件大小
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * 生成唯一ID
 */
function generateUid(): string {
  return `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
