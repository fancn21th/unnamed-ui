"use client";

import * as React from "react";
import {
  SenderTextarea,
  SenderContainer,
  SenderInputRegion,
  SenderActionBar,
  SenderAttachmentButton,
  SenderSendButton,
  SenderModeButton,
} from "@/registry/wuhan/blocks/sender/sender-01";
import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";
import { Paperclip, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @public
 */
export interface Attachment {
  id: string;
  name: string;
  thumbnail?: string;
  size?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * @public
 */
export interface Mode {
  id: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AttachmentListWrapperProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
}

function AttachmentListWrapper({
  attachments,
  onRemove,
}: AttachmentListWrapperProps) {
  if (attachments.length === 0) return null;

  const items = attachments.map((attachment) => {
    const fileType = attachment.name?.split(".").pop()?.toUpperCase() || "";
    return {
      id: attachment.id,
      name: attachment.name,
      thumbnail: attachment.thumbnail,
      fileType,
      fileSize: attachment.size,
      icon: attachment.icon ? (
        <attachment.icon className="size-4" />
      ) : undefined,
      isImage: !!attachment.thumbnail,
    };
  });

  return <AttachmentListComposed items={items} onRemove={onRemove} />;
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
            type="button"
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

/**
 * @public
 */
export interface ComposedSenderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  quoteContent?: React.ReactNode;

  attachments?: Attachment[];
  onAttachmentRemove?: (id: string) => void;
  modes?: Mode[];
  selectedModes?: string[];
  onModeToggle?: (modeId: string) => void;

  onAttach?: () => void;
  onSend?: () => void;
  sendDisabled?: boolean;
  generating?: boolean;

  className?: string;
  maxWidth?: string;
}

/**
 * @public
 */
export const ComposedSender = React.forwardRef<
  HTMLFormElement,
  ComposedSenderProps
>(
  (
    {
      value,
      onChange,
      placeholder = "Type your message...",
      quoteContent,
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
    },
    ref,
  ) => {
    const canSend = !!value.trim() && !sendDisabled && !generating;

    return (
      <SenderContainer
        ref={ref}
        className={cn(maxWidth, className)}
        aria-label="Message sender"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSend) return;
          onSend?.();
        }}
      >
        {quoteContent}

        {attachments.length > 0 && (
          <AttachmentListWrapper
            attachments={attachments}
            onRemove={onAttachmentRemove}
          />
        )}

        <SenderInputRegion>
          <SenderTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </SenderInputRegion>

        <SenderActionBar
          className={cn(
            "flex items-center",
            modes.length > 0 || onAttach ? "justify-between" : "justify-end",
          )}
        >
          <div className="flex items-center gap-2">
            {onAttach && (
              <SenderAttachmentButton
                type="button"
                onClick={onAttach}
                aria-label="Attach file"
              >
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
                type="submit"
                disabled={sendDisabled}
                generating={generating}
                generatingContent={
                  <Loader2 className="size-4 text-white animate-spin" />
                }
              />
            )}
          </div>
        </SenderActionBar>
      </SenderContainer>
    );
  },
);
ComposedSender.displayName = "ComposedSender";
