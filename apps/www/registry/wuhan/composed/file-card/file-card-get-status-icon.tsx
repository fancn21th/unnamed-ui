"use client";

import * as React from "react";
import {
  FileCardErrorIcon,
  type FileCardStatus,
} from "@/registry/wuhan/blocks/file-card/file-card-01";

/**
 * 根据状态获取图标
 * @public
 */
export function getStatusIcon(status: FileCardStatus): React.ReactNode {
  switch (status) {
    case "loading":
      return (
        <svg
          className="w-6 h-6 animate-spin text-[var(--Text-text-brand)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label="加载中"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    case "error":
      return (
        <FileCardErrorIcon className="w-6 h-6 text-[var(--Text-text-error)]" />
      );
    case "uploading":
      return (
        <svg
          className="w-6 h-6 animate-pulse text-[var(--Text-text-brand)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="img"
          aria-label="上传中"
        >
          <path
            fill="currentColor"
            d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-4v4H8v-4H4zm4-8v2h8V8l4 4-4 4v-2H8v-4h4z"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          className="w-6 h-6 text-[var(--Text-text-warning)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="img"
          aria-label="警告"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "success":
      return (
        <svg
          className="w-6 h-6 text-[var(--Text-text-success)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="img"
          aria-label="成功"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
}
