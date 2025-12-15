"use client";

/**
 * 示例：基于原语组件构建便捷的组合组件
 *
 * 这个示例展示了如何：
 * 1. 基于原语组件构建业务特定的组合组件
 * 2. 保持完全的可定制性
 * 3. 提供合理的默认值，但不强制使用
 */

import { useState } from "react";
import {
  SenderTextarea,
  SenderButton,
  SenderContainer,
  SenderInputRegion,
  SenderActionBar,
  SenderAttachmentButton,
  SenderModeButton,
  SenderSendButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import {
  AttachmentCard,
  AttachmentList,
} from "@/registry/wuhan/blocks/attachment-list/attachment-list-01";
import { Send, Paperclip, Brain, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== 业务特定的类型定义 ====================
// 用户可以根据自己的业务需求定义类型

interface Attachment {
  id: string;
  name: string;
  thumbnail?: string;
  size?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Mode {
  id: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// ==================== 业务特定的组合组件 ====================
// 这些组件基于原语构建，提供业务特定的便捷封装
// 但用户仍然可以完全自定义或直接使用原语

interface AttachmentListWrapperProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
}

function AttachmentListWrapper({
  attachments,
  onRemove,
}: AttachmentListWrapperProps) {
  if (attachments.length === 0) return null;

  return (
    <AttachmentList bordered verticalPadding="sm">
      {attachments.map((attachment) => {
        const Icon = attachment.icon || Paperclip;
        // 判断是否为图片
        const isImage = !!attachment.thumbnail;
        // 提取文件类型
        const fileType = attachment.name?.split(".").pop()?.toUpperCase() || "";

        return (
          <AttachmentCard
            key={attachment.id}
            variant="outline"
            size="sm"
            icon={
              attachment.thumbnail ? (
                <img
                  src={attachment.thumbnail}
                  alt={attachment.name}
                  className={
                    isImage
                      ? "w-full h-full object-cover"
                      : "size-10 object-cover"
                  }
                />
              ) : (
                <Icon className="size-4" />
              )
            }
            name={attachment.name}
            fileType={fileType}
            fileSize={attachment.size}
            isImage={isImage}
            deleteIcon={<X />}
            onDelete={(e) => {
              e.stopPropagation();
              onRemove?.(attachment.id);
            }}
            onClick={() => {}}
          />
        );
      })}
    </AttachmentList>
  );
}

interface ModeSelectorProps {
  modes: Mode[];
  selectedModes: string[];
  onToggle: (modeId: string) => void;
}

function ModeSelector({ modes, selectedModes, onToggle }: ModeSelectorProps) {
  if (modes.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = selectedModes.includes(mode.id);
        return (
          <SenderModeButton
            key={mode.id}
            selected={isActive}
            onClick={() => onToggle(mode.id)}
          >
            {Icon && <Icon className="size-4" />}
            {mode.label}
          </SenderModeButton>
        );
      })}
    </div>
  );
}

// ==================== 高级组合组件 ====================
// 基于原语和业务组件构建的完整 Sender 组件
// 用户可以完全自定义或直接使用原语

interface ComposedSenderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;

  // 可选的功能模块
  attachments?: Attachment[];
  onAttachmentRemove?: (id: string) => void;
  modes?: Mode[];
  selectedModes?: string[];
  onModeToggle?: (modeId: string) => void;

  // 按钮
  onAttach?: () => void;
  onSend?: () => void;
  sendDisabled?: boolean;
  generating?: boolean;

  // 样式
  className?: string;
  maxWidth?: string;
}

export function ComposedSender({
  value,
  onChange,
  placeholder = "Type your message...",
  attachments = [],
  onAttachmentRemove,
  modes = [],
  selectedModes = [],
  onModeToggle,
  onAttach,
  onSend,
  sendDisabled,
  generating = false,
  className,
  maxWidth = "max-w-2xl",
}: ComposedSenderProps) {
  return (
    <SenderContainer className={cn(maxWidth, className)}>
      {/* 附件列表 */}
      {attachments.length > 0 && (
        <AttachmentListWrapper
          attachments={attachments}
          onRemove={onAttachmentRemove}
        />
      )}

      {/* 输入区域 */}
      <SenderInputRegion>
        <SenderTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </SenderInputRegion>

      {/* 操作栏 */}
      <SenderActionBar
        className={cn(
          "flex items-center",
          modes.length > 0 || onAttach ? "justify-between" : "justify-end",
        )}
      >
        <div className="flex items-center gap-2">
          {onAttach && (
            <SenderAttachmentButton onClick={onAttach} aria-label="Attach file">
              <Paperclip className="size-4" />
            </SenderAttachmentButton>
          )}
          {modes.length > 0 && (
            <ModeSelector
              modes={modes}
              selectedModes={selectedModes}
              onToggle={onModeToggle || (() => {})}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {onSend && (
            <SenderSendButton
              disabled={sendDisabled}
              generating={generating}
              onClick={onSend}
              generatingContent={
                <Loader2 className="size-4 text-white animate-spin" />
              }
            >
              <Send className="size-4 text-white" />
            </SenderSendButton>
          )}
        </div>
      </SenderActionBar>
    </SenderContainer>
  );
}

// ==================== 使用示例 ====================

export default function SenderComposedDemo() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: "1", name: "screenshot.png", size: "2.3 MB" },
    { id: "2", name: "document.pdf", size: "1.5 MB" },
  ]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  const modes: Mode[] = [
    { id: "web-search", label: "联网搜索", icon: Brain },
    { id: "deep-think", label: "深度思考", icon: Brain },
  ];

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="w-full max-w-2xl text-sm text-muted-foreground mb-2">
        示例：使用组合组件构建的 Sender（基于原语组件）
      </div>

      <ComposedSender
        value={value}
        onChange={setValue}
        placeholder="输入你的提示..."
        attachments={attachments}
        onAttachmentRemove={(id) =>
          setAttachments((prev) => prev.filter((a) => a.id !== id))
        }
        modes={modes}
        selectedModes={selectedModes}
        onModeToggle={(modeId) =>
          setSelectedModes((prev) =>
            prev.includes(modeId)
              ? prev.filter((id) => id !== modeId)
              : [...prev, modeId],
          )
        }
        onAttach={() => console.log("打开附件选择器")}
        onSend={() => console.log("发送消息:", value)}
        sendDisabled={!value.trim()}
      />
    </div>
  );
}
