import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "prompt-demo",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/prompt-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  // prompt-default
  {
    name: "prompt-default",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/prompt-default.tsx",
        type: "registry:example",
      },
    ],
  },
  // prompt-active
  {
    name: "prompt-active",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/prompt-active.tsx",
        type: "registry:example",
      },
    ],
  },
  // prompt-disabled
  {
    name: "prompt-disabled",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/prompt-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
];
