import { type Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "hello-world",
    type: "registry:block",
    title: "Hello World",
    description: "A simple hello world component",
    registryDependencies: ["style", "button"],
    files: [
      {
        path: "blocks/hello-world/hello-world.tsx",
        type: "registry:component",
        target: "components/wuhan/components/hello-world.tsx",
      },
    ],
  },
  {
    name: "welcome-01",
    type: "registry:block",
    title: "Welcome",
    description: "Welcome message header for empty state",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/welcome/welcome-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/welcome-01.tsx",
      },
    ],
  },
  {
    name: "message-01",
    type: "registry:block",
    title: "Message",
    description: "AI and user message components",
    registryDependencies: ["style", "button"],
    files: [
      {
        path: "blocks/message/message-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/message-01.tsx",
      },
    ],
  },
  {
    name: "quick-action-01",
    type: "registry:block",
    title: "Quick Action",
    description:
      "Quick action button components for suggestions and next step guidance (Base Block)",
    registryDependencies: ["style", "button"],
    files: [
      {
        path: "blocks/quick-action/quick-action-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/quick-action-01.tsx",
      },
    ],
  },
  {
    name: "prompt-01",
    type: "registry:block",
    title: "Prompt",
    description: "Prompt button (horizontal layout)",
    registryDependencies: ["style", "quick-action-01"],
    files: [
      {
        path: "blocks/prompt/prompt-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/prompt-01.tsx",
      },
    ],
  },
  {
    name: "prompt-02",
    type: "registry:block",
    title: "Prompt",
    description: "Prompt button (vertical layout)",
    registryDependencies: ["style", "quick-action-01"],
    files: [
      {
        path: "blocks/prompt/prompt-02.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/prompt-02.tsx",
      },
    ],
  },
  {
    name: "suggestion-01",
    type: "registry:block",
    title: "Suggestion",
    description:
      "Suggestion button for next step guidance (text first, icon last)",
    registryDependencies: ["style", "quick-action-01"],
    files: [
      {
        path: "blocks/suggestion/suggestion-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/suggestion-01.tsx",
      },
    ],
  },
  {
    name: "sender-01",
    type: "registry:block",
    title: "Sender",
    description: "Message sender component",
    registryDependencies: ["style", "textarea", "button", "toggle-button-01"],
    files: [
      {
        path: "blocks/sender/sender-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/sender-01.tsx",
      },
    ],
  },
  {
    name: "attachment-list-01",
    type: "registry:block",
    title: "Attachment List",
    description: "Attachment list component",
    registryDependencies: ["style", "button", "tooltip-01"],
    files: [
      {
        path: "blocks/attachment-list/attachment-list-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/attachment-list-01.tsx",
      },
    ],
  },
  {
    name: "avatar-header-01",
    type: "registry:block",
    title: "Avatar Header",
    description: "Message avatar header component (avatar + name + time)",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/avatar-header/avatar-header-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/avatar-header-01.tsx",
      },
    ],
  },
  {
    name: "history-item-01",
    type: "registry:block",
    title: "History Item",
    description: "History record list item component (default/hover/selected)",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/history-item/history-item-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/history-item-01.tsx",
      },
    ],
  },
  {
    name: "quote-content-01",
    type: "registry:block",
    title: "Quote Content",
    description: "Quote content display component (shown above input field)",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/quote-content/quote-content-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/quote-content-01.tsx",
      },
    ],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    title: "Sidebar",
    description: "Sidebar primitive components (style-only, no business logic)",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/sidebar/sidebar-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/sidebar-01.tsx",
      },
    ],
  },
  {
    name: "feedback-01",
    type: "registry:block",
    title: "Feedback",
    description: "Feedback component for reporting issues",
    registryDependencies: ["style", "button", "sidebar-01", "toggle-button-01"],
    files: [
      {
        path: "blocks/feedback/feedback-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/feedback-01.tsx",
      },
    ],
  },
  {
    name: "toggle-button-01",
    type: "registry:block",
    title: "Toggle Button",
    description: "Toggle button component for selection and mode switching",
    registryDependencies: ["style", "button"],
    files: [
      {
        path: "blocks/toggle-button/toggle-button-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/toggle-button-01.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-01",
    type: "registry:block",
    title: "Deep Thinking",
    description:
      "Deep thinking collapsible block for displaying AI thinking process",
    registryDependencies: ["style", "collapsible"],
    files: [
      {
        path: "blocks/deep-thinking/deep-thinking-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/deep-thinking-01.tsx",
      },
    ],
  },
  {
    name: "tooltip-01",
    type: "registry:block",
    title: "Block Tooltip",
    description: "Block tooltip component with custom styling",
    registryDependencies: ["style", "tooltip"],
    files: [
      {
        path: "blocks/tooltip/tooltip-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/tooltip-01.tsx",
      },
    ],
  },
  {
    name: "execution-result-01",
    type: "registry:block",
    title: "Execution Result",
    description:
      "Execution result block for displaying function call results with collapsible items",
    registryDependencies: ["style", "collapsible"],
    files: [
      {
        path: "blocks/execution-result/execution-result-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/execution-result-01.tsx",
      },
    ],
  },
  {
    name: "component-panel-01",
    type: "registry:block",
    title: "Component Panel",
    description:
      "Component panel with tabs (全部, MCP, 工具, 工作流) and toggle button list",
    registryDependencies: ["style", "tabs", "toggle-button-01"],
    files: [
      {
        path: "blocks/component-panel/component-panel-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/component-panel-01.tsx",
      },
    ],
  },
  {
    name: "thinking-process-01",
    type: "registry:block",
    title: "Thinking Process",
    description:
      "Multi-stage thinking process component for displaying AI thinking steps with status and time",
    registryDependencies: ["style", "collapsible"],
    files: [
      {
        path: "blocks/thinking-process/thinking-process-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/thinking-process-01.tsx",
      },
    ],
  },
  {
    name: "thinking-step-item-01",
    type: "registry:block",
    title: "Thinking Step Item",
    description:
      "Collapsible execution step item component with status (loading/success/error/cancel), timeline, tool calls, and file list",
    registryDependencies: ["style", "collapsible"],
    files: [
      {
        path: "blocks/thinking-step-item/thinking-step-item-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/thinking-step-item-01.tsx",
      },
    ],
  },
];
