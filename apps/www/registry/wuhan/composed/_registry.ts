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
  {
    name: "status-tag",
    type: "registry:block",
    title: "Status Tag",
    description: "Composed status tag with business API and preset statuses",
    registryDependencies: ["status-tag-01"],
    files: [
      {
        path: "composed/status-tag/status-tag.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/status-tag.tsx",
      },
    ],
  },
  {
    name: "markdown",
    type: "registry:block",
    title: "Markdown",
    description: "Streaming-friendly Markdown renderer with custom blocks",
    dependencies: [
      "@ant-design/x",
      "@ant-design/x-markdown",
      "@ant-design/icons",
      "@antv/gpt-vis",
      "antd",
      "styled-components",
    ],
    files: [
      {
        path: "composed/markdown/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/index.tsx",
      },
      {
        path: "composed/markdown/config.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/config.ts",
      },
      {
        path: "composed/markdown/declaration.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/declaration.ts",
      },
      {
        path: "composed/markdown/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/style.ts",
      },
      {
        path: "composed/markdown/utils.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/utils.ts",
      },
      {
        path: "composed/markdown/icons.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/icons.tsx",
      },
      {
        path: "composed/markdown/Code/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/Code/index.tsx",
      },
      {
        path: "composed/markdown/Code/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/Code/style.ts",
      },
      {
        path: "composed/markdown/Table/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/Table/index.tsx",
      },
      {
        path: "composed/markdown/Table/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/Table/style.ts",
      },
      {
        path: "composed/markdown/components/index.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/index.ts",
      },
      {
        path: "composed/markdown/components/DynamicForm/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/DynamicForm/index.tsx",
      },
      {
        path: "composed/markdown/components/DynamicTable/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/DynamicTable/index.tsx",
      },
      {
        path: "composed/markdown/components/GptVis/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/GptVis/index.tsx",
      },
      {
        path: "composed/markdown/components/GptVis/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/GptVis/style.ts",
      },
      {
        path: "composed/markdown/components/HtmlSkeleton/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/HtmlSkeleton/index.tsx",
      },
      {
        path: "composed/markdown/components/ImageSkeleton/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/ImageSkeleton/index.tsx",
      },
      {
        path: "composed/markdown/components/IncompleteEmphasis/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/IncompleteEmphasis/index.tsx",
      },
      {
        path: "composed/markdown/components/IncompleteLink/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/IncompleteLink/index.tsx",
      },
      {
        path: "composed/markdown/components/TableSkeleton/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/TableSkeleton/index.tsx",
      },
      {
        path: "composed/markdown/components/ThinkComponent/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/components/ThinkComponent/index.tsx",
      },
      {
        path: "composed/markdown/CustomSources/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/CustomSources/index.tsx",
      },
      {
        path: "composed/markdown/CustomSources/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/CustomSources/style.ts",
      },
      {
        path: "composed/markdown/CustomSources/SourcesSidebar/index.tsx",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/CustomSources/SourcesSidebar/index.tsx",
      },
      {
        path: "composed/markdown/CustomSources/SourcesSidebar/style.ts",
        type: "registry:component",
        target:
          "components/wuhan/composed/markdown/CustomSources/SourcesSidebar/style.ts",
      },
      {
        path: "composed/markdown/utils/tools.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/utils/tools.ts",
      },
    ],
  },
  {
    name: "toggle-button",
    type: "registry:block",
    title: "Toggle Button",
    description:
      "Composed toggle button with single and multiple selection modes",
    registryDependencies: ["toggle-button-01"],
    files: [
      {
        path: "composed/toggle-button/toggle-button.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/toggle-button.tsx",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:block",
    title: "Tooltip",
    description: "Composed tooltip with simplified API for quick usage",
    registryDependencies: ["tooltip-01"],
    files: [
      {
        path: "composed/tooltip/tooltip.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/tooltip.tsx",
      },
    ],
  },
];
