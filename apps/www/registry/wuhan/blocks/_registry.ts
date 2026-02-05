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
    description: "Message primitives (AI/User layout and feedback slots)",
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
    dependencies: ["lucide-react"],
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
    dependencies: ["lucide-react"],
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
    description: "Sender primitives (input, actions, buttons)",
    dependencies: ["lucide-react"],
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
    dependencies: ["lucide-react"],
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
    dependencies: ["@radix-ui/react-slot"],
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
    dependencies: ["lucide-react"],
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
    description: "Deep thinking primitives (container, header, content)",
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
    dependencies: ["@radix-ui/react-tooltip"],
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
    description: "Execution result primitives (container, items, sections)",
    dependencies: ["lucide-react"],
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
    description: "Component panel primitives (tabs, list, items)",
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
      "Thinking process primitives (container, header, content, status, icons)",
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
      "Thinking step item primitives (timeline, tool call, file list, status)",
    dependencies: ["lucide-react"],
    registryDependencies: ["style", "collapsible"],
    files: [
      {
        path: "blocks/thinking-step-item/thinking-step-item-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/thinking-step-item-01.tsx",
      },
    ],
  },
  {
    name: "task-list-01",
    type: "registry:block",
    title: "Task List",
    description: "Task list primitives (container, list, items)",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/task-list/task-list-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/task-list-01.tsx",
      },
    ],
  },
  {
    name: "dynamic-form-01",
    type: "registry:block",
    title: "Dynamic Form",
    description: "Dynamic Form component for user input and interaction",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/dynamic-form/dynamic-form-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/dynamic-form-01.tsx",
      },
    ],
  },
  {
    name: "status-tag-01",
    type: "registry:block",
    title: "Status Tag",
    description: "Status tag primitive with basic styling and structure",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/status-tag/status-tag-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/status-tag-01.tsx",
      },
    ],
  },
  {
    name: "custom-sources-01",
    type: "registry:block",
    title: "Custom Sources",
    description: "Source marker and popover card primitives",
    dependencies: ["styled-components"],
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/custom-sources/custom-sources-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/custom-sources-01.tsx",
      },
    ],
  },
  {
    name: "sources-sidebar-01",
    type: "registry:block",
    title: "Sources Sidebar",
    description: "Sources sidebar component",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/sources-sidebar/sources-sidebar-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/sources-sidebar-01.tsx",
      },
    ],
  },
  {
    name: "button-01",
    type: "registry:block",
    title: "Button Primitive",
    description:
      "Button primitive with solid/text/outline/link variants, multiple colors, and sizes",
    dependencies: ["lucide-react"],
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/button/button-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/button-01.tsx",
      },
    ],
  },
  {
    name: "confirm-panel-01",
    type: "registry:block",
    title: "Confirm Panel",
    description: "Confirmation panel primitives for user actions",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/confirm-panel/confirm-panel-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/confirm-panel-01.tsx",
      },
    ],
  },
  {
    name: "select-card-01",
    type: "registry:block",
    title: "Select Card",
    description: "Card selection item primitive with selected state",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/select-card/select-card-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/select-card-01.tsx",
      },
    ],
  },
  {
    name: "report-card-01",
    type: "registry:block",
    title: "Report Card",
    description: "Report card primitives for displaying data and metrics",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/report-card/report-card-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/report-card-01.tsx",
      },
    ],
  },
  {
    name: "checkbox-01",
    type: "registry:block",
    title: "Checkbox",
    description: "多选框",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/checkbox/checkbox-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/checkbox-01.tsx",
      },
    ],
  },
  {
    name: "radio-01",
    type: "registry:block",
    title: "Radio",
    description: "单选框",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/radio/radio-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/radio-01.tsx",
      },
    ],
  },
  {
    name: "block-select-01",
    type: "registry:block",
    title: "BlockSelect",
    description: "选择器",
    registryDependencies: ["style"],
    files: [
      {
        path: "blocks/block-select/block-select-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/block-select-01.tsx",
      },
    ],
  },
];
