import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  // welcome examples
  {
    name: "welcome-demo",
    type: "registry:example",
    registryDependencies: ["welcome-01"],
    files: [
      {
        path: "examples/welcome/welcome-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/welcome-demo.tsx",
      },
    ],
  },
  // message examples
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "examples/message/message-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-demo.tsx",
      },
    ],
  },
  {
    name: "message-default",
    type: "registry:example",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "examples/message/message-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-default.tsx",
      },
    ],
  },
  {
    name: "message-composed-demo",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/message/message-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-composed-demo.tsx",
      },
    ],
  },
  {
    name: "message-with-status",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/message/message-with-status.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-status.tsx",
      },
    ],
  },
  {
    name: "message-with-attachment",
    type: "registry:example",
    registryDependencies: ["message-01", "attachment-list-01"],
    files: [
      {
        path: "examples/message/message-with-attachment.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-attachment.tsx",
      },
    ],
  },
  {
    name: "message-with-feedback",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/message/message-with-feedback.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-feedback.tsx",
      },
    ],
  },
  {
    name: "message-with-avatar-header",
    type: "registry:example",
    registryDependencies: ["message-01", "avatar-header-01"],
    files: [
      {
        path: "examples/message/message-with-avatar-header.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-avatar-header.tsx",
      },
    ],
  },
  // attachment-list examples
  {
    name: "attachment-list-demo",
    type: "registry:example",
    registryDependencies: ["attachment-list-01"],
    files: [
      {
        path: "examples/attachment-list/attachment-list-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-demo.tsx",
      },
    ],
  },
  // avatar-header examples
  {
    name: "avatar-header-demo",
    type: "registry:example",
    registryDependencies: ["avatar-header-01"],
    files: [
      {
        path: "examples/avatar-header/avatar-header-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-demo.tsx",
      },
    ],
  },
  // history-item examples
  {
    name: "history-item-demo",
    type: "registry:example",
    registryDependencies: ["history-item-01", "tooltip"],
    files: [
      {
        path: "examples/history-item/history-item-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-demo.tsx",
      },
    ],
  },
  // sender examples
  {
    name: "sender-demo",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-demo.tsx",
      },
    ],
  },
  {
    name: "sender-default",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-default.tsx",
      },
    ],
  },
  {
    name: "sender-active",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-active.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-active.tsx",
      },
    ],
  },
  {
    name: "sender-disabled",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/sender/sender-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-disabled.tsx",
      },
    ],
  },
  {
    name: "sender-composed-demo",
    type: "registry:example",
    registryDependencies: ["sender-01", "attachment-list-01"],
    files: [
      {
        path: "examples/sender/sender-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-composed-demo.tsx",
      },
    ],
  },
  // textarea example
  {
    name: "textarea-demo",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/textarea/textarea-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/textarea-demo.tsx",
      },
    ],
  },
  // button examples
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/button-demo.tsx",
      },
    ],
  },
  // prompt examples
  {
    name: "prompt-demo",
    type: "registry:example",
    registryDependencies: ["prompt-01", "prompt-02"],
    files: [
      {
        path: "examples/prompt/prompt-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-demo.tsx",
      },
    ],
  },
  {
    name: "prompt-horizontal",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/prompt/prompt-horizontal.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-horizontal.tsx",
      },
    ],
  },
  {
    name: "prompt-vertical",
    type: "registry:example",
    registryDependencies: ["prompt-02"],
    files: [
      {
        path: "examples/prompt/prompt-vertical.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-vertical.tsx",
      },
    ],
  },
  // suggestion examples
  {
    name: "suggestion-demo",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/suggestion/suggestion-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-demo.tsx",
      },
    ],
  },
  {
    name: "suggestion-default",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/suggestion/suggestion-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-default.tsx",
      },
    ],
  },
  {
    name: "suggestion-custom-icon",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/suggestion/suggestion-custom-icon.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-custom-icon.tsx",
      },
    ],
  },
  // quick-action examples
  {
    name: "quick-action-demo",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-demo.tsx",
      },
    ],
  },
  {
    name: "quick-action-default",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-default.tsx",
      },
    ],
  },
  {
    name: "quick-action-with-icons",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-with-icons.tsx",
      },
    ],
  },
  {
    name: "quick-action-single",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-single.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-single.tsx",
      },
    ],
  },
  {
    name: "quick-action-interactive",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-interactive.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-interactive.tsx",
      },
    ],
  },
  {
    name: "quick-action-disabled",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-disabled.tsx",
      },
    ],
  },
  {
    name: "quick-action-flexible-layout",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/quick-action/quick-action-flexible-layout.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-flexible-layout.tsx",
      },
    ],
  },
];
