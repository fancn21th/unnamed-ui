"use client";

import React from "react";
import WorkResultList, {
  type WorkResultListSource,
} from "../../../recruitment/WorkResultList";

export default function WorkResultListDemo() {
  const source: WorkResultListSource = {
    title: "工作结果",
    items: [
      {
        id: "1",
        title: "项目报告文档",
        sourceCount: 3,
        updateTime: "1分钟前",
        iconType: "document",
      },
      {
        id: "2",
        title: "数据分析图表",
        sourceCount: 5,
        updateTime: "2小时前",
        iconType: "chart",
      },
    ],
  };

  return <WorkResultList source={source} />;
}
