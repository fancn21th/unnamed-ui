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
    registryDependencies: ["style", "textarea", "button"],
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
    registryDependencies: ["style", "button"],
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
];
