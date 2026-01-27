"use client";

import React from "react";
import Sender from "../../../recruitment/Sender";

export default function SenderRecruitmentDemo() {
  const handleSubmit = (value: string) => {
    console.log("发送内容:", value);
  };

  return <Sender onSubmit={handleSubmit} />;
}
