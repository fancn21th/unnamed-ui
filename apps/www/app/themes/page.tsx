"use client";

import { ThemeEditor } from "@/components/theme-editor";
import { Button } from "@/registry/wuhan/ui/button";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Prompt } from "@/registry/wuhan/blocks/prompt-01";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/wuhan/ui/card";
import { Separator } from "@/registry/wuhan/ui/separator";

export default function Themes() {
  return (
    <div 
      className="flex h-[calc(100vh-var(--spacing)*14)] overflow-hidden"
      style={{ gap: 'calc(var(--spacing) * 6)', padding: 'calc(var(--spacing) * 6)' }}
    >
      {/* 左侧：Tokens 区域 */}
      <div className="flex-shrink-0 w-80 flex flex-col overflow-hidden">
        <div style={{ marginBottom: 'calc(var(--spacing) * 4)' }}>
          <h1 className="text-2xl font-semibold tracking-tight">Tokens</h1>
          <p 
            className="text-sm text-muted-foreground"
            style={{ marginTop: 'calc(var(--spacing) * 1)' }}
          >
            Customize your theme tokens
          </p>
        </div>
        <div 
          className="flex-1 overflow-y-auto"
          style={{ paddingTop: 'calc(var(--spacing) * 4)' }}
        >
          <ThemeEditor />
        </div>
      </div>

      {/* 分隔线 */}
      <Separator orientation="vertical" className="h-full" />

      {/* 右侧：组件预览区域 */}
      <div 
        className="flex-1 flex flex-col overflow-y-auto min-w-0"
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

        {/* Prompt Card */}
        <Card>
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Prompt />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
