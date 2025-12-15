"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/wuhan/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="size-8"
        disabled
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="size-8"
      onClick={toggleTheme}
      title={`切换到${resolvedTheme === "dark" ? "亮色" : "暗色"}模式`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      <span className="sr-only">切换主题</span>
    </Button>
  );
}

