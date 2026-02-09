import * as React from "react";
import { UploadContainerPrimitive } from "@/registry/wuhan/blocks/upload/upload-01";

export interface UploadProps {
  children?: React.ReactNode;
  className?: string;
}

export function Upload({ children, className }: UploadProps) {
  return (
    <UploadContainerPrimitive className={className}>
      {children || "Upload"}
    </UploadContainerPrimitive>
  );
}
