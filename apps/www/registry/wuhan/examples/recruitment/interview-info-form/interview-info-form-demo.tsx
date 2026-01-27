"use client";

import React from "react";
import InterviewInfoForm from "../../../recruitment/InterviewInfoForm";

export default function InterviewInfoFormDemo() {
  const fields = [
    {
      type: "radio" as const,
      name: "interviewType",
      label: "面试类型",
      required: true,
      options: [
        { label: "技术面", value: "tech" },
        { label: "HR面", value: "hr" },
      ],
    },
    {
      type: "textarea" as const,
      name: "feedback",
      label: "面试反馈",
      required: false,
    },
  ];

  const handleSubmit = (values: any) => {
    console.log("面试信息:", values);
  };

  return <InterviewInfoForm fields={fields} onSubmit={handleSubmit} />;
}
