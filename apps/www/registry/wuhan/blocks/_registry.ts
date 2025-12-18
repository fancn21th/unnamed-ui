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
    name: "prompt-01",
    type: "registry:block",
    title: "Prompt",
    description: "Prompt input component",
    registryDependencies: ["style", "textarea", "button"],
    files: [
      {
        path: "blocks/prompt/prompt-01.tsx",
        type: "registry:component",
        target: "components/wuhan/blocks/prompt-01.tsx",
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
];
