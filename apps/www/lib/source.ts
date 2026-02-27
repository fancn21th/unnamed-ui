import {
  docs,
  // libs,
} from "@/.source";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// export const libsSource = loader({
//   baseUrl: "/libs",
//   source: libs.toFumadocsSource(),
//   plugins: [lucideIconsPlugin()],
// });

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}

/**
 * 根据 block 名称获取对应组件文档的 URL
 * @param blockName - block 名称，如 sender-responsive-01、job-card
 * @param isRecruitment - 是否为 recruitment block
 * @returns 文档 URL，如 /docs/blocks/inputs/sender-responsive，找不到则返回 null
 */
export function getBlockDocPath(
  blockName: string,
  isRecruitment: boolean
): string | null {
  const pages = source.getPages();

  if (isRecruitment) {
    const page = pages.find(
      (p) =>
        p.slugs[0] === "recruitment" && p.slugs[p.slugs.length - 1] === blockName
    );
    return page ? `/docs/${page.slugs.join("/")}` : null;
  }

  const docSlug = blockName.replace(/-01$/, "");
  const page = pages.find(
    (p) =>
      p.slugs[0] === "blocks" && p.slugs[p.slugs.length - 1] === docSlug
  );
  return page ? `/docs/${page.slugs.join("/")}` : null;
}
