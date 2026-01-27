"use client";

import React, { useState } from "react";
import { Button } from "antd";
import RepeatFileModal from "../../../recruitment/RepeatFileModal";
import type { DuplicateFileInfo } from "../../../recruitment/RepeatFileModal";

export default function RepeatFileModalDemo() {
  const [visible, setVisible] = useState(false);
  const [files] = useState<DuplicateFileInfo[]>([
    { fileName: "招聘计划.pdf", reason: "MD5 冲突" },
    { fileName: "面试题库.docx", reason: "文件名已存在" },
  ]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        显示重复文件提示
      </Button>
      <RepeatFileModal
        open={visible}
        files={files}
        onCancel={() => setVisible(false)}
        onSkip={() => setVisible(false)}
      />
    </>
  );
}
