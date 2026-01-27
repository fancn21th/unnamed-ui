import React from "react";
import styled from "styled-components";
import {
  FileIcon,
  PDFFileIcon,
  WordFileIcon,
  MDFileIcon,
  HTMLFileIcon,
} from "../icons";
import type { UploadFile } from "antd";

/**
 * 文件类型映射
 */
export const FILE_ICON_MAP: Record<
  string,
  React.ComponentType<{ style?: React.CSSProperties }>
> = {
  pdf: PDFFileIcon,
  doc: WordFileIcon,
  docx: WordFileIcon,
  md: MDFileIcon,
  markdown: MDFileIcon,
  html: HTMLFileIcon,
  htm: HTMLFileIcon,
};

/**
 * 默认文件图标
 */
const DEFAULT_FILE_ICON = FileIcon;

/**
 * 根据文件扩展名获取文件图标组件
 * @param fileName 文件名
 * @returns 文件图标组件
 */
export const getFileIcon = (
  fileName: string,
): React.ComponentType<{ style?: React.CSSProperties }> => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return FILE_ICON_MAP[extension] || DEFAULT_FILE_ICON;
};

/**
 * 文件图标样式组件
 */
const StyledFileIcon = styled.div<{ $fontSize?: number }>`
  font-size: ${(props) => props.$fontSize || 14}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/**
 * 渲染文件图标
 * @param fileName 文件名
 * @param fontSize 字体大小（可选，默认 14）
 * @returns React 元素
 */
export const renderFileIcon = (
  fileName: string,
  fontSize: number = 14,
): React.ReactElement => {
  const IconComponent = getFileIcon(fileName);
  return (
    <StyledFileIcon $fontSize={fontSize}>
      <IconComponent />
    </StyledFileIcon>
  );
};

/**
 * 验证文件大小
 * @param file 文件对象
 * @param maxSize 最大大小（MB）
 * @returns 验证结果
 */
export const validateFileSize = (
  file: File,
  maxSize?: number,
): { valid: boolean; error?: string } => {
  if (!maxSize) return { valid: true };

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSize) {
    return {
      valid: false,
      error: `文件大小不能超过 ${maxSize}MB，当前文件大小为 ${fileSizeMB.toFixed(2)}MB`,
    };
  }

  return { valid: true };
};

/**
 * 验证文件类型
 * @param file 文件对象
 * @param accept 接受的文件类型（如 '.pdf,.doc,.docx'）
 * @returns 验证结果
 */
export const validateFileType = (
  file: File,
  accept?: string,
): { valid: boolean; error?: string } => {
  if (!accept) return { valid: true };

  const acceptedExtensions = accept
    .split(",")
    .map((ext) => ext.trim().replace(/^\./, "").toLowerCase())
    .filter(Boolean);

  if (acceptedExtensions.length === 0) return { valid: true };

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: `不支持的文件类型，仅支持：${acceptedExtensions.map((ext) => `.${ext}`).join(", ")}`,
    };
  }

  return { valid: true };
};

/**
 * 验证文件数量
 * @param currentCount 当前文件数量
 * @param maxCount 最大文件数量
 * @returns 验证结果
 */
export const validateFileCount = (
  currentCount: number,
  maxCount?: number,
): { valid: boolean; error?: string } => {
  if (!maxCount) return { valid: true };

  if (currentCount >= maxCount) {
    return {
      valid: false,
      error: `最多只能上传 ${maxCount} 个文件`,
    };
  }

  return { valid: true };
};

/**
 * 综合文件验证
 * @param file 文件对象
 * @param fileList 当前文件列表
 * @param accept 接受的文件类型
 * @param maxSize 最大文件大小（MB）
 * @param maxCount 最大文件数量
 * @returns 验证结果
 */
export const validateFile = (
  file: File,
  fileList: UploadFile[],
  accept?: string,
  maxSize?: number,
  maxCount?: number,
): { valid: boolean; error?: string } => {
  // 验证文件数量
  const countValidation = validateFileCount(fileList.length, maxCount);
  if (!countValidation.valid) {
    return countValidation;
  }

  // 验证文件类型
  const typeValidation = validateFileType(file, accept);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  // 验证文件大小
  const sizeValidation = validateFileSize(file, maxSize);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  return { valid: true };
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
