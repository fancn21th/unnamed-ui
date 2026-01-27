"use client";

import React, { useState } from "react";
import {
  StyledStepOverviewContainer,
  StyledHeader,
  StyledLeftSection,
  StyledStatusIcon,
  StyledTitle,
  StyledRightSection,
  StyledProgress,
  StyledArrowIcon,
  StyledExpandedContent,
  StyledStepItem,
  StyledStepItemTitle,
  StyledStepItemDescription,
} from "./styles";

export type StepStatus = "waiting" | "processing" | "completed" | "error";

export interface StepItem {
  id?: string | number;
  title: string;
  description?: string;
  content?: string;
  status?: StepStatus;
}

interface StepOverviewProps {
  title?: string;
  steps?: StepItem[];
  currentIndex?: number;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  onStepClick?: (step: StepItem, index: number) => void;
}

const StepOverview: React.FC<StepOverviewProps> = ({
  title = "项目开发流程",
  steps = [],
  currentIndex,
  defaultExpanded = false,
  expanded: expandedProp,
  onToggle,
  onStepClick,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = expandedProp !== undefined ? expandedProp : internalExpanded;

  // 计算当前步骤索引和状态
  const getCurrentStepInfo = () => {
    if (!steps || steps.length === 0) {
      return { index: 0, status: "waiting" as StepStatus };
    }

    let index = 0;
    if (
      currentIndex !== undefined &&
      currentIndex >= 0 &&
      currentIndex < steps.length
    ) {
      index = currentIndex;
    } else {
      // 自动找第一个非 completed 的步骤
      const foundIndex = steps.findIndex((s) => s.status !== "completed");
      index = foundIndex === -1 ? steps.length - 1 : foundIndex;
    }

    const step = steps[index];
    return { index, status: (step?.status || "waiting") as StepStatus };
  };

  const { index: currentStepIndex, status: currentStatus } =
    getCurrentStepInfo();
  const totalSteps = steps.length;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = !expanded;
    if (expandedProp === undefined) {
      setInternalExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  };

  if (totalSteps === 0) {
    return (
      <StyledStepOverviewContainer $expanded={false}>
        <StyledHeader>
          <StyledLeftSection>
            <StyledStatusIcon $status="waiting" />
            <StyledTitle>{title}</StyledTitle>
          </StyledLeftSection>
          <StyledRightSection>
            <StyledProgress>0 / 0</StyledProgress>
          </StyledRightSection>
        </StyledHeader>
      </StyledStepOverviewContainer>
    );
  }

  return (
    <StyledStepOverviewContainer $expanded={expanded}>
      <StyledHeader>
        <StyledLeftSection>
          <StyledStatusIcon $status={currentStatus}>
            {currentStatus === "processing" && <span />}
          </StyledStatusIcon>
          <StyledTitle>{title}</StyledTitle>
        </StyledLeftSection>
        <StyledRightSection>
          <StyledProgress>
            {currentStepIndex + 1} / {totalSteps}
          </StyledProgress>
          <StyledArrowIcon $expanded={expanded} onClick={handleToggle} />
        </StyledRightSection>
      </StyledHeader>

      {expanded && (
        <StyledExpandedContent>
          {steps.map((step, index) => (
            <StyledStepItem
              key={step.id ?? index}
              $status={step.status}
              onClick={onStepClick ? () => onStepClick(step, index) : undefined}
              style={onStepClick ? { cursor: "pointer" } : undefined}
            >
              <StyledStepItemTitle>{step.title}</StyledStepItemTitle>
              {step.description && (
                <StyledStepItemDescription>
                  {step.description}
                </StyledStepItemDescription>
              )}
            </StyledStepItem>
          ))}
        </StyledExpandedContent>
      )}
    </StyledStepOverviewContainer>
  );
};

export default StepOverview;
