"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

//#region 任务列表容器原语
const TaskListContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-xl)]",
        "px-[var(--padding-com-xl)] py-[var(--margin-com-xl)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--bg-container-secondary)]",
        "font-[var(--font-family-cn)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListContainerPrimitive.displayName = "TaskListContainerPrimitive  ";
//#endregion

//#region 任务列表头部原语
const TaskListHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", "flex items-center justify-between", className)}
      {...props}
    />
  );
});
TaskListHeaderPrimitive.displayName = "TaskListHeaderPrimitive";
//#endregion

//#region 任务列表标题原语
const TaskListTitlePrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-600)]",
        "font-semibold",
        "font-size-4",
        "leading-[var(--line-height-4)]",
        "text-[var(--text-title)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListTitlePrimitive.displayName = "TaskListTitlePrimitive";
//#endregion

//#region 任务列表的列表原语
const TaskListUlPrimitive = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn(
        "not-prose",
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        "pl-[10px]",
        "m-0",
        "list-disc list-inside",
        className,
      )}
      {...props}
    />
  );
});
TaskListUlPrimitive.displayName = "TaskListUlPrimitive";
//#endregion

//#region 任务列表的列表项原语
const TaskListLiPrimitive = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn(
        "not-prose",
        "[&_*]:!box-border",
        "h-[22px]",
        "m-0",
        className,
      )}
      {...props}
    />
  );
});
TaskListLiPrimitive.displayName = "TaskListLiPrimitive";
//#endregion

//#region 任务列表的列表项内容原语
const TaskListLiContentPrimitive = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-[var(--font-family-cn)]",
        "font-[var(--font-weight-400)]",
        "font-size-2",
        "leading-[var(--line-height-2)]",
        "text-[var(--text-primary)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListLiContentPrimitive.displayName = "TaskListLiContentPrimitive";
//#endregion

//#region 任务列表的底部操作栏原语
const TaskListFooterPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex items-center justify-end",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListFooterPrimitive.displayName = "TaskListFooterPrimitive";
//#endregion

//#region 任务列表的可编辑容器原语
const TaskListEditableContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex flex-col",
        "gap-[var(--gap-md)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListEditableContainerPrimitive.displayName =
  "TaskListEditableContainerPrimitive";
//#endregion

//#region 任务列表的可编辑列表项原语
const TaskListEditableListItemPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        "flex items-center",
        "gap-[var(--gap-xs)]",
        className,
      )}
      {...props}
    />
  );
});
TaskListEditableListItemPrimitive.displayName =
  "TaskListEditableListItemPrimitive";
//#endregion

export {
  TaskListContainerPrimitive,
  TaskListHeaderPrimitive,
  TaskListTitlePrimitive,
  TaskListUlPrimitive,
  TaskListLiPrimitive,
  TaskListLiContentPrimitive,
  TaskListFooterPrimitive,
  TaskListEditableContainerPrimitive,
  TaskListEditableListItemPrimitive,
};
