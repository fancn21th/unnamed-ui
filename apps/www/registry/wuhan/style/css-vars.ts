import { readFileSync } from "node:fs";
import path from "node:path";

type CssVarsMap = Record<string, string>;

function extractBlock(source: string, blockStartRegex: RegExp) {
  const startMatch = blockStartRegex.exec(source);
  if (!startMatch) return "";

  // Find first "{" after the match, then grab until its matching "}".
  const startIdx = source.indexOf("{", startMatch.index);
  if (startIdx === -1) return "";

  let depth = 0;
  for (let i = startIdx; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    if (depth === 0) {
      return source.slice(startIdx + 1, i);
    }
  }
  return "";
}

function parseCssVars(blockContent: string): CssVarsMap {
  const vars: CssVarsMap = {};
  const re = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(blockContent)) !== null) {
    // IMPORTANT:
    // shadcn tailwind v4 css-vars updater expects keys WITHOUT leading `--`.
    // It will generate CSS declarations as `--${key}` and theme mappings as `var(--${key})`.
    // If we store keys with `--`, it becomes `----` in generated output.
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

export function getWuhanStyleCssVars() {
  const globalsPath = path.join(
    process.cwd(),
    "registry",
    "wuhan",
    "style",
    "globals.css",
  );
  const raw = readFileSync(globalsPath, "utf-8");

  // Tailwind v4 tokens are defined in `@theme inline { ... }` in this repo.
  // We mirror them into cssVars so `shadcn add` can inject them into consumer globals.
  const themeInline = extractBlock(raw, /@theme\s+inline\s*/g);
  const rootBlock = extractBlock(raw, /:root\s*/g);
  const darkBlock = extractBlock(raw, /\.dark\s*/g);

  const themeVars = parseCssVars(themeInline);
  const rootVars = parseCssVars(rootBlock);
  const darkVars = parseCssVars(darkBlock);

  const light = { ...themeVars, ...rootVars };
  // Dark inherits light, then overrides.
  const dark = { ...light, ...darkVars };

  return { light, dark } as const;
}
