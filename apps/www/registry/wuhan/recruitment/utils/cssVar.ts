import { css } from "styled-components";
/**
 * CSS 变量前缀配置
 */
export const ANT_CSS_VAR_PREFIX = "ant"; // ant 组件的 CSS 变量前缀
export const CUSTOM_CSS_VAR_PREFIX = "custom"; // 自定义 CSS 变量前缀
/**
 * 自定义颜色类型定义（共用）
 */
export interface CustomColors {
  "blue-01": string;
  "blue-02": string;
  "blue-03": string;
  grey1: string;
}

export const lightCustomColors: CustomColors = {
  "blue-01": "#F4F8FF",
  "blue-02": "#DEEAFF",
  "blue-03": "#477BFF",
  grey1: "#23262b",
};

export const darkCustomColors: CustomColors = {
  "blue-01": "#F4F8FF",
  "blue-02": "#DEEAFF",
  "blue-03": "#477BFF",
  grey1: "#23262b",
};
// 自定义变量的 key 类型
type CustomVarKey = keyof CustomColors;

/**
 * CSS 变量前缀类型
 * - 'custom': 使用自定义变量前缀 (--custom-)
 * - 'ant': 使用 ant 变量前缀 (--ant-)
 */
type VarPrefix = "custom" | "ant";
/**
 * @example
 * 自定义变量（默认）
 * background: ${cssVar('header-bg')};
 *
 * ant 变量（指定 prefix）
 * color: ${cssVar('color-text', { prefix: 'ant' })};
 *
 * 完整格式（直接使用）
 * color: ${cssVar('--ant-color-text')};
 *
 * 带回退值
 * color: ${cssVar('header-bg', { fallback: '#fff' })};
 * color: ${cssVar('color-text', { prefix: 'custom', fallback: '#000' })};
 */
export function cssVar(
  varName: CustomVarKey,
  options?: { prefix?: "custom"; fallback?: string },
): string;
export function cssVar(
  varName: string,
  options: { prefix: "ant"; fallback?: string },
): string;
export function cssVar(
  varName: `--${string}`,
  options?: { fallback?: string },
): string;
export function cssVar(
  varName: string,
  options?: { prefix?: VarPrefix; fallback?: string },
): string;
export function cssVar(
  varName: CustomVarKey | string,
  options?: { prefix?: VarPrefix; fallback?: string },
): string {
  const { prefix = "custom", fallback } = options || {};

  if ((varName as string).startsWith("--"))
    return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;

  const prefixValue =
    prefix === ANT_CSS_VAR_PREFIX ? ANT_CSS_VAR_PREFIX : CUSTOM_CSS_VAR_PREFIX;
  const finalVarName = `--${prefixValue}-${varName}`;

  return fallback
    ? `var(${finalVarName}, ${fallback})`
    : `var(${finalVarName})`;
}

// 多行文本溢出显示省略号
export const multiLineEllipsis = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
