"use client";

import React from "react";
import CapabilityColumn from "../../../recruitment/CapabilityColumn";
import { CapabilityLevel } from "@/registry/wuhan/recruitment/CapabilityColumn/types";

export default function CapabilityColumnDemo() {
  const capabilities = [
    {
      abilityName: "技术能力",
      candidates: [
        { candidateName: "张三", level: CapabilityLevel.HIGH },
        { candidateName: "李四", level: CapabilityLevel.MEDIUM },
      ],
    },
    {
      abilityName: "沟通能力",
      candidates: [
        { candidateName: "张三", level: CapabilityLevel.MEDIUM },
        { candidateName: "李四", level: CapabilityLevel.HIGH },
      ],
    },
    {
      abilityName: "领导力",
      candidates: [
        { candidateName: "张三", level: CapabilityLevel.LOW },
        { candidateName: "李四", level: CapabilityLevel.MEDIUM },
      ],
    },
  ];

  return <CapabilityColumn capabilities={capabilities} />;
}
