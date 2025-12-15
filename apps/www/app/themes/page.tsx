"use client";

import { ActiveThemeProvider } from "@/components/active-theme";
import { ThemeEditor } from "@/components/theme-editor";
import { ThemeSelector } from "@/components/theme-selector";
import { ModeSwitcher } from "@/components/mode-switcher";
import { CopyCodeButton } from "@/components/copy-code-button";
import { Button } from "@/registry/wuhan/ui/button";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import {
  SenderContainer,
  SenderTextarea,
  SenderActionBar,
  SenderButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/wuhan/ui/card";
import { Separator } from "@/registry/wuhan/ui/separator";
import { Send } from "lucide-react";

export default function Themes() {
  return (
    <ActiveThemeProvider initialTheme="brand radius-medium">
      <div 
        className="flex h-[calc(100vh-var(--spacing)*14)] overflow-hidden"
        style={{ gap: 'calc(var(--spacing) * 6)', padding: 'calc(var(--spacing) * 6)' }}
      >
        {/* 左侧：主题配置区域 */}
        <div className="flex-shrink-0 w-80 flex flex-col overflow-hidden theme-container">
          <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }} className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">主题配置</h1>
              <p 
                className="text-sm text-muted-foreground"
                style={{ marginTop: 'calc(var(--spacing) * 1)' }}
              >
                切换和自定义主题
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CopyCodeButton variant="outline" size="sm" />
              <ModeSwitcher />
            </div>
          </div>
          <div 
            className="flex-1 overflow-y-auto"
            style={{ gap: 'calc(var(--spacing) * 6)', display: 'flex', flexDirection: 'column' }}
          >
            <ThemeSelector />
            <Separator />
            <div>
              <h2 className="text-sm font-semibold mb-2">颜色编辑器</h2>
              <ThemeEditor />
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <Separator orientation="vertical" className="h-full" />

        {/* 右侧：组件预览区域 */}
        <div 
          className="flex-1 flex flex-col overflow-y-auto min-w-0 theme-container"
          style={{ gap: 'calc(var(--spacing) * 6)' }}
        >
        {/* Button Card */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="flex flex-wrap items-center"
              style={{ gap: 'calc(var(--spacing) * 2)' }}
            >
              <Button variant="default">Button</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>

        {/* Textarea Card */}
        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Type your message here." />
          </CardContent>
        </Card>

        {/* Sender Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sender</CardTitle>
          </CardHeader>
          <CardContent>
            <SenderContainer className="max-w-2xl">
              <SenderTextarea placeholder="Type your message..." />
              <SenderActionBar className="flex items-center justify-end">
                <SenderButton variant="default" size="icon" aria-label="Send">
                  <Send className="size-4" />
                </SenderButton>
              </SenderActionBar>
            </SenderContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </ActiveThemeProvider>
  );
}
