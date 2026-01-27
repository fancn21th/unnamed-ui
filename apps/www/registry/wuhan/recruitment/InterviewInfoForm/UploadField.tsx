import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { UploadProps, UploadFile } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { FormFieldConfig } from "./types";
import { renderFileIcon, validateFile } from "./utils";
import { StyledEmptyValue } from "./style";

export interface UploadFieldProps {
  /** 字段配置 */
  field: FormFieldConfig;
  /** 表单实例 */
  form: FormInstance;
  /** 是否只读模式 */
  readOnly?: boolean;
  /** 初始值 */
  initialValues?: Record<string, any>;
}

/**
 * 上传字段组件
 * 支持文件上传、文件列表管理、文件校验等功能
 */
const UploadField: React.FC<UploadFieldProps> = ({
  field,
  form,
  readOnly = false,
  initialValues,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 监听表单值变化
  const formValue = Form.useWatch(field.name, form);

  /**
   * 从多个数据源获取文件列表值
   */
  const getFileListValue = useCallback((): UploadFile[] => {
    const value =
      formValue ||
      initialValues?.[field.name] ||
      form.getFieldValue(field.name);
    if (!value) return [];

    if (Array.isArray(value)) {
      return value.length > 0 ? value : [];
    }

    // 如果值不是数组，转换为数组格式
    return [value];
  }, [formValue, initialValues, field.name, form]);

  /**
   * 同步文件列表到状态
   */
  useEffect(() => {
    if (readOnly) {
      const value = getFileListValue();
      setFileList(value);
    }
  }, [readOnly, getFileListValue]);

  /**
   * 非只读模式下同步表单值到文件列表
   */
  useEffect(() => {
    if (
      !readOnly &&
      formValue &&
      Array.isArray(formValue) &&
      formValue.length > 0
    ) {
      setFileList(formValue);
    }
  }, [formValue, readOnly]);

  /**
   * 文件上传前的验证
   */
  const beforeUpload = useCallback(
    (file: File): boolean => {
      const validation = validateFile(
        file,
        fileList,
        field.accept,
        field.maxSize,
        field.maxCount,
      );

      if (!validation.valid) {
        message.error(validation.error || "文件验证失败");
        return false;
      }

      return true;
    },
    [fileList, field.accept, field.maxSize, field.maxCount],
  );

  /**
   * 文件列表变化处理
   */
  const handleChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      const newFileList = info.fileList;
      setFileList(newFileList);

      // 检查是否有文件正在上传
      const isUploading = newFileList.some(
        (file) => file.status === "uploading",
      );
      setUploading(isUploading);

      // 更新表单值
      form.setFieldValue(field.name, newFileList);

      // 调用原有的 onChange（如果存在）
      // @ts-ignore
      if (field.uploadProps?.onChange) {
        // @ts-ignore
        field.uploadProps.onChange(info);
      }
    },
    [form, field.name, field.uploadProps],
  );

  /**
   * 删除文件处理
   */
  const handleRemove = useCallback(
    (file: UploadFile) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
      setUploading(false);
      handleChange({
        fileList: newFileList,
        file: file as any,
      } as UploadChangeParam<UploadFile>);
    },
    [fileList, handleChange],
  );

  /**
   * 本地上传处理（如果没有提供 customRequest）
   */
  const handleLocalUpload: UploadProps["customRequest"] = useCallback(
    // @ts-ignore
    async (options) => {
      const { file, onSuccess, onError, onProgress } = options;

      // 模拟上传进度
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        onProgress?.({ percent: progress });

        if (progress >= 100) {
          clearInterval(interval);
          try {
            // 本地上传：直接标记为成功
            onSuccess?.(null, file as any);
          } catch (error) {
            onError?.(error as Error);
          }
        }
      }, 200);
    },
    [],
  );

  /**
   * 合并 uploadProps
   */
  const uploadProps = useMemo<UploadProps>(
    () => ({
      ...field.uploadProps,
      fileList,
      onChange: handleChange,
      beforeUpload,
      accept: field.accept,
      maxCount: field.maxCount,
      customRequest: field.customRequest || handleLocalUpload,
      className: `upload-${field.name}`,
      showUploadList: false, // 完全隐藏 Upload 组件的文件列表，我们自己渲染
    }),
    [field, fileList, handleChange, beforeUpload, handleLocalUpload],
  );

  /**
   * 已完成的文件列表（用于显示）
   */
  const completedFileList = useMemo(
    () => fileList.filter((file) => file.status === "done" || !file.status),
    [fileList],
  );

  // 只读模式：只显示文件列表
  if (readOnly) {
    if (completedFileList.length === 0) {
      return <StyledEmptyValue>-</StyledEmptyValue>;
    }

    return (
      <div className={`upload-wrapper-${field.name} upload-wrapper-readonly`}>
        {completedFileList.map((file) => (
          <div key={file.uid} className={`upload-file-item-${field.name}`}>
            <span className="file-icon">{renderFileIcon(file.name)}</span>
            <span className="file-name" title={file.name}>
              {file.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 编辑模式：显示文件列表和上传按钮
  return (
    <div className={`upload-wrapper-${field.name}`}>
      {/* 文件列表显示在前面 */}
      {completedFileList.map((file) => (
        <div key={file.uid} className={`upload-file-item-${field.name}`}>
          <span className="file-icon">{renderFileIcon(file.name)}</span>
          <span className="file-name" title={file.name}>
            {file.name}
          </span>
          <CloseOutlined
            className="file-remove-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(file);
            }}
            aria-label={`删除文件 ${file.name}`}
          />
        </div>
      ))}
      {/* 上传按钮 */}
      <Upload {...uploadProps}>
        <Button
          className={`upload-button-${field.name}`}
          icon={<UploadOutlined />}
          loading={uploading}
          disabled={uploading}
          aria-label="上传文件"
        >
          上传文件
        </Button>
      </Upload>
    </div>
  );
};

export default UploadField;
