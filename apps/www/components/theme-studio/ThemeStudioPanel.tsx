"use client";

import * as React from "react";
import { Copy, RotateCcw, Search, Upload } from "lucide-react";
import { useTheme } from "next-themes";

import { useThemeConfig } from "@/components/active-theme";
import { CopyCodeButton } from "@/components/copy-code-button";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ThemeSelector } from "@/components/theme-selector";
import { cn } from "@/lib/utils";
import type { ThemeOverrides } from "@/lib/theme-css-vars";
import {
  applyCssVarsEverywhere,
  parsePx,
  readComputedCssVar,
  readInlineCssVar,
} from "@/lib/theme-css-vars";
import { Button } from "@/registry/wuhan/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/wuhan/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/wuhan/ui/accordion";
import { Input } from "@/registry/wuhan/ui/input";
import { Separator } from "@/registry/wuhan/ui/separator";
import { Slider } from "@/registry/wuhan/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/wuhan/ui/tabs";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { ThemeVarRow } from "./ThemeVarRow";

const STORAGE_KEY = "theme-studio:overrides:v3";
const STORAGE_DEBOUNCE_MS = 250;

type VarDef = {
  key: string;
  label: string;
  kind: "color" | "length" | "string";
  placeholder?: string;
  description?: string;
};

type VarGroup = {
  id: string;
  title: string;
  description?: string;
  keys: string[];
  defaultOpen?: boolean;
};

type OverridesByMode = {
  light: ThemeOverrides;
  dark: ThemeOverrides;
};

const COLOR_VARS: VarDef[] = [
  { key: "primary", label: "Primary", kind: "color" },
  { key: "primary-foreground", label: "Primary Foreground", kind: "color" },
  { key: "secondary", label: "Secondary", kind: "color" },
  { key: "secondary-foreground", label: "Secondary Foreground", kind: "color" },
  { key: "accent", label: "Accent", kind: "color" },
  { key: "accent-foreground", label: "Accent Foreground", kind: "color" },
  { key: "muted", label: "Muted", kind: "color" },
  { key: "muted-foreground", label: "Muted Foreground", kind: "color" },
  { key: "background", label: "Background", kind: "color" },
  { key: "foreground", label: "Foreground", kind: "color" },
  { key: "card", label: "Card", kind: "color" },
  { key: "card-foreground", label: "Card Foreground", kind: "color" },
  { key: "popover", label: "Popover", kind: "color" },
  { key: "popover-foreground", label: "Popover Foreground", kind: "color" },
  { key: "border", label: "Border", kind: "color" },
  { key: "input", label: "Input", kind: "color" },
  { key: "ring", label: "Ring", kind: "color" },
  { key: "destructive", label: "Destructive", kind: "color" },
  { key: "destructive-foreground", label: "Destructive Foreground", kind: "color" },
  { key: "surface", label: "Surface", kind: "color" },
  { key: "surface-foreground", label: "Surface Foreground", kind: "color" },
];

const QUICK_COLOR_KEYS = ["primary", "background", "border", "ring"];

const COLOR_GROUPS: VarGroup[] = [
  {
    id: "preview",
    title: "预览与关键色",
    description: "先从高频变量入手，快速把整体调顺。",
    keys: QUICK_COLOR_KEYS,
    defaultOpen: true,
  },
  {
    id: "foundation",
    title: "基础层级",
    description: "背景/前景/容器层级相关（影响整体观感）。",
    keys: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "surface",
      "surface-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
    ],
    defaultOpen: true,
  },
  {
    id: "interaction",
    title: "交互与边界",
    description: "输入框/边框/焦点环（影响高级感与可用性）。",
    keys: ["border", "input", "ring"],
  },
  {
    id: "feedback",
    title: "反馈与强调",
    description: "Primary 与 destructive 等语义色（影响品牌与操作反馈）。",
    keys: ["primary", "primary-foreground", "destructive", "destructive-foreground"],
  },
];

const NEUTRAL_STEPS = ["0", "10", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] as const;
const BASE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"] as const;
const EXTREME_STEPS = ["10000"] as const;

/** 将 palette 前缀+档位 映射为 Figma 变量名 */
function toFigmaVarKey(prefix: string, step: string, mode: "light" | "dark"): string {
  const modePrefix = mode === "light" ? "Light" : "Dark";
  const cap = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  return `${modePrefix}-${cap}-${prefix}-${step}`;
}

const PALETTE_PREFIXES = ["neutral", "brand", "success", "warning", "error"] as const;

/** 判断是否为旧版 palette key（如 neutral-0, brand-600） */
function isLegacyPaletteKey(key: string): boolean {
  for (const p of PALETTE_PREFIXES) {
    if (key.startsWith(`${p}-`) && key.length > p.length + 1) return true;
  }
  return false;
}

/** 将旧版 palette key 迁移为 Figma 变量名 */
function migrateLegacyPaletteKey(key: string, mode: "light" | "dark"): string {
  for (const p of PALETTE_PREFIXES) {
    if (key.startsWith(`${p}-`)) {
      const step = key.slice(p.length + 1);
      return toFigmaVarKey(p, step, mode);
    }
  }
  return key;
}

/** 清理并迁移单模式的 overrides */
function cleanAndMigrateMode(obj: Record<string, unknown>, mode: "light" | "dark"): ThemeOverrides {
  const out: ThemeOverrides = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v !== "string" || !v.trim()) continue;
    const key = isLegacyPaletteKey(k) ? migrateLegacyPaletteKey(k, mode) : k;
    out[key] = v.trim();
  }
  return out;
}

function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stringifyOverrides(overrides: ThemeOverrides) {
  const sorted = Object.fromEntries(
    Object.entries(overrides).sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify(sorted, null, 2);
}

function stringifyOverridesByMode(overridesByMode: OverridesByMode) {
  const sorted: OverridesByMode = {
    light: Object.fromEntries(
      Object.entries(overridesByMode.light).sort(([a], [b]) => a.localeCompare(b)),
    ),
    dark: Object.fromEntries(
      Object.entries(overridesByMode.dark).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
  return JSON.stringify(sorted, null, 2);
}

function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">{title}</CardTitle>
            {description ? <CardDescription className="text-xs">{description}</CardDescription> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function SwatchBar({ swatches }: { swatches: { name: string; bg: string; fg: string }[] }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="flex h-16">
        {swatches.map((s) => (
          <div
            key={s.name + s.bg}
            className={cn(
              "group/swatch relative h-full flex-1 transition-all duration-300 ease-in-out",
              "hover:flex-grow-[1.5]",
            )}
            style={{ backgroundColor: s.bg }}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "opacity-0 group-hover/swatch:opacity-100",
                "transition-opacity duration-300 ease-in-out",
                "pointer-events-none text-xs font-medium",
              )}
              style={{ color: s.fg }}
            >
              {s.name}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/20 px-3 py-2 text-muted-foreground text-xs">
        颜色预览（hover 显示名称）
      </div>
    </div>
  );
}

function PaletteEditor({
  title,
  description,
  prefix,
  steps,
  mode,
  activeOverrides,
  activeTheme,
  onSetOverride,
  onSetOverrideRaf,
}: {
  title: string;
  description?: string;
  prefix: string;
  steps: readonly string[];
  mode: "light" | "dark";
  activeOverrides: ThemeOverrides;
  activeTheme: string;
  onSetOverride: (key: string, value: string) => void;
  onSetOverrideRaf?: (key: string, value: string) => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [selected, setSelected] = React.useState<string>(steps[0] ?? "500");

  const keyFor = (step: string) => toFigmaVarKey(prefix, step, mode);
  const legacyKeyFor = (step: string) => `${prefix}-${step}`;
  const selectedKey = keyFor(selected);

  // 如果某些极端档位不存在（比如只有 light 有 10000），就隐藏。
  const visibleSteps = React.useMemo(() => {
    // SSR/首帧 hydration：不要读取 computed style，否则会造成 server/client 文本不一致
    if (!mounted) return [...steps];
    return steps.filter((s) => Boolean(readComputedCssVar(keyFor(s))));
  }, [mounted, steps, prefix, mode, activeTheme]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // 确保 selected 在可见范围内
    if (visibleSteps.length === 0) return;
    if (!visibleSteps.includes(selected)) setSelected(visibleSteps[0]);
  }, [selected, visibleSteps]);

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold">{title}</div>
          {description ? <div className="text-muted-foreground text-xs mt-1">{description}</div> : null}
        </div>
        <div className="text-muted-foreground text-xs shrink-0">
          {visibleSteps.length} shades
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2 sm:grid-cols-11">
        {visibleSteps.map((step) => {
          const k = keyFor(step);
          const isActive = step === selected;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setSelected(step)}
              className={cn(
                "h-8 rounded border transition-colors",
                isActive ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : "hover:border-foreground/40",
                !mounted && "bg-muted/30",
              )}
              title={mounted ? `--${k}: ${readComputedCssVar(k) || ""}` : `--${k}`}
              // 性能优化：直接用 var(--x) 渲染色块，避免 render 时解析/读取 computed style。
              style={mounted ? { backgroundColor: `var(--${k})` } : undefined}
            >
              <span className="sr-only">{k}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <ThemeVarRow
          def={{ key: selectedKey, label: `${title} ${selected}`, kind: "color" }}
          overriddenValue={activeOverrides[selectedKey] ?? activeOverrides[legacyKeyFor(selected)]}
          isOverridden={Boolean(activeOverrides[selectedKey] ?? activeOverrides[legacyKeyFor(selected)])}
          activeTheme={activeTheme}
          showComputedValues={false}
          onSetOverride={onSetOverride}
          onSetOverrideRaf={onSetOverrideRaf}
        />
      </div>
    </div>
  );
}

const PaletteTab = React.memo(
  function PaletteTab({
    isActive,
    mode,
    activeOverrides,
    activeTheme,
    onSetOverride,
    onSetOverrideRaf,
  }: {
    isActive: boolean;
    mode: string;
    activeOverrides: ThemeOverrides;
    activeTheme: string;
    onSetOverride: (key: string, value: string) => void;
    onSetOverrideRaf: (key: string, value: string) => void;
  }) {
    return (
      <SectionCard
        title="基础色卡（系列色阶）"
        description={`按系列查看并修改色阶变量（当前模式：${mode}）。这些变量会联动影响主题（brand/success/warning/error/neutral）。`}
      >
        <div className="grid gap-4">
          <PaletteEditor
            title="Neutral"
            description="中性色阶（最基础、影响背景/文字/边框）"
            prefix="neutral"
            steps={NEUTRAL_STEPS}
            mode={mode === "light" ? "light" : "dark"}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={onSetOverride}
            onSetOverrideRaf={onSetOverrideRaf}
          />
          <PaletteEditor
            title="Brand"
            description="品牌色阶（影响 primary/ring 等）"
            prefix="brand"
            steps={BASE_STEPS}
            mode={mode === "light" ? "light" : "dark"}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={onSetOverride}
            onSetOverrideRaf={onSetOverrideRaf}
          />
          <PaletteEditor
            title="Success"
            description="成功色阶"
            prefix="success"
            steps={BASE_STEPS}
            mode={mode === "light" ? "light" : "dark"}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={onSetOverride}
            onSetOverrideRaf={onSetOverrideRaf}
          />
          <PaletteEditor
            title="Warning"
            description="警告色阶（包含部分极端档位）"
            prefix="warning"
            steps={[...BASE_STEPS, ...EXTREME_STEPS]}
            mode={mode === "light" ? "light" : "dark"}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={onSetOverride}
            onSetOverrideRaf={onSetOverrideRaf}
          />
          <PaletteEditor
            title="Error"
            description="错误色阶（包含部分极端档位）"
            prefix="error"
            steps={[...BASE_STEPS, ...EXTREME_STEPS]}
            mode={mode === "light" ? "light" : "dark"}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={onSetOverride}
            onSetOverrideRaf={onSetOverrideRaf}
          />
        </div>
      </SectionCard>
    );
  },
  // palette tab 隐藏时不跟随外部 state 频繁重渲；切回时再一次性更新
  (prev, next) => !prev.isActive && !next.isActive,
);

export function ThemeStudioPanel({ className }: { className?: string }) {
  const { activeTheme, setIsPrimaryCustomized } = useThemeConfig();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const mode: keyof OverridesByMode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  const [overridesByMode, setOverridesByMode] = React.useState<OverridesByMode>({
    light: {},
    dark: {},
  });
  const [query, setQuery] = React.useState("");
  const [rawJson, setRawJson] = React.useState("");
  const [isEditingRawJson, setIsEditingRawJson] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"color" | "palette" | "other" | "advanced">("color");

  const activeOverrides = overridesByMode[mode];
  const appliedRef = React.useRef<ThemeOverrides>({});
  const jsonString = React.useMemo(() => stringifyOverrides(activeOverrides), [activeOverrides]);
  const persistedJsonString = React.useMemo(() => stringifyOverridesByMode(overridesByMode), [overridesByMode]);
  const modifiedCount = Object.keys(activeOverrides).length;

  // 颜色预览：用 CSS var 直接渲染，避免拖动时做昂贵的颜色解析/计算
  const swatches = React.useMemo(
    () => [
      { name: "Primary", bg: "var(--primary)", fg: "var(--primary-foreground)" },
      { name: "Secondary", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
      { name: "Accent", bg: "var(--accent)", fg: "var(--accent-foreground)" },
      { name: "Muted", bg: "var(--muted)", fg: "var(--muted-foreground)" },
      { name: "Background", bg: "var(--background)", fg: "var(--foreground)" },
    ],
    [],
  );

  // Load overrides
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as unknown;
      if (!isNonEmptyObject(parsed)) return;

      // v3: { light: {...}, dark: {...} }
      if ("light" in parsed || "dark" in parsed) {
        const lightObj = isNonEmptyObject((parsed as any).light) ? (parsed as any).light : {};
        const darkObj = isNonEmptyObject((parsed as any).dark) ? (parsed as any).dark : {};

        setOverridesByMode({
          light: cleanAndMigrateMode(lightObj, "light"),
          dark: cleanAndMigrateMode(darkObj, "dark"),
        });
        return;
      }

      // v2 fallback: { key: value } -> 只当作 light，dark 为空（避免暗色被意外污染）
      const obj = parsed as Record<string, unknown>;
      setOverridesByMode({ light: cleanAndMigrateMode(obj, "light"), dark: {} });
    } catch {
      // ignore
    }
  }, []);

  // Persist overrides (debounced)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, persistedJsonString);
    }, STORAGE_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [persistedJsonString]);

  // Keep raw JSON in sync, but don't overwrite while editing
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (isEditingRawJson) return;
    const t = window.setTimeout(() => {
      setRawJson(persistedJsonString);
    }, STORAGE_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [persistedJsonString, isEditingRawJson]);

  // Apply overrides (diff only)
  React.useEffect(() => {
    const prev = appliedRef.current;
    const next = activeOverrides;

    const patch: Record<string, string | null> = {};
    for (const key of Object.keys(prev)) {
      if (!(key in next)) patch[key] = null;
    }
    for (const [key, value] of Object.entries(next)) {
      if (prev[key] !== value) patch[key] = value;
    }
    applyCssVarsEverywhere(patch);
    appliedRef.current = next;
  }, [mode, activeOverrides]);

  // Primary customization toggle
  React.useEffect(() => {
    setIsPrimaryCustomized(Boolean(activeOverrides.primary));
  }, [activeOverrides.primary, setIsPrimaryCustomized]);

  // When theme changes, ensure overrides stay applied
  React.useEffect(() => {
    applyCssVarsEverywhere(activeOverrides);
  }, [activeTheme, activeOverrides]);

  // Sync with ThemeSelector's "brand" action
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      setOverridesByMode((prev) => {
        const next = { ...prev };
        for (const m of ["light", "dark"] as const) {
          if (!next[m].primary && !next[m]["primary-foreground"]) continue;
          const cleaned = { ...next[m] };
          delete cleaned.primary;
          delete cleaned["primary-foreground"];
          next[m] = cleaned;
        }
        return next;
      });
    };
    window.addEventListener("theme-color-reset", handler);
    return () => window.removeEventListener("theme-color-reset", handler);
  }, []);

  const deferredQuery = React.useDeferredValue(query);
  const filteredQuery = deferredQuery.trim().toLowerCase();

  const varsByKey = React.useMemo(() => {
    const map = new Map<string, VarDef>();
    for (const v of COLOR_VARS) {
      map.set(v.key, v);
    }
    return map;
  }, []);

  const shouldShow = React.useCallback(
    (v: VarDef) => {
      if (!filteredQuery) return true;
      const hay = `${v.key} ${v.label} ${v.description ?? ""}`.toLowerCase();
      return hay.includes(filteredQuery);
    },
    [filteredQuery],
  );

  const setOverride = React.useCallback(
    (key: string, value: string) => {
      setOverridesByMode((prev) => {
        const next = { ...prev };
        const current = { ...next[mode] };
        const trimmed = value.trim();
        if (!trimmed) delete current[key];
        else current[key] = trimmed;
        next[mode] = current;
        return next;
      });
    },
    [mode],
  );

  // 高频颜色拖动：rAF 节流（每帧最多一次 state 更新）
  const rafIdRef = React.useRef<number | null>(null);
  const rafPatchRef = React.useRef<{
    light: Record<string, string | null>;
    dark: Record<string, string | null>;
  }>({ light: {}, dark: {} });

  const flushRafPatch = React.useCallback(() => {
    rafIdRef.current = null;
    const patches = rafPatchRef.current;
    rafPatchRef.current = { light: {}, dark: {} };

    setOverridesByMode((prev) => {
      const next = { ...prev };
      (["light", "dark"] as const).forEach((m) => {
        const entries = Object.entries(patches[m]);
        if (entries.length === 0) return;
        const current = { ...next[m] };
        for (const [k, v] of entries) {
          if (!v) delete current[k];
          else current[k] = v;
        }
        next[m] = current;
      });
      return next;
    });
  }, []);

  const setOverrideRaf = React.useCallback(
    (key: string, value: string) => {
      const trimmed = value.trim();
      const v = trimmed ? trimmed : null;
      rafPatchRef.current[mode][key] = v;
      if (rafIdRef.current) return;
      rafIdRef.current = window.requestAnimationFrame(flushRafPatch);
    },
    [flushRafPatch, mode],
  );

  const resetAll = React.useCallback(() => {
    setOverridesByMode((prev) => {
      // 清掉所有已应用（当前模式）以及其它模式的键（简单粗暴：把两套都置空）
      const patch: Record<string, null> = {};
      for (const key of Object.keys(prev.light)) patch[key] = null;
      for (const key of Object.keys(prev.dark)) patch[key] = null;
      applyCssVarsEverywhere(patch);
      return { light: {}, dark: {} };
    });
    // 额外保证：清空本地存储 & 同步 JSON 文本（用户会直观看这里）
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    setIsEditingRawJson(false);
    setRawJson(stringifyOverridesByMode({ light: {}, dark: {} }));
    setIsPrimaryCustomized(false);
  }, [setIsPrimaryCustomized]);

  const copyOverridesCss = React.useCallback(async () => {
    const lines = Object.entries(activeOverrides)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `  --${k}: ${v};`);
    const css = `:root {\n${lines.join("\n")}\n}\n`;
    try {
      await navigator.clipboard.writeText(css);
    } catch {
      // ignore
    }
  }, [activeOverrides]);

  const applyRawJson = React.useCallback(() => {
    try {
      const parsed = JSON.parse(rawJson) as unknown;
      if (!isNonEmptyObject(parsed)) return;

      if ("light" in parsed || "dark" in parsed) {
        const lightObj = isNonEmptyObject((parsed as any).light) ? (parsed as any).light : {};
        const darkObj = isNonEmptyObject((parsed as any).dark) ? (parsed as any).dark : {};
        setOverridesByMode({
          light: cleanAndMigrateMode(lightObj, "light"),
          dark: cleanAndMigrateMode(darkObj, "dark"),
        });
        return;
      }

      // 兼容：如果用户粘贴的是扁平对象，就只应用到当前模式
      const obj = parsed as Record<string, unknown>;
      const m = mode === "dark" ? "dark" : "light";
      setOverridesByMode((prev) => ({ ...prev, [mode]: cleanAndMigrateMode(obj, m) }));
    } catch {
      // ignore
    }
  }, [rawJson, mode]);

  // 解析设计令牌格式（Design Tokens Format）
  // 格式：{ Light: { Brand: { "brand-900": { "$value": "#..." } } }, Dark: { ... } }
  // 导入后映射为 Figma 变量名：Light-Brand-brand-900, Dark-Brand-brand-900 等
  const parseDesignTokensFormat = React.useCallback((jsonData: unknown): OverridesByMode => {
    const result: OverridesByMode = { light: {}, dark: {} };

    if (!isNonEmptyObject(jsonData)) return result;

    const processColorGroup = (
      group: Record<string, unknown>,
      target: ThemeOverrides,
      mode: "light" | "dark",
      groupName: string,
    ) => {
      const prefix = groupName.toLowerCase();
      for (const [key, value] of Object.entries(group)) {
        if (!isNonEmptyObject(value) || !("$value" in value) || typeof value.$value !== "string")
          continue;
        // key 格式为 prefix-step，如 brand-900、neutral-0
        const step = key.startsWith(`${prefix}-`) ? key.slice(prefix.length + 1) : key;
        const figmaKey = toFigmaVarKey(prefix, step, mode);
        target[figmaKey] = value.$value;
      }
    };

    // 处理 Light 主题
    if ("Light" in jsonData && isNonEmptyObject(jsonData.Light)) {
      const light = jsonData.Light;
      const colorGroups = ["Brand", "Neutral", "Success", "Warning", "Error"] as const;
      for (const groupName of colorGroups) {
        if (groupName in light && isNonEmptyObject(light[groupName])) {
          processColorGroup(
            light[groupName] as Record<string, unknown>,
            result.light,
            "light",
            groupName,
          );
        }
      }
    }

    // 处理 Dark 主题
    if ("Dark" in jsonData && isNonEmptyObject(jsonData.Dark)) {
      const dark = jsonData.Dark;
      const colorGroups = ["Brand", "Neutral", "Success", "Warning", "Error"] as const;
      for (const groupName of colorGroups) {
        if (groupName in dark && isNonEmptyObject(dark[groupName])) {
          processColorGroup(
            dark[groupName] as Record<string, unknown>,
            result.dark,
            "dark",
            groupName,
          );
        }
      }
    }

    return result;
  }, []);

  // 解析主题覆盖格式（Theme Overrides Format）
  // 格式1：{ light: { "brand-900": "#...", ... }, dark: { ... } }
  // 格式2：{ "brand-900": "#...", ... } （扁平对象，只应用到当前模式）
  // 旧 key（neutral-0、brand-600）会自动迁移为 Figma 变量名
  const parseThemeOverridesFormat = React.useCallback(
    (jsonData: unknown, currentMode: keyof OverridesByMode): OverridesByMode => {
      const result: OverridesByMode = { light: {}, dark: {} };

      if (!isNonEmptyObject(jsonData)) return result;

      // 格式1：包含 light/dark 键
      if ("light" in jsonData || "dark" in jsonData) {
        const lightObj = isNonEmptyObject((jsonData as any).light) ? (jsonData as any).light : {};
        const darkObj = isNonEmptyObject((jsonData as any).dark) ? (jsonData as any).dark : {};
        return {
          light: cleanAndMigrateMode(lightObj, "light"),
          dark: cleanAndMigrateMode(darkObj, "dark"),
        };
      }

      // 格式2：扁平对象，只应用到当前模式
      const mode = currentMode === "dark" ? "dark" : "light";
      result[currentMode] = cleanAndMigrateMode(jsonData as Record<string, unknown>, mode);
      return result;
    },
    [],
  );

  // 自动检测并解析多种格式
  const parseTokenFile = React.useCallback(
    (jsonData: unknown, currentMode: keyof OverridesByMode): OverridesByMode => {
      if (!isNonEmptyObject(jsonData)) return { light: {}, dark: {} };

      // 优先检测设计令牌格式（包含 Light/Dark 顶层键）
      if ("Light" in jsonData || "Dark" in jsonData) {
        return parseDesignTokensFormat(jsonData);
      }

      // 否则按主题覆盖格式解析
      return parseThemeOverridesFormat(jsonData, currentMode);
    },
    [parseDesignTokensFormat, parseThemeOverridesFormat],
  );

  const handleFileUpload = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const jsonData = JSON.parse(text);
        const parsed = parseTokenFile(jsonData, mode);
        
        setOverridesByMode(parsed);
        setRawJson(stringifyOverridesByMode(parsed));
        
        // 重置文件输入，允许重复上传同一文件
        event.target.value = "";
      } catch (error) {
        console.error("Failed to parse file:", error);
        // 可以添加错误提示
      }
    },
    [parseTokenFile, mode],
  );

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getPxVar = React.useCallback(
    (key: string, fallback: number) => {
      const inlineOrOverride = activeOverrides[key] ?? readInlineCssVar(key) ?? "";
      return parsePx(inlineOrOverride) ?? parsePx(readComputedCssVar(key)) ?? fallback;
    },
    [activeOverrides],
  );

  const radiusPx = getPxVar("radius", 6);
  const spacingPx = getPxVar("spacing", 4);
  const borderWidthPx = getPxVar("border-width", 1);

  const SearchBar = (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索变量…（primary / radius / border）"
        className="pl-8"
      />
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex items-start justify-between gap-3 py-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">主题工作台</h1>
              <span className="rounded-full border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                {modifiedCount} modified
              </span>
            </div>
            <p className="text-muted-foreground text-xs mt-1 truncate">
              当前组合：{activeTheme || "default"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" onClick={resetAll} aria-label="Reset all">
              <RotateCcw className="size-4" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={copyOverridesCss} aria-label="Copy overrides CSS">
              <Copy className="size-4" />
            </Button>
            <ModeSwitcher />
            <CopyCodeButton variant="outline" size="sm" overridesByMode={overridesByMode} />
          </div>
        </div>

        <div className="pb-3 space-y-3">
          {SearchBar}
        </div>
        <Separator />
      </div>

      {/* Body */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
        <div className="flex items-center justify-between gap-3">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="color">颜色</TabsTrigger>
            <TabsTrigger value="palette">基础色卡</TabsTrigger>
            <TabsTrigger value="other">其他</TabsTrigger>
            <TabsTrigger value="advanced">高级</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="color" className="mt-4 space-y-4">
          <SectionCard
            title="颜色预览"
            description="无需看变量名，也能快速感知主题方向。"
            action={
              <Button variant="outline" size="sm" onClick={() => setQuery("primary")}>
                去改 Primary
              </Button>
            }
          >
            <SwatchBar swatches={swatches} />
          </SectionCard>

          <SectionCard
            title="颜色分组"
            description="按层级组织变量，减少噪音，但能力不丢。"
          >
            <Accordion
              type="multiple"
              defaultValue={COLOR_GROUPS.filter((g) => g.defaultOpen).map((g) => g.id)}
              className="w-full"
            >
              {COLOR_GROUPS.map((group) => {
                const defs = group.keys
                  .map((k) => varsByKey.get(k))
                  .filter(Boolean) as VarDef[];
                const visible = defs.filter(shouldShow);
                if (visible.length === 0) return null;

                return (
                  <AccordionItem key={group.id} value={group.id}>
                    <AccordionTrigger>{group.title}</AccordionTrigger>
                    <AccordionContent>
                      {group.description ? (
                        <div className="text-muted-foreground text-xs mb-3">{group.description}</div>
                      ) : null}
                      <div className="space-y-4">
                        {visible.map((def) => (
                          <ThemeVarRow
                            key={def.key}
                            def={def}
                            overriddenValue={activeOverrides[def.key]}
                            isOverridden={Boolean(activeOverrides[def.key])}
                            activeTheme={activeTheme}
                            showComputedValues={false}
                            onSetOverride={setOverride}
                            onSetOverrideRaf={setOverrideRaf}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </SectionCard>

        </TabsContent>

        <TabsContent value="palette" className="mt-4 space-y-4">
          <PaletteTab
            isActive={activeTab === "palette"}
            mode={mode}
            activeOverrides={activeOverrides}
            activeTheme={activeTheme}
            onSetOverride={setOverride}
            onSetOverrideRaf={setOverrideRaf}
          />
        </TabsContent>

        <TabsContent value="other" className="mt-4 space-y-4">
          <SectionCard title="密度与形状" description="最常用的三项：圆角 / 间距 / 边框宽度。">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Radius</div>
                  <div className="text-muted-foreground text-xs">{radiusPx}px</div>
                </div>
                <Slider
                  value={[Math.min(24, Math.max(0, radiusPx))]}
                  min={0}
                  max={24}
                  step={1}
                  onValueChange={(v) => setOverride("radius", `${v[0]}px`)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Spacing</div>
                  <div className="text-muted-foreground text-xs">{spacingPx}px</div>
                </div>
                <Slider
                  value={[Math.min(12, Math.max(1, spacingPx))]}
                  min={1}
                  max={12}
                  step={1}
                  onValueChange={(v) => setOverride("spacing", `${v[0]}px`)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Border width</div>
                  <div className="text-muted-foreground text-xs">{borderWidthPx}px</div>
                </div>
                <Slider
                  value={[Math.min(6, Math.max(0, borderWidthPx))]}
                  min={0}
                  max={6}
                  step={1}
                  onValueChange={(v) => setOverride("border-width", `${v[0]}px`)}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="主题组合" description="组合 preset class（圆角/间距/阴影/字体）。">
            <ThemeSelector />
          </SectionCard>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4 space-y-4">
          <SectionCard title="导入/导出" description="批量导入/导出主题配置。">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">上传文件导入</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="size-4" />
                    选择文件
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="space-y-1.5">
                  <p className="text-muted-foreground text-xs">
                    支持上传 JSON 格式的主题文件，系统会自动检测格式并解析。
                  </p>
                  <details className="text-muted-foreground text-xs">
                    <summary className="cursor-pointer hover:text-foreground">支持的格式</summary>
                    <div className="mt-2 space-y-2 pl-4">
                      <div>
                        <div className="font-medium mb-1">格式1：设计令牌格式（Design Tokens）</div>
                        <pre className="bg-muted/50 p-2 rounded text-[10px] overflow-x-auto">
{`{
  "Light": {
    "Brand": {
      "brand-900": { "$value": "#00142b" },
      "brand-600": { "$value": "#00589f" }
    },
    "Neutral": { ... },
    "Success": { ... },
    "Warning": { ... },
    "Error": { ... }
  },
  "Dark": { ... }
}`}
                        </pre>
                      </div>
                      <div>
                        <div className="font-medium mb-1">格式2：主题覆盖格式（双模式）</div>
                        <p className="text-muted-foreground/80 mb-1">
                          支持 Figma 变量名（Light-Brand-brand-600）或旧 key（brand-600，导入时自动迁移）
                        </p>
                        <pre className="bg-muted/50 p-2 rounded text-[10px] overflow-x-auto">
{`{
  "light": {
    "Light-Brand-brand-900": "#00142b",
    "Light-Brand-brand-600": "#00589f"
  },
  "dark": {
    "Dark-Brand-brand-900": "#12172a",
    "Dark-Brand-brand-600": "#424cdc"
  }
}`}
                        </pre>
                      </div>
                      <div>
                        <div className="font-medium mb-1">格式3：主题覆盖格式（单模式）</div>
                        <pre className="bg-muted/50 p-2 rounded text-[10px] overflow-x-auto">
{`{
  "Light-Brand-brand-600": "#00589f",
  "Light-Neutral-neutral-0": "#ffffff"
}`}
                        </pre>
                        <p className="text-[10px] mt-1">
                          （扁平对象，只应用到当前模式。旧 key 如 brand-600 导入时自动迁移）
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium">JSON</div>
                <div className="flex items-center gap-2">
                  <Button variant="default" size="sm" onClick={applyRawJson}>
                    Apply
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetAll}>
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                onFocus={() => setIsEditingRawJson(true)}
                onBlur={() => setIsEditingRawJson(false)}
                className="min-h-40 font-mono text-xs"
              />

              <Separator />

              <div className="space-y-2">
                <div className="text-sm font-medium">Overrides</div>
                {modifiedCount === 0 ? (
                  <div className="text-muted-foreground text-sm">No overrides yet.</div>
                ) : (
                  <div className="space-y-2">
                    {Object.keys(activeOverrides)
                      .sort((a, b) => a.localeCompare(b))
                      .map((k) => (
                        <div
                          key={k}
                          className="flex items-center justify-between gap-2 rounded-md border bg-muted/10 px-3 py-2"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium">--{k}</div>
                            <div className="text-muted-foreground text-xs truncate">{activeOverrides[k]}</div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setOverride(k, "")}>
                            reset
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}


