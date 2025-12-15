import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
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
];
