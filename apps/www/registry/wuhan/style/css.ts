import { readFileSync } from "node:fs";
import path from "node:path";

type CssValue =
  | string
  | Record<string, string>
  | Record<string, Record<string, string>>;
type CssMap = Record<string, CssValue>;

const UTILITY_CLASS_RE = /^(border(?:-[trblxy])?|font-size-\d+|font-semibold)$/;

function parseDeclarations(block: string) {
  const result: Record<string, string> = {};
  const cleaned = block.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ");

  cleaned
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((decl) => {
      const idx = decl.indexOf(":");
      if (idx === -1) return;
      const prop = decl.slice(0, idx).trim();
      const value = decl.slice(idx + 1).trim();
      if (!prop || !value) return;
      result[prop] = value;
    });

  return result;
}

function extractKeyframesBlocks(source: string) {
  const blocks: Array<{ name: string; body: string }> = [];
  const re = /@keyframes\s+([a-zA-Z0-9_-]+)\s*/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(source)) !== null) {
    const name = match[1];
    const startIdx = source.indexOf("{", match.index);
    if (startIdx === -1) continue;

    let depth = 0;
    for (let i = startIdx; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth === 0) {
        const body = source.slice(startIdx + 1, i);
        blocks.push({ name, body });
        break;
      }
    }
  }

  return blocks;
}

function parseKeyframes(body: string) {
  const steps: Record<string, Record<string, string>> = {};
  const stepRe = /([^{]+)\{([^}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = stepRe.exec(body)) !== null) {
    const selector = match[1].trim();
    if (!selector) continue;
    const declarations = parseDeclarations(match[2]);
    if (Object.keys(declarations).length === 0) continue;
    steps[selector] = declarations;
  }

  return steps;
}

function extractUtilityClasses(source: string): CssMap {
  const css: CssMap = {};
  const ruleRe = /(^|\n)\s*\.([a-zA-Z0-9_-]+)\s*\{([^}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = ruleRe.exec(source)) !== null) {
    const className = match[2];
    if (!UTILITY_CLASS_RE.test(className)) continue;
    const declarations = parseDeclarations(match[3]);
    if (Object.keys(declarations).length === 0) continue;
    css[`@utility ${className}`] = declarations;
  }

  return css;
}

export function getWuhanStyleCss() {
  const globalsPath = path.join(
    process.cwd(),
    "registry",
    "wuhan",
    "style",
    "globals.css",
  );
  const raw = readFileSync(globalsPath, "utf-8");
  const css = extractUtilityClasses(raw);
  const keyframes = extractKeyframesBlocks(raw);
  keyframes.forEach(({ name, body }) => {
    const steps = parseKeyframes(body);
    if (Object.keys(steps).length === 0) return;
    css[`@keyframes ${name}`] = steps;
  });

  return css;
}
