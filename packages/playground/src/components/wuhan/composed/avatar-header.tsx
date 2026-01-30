"use client";

import * as React from "react";
import {
  AvatarHeader,
  Avatar,
  AvatarName,
  AvatarTime,
} from "@/components/wuhan/blocks/avatar-header-01";
import { cn } from "@/lib/utils";

/**
 * @public
 */
export interface AvatarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  avatar?: React.ReactNode;
  name?: React.ReactNode;
  time?: React.ReactNode;
}

/**
 * @public
 */
export const AvatarHeaderComposed = React.forwardRef<
  HTMLDivElement,
  AvatarHeaderProps
>(({ avatar, name, time, className, ...props }, ref) => {
  const onlyAvatar = !name && !time;

  return (
    <AvatarHeader
      ref={ref}
      className={cn(onlyAvatar && "justify-center", className)}
      {...props}
    >
      {avatar ?? <Avatar aria-hidden="true" />}
      {!!name && <AvatarName>{name}</AvatarName>}
      {!!time && <AvatarTime>{time}</AvatarTime>}
    </AvatarHeader>
  );
});
AvatarHeaderComposed.displayName = "AvatarHeaderComposed";
