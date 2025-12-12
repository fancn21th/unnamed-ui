"use client";

import { useState, useEffect } from "react";
import { useThemeConfig } from "@/components/active-theme";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";

// 定义可用的主色调选项
const PRIMARY_COLOR_OPTIONS = [
  { name: "brand", label: "品牌色" },
  { name: "custom", label: "自定义" },
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


const FONT_THEMES = [
  { name: "font-pingfang", label: "PingFang 字体" },
  { name: "font-helvetica", label: "Helvetica 字体" },
  { name: "font-display", label: "显示字体" },
] as const;

export function ThemeSelector({ className }: React.ComponentProps<"div">) {
  const { activeTheme, setActiveTheme, isPrimaryCustomized, setIsPrimaryCustomized } = useThemeConfig();
  
  // 从当前主题中解析各个部分
  const parseThemes = (theme: string) => {
    if (!theme || theme === "default") {
      return {
        primaryColor: isPrimaryCustomized ? "custom" : "brand",
        radius: "radius-medium",
        spacing: null,
        shadow: null,
        font: null,
      };
    }
    const themes = theme.split(" ").filter(Boolean);
    // 如果自定义了颜色，主色调应该是 custom，否则是 brand
    const foundPrimaryColor = themes.find(t => PRIMARY_COLOR_OPTIONS.some(ct => ct.name === t));
    return {
      primaryColor: foundPrimaryColor || (isPrimaryCustomized ? "custom" : "brand"),
      radius: themes.find(t => RADIUS_THEMES.some(rt => rt.name === t)) || "radius-medium",
      spacing: themes.find(t => SPACING_THEMES.some(st => st.name === t)) || null,
      shadow: themes.find(t => SHADOW_THEMES.some(st => st.name === t)) || null,
      font: themes.find(t => FONT_THEMES.some(ft => ft.name === t)) || null,
    };
  };

  const currentThemes = parseThemes(activeTheme);
  // 初始状态：如果自定义了颜色则显示 custom，否则显示 brand
  const [primaryColor, setPrimaryColor] = useState(() => {
    return isPrimaryCustomized ? "custom" : "brand";
  });
  const [radiusTheme, setRadiusTheme] = useState(currentThemes.radius);
  const [spacingTheme, setSpacingTheme] = useState<string | null>(currentThemes.spacing);
  const [shadowTheme, setShadowTheme] = useState<string | null>(currentThemes.shadow);
  const [fontTheme, setFontTheme] = useState<string | null>(currentThemes.font);
  
  // 初始化时设置默认主题
  useEffect(() => {
    if (!activeTheme || activeTheme === "default") {
      setActiveTheme("brand radius-medium");
    }
    // 确保初始状态显示品牌色
    if (!isPrimaryCustomized) {
      setPrimaryColor("brand");
    }
  }, [activeTheme, setActiveTheme, isPrimaryCustomized]);
  
  // 当 activeTheme 或 isPrimaryCustomized 变化时，更新本地状态
  useEffect(() => {
    const themes = parseThemes(activeTheme);
    // 如果自定义了颜色，自动选中 custom；否则选中 brand
    if (isPrimaryCustomized) {
      setPrimaryColor("custom");
    } else {
      setPrimaryColor("brand");
    }
    setRadiusTheme(themes.radius);
    setSpacingTheme(themes.spacing);
    setShadowTheme(themes.shadow);
    setFontTheme(themes.font);
  }, [activeTheme, isPrimaryCustomized]);

  // 组合主题
  const updateTheme = (
    type: "primaryColor" | "radius" | "spacing" | "shadow" | "font",
    value: string | null
  ) => {
    let newPrimaryColor = primaryColor;
    let newRadiusTheme = radiusTheme;
    let newSpacingTheme = spacingTheme;
    let newShadowTheme = shadowTheme;
    let newFontTheme = fontTheme;

    if (type === "primaryColor") {
      if (value === "brand") {
        // 选择品牌色时，清除自定义颜色
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          const body = document.body;
          const themeContainers = document.querySelectorAll('.theme-container');
          
          root.style.removeProperty('--primary');
          body.style.removeProperty('--primary');
          themeContainers.forEach((container) => {
            (container as HTMLElement).style.removeProperty('--primary');
          });
        }
        setIsPrimaryCustomized(false);
        newPrimaryColor = "brand";
        // 触发一个自定义事件，通知 ThemeEditor 更新颜色显示
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('theme-color-reset'));
        }
      } else if (value === "custom") {
        // 选择自定义时，保持当前自定义颜色，但需要移除品牌色主题类
        // 这样自定义颜色才能通过内联样式生效
        if (typeof window !== 'undefined') {
          document.body.classList.remove('theme-brand');
        }
        newPrimaryColor = "custom";
      } else {
        newPrimaryColor = value || "brand";
      }
      setPrimaryColor(newPrimaryColor);
    } else if (type === "radius") {
      newRadiusTheme = value || "radius-medium";
      setRadiusTheme(newRadiusTheme);
    } else if (type === "spacing") {
      newSpacingTheme = value;
      setSpacingTheme(newSpacingTheme);
    } else if (type === "shadow") {
      newShadowTheme = value;
      setShadowTheme(newShadowTheme);
    } else if (type === "font") {
      newFontTheme = value;
      setFontTheme(newFontTheme);
    }

    // 组合所有选中的主题
    const themes = [];
    // 始终包含主色调（brand 是默认，custom 不需要添加到主题类中）
    if (newPrimaryColor === "custom") {
      // custom 不需要添加到主题类，因为自定义颜色是通过内联样式设置的
      // 但需要确保品牌色主题类被移除（如果之前有的话）
    } else if (newPrimaryColor === "brand") {
      themes.push("brand");
    } else if (newPrimaryColor) {
      themes.push(newPrimaryColor);
    } else {
      themes.push("brand");
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
    // 可选：字体主题
    if (newFontTheme) {
      themes.push(newFontTheme);
    }

    // 设置组合后的主题
    const combinedTheme = themes.length > 0 ? themes.join(" ") : "brand radius-medium";
    setActiveTheme(combinedTheme);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div>
        <h3 className="text-sm font-semibold mb-2">主题配置</h3>
        <p className="text-xs text-muted-foreground mb-4">
          配置主题的各项属性，可以组合使用
        </p>
      </div>
      
      {/* 主色调 */}
      <div>
        <h4 className="text-xs font-medium mb-2 text-muted-foreground">主色调</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={primaryColor === "brand" ? "default" : "outline"}
            size="sm"
            onClick={() => updateTheme("primaryColor", "brand")}
            className={cn(
              "text-xs",
              primaryColor === "brand" && "bg-primary text-primary-foreground"
            )}
          >
            品牌色
          </Button>
          {isPrimaryCustomized && (
            <Button
              variant={primaryColor === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => updateTheme("primaryColor", "custom")}
              className={cn(
                "text-xs",
                primaryColor === "custom" && "bg-primary text-primary-foreground"
              )}
            >
              自定义
            </Button>
          )}
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

