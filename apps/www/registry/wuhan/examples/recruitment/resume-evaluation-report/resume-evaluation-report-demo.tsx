"use client";

import React from "react";
import ResumeEvaluationReport from "../../../recruitment/ResumeEvaluationReport";

export default function ResumeEvaluationReportDemo() {
  const mockData = {
    candidateName: "张三",
    overallMatch: {
      stars: 4,
      percentage: 85,
      conclusion: "recommended" as const,
      description: "该候选人综合素质优秀，推荐进入面试环节",
    },
    matchDetails: [
      {
        type: "skill" as const,
        percentage: 90,
        description: "技能匹配度高",
      },
      {
        type: "experience" as const,
        percentage: 80,
        description: "工作经验符合要求",
      },
    ],
    advantages: ["技术能力强", "项目经验丰富"],
    concerns: ["期望薪资偏高"],
  };

  return <ResumeEvaluationReport source={mockData} />;
}
