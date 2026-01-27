"use client";

import React from "react";
import StatusTag from "../../../recruitment/StatusTag";

export default function StatusTagDemo() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <StatusTag status="pending" />
      <StatusTag status="confirmed" />
    </div>
  );
}
