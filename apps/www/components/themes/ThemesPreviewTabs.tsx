"use client";

import { useMemo, useState } from "react";
import {
  SenderActionBar,
  SenderAttachmentButton,
  SenderButton,
  SenderContainer,
  SenderInputRegion,
  SenderModeButton,
  SenderRegion,
  SenderSendButton,
  SenderTextarea,
} from "@/registry/wuhan/blocks/sender/sender-01";
import { ComposedMessageList, type MessageItem } from "@/registry/wuhan/examples/message/message-composed-demo";
import { ComposedSender } from "@/registry/wuhan/examples/sender/sender-composed-demo";
import { Button } from "@/registry/wuhan/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/wuhan/ui/card";
import { Input } from "@/registry/wuhan/ui/input";
import { Label } from "@/registry/wuhan/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/wuhan/ui/select";
import { Slider } from "@/registry/wuhan/ui/slider";
import { Switch } from "@/registry/wuhan/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/wuhan/ui/tabs";
import { Textarea } from "@/registry/wuhan/ui/textarea";
import { Brain, Loader2, Paperclip, Send } from "lucide-react";

function ChatShowcase() {
  const initialMessages = useMemo<MessageItem[]>(
    () => [
      {
        id: "m1",
        role: "assistant",
        content: "我可以帮你对比竞品、拆解组件，并把 UI 拼成你想要的结构。",
        feedback: { onCopy: () => {} },
      },
      {
        id: "m2",
        role: "user",
        content: "那我现在要一个可组合的聊天输入框 + 附件条 + 模式选择。",
        feedback: { onCopy: () => {} },
      },
      {
        id: "m3",
        role: "assistant",
        content: (
          <div className="space-y-2">
            <div>好的，这里给你一个“组合组件”，但底层全是可拆的原语。</div>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-0">
              <li>Sender：输入区、ActionBar、SendButton 都可替换</li>
              <li>AttachmentList：卡片级别可自定义 leading/content/delete</li>
              <li>Message：支持 status/feedback 注入</li>
            </ul>
          </div>
        ),
        feedback: { onCopy: () => {} },
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [value, setValue] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; size?: string; thumbnail?: string }>
  >([
    {
      id: "a1",
      name: "screenshot.png",
      size: "2.3 MB",
      thumbnail: "https://via.placeholder.com/64",
    },
    { id: "a2", name: "notes.md", size: "12 KB" },
  ]);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Chat（组合能力展示）</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="rounded-md border bg-muted/10 p-3">
            <div className="text-xs text-muted-foreground mb-2">
              MessageList（来自组合 demo）：hover 显示 feedback，内容支持 ReactNode
            </div>
            <div className="max-h-[360px] overflow-y-auto pr-2">
              <ComposedMessageList messages={messages} className="gap-3" />
            </div>
          </div>

          <div className="rounded-md border bg-muted/10 p-3 w-full overflow-hidden">
            <div className="text-xs text-muted-foreground mb-2">
              Sender（来自组合 demo）：附件条 + 模式选择 + 发送按钮（均可拆）
            </div>
            <ComposedSender
              value={value}
              onChange={setValue}
              placeholder="输入你的提示..."
              attachments={attachments}
              onAttachmentRemove={(id) =>
                setAttachments((prev) => prev.filter((a) => a.id !== id))
              }
              modes={[
                { id: "web-search", label: "联网搜索", icon: Brain },
                { id: "deep-think", label: "深度思考", icon: Brain },
              ]}
              selectedModes={selectedModes}
              onModeToggle={(modeId) =>
                setSelectedModes((prev) =>
                  prev.includes(modeId)
                    ? prev.filter((id) => id !== modeId)
                    : [...prev, modeId],
                )
              }
              onAttach={() =>
                setAttachments((prev) => [
                  ...prev,
                  {
                    id: `a-${prev.length + 1}`,
                    name: `new-file-${prev.length + 1}.txt`,
                    size: "3 KB",
                  },
                ])
              }
              onSend={() => {
                const trimmed = value.trim();
                if (!trimmed) return;
                const now = Date.now();
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `u-${now}`,
                    role: "user",
                    content: trimmed,
                    feedback: { onCopy: () => {} },
                  },
                  {
                    id: `a-${now}`,
                    role: "assistant",
                    content: "收到。我会按你的主题/密度/圆角 token 自动适配视觉。",
                    feedback: { onCopy: () => {} },
                  },
                ]);
                setValue("");
              }}
              sendDisabled={!value.trim()}
              maxWidth="max-w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PrimitivesShowcase() {
  type Preset = "minimal" | "balanced" | "power";
  type ModePlacement = "actionbar" | "top";

  const [preset, setPreset] = useState<Preset>("balanced");
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"web" | "think" | null>("think");
  const [modePlacement, setModePlacement] = useState<ModePlacement>("actionbar");
  const [generating, setGenerating] = useState(false);

  const canAttach = preset !== "minimal";
  const canSecondary = preset !== "minimal";
  const canModes = preset === "power";
  const canStatus = preset === "power";

  const handleSubmit = () => {
    if (!value.trim()) return;
    if (generating) return;
    setGenerating(true);
    window.setTimeout(() => {
      setGenerating(false);
      setValue("");
    }, 700);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Primitives（Builder：可组合能力演示）</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="text-sm text-muted-foreground">
            这里不是“堆例子”，而是一个<strong>可用的 Sender 搭建器</strong>：同一套 primitives
            通过替换/重排 slot 即可演进形态（Minimal → Balanced → Power）。
          </div>

          <Tabs
            value={preset}
            onValueChange={(v) => setPreset(v as Preset)}
            className="w-full"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <TabsList className="h-10">
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
                <TabsTrigger value="balanced">Balanced</TabsTrigger>
                <TabsTrigger value="power">Power</TabsTrigger>
              </TabsList>
              <div className="text-xs text-muted-foreground">
                重点：不新增组件类型，只改组合方式
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
              {/* Left: live preview */}
              <div className="rounded-xl border bg-gradient-to-b from-muted/15 to-background p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Sender Preview</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {preset === "minimal"
                        ? "输入 + 发送"
                        : preset === "balanced"
                          ? "附件 + 次要动作 + 发送"
                          : "模式 + 附件 + generating + 状态行"}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setValue("");
                      setGenerating(false);
                      setMode("think");
                      setModePlacement("actionbar");
                      setPreset("balanced");
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <SenderContainer
                  className="max-w-full bg-background/60 backdrop-blur"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {/* Top region: optional modes placement */}
                  {canModes && modePlacement === "top" && (
                    <SenderRegion bordered className="justify-between">
                      <div className="text-sm font-medium">模式</div>
                      <div className="flex items-center gap-2">
                        <SenderModeButton
                          type="button"
                          selected={mode === "web"}
                          onClick={() => setMode(mode === "web" ? null : "web")}
                        >
                          <Brain className="size-4" />
                          联网搜索
                        </SenderModeButton>
                        <SenderModeButton
                          type="button"
                          selected={mode === "think"}
                          onClick={() => setMode(mode === "think" ? null : "think")}
                        >
                          <Brain className="size-4" />
                          深度思考
                        </SenderModeButton>
                      </div>
                    </SenderRegion>
                  )}

                  <SenderInputRegion
                    className="items-start"
                    attachmentButton={
                      canAttach ? (
                        <SenderAttachmentButton type="button" aria-label="Attach">
                          <Paperclip className="size-4" />
                        </SenderAttachmentButton>
                      ) : undefined
                    }
                  >
                    <SenderTextarea
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="输入内容"
                    />
                  </SenderInputRegion>

                  <SenderActionBar className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {canModes && modePlacement === "actionbar" && (
                        <>
                          <SenderModeButton
                            type="button"
                            selected={mode === "web"}
                            onClick={() => setMode(mode === "web" ? null : "web")}
                          >
                            <Brain className="size-4" />
                            联网搜索
                          </SenderModeButton>
                          <SenderModeButton
                            type="button"
                            selected={mode === "think"}
                            onClick={() => setMode(mode === "think" ? null : "think")}
                          >
                            <Brain className="size-4" />
                            深度思考
                          </SenderModeButton>
                        </>
                      )}

                      {canSecondary && (
                        <SenderButton
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setValue("")}
                        >
                          清空
                        </SenderButton>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {preset === "power" && (
                        <SenderButton
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={!generating}
                          onClick={() => setGenerating(false)}
                        >
                          Stop
                        </SenderButton>
                      )}

                      <SenderSendButton
                        type="submit"
                        disabled={!value.trim()}
                        generating={generating}
                        generatingContent={
                          <Loader2 className="size-4 text-white animate-spin" />
                        }
                      >
                        <Send className="size-4 text-white" />
                      </SenderSendButton>
                    </div>
                  </SenderActionBar>

                  {canStatus && (
                    <SenderRegion verticalPadding="none" className="justify-start pt-0">
                      <div className="text-xs text-muted-foreground">
                        当前模式：
                        {mode === "web"
                          ? "联网搜索"
                          : mode === "think"
                            ? "深度思考"
                            : "无"}
                      </div>
                    </SenderRegion>
                  )}
                </SenderContainer>
              </div>

              {/* Right: composition knobs */}
              <div className="rounded-xl border bg-muted/10 p-4 grid gap-4">
                <div>
                  <div className="text-sm font-medium">组合开关</div>
                </div>

                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      Mode 放置位置（仅 Power）
                    </div>
                    <Select
                      value={modePlacement}
                      onValueChange={(v) => setModePlacement(v as ModePlacement)}
                      disabled={!canModes}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择位置" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actionbar">ActionBar 左侧</SelectItem>
                        <SelectItem value="top">顶部 Region</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-md border bg-background/60 px-3 py-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">Generating</div>
                      <div className="text-xs text-muted-foreground truncate">
                        演示 `SenderSendButton.generating`
                      </div>
                    </div>
                    <Switch
                      checked={generating}
                      onCheckedChange={(v) => setGenerating(!!v)}
                      disabled={preset === "minimal"}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs font-medium">结构树（示意）</div>
                  <pre className="text-xs rounded-md border bg-background p-3 overflow-auto leading-relaxed">
{`SenderContainer (form)
  ${canModes && modePlacement === "top" ? "SenderRegion (modes)\n  " : ""}SenderInputRegion
    ${canAttach ? "attachmentButton (slot)\n    " : ""}SenderTextarea
  SenderActionBar
    left: ${canModes && modePlacement === "actionbar" ? "ModeButtons + " : ""}${canSecondary ? "SecondaryActions" : "—"}
    right: ${preset === "power" ? "Stop + " : ""}SendButton
  ${canStatus ? "SenderRegion (status line)" : ""}`}
                  </pre>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function BasicsShowcase() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "calc(var(--spacing) * 2)" }}
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

      <Card>
        <CardHeader>
          <CardTitle>Form Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="demo-input">Input</Label>
              <Input id="demo-input" placeholder="Type something..." />
            </div>
            <div className="grid gap-2">
              <Label>Textarea</Label>
              <Textarea placeholder="Type your message here." />
            </div>
            <div className="grid gap-2">
              <Label>Select</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-md border bg-muted/20 px-3 py-2">
              <div className="min-w-0">
                <div className="text-sm font-medium">Switch</div>
                <div className="text-muted-foreground text-xs truncate">
                  用于观察边框、ring、圆角与密度变化
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Slider</Label>
                <span className="text-muted-foreground text-xs">0–100</span>
              </div>
              <Slider defaultValue={[42]} min={0} max={100} step={1} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sender（基础）</CardTitle>
        </CardHeader>
        <CardContent>
          <SenderContainer
            className="max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <SenderTextarea placeholder="Type your message..." />
            <SenderActionBar className="flex items-center justify-end">
              <SenderButton
                type="button"
                variant="default"
                size="icon"
                aria-label="Send"
              >
                <Send className="size-4" />
              </SenderButton>
            </SenderActionBar>
          </SenderContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export function ThemesPreviewTabs() {
  return (
    <Tabs defaultValue="basics" className="w-full">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <TabsList className="h-10">
          <TabsTrigger value="basics">基础控件</TabsTrigger>
          <TabsTrigger value="composed">Chat 组合</TabsTrigger>
          <TabsTrigger value="primitives">Primitives 拆解</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="basics" className="mt-4">
        <BasicsShowcase />
      </TabsContent>

      <TabsContent value="composed" className="mt-4">
        <ChatShowcase />
      </TabsContent>

      <TabsContent value="primitives" className="mt-4">
        <PrimitivesShowcase />
      </TabsContent>
    </Tabs>
  );
}


