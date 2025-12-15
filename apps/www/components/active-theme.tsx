"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const DEFAULT_THEME = "brand";

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  isPrimaryCustomized: boolean;
  setIsPrimaryCustomized: (customized: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || `${DEFAULT_THEME} radius-medium`
  );
  const [isPrimaryCustomized, setIsPrimaryCustomized] = useState<boolean>(false);

  useEffect(() => {
    // 移除所有现有的主题类
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    
    // 处理组合主题（多个主题用空格分隔）
    // 如果没有主题或主题是 "default"，使用品牌色作为默认
    let themeToApply = activeTheme || `${DEFAULT_THEME} radius-medium`;
    if (themeToApply === "default") {
      themeToApply = `${DEFAULT_THEME} radius-medium`;
    }
    
    if (themeToApply) {
      const themes = themeToApply.split(" ").filter(Boolean);
      themes.forEach((theme) => {
        if (theme) {
          document.body.classList.add(`theme-${theme}`);
        }
      });
    }
    
    // 处理特殊主题（如 scaled）
    if (themeToApply.includes("scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme, isPrimaryCustomized, setIsPrimaryCustomized }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within an ActiveThemeProvider");
  }
  return context;
}

