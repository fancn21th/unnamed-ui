"use client";

import React from "react";
import InterviewProcessTable from "../../../recruitment/InterviewProcessTable";

export default function InterviewProcessTableDemo() {
  const dataSource = [
    {
      num: 1,
      name: "张三",
      result: "值得进入下一轮",
      matchDegree: "85%",
      resumeReport: "report1",
    },
    {
      num: 2,
      name: "李四",
      result: "不建议进入下一轮",
      matchDegree: "60%",
      resumeReport: "report2",
    },
  ];

  return (
    <InterviewProcessTable
      title="面试简历：AI产品经理"
      dataSource={dataSource}
    />
  );
}
