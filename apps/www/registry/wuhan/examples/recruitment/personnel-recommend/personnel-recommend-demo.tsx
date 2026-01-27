"use client";

import React from "react";
import PersonnelRecommend from "../../../recruitment/PersonnelRecommend";
import { RecommendType } from "../../../recruitment/PersonnelRecommend/types";

export default function PersonnelRecommendDemo() {
  const recommendList = [
    {
      candidateName: "张三",
      recommendType: RecommendType.PRIORITY,
      description: "技术能力突出，项目经验丰富，沟通能力强，强烈推荐优先录用。",
    },
    {
      candidateName: "李四",
      recommendType: RecommendType.ALTERNATIVE,
      description: "技术基础扎实，但项目经验略显不足，可作为备选考虑。",
    },
  ];

  return <PersonnelRecommend recommendList={recommendList} />;
}
