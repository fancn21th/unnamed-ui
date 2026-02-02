import { type Registry } from "shadcn/schema";

export const composed: Registry["items"] = [
  {
    name: "message",
    type: "registry:block",
    title: "Message",
    description: "Composed AI and user message components",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "composed/message/message.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/message.tsx",
      },
    ],
  },
  {
    name: "sender",
    type: "registry:block",
    title: "Sender",
    description: "Composed sender with attachments and modes",
    registryDependencies: ["sender-01", "attachment-list", "quote-content"],
    files: [
      {
        path: "composed/sender/sender.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/sender.tsx",
      },
    ],
  },
  {
    name: "task-list",
    type: "registry:block",
    title: "Task List",
    description: "Composed task list with editable mode",
    dependencies: [
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@dnd-kit/modifiers",
      "lucide-react",
    ],
    registryDependencies: ["button", "task-list-01", "feedback"],
    files: [
      {
        path: "composed/task-list/task-list.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/task-list.tsx",
      },
    ],
  },
  {
    name: "deep-thinking",
    type: "registry:block",
    title: "Deep Thinking",
    description: "Composed deep thinking collapsible block",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "composed/deep-thinking/deep-thinking.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/deep-thinking.tsx",
      },
    ],
  },
  {
    name: "execution-result",
    type: "registry:block",
    title: "Execution Result",
    description: "Composed execution result list with sections",
    registryDependencies: ["execution-result-01"],
    files: [
      {
        path: "composed/execution-result/execution-result.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/execution-result.tsx",
      },
    ],
  },
  {
    name: "component-panel",
    type: "registry:block",
    title: "Component Panel",
    description: "Composed panel with tabs and selectable items",
    registryDependencies: ["component-panel-01", "tooltip-01"],
    files: [
      {
        path: "composed/component-panel/component-panel.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/component-panel.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item",
    type: "registry:block",
    title: "Thinking Step Item",
    description: "Composed step item with status, timeline, tools, and files",
    registryDependencies: ["thinking-step-item-01"],
    files: [
      {
        path: "composed/thinking-step-item/thinking-step-item.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/thinking-step-item.tsx",
      },
    ],
  },
  {
    name: "thinking-process",
    type: "registry:block",
    title: "Thinking Process",
    description: "Composed thinking process with steps and content blocks",
    registryDependencies: ["thinking-process-01", "thinking-step-item"],
    files: [
      {
        path: "composed/thinking-process/thinking-process.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/thinking-process.tsx",
      },
    ],
  },
  {
    name: "welcome",
    type: "registry:block",
    title: "Welcome",
    description: "Composed welcome message header",
    registryDependencies: ["welcome-01"],
    files: [
      {
        path: "composed/welcome/welcome.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/welcome.tsx",
      },
    ],
  },
  {
    name: "quick-action",
    type: "registry:block",
    title: "Quick Action",
    description: "Composed quick action panel with items",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "composed/quick-action/quick-action.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/quick-action.tsx",
      },
    ],
  },
  {
    name: "prompt",
    type: "registry:block",
    title: "Prompt",
    description: "Composed prompt list with horizontal/vertical variants",
    registryDependencies: ["prompt-01", "prompt-02"],
    files: [
      {
        path: "composed/prompt/prompt.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/prompt.tsx",
      },
    ],
  },
  {
    name: "suggestion",
    type: "registry:block",
    title: "Suggestion",
    description: "Composed suggestion panel with next step actions",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "composed/suggestion/suggestion.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/suggestion.tsx",
      },
    ],
  },
  {
    name: "attachment-list",
    type: "registry:block",
    title: "Attachment List",
    description: "Composed attachment list with cards",
    registryDependencies: ["attachment-list-01"],
    files: [
      {
        path: "composed/attachment-list/attachment-list.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/attachment-list.tsx",
      },
    ],
  },
  {
    name: "quote-content",
    type: "registry:block",
    title: "Quote Content",
    description: "Composed quote content display with close action",
    registryDependencies: ["quote-content-01"],
    files: [
      {
        path: "composed/quote-content/quote-content.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/quote-content.tsx",
      },
    ],
  },
  {
    name: "history-item",
    type: "registry:block",
    title: "History Item",
    description: "Composed history list item with trailing slots",
    registryDependencies: ["history-item-01"],
    files: [
      {
        path: "composed/history-item/history-item.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/history-item.tsx",
      },
    ],
  },
  {
    name: "avatar-header",
    type: "registry:block",
    title: "Avatar Header",
    description: "Composed avatar header with name and time",
    registryDependencies: ["avatar-header-01"],
    files: [
      {
        path: "composed/avatar-header/avatar-header.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/avatar-header.tsx",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:block",
    title: "Sidebar",
    description: "Composed sidebar with header, search, and history list",
    registryDependencies: ["sidebar-01", "history-item-01", "avatar-header-01"],
    files: [
      {
        path: "composed/sidebar/sidebar.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/sidebar.tsx",
      },
    ],
  },
  {
    name: "feedback",
    type: "registry:block",
    title: "Feedback",
    description: "Composed feedback form with options and input",
    registryDependencies: ["feedback-01", "toggle-button-01"],
    files: [
      {
        path: "composed/feedback/feedback.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/feedback.tsx",
      },
    ],
  },
  {
    name: "dynamic-form",
    type: "registry:block",
    title: "Dynamic Form",
    description:
      "Schema-driven dynamic form with validation and multiple field types",
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    registryDependencies: [
      "button",
      "input",
      "textarea",
      "select",
      "switch",
      "slider",
      "field",
      "dynamic-form-01",
    ],
    files: [
      {
        path: "composed/dynamic-form/dynamic-form.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/dynamic-form.tsx",
      },
    ],
  },
];
