"use client";

import React from "react";
import WorkObjectiveList, {
  type WorkObjectiveListSource,
} from "../../../recruitment/WorkObjectiveList";

export default function WorkObjectiveListDemo() {
  const source: WorkObjectiveListSource = {
    title: "工作目标",
    items: [
      {
        id: "1",
        title: "完成产品原型设计",
        progress: 80,
      },
      {
        id: "2",
        title: "编写技术文档",
        progress: 60,
      },
    ],
  };

  return <WorkObjectiveList source={source} />;
}
