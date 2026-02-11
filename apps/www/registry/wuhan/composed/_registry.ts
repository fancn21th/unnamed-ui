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
    name: "responsive-sender",
    type: "registry:block",
    title: "Responsive Sender",
    description:
      "Composed responsive sender with automatic single/multi-line layout switching",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "sender-responsive-01",
      "attachment-list",
      "quote-content",
    ],
    files: [
      {
        path: "composed/sender/responsive-sender.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/responsive-sender.tsx",
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
      "status-tag",
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
    name: "confirm-panel",
    type: "registry:block",
    title: "Confirm Panel",
    description:
      "Composed confirm panel with status support and custom actions",
    registryDependencies: ["confirm-panel-01", "status-tag", "button"],
    files: [
      {
        path: "composed/confirm-panel/confirm-panel.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/confirm-panel.tsx",
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
    registryDependencies: ["dynamic-form", "custom-sources"],
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
        path: "composed/markdown/components/Code/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/Code/index.tsx",
      },
      {
        path: "composed/markdown/components/Code/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/Code/style.ts",
      },
      {
        path: "composed/markdown/components/Table/index.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/Table/index.tsx",
      },
      {
        path: "composed/markdown/components/Table/style.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/Table/style.ts",
      },
      {
        path: "composed/markdown/components/index.ts",
        type: "registry:component",
        target: "components/wuhan/composed/markdown/components/index.ts",
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
    ],
  },
  {
    name: "custom-sources",
    type: "registry:block",
    title: "Custom Sources",
    description: "Source markers with popover preview",
    dependencies: ["@ant-design/icons", "@ant-design/x-markdown", "antd"],
    registryDependencies: ["custom-sources-01"],
    files: [
      {
        path: "composed/custom-sources/custom-sources.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/custom-sources/custom-sources.tsx",
      },
      {
        path: "composed/custom-sources/utils.ts",
        type: "registry:component",
        target: "components/wuhan/composed/custom-sources/utils.ts",
      },
    ],
  },
  {
    name: "sources-sidebar",
    type: "registry:block",
    title: "Sources Sidebar",
    description: "Sources sidebar with tabs and list",
    dependencies: ["@ant-design/icons"],
    registryDependencies: ["sources-sidebar-01"],
    files: [
      {
        path: "composed/sources-sidebar/sources-sidebar.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/sources-sidebar.tsx",
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
  {
    name: "block-button",
    type: "registry:block",
    title: "Button",
    description:
      "Composed button with icon support, block mode, and convenient props",
    dependencies: ["lucide-react", "@radix-ui/react-slot"],
    registryDependencies: ["block-button-01"],
    files: [
      {
        path: "composed/block-button/block-button.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/block-button.tsx",
      },
    ],
  },
  {
    name: "select-card",
    type: "registry:block",
    title: "Select Card",
    description:
      "Composed card selection with single/multiple modes and grid layout",
    registryDependencies: ["select-card-01"],
    files: [
      {
        path: "composed/select-card/select-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/select-card.tsx",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:block",
    title: "Checkbox",
    description: "多选框",
    registryDependencies: ["checkbox-01"],
    files: [
      {
        path: "composed/checkbox/checkbox.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/checkbox.tsx",
      },
    ],
  },
  {
    name: "radio",
    type: "registry:block",
    title: "Radio",
    description: "单选框",
    registryDependencies: ["radio-01"],
    files: [
      {
        path: "composed/radio/radio.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/radio.tsx",
      },
    ],
  },
  {
    name: "block-select",
    type: "registry:block",
    title: "BlockSelect",
    description: "选择器",
    registryDependencies: ["block-select-01"],
    files: [
      {
        path: "composed/block-select/block-select.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/block-select.tsx",
      },
    ],
  },
  {
    name: "triple-split-pane",
    type: "registry:block",
    title: "TripleSplitPane",
    description: "三分隔面板",
    registryDependencies: ["split-pane-01"],
    files: [
      {
        path: "composed/split-pane/triple-split-pane.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/triple-split-pane.tsx",
      },
    ],
  },
  {
    name: "task-card",
    type: "registry:block",
    title: "Task Card",
    description:
      "Composed task card with progress tracking and status indicators",
    dependencies: ["lucide-react"],
    registryDependencies: ["task-card-01"],
    files: [
      {
        path: "composed/task-card/task-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/task-card.tsx",
      },
    ],
  },
  {
    name: "block-input",
    type: "registry:block",
    title: "Input",
    description: "输入框",
    registryDependencies: ["block-input-01"],
    files: [
      {
        path: "composed/block-input/block-input.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/block-input.tsx",
      },
    ],
  },
  {
    name: "tag",
    type: "registry:block",
    title: "Tag",
    description: "标签",
    registryDependencies: ["tag-01"],
    files: [
      {
        path: "composed/tag/tag.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/tag.tsx",
      },
    ],
  },
  {
    name: "divider",
    type: "registry:block",
    title: "Divider",
    description: "分割线",
    registryDependencies: ["divider-01"],
    files: [
      {
        path: "composed/divider/divider.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/divider.tsx",
      },
    ],
  },
  {
    name: "upload",
    type: "registry:block",
    title: "Upload",
    description: "上传",
    dependencies: ["lucide-react"],
    registryDependencies: ["upload-01", "block-button"],
    files: [
      {
        path: "composed/upload/upload.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/upload.tsx",
      },
    ],
  },
  {
    name: "goal-card",
    type: "registry:block",
    title: "Goal Card",
    description:
      "Composed goal card with AI icon, title, description, and circular progress indicator",
    dependencies: ["lucide-react"],
    registryDependencies: ["goal-card-01"],
    files: [
      {
        path: "composed/goal-card/goal-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/goal-card.tsx",
      },
    ],
  },
  {
    name: "agent-card",
    type: "registry:block",
    title: "Agent Card",
    description:
      "Composed agent card with AI icon, title, description, and status indicator",
    dependencies: ["lucide-react"],
    registryDependencies: ["agent-card-01"],
    files: [
      {
        path: "composed/agent-card/agent-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/agent-card.tsx",
      },
    ],
  },
  {
    name: "report-card",
    type: "registry:block",
    title: "Report Card",
    description:
      "Composed report card with icon, title, description, and hover actions",
    dependencies: ["lucide-react"],
    registryDependencies: ["report-card-01"],
    files: [
      {
        path: "composed/report-card/report-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/report-card.tsx",
      },
    ],
  },
  {
    name: "document-card",
    type: "registry:block",
    title: "Document Card",
    description:
      "Document card component for displaying research document information and attributes",
    dependencies: ["lucide-react"],
    registryDependencies: ["document-card-01"],
    files: [
      {
        path: "composed/document-card/document-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/document-card.tsx",
      },
    ],
  },
  {
    name: "file-card",
    type: "registry:block",
    title: "File Card",
    description:
      "File card component with checkbox, icon, title, date, and action button",
    dependencies: ["lucide-react"],
    registryDependencies: ["file-card-01", "checkbox-01"],
    files: [
      {
        path: "composed/file-card/file-card.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/file-card.tsx",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:block",
    title: "Avatar",
    description: "头像",
    registryDependencies: ["avatar-01"],
    files: [
      {
        path: "composed/avatar/avatar.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/avatar.tsx",
      },
    ],
  },
  {
    name: "icon-button",
    type: "registry:block",
    title: "Icon Button",
    description:
      "Composed icon button with tooltip support, multiple variants, colors, and sizes",
    dependencies: ["lucide-react"],
    registryDependencies: ["icon-button-01", "tooltip"],
    files: [
      {
        path: "composed/icon-button/icon-button.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/icon-button.tsx",
      },
    ],
  },
  {
    name: "block-accordion",
    type: "registry:block",
    title: "Accordion",
    description:
      "Composed accordion with simplified API, supporting single and multiple selection modes",
    dependencies: ["@radix-ui/react-accordion"],
    registryDependencies: ["accordion-01"],
    files: [
      {
        path: "composed/block-accordion/block-accordion.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/block-accordion.tsx",
      },
    ],
  },
  {
    name: "page-header",
    type: "registry:block",
    title: "Page Header",
    description:
      "Composed page header with logo, title, button group and user avatar",
    dependencies: ["lucide-react"],
    registryDependencies: ["page-header-01"],
    files: [
      {
        path: "composed/page-header/page-header.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/page-header.tsx",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:block",
    title: "Progress",
    description: "进度条",
    registryDependencies: ["progress-01"],
    files: [
      {
        path: "composed/progress/progress.tsx",
        type: "registry:component",
        target: "components/wuhan/composed/progress.tsx",
      },
    ],
  },
];
