#!/usr/bin/env node
/**
 * 将组件中的 CSS 变量引用替换为 Figma 设计系统命名
 * 执行: node scripts/replace-figma-vars.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function* walkDir(dir, exts) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (!["node_modules", "dist", ".next", ".turbo"].includes(e.name)) {
        yield* walkDir(full, exts);
      }
    } else if (exts.some((ext) => e.name.endsWith(ext))) {
      yield full;
    }
  }
}

const MAPPING = [
  // 语义变量 - 按长度降序避免部分匹配
  ["--bg-container-placeholder", "--Container-bg-container-placeholder"],
  ["--bg-container-disable", "--Container-bg-container-disable"],
  ["--bg-container-secondary", "--Container-bg-container-secondary"],
  ["--bg-neutral-light-active", "--Container-bg-neutral-light-active"],
  ["--bg-neutral-light-hover", "--Container-bg-neutral-light-hover"],
  ["--bg-neutral-light", "--Container-bg-neutral-light"],
  ["--bg-brand-subtle-hover", "--Container-bg-brand-light-hover"],
  ["--bg-brand-subtle", "--Container-bg-brand-light"],
  ["--bg-brand-light-active", "--Container-bg-brand-light-active"],
  ["--bg-brand-light-hover", "--Container-bg-brand-light-hover"],
  ["--bg-brand-light", "--Container-bg-brand-light"],
  ["--ring-brand", "--Focusring-focusring-brand"],
  ["--bg-success-light-active", "--Container-bg-success-light-active"],
  ["--bg-success-light-hover", "--Container-bg-success-light-hover"],
  ["--bg-success-light", "--Container-bg-success-light"],
  ["--bg-warning-light-active", "--Container-bg-warning-light-active"],
  ["--bg-warning-light-hover", "--Container-bg-warning-light-hover"],
  ["--bg-warning-light", "--Container-bg-warning-light"],
  ["--bg-error-light-active", "--Container-bg-error-light-active"],
  ["--bg-error-light-hover", "--Container-bg-error-light-hover"],
  ["--bg-error-light", "--Container-bg-error-light"],
  ["--bg-container", "--Container-bg-container"],
  ["--bg-page-brand", "--Page-bg-page-brand"],
  ["--bg-page-secondary", "--Page-bg-page-secondary"],
  ["--bg-page", "--Page-bg-page"],
  ["--bg-neutral-active", "--Container-bg-neutral-active"],
  ["--bg-neutral-hover", "--Container-bg-neutral-hover"],
  ["--bg-neutral", "--Container-bg-neutral"],
  ["--bg-brand-active", "--Container-bg-brand-active"],
  ["--bg-brand-hover", "--Container-bg-brand-hover"],
  ["--bg-brand", "--Container-bg-brand"],
  ["--bg-success-active", "--Container-bg-success-active"],
  ["--bg-success-hover", "--Container-bg-success-hover"],
  ["--bg-success", "--Container-bg-success"],
  ["--bg-warning-active", "--Container-bg-warning-active"],
  ["--bg-warning-hover", "--Container-bg-warning-hover"],
  ["--bg-warning", "--Container-bg-warning"],
  ["--bg-error-active", "--Container-bg-error-active"],
  ["--bg-error-hover", "--Container-bg-error-hover"],
  ["--bg-error", "--Container-bg-error"],
  ["--bg-item-hover", "--Container-bg-neutral-light-hover"],
  ["--bg-item-active", "--Container-bg-neutral-light-active"],
  ["--text-brand-active", "--Text-text-brand-active"],
  ["--text-brand-hover", "--Text-text-brand-hover"],
  ["--text-brand", "--Text-text-brand"],
  ["--text-success-active", "--Text-text-success-active"],
  ["--text-success-hover", "--Text-text-success-hover"],
  ["--text-success", "--Text-text-success"],
  ["--text-warning-active", "--Text-text-warning-active"],
  ["--text-warning-hover", "--Text-text-warning-hover"],
  ["--text-warning", "--Text-text-warning"],
  ["--text-error-active", "--Text-text-error-active"],
  ["--text-error-hover", "--Text-text-error-hover"],
  ["--text-error", "--Text-text-error"],
  ["--text-primary", "--Text-text-primary"],
  ["--text-secondary", "--Text-text-secondary"],
  ["--text-tertiary", "--Text-text-tertiary"],
  ["--text-title", "--Text-text-title"],
  ["--text-inverse", "--Text-text-inverse"],
  ["--text-disable", "--Text-text-disable"],
  ["--text-placeholder", "--Text-text-placeholder"],
  ["--border-brand-active", "--Border-border-brand-active"],
  ["--border-brand-hover", "--Border-border-brand-hover"],
  ["--border-brand-light-hover", "--Border-border-brand-light-hover"],
  ["--border-brand-light", "--Border-border-brand-light"],
  ["--border-brand", "--Border-border-brand"],
  ["--border-success-active", "--Border-border-success-active"],
  ["--border-success-hover", "--Border-border-success-hover"],
  ["--border-success-light-hover", "--Border-border-success-light-hover"],
  ["--border-success-light", "--Border-border-success-light"],
  ["--border-success", "--Border-border-success"],
  ["--border-warning-active", "--Border-border-warning-active"],
  ["--border-warning-hover", "--Border-border-warning-hover"],
  ["--border-warning-light-hover", "--Border-border-warning-light-hover"],
  ["--border-warning-light", "--Border-border-warning-light"],
  ["--border-warning", "--Border-border-warning"],
  ["--border-error-active", "--Border-border-error-active"],
  ["--border-error-hover", "--Border-border-error-hover"],
  ["--border-error-light-active", "--Border-border-error-light-active"],
  ["--border-error-light-hover", "--Border-border-error-light-hover"],
  ["--border-error-light", "--Border-border-error-light"],
  ["--border-brand-light-active", "--Border-border-brand-light-active"],
  ["--border-secondary-light-active", "--Border-border-neutral"],
  ["--border-secondary-light-hover", "--Border-border-neutral"],
  ["--border-secondary-light", "--Border-border-neutral"],
  ["--bg-secondary-light-active", "--Container-bg-neutral-light-active"],
  ["--bg-secondary-light-hover", "--Container-bg-neutral-light-hover"],
  ["--bg-secondary-light", "--Container-bg-neutral-light"],
  ["--bg-secondary-active", "--Container-bg-neutral-active"],
  ["--bg-secondary-hover", "--Container-bg-neutral-hover"],
  ["--bg-secondary", "--Container-bg-neutral"],
  ["--border-error", "--Border-border-error"],
  ["--border-neutral", "--Border-border-neutral"],
  ["--divider-neutral-strong", "--Border-divider-neutral-strong"],
  ["--divider-neutral-basic", "--Border-divider-neutral-basic"],
  ["--focusring-brand", "--Focusring-focusring-brand"],
  ["--gap-2xl", "--Gap-gap-2xl"],
  ["--gap-xl", "--Gap-gap-xl"],
  ["--gap-lg", "--Gap-gap-lg"],
  ["--gap-md", "--Gap-gap-md"],
  ["--gap-sm", "--Gap-gap-sm"],
  ["--gap-xs", "--Gap-gap-xs"],
  ["--gap-2xs", "--Gap-gap-2xs"],
  ["--margin-com-3xl", "--Margin-margin-com-3xl"],
  ["--margin-com-2xl", "--Margin-margin-com-2xl"],
  ["--margin-com-xl", "--Margin-margin-com-xl"],
  ["--margin-com-lg", "--Margin-margin-com-lg"],
  ["--margin-com-md", "--Margin-margin-com-md"],
  ["--margin-com-sm", "--Margin-margin-com-sm"],
  ["--margin-com-xs", "--Margin-margin-com-xs"],
  ["--margin-com-2xs", "--Margin-margin-com-2xs"],
  ["--padding-com-3xl", "--Padding-padding-com-3xl"],
  ["--padding-com-2xl", "--Padding-padding-com-2xl"],
  ["--padding-com-xl", "--Padding-padding-com-xl"],
  ["--padding-com-lg", "--Padding-padding-com-lg"],
  ["--padding-com-md", "--Padding-padding-com-md"],
  ["--padding-com-sm", "--Padding-padding-com-sm"],
  ["--padding-com-xs", "--Padding-padding-com-xs"],
  ["--padding-com-2xs", "--Padding-padding-com-2xs"],
  ["--font-family-cn", "--font-family-CN"],
  ["--font-family-en", "--font-family-EN"],
  ["--bg-mask", "--Container-bg-mask"],
  ["--bg-mask-soft", "--Container-bg-mask-soft"],
  ["--bg-surface", "--Page-bg-page-secondary"],
  ["--bg-tertiary", "--Container-bg-container-secondary"],
  ["--bg-hover", "--Container-bg-neutral-light-hover"],
  ["--text-danger", "--Text-text-error"],
  ["--border-neutral-light", "--Border-divider-neutral-basic"],
];

function replaceInContent(content) {
  let result = content;
  for (const [oldVar, newVar] of MAPPING) {
    const escaped = oldVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match var(--xxx) or var(--xxx, fallback)
    const regex = new RegExp(`var\\(${escaped}(?:,\\s*([^)]+))?\\)`, "g");
    result = result.replace(regex, (_, fallback) =>
      fallback ? `var(${newVar}, ${fallback})` : `var(${newVar})`
    );
  }
  return result;
}

function main() {
  const roots = [
    "apps/www/registry/wuhan",
    "packages/playground/src",
    "apps/www/styles",
    "apps/www/components",
    "apps/www/lib",
    "apps/www/content",
    "apps/www/docs",
    "apps/www/app",
  ];
  const exts = [".tsx", ".ts", ".jsx", ".js", ".css", ".mdx", ".md"];

  let totalReplaced = 0;
  const files = [];
  for (const root of roots) {
    try {
      for (const f of walkDir(join(process.cwd(), root), exts)) {
        if (!f.includes("globals.css")) files.push(f);
      }
    } catch {
      /* dir may not exist */
    }
  }

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf-8");
      const newContent = replaceInContent(content);
      if (content !== newContent) {
        writeFileSync(file, newContent);
        totalReplaced++;
        console.log(`Updated: ${file}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nDone. Updated ${totalReplaced} files.`);
}

main();
