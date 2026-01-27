"use client";

import React from "react";
import ReportCard from "../../../recruitment/ReportCard";
import { FileTextOutlined } from "@ant-design/icons";

export default function ReportCardDemo() {
  return (
    <ReportCard
      icon={<FileTextOutlined style={{ fontSize: 24, color: "#7B61FF" }} />}
      title="候选人评估报告"
      updateTime="更新时间：08-04 13:56"
    />
  );
}
