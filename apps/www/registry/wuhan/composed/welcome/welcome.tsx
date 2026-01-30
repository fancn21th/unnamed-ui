"use client";

import * as React from "react";
import {
  WelcomeContainer,
  WelcomeIcon,
  WelcomeText,
} from "@/registry/wuhan/blocks/welcome/welcome-01";

/**
 * @public
 */
export interface WelcomeProps {
  icon?: React.ReactNode;
  text: React.ReactNode;
  className?: string;
}

/**
 * @public
 */
export const WelcomeMessage = React.forwardRef<HTMLDivElement, WelcomeProps>(
  ({ icon, text, className }, ref) => {
    return (
      <WelcomeContainer ref={ref} className={className}>
        {icon && <WelcomeIcon>{icon}</WelcomeIcon>}
        <WelcomeText>{text}</WelcomeText>
      </WelcomeContainer>
    );
  },
);
WelcomeMessage.displayName = "WelcomeMessage";
