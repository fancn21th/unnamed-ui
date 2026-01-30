"use client";

import * as React from "react";
import {
  AvatarHeader,
  Avatar,
  AvatarName,
  AvatarTime,
} from "@/registry/wuhan/blocks/avatar-header/avatar-header-01";

/**
 * @public
 */
export interface AvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  avatar?: React.ReactNode;
  name: React.ReactNode;
  time?: React.ReactNode;
}

/**
 * @public
 */
export const AvatarHeaderComposed = React.forwardRef<
  HTMLDivElement,
  AvatarHeaderProps
>(({ avatar, name, time, className, ...props }, ref) => {
  return (
    <AvatarHeader ref={ref} className={className} {...props}>
      {avatar ?? <Avatar aria-hidden="true" />}
      <AvatarName>{name}</AvatarName>
      {time != null && <AvatarTime>{time}</AvatarTime>}
    </AvatarHeader>
  );
});
AvatarHeaderComposed.displayName = "AvatarHeaderComposed";
