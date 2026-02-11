import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";

export default defineConfig({
  mdxOptions: {
    // MDX options
    remarkPlugins: [remarkMdxMermaid],
  },
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// export const libs = defineDocs({
//   dir: "content/libs",
//   docs: {
//     schema: frontmatterSchema,
//     postprocess: {
//       includeProcessedMarkdown: true,
//     },
//   },
//   meta: {
//     schema: metaSchema,
//   },
// });
