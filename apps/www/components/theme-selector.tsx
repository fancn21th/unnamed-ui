"use client";

import { useState, useEffect } from "react";
import { useThemeConfig } from "@/components/active-theme";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// 定义可用的主题列表（中性色是默认主题）
const COLOR_THEMES = [
  { name: "neutral", label: "中性色" },
  { name: "brand", label: "品牌色" },
  { name: "success", label: "成功" },
  { name: "warning", label: "警告" },
  { name: "error", label: "错误" },
] as const;

const RADIUS_THEMES = [
  { name: "radius-none", label: "无圆角" },
  { name: "radius-small", label: "小圆角" },
  { name: "radius-medium", label: "中圆角" },
  { name: "radius-large", label: "大圆角" },
] as const;

const SPACING_THEMES = [
  { name: "spacing-compact", label: "紧凑" },
  { name: "spacing-normal", label: "正常" },
  { name: "spacing-comfortable", label: "舒适" },
] as const;

const SHADOW_THEMES = [
  { name: "shadow-none", label: "无阴影" },
  { name: "shadow-basic", label: "基础阴影" },
  { name: "shadow-medium", label: "中等阴影" },
  { name: "shadow-high", label: "高阴影" },
] as const;

const BORDER_WIDTH_THEMES = [
  { name: "border-thin", label: "细边框" },
  { name: "border-medium", label: "中等边框" },
] as const;

const FONT_THEMES = [
  { name: "font-pingfang", label: "PingFang 字体" },
  { name: "font-helvetica", label: "Helvetica 字体" },
  { name: "font-display", label: "显示字体" },
] as const;

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  
  // 从当前主题中解析各个部分（中性色是默认）
  const parseThemes = (theme: string) => {
    if (!theme || theme === "default") {
      return {
        color: "neutral",
        radius: "radius-medium",
        spacing: null,
        shadow: null,
        borderWidth: null,
        font: null,
      };
    }
    const themes = theme.split(" ").filter(Boolean);
    return {
      color: themes.find(t => COLOR_THEMES.some(ct => ct.name === t)) || "neutral",
      radius: themes.find(t => RADIUS_THEMES.some(rt => rt.name === t)) || "radius-medium",
      spacing: themes.find(t => SPACING_THEMES.some(st => st.name === t)) || null,
      shadow: themes.find(t => SHADOW_THEMES.some(st => st.name === t)) || null,
      borderWidth: themes.find(t => BORDER_WIDTH_THEMES.some(bt => bt.name === t)) || null,
      font: themes.find(t => FONT_THEMES.some(ft => ft.name === t)) || null,
    };
  };

  const currentThemes = parseThemes(activeTheme);
  const [colorTheme, setColorTheme] = useState(currentThemes.color);
  const [radiusTheme, setRadiusTheme] = useState(currentThemes.radius);
  const [spacingTheme, setSpacingTheme] = useState<string | null>(currentThemes.spacing);
  const [shadowTheme, setShadowTheme] = useState<string | null>(currentThemes.shadow);
  const [borderWidthTheme, setBorderWidthTheme] = useState<string | null>(currentThemes.borderWidth);
  const [fontTheme, setFontTheme] = useState<string | null>(currentThemes.font);
  
  // 初始化时设置默认主题
  useEffect(() => {
    if (!activeTheme || activeTheme === "default") {
      setActiveTheme("neutral radius-medium");
    }
  }, [activeTheme, setActiveTheme]);
  
  // 当 activeTheme 变化时，更新本地状态
  useEffect(() => {
    const themes = parseThemes(activeTheme);
    setColorTheme(themes.color);
    setRadiusTheme(themes.radius);
    setSpacingTheme(themes.spacing);
    setShadowTheme(themes.shadow);
    setBorderWidthTheme(themes.borderWidth);
    setFontTheme(themes.font);
  }, [activeTheme]);

  // 组合主题
  const updateTheme = (
    type: "color" | "radius" | "spacing" | "shadow" | "borderWidth" | "font",
    value: string | null
  ) => {
    let newColorTheme = colorTheme;
    let newRadiusTheme = radiusTheme;
    let newSpacingTheme = spacingTheme;
    let newShadowTheme = shadowTheme;
    let newBorderWidthTheme = borderWidthTheme;
    let newFontTheme = fontTheme;

    if (type === "color") {
      newColorTheme = value || "neutral";
      setColorTheme(newColorTheme);
    } else if (type === "radius") {
      newRadiusTheme = value || "radius-medium";
      setRadiusTheme(newRadiusTheme);
    } else if (type === "spacing") {
      newSpacingTheme = value;
      setSpacingTheme(newSpacingTheme);
    } else if (type === "shadow") {
      newShadowTheme = value;
      setShadowTheme(newShadowTheme);
    } else if (type === "borderWidth") {
      newBorderWidthTheme = value;
      setBorderWidthTheme(newBorderWidthTheme);
    } else if (type === "font") {
      newFontTheme = value;
      setFontTheme(newFontTheme);
    }

    // 组合所有选中的主题
    const themes = [];
    // 始终包含颜色主题（neutral 是默认）
    if (newColorTheme) {
      themes.push(newColorTheme);
    } else {
      themes.push("neutral");
    }
    // 始终包含圆角主题
    if (newRadiusTheme) {
      themes.push(newRadiusTheme);
    }
    // 可选：间距主题
    if (newSpacingTheme) {
      themes.push(newSpacingTheme);
    }
    // 可选：阴影主题
    if (newShadowTheme) {
      themes.push(newShadowTheme);
    }
    // 可选：边框宽度主题
    if (newBorderWidthTheme) {
      themes.push(newBorderWidthTheme);
    }
    // 可选：字体主题
    if (newFontTheme) {
      themes.push(newFontTheme);
    }

    // 设置组合后的主题
    const combinedTheme = themes.length > 0 ? themes.join(" ") : "neutral radius-medium";
    setActiveTheme(combinedTheme);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div>
        <h3 className="text-sm font-semibold mb-2">主题切换</h3>
        <p className="text-xs text-muted-foreground mb-4">
          选择不同的主题来预览效果，可以组合使用
        </p>
      </div>
      
      {/* 颜色主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">颜色主题</h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={colorTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("color", theme.name)}
              className={cn(
                "text-xs",
                colorTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 圆角主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">圆角主题</h4>
        <div className="flex flex-wrap gap-2">
          {RADIUS_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={radiusTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("radius", theme.name)}
              className={cn(
                "text-xs",
                radiusTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 间距主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">间距主题</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={spacingTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("spacing", null)}
            className={cn(
              "text-xs",
              spacingTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            默认间距
          </Button>
          {SPACING_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={spacingTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("spacing", theme.name)}
              className={cn(
                "text-xs",
                spacingTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 阴影主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">阴影主题</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={shadowTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("shadow", null)}
            className={cn(
              "text-xs",
              shadowTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            默认阴影
          </Button>
          {SHADOW_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={shadowTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("shadow", theme.name)}
              className={cn(
                "text-xs",
                shadowTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 边框宽度主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">边框宽度</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={borderWidthTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("borderWidth", null)}
            className={cn(
              "text-xs",
              borderWidthTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            默认边框
          </Button>
          {BORDER_WIDTH_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={borderWidthTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("borderWidth", theme.name)}
              className={cn(
                "text-xs",
                borderWidthTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 字体主题 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">字体主题</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={fontTheme === null ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("font", null)}
            className={cn(
              "text-xs",
              fontTheme === null && "bg-primary text-primary-foreground"
            )}
          >
            默认字体
          </Button>
          {FONT_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant={fontTheme === theme.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("font", theme.name)}
              className={cn(
                "text-xs",
                fontTheme === theme.name && "bg-primary text-primary-foreground"
              )}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

