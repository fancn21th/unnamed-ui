import * as React from "react";
import { AvatarContainerPrimitive } from "@/registry/wuhan/blocks/avatar/avatar-01";

export interface AvatarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Avatar({ children, className }: AvatarProps) {
  return (
    <AvatarContainerPrimitive className={className}>
      {children || "Avatar"}
    </AvatarContainerPrimitive>
  );
}
