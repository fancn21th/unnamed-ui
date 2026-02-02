"use client";

import { StatusTag } from "@/registry/wuhan/composed/status-tag/status-tag";

export default function StatusTagDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <StatusTag status="pending" />
      <StatusTag status="confirmed" />
      <StatusTag status="success" />
      <StatusTag status="error" />
      <StatusTag status="warning" />
      <StatusTag status="info" />
    </div>
  );
}
