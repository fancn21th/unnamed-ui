import chalk from "chalk";
import spawn from "cross-spawn";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

export type PackageJson = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export type Framework = "next" | "vite" | "unknown";

export function readJson<T>(filePath: string): T | null {
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJson(filePath: string, data: unknown) {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export function detectPackageManager(cwd: string) {
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(path.join(cwd, "package-lock.json"))) return "npm";
  return "npm";
}

export function detectFramework(pkg: PackageJson): Framework {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps.next) return "next";
  if (deps.vite) return "vite";
  return "unknown";
}

export function hasTailwindConfig(cwd: string) {
  const files = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.cjs",
    "tailwind.config.mjs",
  ];
  return files.some((file) => existsSync(path.join(cwd, file)));
}

export function ensureTailwindConfig(
  cwd: string,
  framework: Framework,
  useSrc: boolean,
  force?: boolean
) {
  if (!force && hasTailwindConfig(cwd)) return;
  const contentGlobs =
    framework === "next"
      ? [
          "./app/**/*.{ts,tsx,js,jsx,mdx}",
          "./components/**/*.{ts,tsx,js,jsx,mdx}",
          "./pages/**/*.{ts,tsx,js,jsx,mdx}",
          "./src/**/*.{ts,tsx,js,jsx,mdx}",
        ]
      : framework === "vite"
        ? ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"]
        : useSrc
          ? ["./src/**/*.{ts,tsx,js,jsx}"]
          : ["./**/*.{ts,tsx,js,jsx}"];

  const content = `import type { Config } from "tailwindcss";

const config: Config = {
  content: ${JSON.stringify(contentGlobs, null, 2)},
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`;

  writeFileSync(path.join(cwd, "tailwind.config.ts"), content, "utf-8");
}

export function ensurePostcssConfig(cwd: string, force?: boolean) {
  const files = ["postcss.config.mjs", "postcss.config.js", "postcss.config.cjs"];
  if (!force && files.some((file) => existsSync(path.join(cwd, file)))) return;
  const content = `const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
`;
  writeFileSync(path.join(cwd, "postcss.config.mjs"), content, "utf-8");
}

export function detectCssEntry(cwd: string) {
  const candidates = [
    "src/main.tsx",
    "src/main.ts",
    "src/index.tsx",
    "src/index.ts",
  ];
  const importRe = /import\s+["'](.+?\.css)["'];?/g;

  for (const file of candidates) {
    const abs = path.join(cwd, file);
    if (!existsSync(abs)) continue;
    const raw = readFileSync(abs, "utf-8");
    const match = importRe.exec(raw);
    if (match?.[1]) {
      const imported = match[1];
      const cssPath = path.join(path.dirname(file), imported);
      return cssPath.replace(/\\/g, "/");
    }
  }

  if (existsSync(path.join(cwd, "src/index.css"))) return "src/index.css";
  return "src/index.css";
}

export function ensureCssImports(
  cwd: string,
  cssPath: string,
  force?: boolean,
  customCssContent?: string
) {
  const abs = path.join(cwd, cssPath);
  mkdirSync(path.dirname(abs), { recursive: true });

  // 如果提供了自定义 CSS 内容，直接写入
  if (customCssContent) {
    writeFileSync(abs, customCssContent, "utf-8");
    return;
  }

  // 默认行为：确保导入 tailwindcss 和 tw-animate-css
  const needsTailwind = `@import "tailwindcss";`;
  const needsAnimate = `@import "tw-animate-css";`;
  let raw = existsSync(abs) ? readFileSync(abs, "utf-8") : "";

  const hasTailwind = raw.includes(needsTailwind);
  const hasAnimate = raw.includes(needsAnimate);

  if (!force && hasTailwind && hasAnimate) {
    return;
  }

  const prefixLines = [];
  if (!hasTailwind) prefixLines.push(needsTailwind);
  if (!hasAnimate) prefixLines.push(needsAnimate);
  if (prefixLines.length === 0) return;
  const prefix = `${prefixLines.join("\n")}\n\n`;

  raw = `${prefix}${raw}`;
  writeFileSync(abs, raw, "utf-8");
}

export function ensureAliasConfig(cwd: string, useSrc: boolean, force?: boolean) {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  const jsconfigPath = path.join(cwd, "jsconfig.json");
  const configPath = existsSync(tsconfigPath) ? tsconfigPath : jsconfigPath;
  const aliasTarget = useSrc ? "./src/*" : "./*";

  if (configPath) {
    const config = readJson<Record<string, any>>(configPath) ?? {};
    config.compilerOptions = config.compilerOptions ?? {};
    config.compilerOptions.baseUrl = config.compilerOptions.baseUrl ?? ".";
    config.compilerOptions.paths = config.compilerOptions.paths ?? {};
    if (force || !config.compilerOptions.paths["@/*"]) {
      config.compilerOptions.paths["@/*"] = [aliasTarget];
    }
    writeJson(configPath, config);
    return;
  }

  const fallback = {
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@/*": [aliasTarget],
      },
    },
  };
  writeJson(path.join(cwd, "jsconfig.json"), fallback);
}

export function ensureComponentsJson(
  cwd: string,
  cssPath: string,
  isNext: boolean,
  force?: boolean
) {
  const filePath = path.join(cwd, "components.json");
  if (!force && existsSync(filePath)) return;

  const payload = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: isNext,
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: cssPath,
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
  };

  writeJson(filePath, payload);
}

export function ensureDevDeps(
  cwd: string,
  pkg: PackageJson,
  packageManager: string
) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const required = [
    "tailwindcss",
    "@tailwindcss/postcss",
    "postcss",
    "tw-animate-css",
  ];
  const missing = required.filter((dep) => !deps[dep]);
  if (missing.length === 0) return;

  const installCmd =
    packageManager === "pnpm"
      ? ["pnpm", ["add", "-D", ...missing]]
      : packageManager === "yarn"
        ? ["yarn", ["add", "-D", ...missing]]
        : packageManager === "bun"
          ? ["bun", ["add", "-d", ...missing]]
          : ["npm", ["install", "-D", ...missing]];

  const [cmd, args] = installCmd as [string, string[]];
  const result = spawn.sync(cmd, args, { stdio: "inherit", cwd });
  if (result.status !== 0) {
    console.error(
      chalk.red(`Failed to install devDependencies: ${missing.join(", ")}`)
    );
    process.exit(result.status ?? 1);
  }
}

export function ensureLegacyPeerDepsNpmrc(cwd: string, force?: boolean) {
  const npmrcPath = path.join(cwd, ".npmrc");
  const setting = "legacy-peer-deps=true";
  if (!existsSync(npmrcPath)) {
    writeFileSync(npmrcPath, `${setting}\n`, "utf-8");
    return;
  }

  const raw = readFileSync(npmrcPath, "utf-8");
  if (!force && raw.includes(setting)) return;

  const next = raw.trimEnd();
  const separator = next.length > 0 ? "\n" : "";
  writeFileSync(npmrcPath, `${next}${separator}${setting}\n`, "utf-8");
}
