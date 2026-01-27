"use client";

import React from "react";
import RecruitmentJobTable from "../../../recruitment/RecruitmentJobTable";
import { message } from "antd";

export default function RecruitmentJobTableDemo() {
  const dataSource = [
    {
      requirementId: 1,
      name: "AI产品经理",
      requirementStatus: "10",
      relationJobs: ["高级产品经理"],
    },
    {
      requirementId: 2,
      name: "前端开发工程师",
      requirementStatus: "20",
      relationJobs: ["React 开发"],
    },
  ];

  const handleConfirm = (selected: any) => {
    if (!selected) {
      message.warning("请先选择一行数据");
      return;
    }
    message.success(`已选择：${selected.name}`);
  };

  return (
    <RecruitmentJobTable
      job_title="高级AI产品经理"
      dataSource={dataSource}
      onConfirm={handleConfirm}
    />
  );
}
