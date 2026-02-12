import { Command } from "commander";
import chalk from "chalk";
import spawn from "cross-spawn";
import { existsSync, readFileSync } from "fs";
import path from "path";

import {
  detectCssEntry,
  detectFramework,
  detectPackageManager,
  ensureAliasConfig,
  ensureComponentsJson,
  ensureCssImports,
  ensureDevDeps,
  ensureLegacyPeerDepsNpmrc,
  ensurePostcssConfig,
  ensureTailwindConfig,
  type PackageJson,
  readJson,
} from "../utils/project-setup";

// 武汉风格 globals.css 的路径 - 优先使用环境变量，否则从当前工作目录计算
function getWuhanGlobalsCssPath() {
  // 如果有 UNNAMED_UI_ROOT 环境变量，使用它
  if (process.env.UNNAMED_UI_ROOT) {
    return path.join(process.env.UNNAMED_UI_ROOT, "apps/www/registry/wuhan/style/globals.css");
  }
  // 否则从 packages/cli 目录计算
  const cliRoot = path.resolve(__dirname, "../..");
  return path.join(cliRoot, "../../apps/www/registry/wuhan/style/globals.css");
}

function runShadcnAdd(cwd: string, target: string) {
  const result = spawn.sync("npx", ["shadcn@latest", "add", target], {
    stdio: "inherit",
    cwd,
  });
  process.exit(result.status ?? 0);
}

export const addCommand = new Command()
  .name("add")
  .description("Install components with auto-init (tailwind + alias)")
  .argument("<registry-url>", "registry json url")
  .action((registryUrl: string) => {
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, "package.json");
    if (!existsSync(pkgPath)) {
      console.error(chalk.red("package.json not found in current directory."));
      process.exit(1);
    }

    const pkg = readJson<PackageJson>(pkgPath) ?? {};
    const framework = detectFramework(pkg);
    const useSrc = existsSync(path.join(cwd, "src"));
    const rawCssPath =
      framework === "next" && existsSync(path.join(cwd, "app"))
        ? "app/globals.css"
        : useSrc
          ? detectCssEntry(cwd)
          : "styles/globals.css";
    const cssPath = rawCssPath.replace(/\\/g, "/");

    console.log(chalk.cyan("🔧 Checking project prerequisites..."));
    ensureTailwindConfig(cwd, framework, useSrc);

    // 只有 Vite 项目需要 PostCSS 配置
    if (framework === "vite") {
      ensurePostcssConfig(cwd);
    }

    // 读取武汉风格的 globals.css 内容
    const wuhanCssPath = getWuhanGlobalsCssPath();
    let wuhanCssContent: string | undefined;
    if (existsSync(wuhanCssPath)) {
      wuhanCssContent = readFileSync(wuhanCssPath, "utf-8");
    }

    ensureCssImports(cwd, cssPath, undefined, wuhanCssContent);
    ensureAliasConfig(cwd, useSrc);
    ensureComponentsJson(cwd, cssPath, framework === "next");
    ensureLegacyPeerDepsNpmrc(cwd);

    const packageManager = detectPackageManager(cwd);
    ensureDevDeps(cwd, pkg, packageManager);

    console.log(chalk.cyan("📦 Installing component from registry..."));
    runShadcnAdd(cwd, registryUrl);
  });
