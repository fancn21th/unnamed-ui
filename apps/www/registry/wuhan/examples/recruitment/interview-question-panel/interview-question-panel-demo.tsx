"use client";

import React from "react";
import InterviewQuestionPanel from "../../../recruitment/InterviewQuestionPanel";

export default function InterviewQuestionPanelDemo() {
  const source = {
    title: "面试题_第一轮面试_张三",
    questions: [
      {
        id: "1",
        type: "经验深挖",
        queryId: "query001",
        abilityTags: [{ label: "项目管理" }, { label: "团队协作" }],
        context: "基于候选人提到的AI产品项目经验",
        followUpQuestions: [
          { content: "项目中遇到的最大挑战是什么？" },
          { content: "如何协调不同团队的需求？" },
        ],
      },
    ],
  };

  return <InterviewQuestionPanel source={source} />;
}
