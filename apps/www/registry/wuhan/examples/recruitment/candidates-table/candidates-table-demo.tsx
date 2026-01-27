"use client";

import React from "react";
import CandidatesTable, {
  CandidateData,
} from "../../../recruitment/CandidatesTable";
import { message } from "antd";

export default function CandidatesTableDemo() {
  const candidateData = [
    {
      name: "张三",
      age: 28,
      totalWorkYears: 5,
      relatedWorkYears: 3,
      highestEducation: "本科",
      graduatedSchool: "北京大学",
      expectedSalary: "20-25K",
      reportId: "report_001",
    },
    {
      name: "李四",
      age: 32,
      totalWorkYears: 8,
      relatedWorkYears: 6,
      highestEducation: "硕士",
      graduatedSchool: "清华大学",
      expectedSalary: "30-35K",
      reportId: "report_002",
    },
    {
      name: "王五",
      age: 26,
      totalWorkYears: 3,
      relatedWorkYears: 2,
      highestEducation: "本科",
      graduatedSchool: "复旦大学",
      expectedSalary: "15-20K",
      reportId: "report_003",
    },
    {
      name: "刘六",
      age: 33,
      totalWorkYears: 10,
      relatedWorkYears: 8,
      highestEducation: "本科",
      graduatedSchool: "德克萨斯州立大学",
      expectedSalary: "40-50K",
      reportId: "report_004",
    },
  ];

  const handleViewReport = (
    reportId?: string,
    candidateData?: CandidateData,
    index?: number,
  ) => {
    message.success(
      `查看候选人 ${candidateData?.name || ""} 的评估报告，报告 ID: ${reportId}，索引: ${index}`,
    );
    console.log("候选人数据:", candidateData);
  };

  return (
    <CandidatesTable
      candidateData={candidateData}
      onViewReport={handleViewReport}
    />
  );
}
