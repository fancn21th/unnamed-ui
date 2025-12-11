import { type Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "hello-world",
    type: "registry:block",
    title: "Hello World",
    description: "A simple hello world component",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hello-world/hello-world.tsx",
        type: "registry:component",
      },
    ],
  },
];
