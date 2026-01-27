"use client";

import React from "react";
import StepOverview, { StepItem } from "../../../recruitment/StepOverview";
import steps from "antd/es/steps";

export default function StepOverviewDemo() {
  const steps: StepItem[] = [
    { id: 1, title: "简历筛选", status: "completed" },
    { id: 2, title: "初试", status: "completed" },
    { id: 3, title: "复试", status: "processing" },
    { id: 4, title: "终试", status: "waiting" },
  ];

  return <StepOverview title="招聘流程" steps={steps} />;
}
