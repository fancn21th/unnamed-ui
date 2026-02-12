"use client";

import * as React from "react";
import {
  SenderResponsiveContainer,
  SenderResponsiveTextarea,
  SenderResponsiveInputRow,
  SenderResponsiveButtonGroup,
  SenderResponsiveAttachmentButton,
  SenderResponsiveSendButton,
  type ResponsiveTextareaProps,
  type ResponsiveButtonGroupProps,
} from "@/registry/wuhan/blocks/sender/sender-responsive-01";
import {
  AttachmentListComposed,
  type AttachmentItem,
} from "@/registry/wuhan/composed/attachment-list/attachment-list";
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

export type AttachmentAdapter<TAttachment> = (
  attachment: TAttachment,
) => AttachmentItem;

export interface AttachmentListRenderContext<TAttachment> {
  attachments: TAttachment[];
  items: AttachmentItem[];
  onRemove?: (id: string) => void;
  onItemClick?: (item: AttachmentItem) => void;
  onItemSelect?: (item: AttachmentItem) => void;
}

const defaultAttachmentAdapter: AttachmentAdapter<Attachment> = (
  attachment,
) => {
  const fileType = attachment.name?.split(".").pop()?.toUpperCase() || "";
  return {
    id: attachment.id,
    name: attachment.name,
    thumbnail: attachment.thumbnail,
    fileType,
    fileSize: attachment.size,
    icon: attachment.icon ? <attachment.icon className="size-4" /> : undefined,
    isImage: !!attachment.thumbnail,
  };
};

interface AttachmentListWrapperProps<TAttachment> {
  attachments: TAttachment[];
  attachmentItems?: AttachmentItem[];
  attachmentAdapter: AttachmentAdapter<TAttachment>;
  onRemove?: (id: string) => void;
  onItemClick?: (item: AttachmentItem) => void;
  onItemSelect?: (item: AttachmentItem) => void;
  renderAttachmentList?: (
    context: AttachmentListRenderContext<TAttachment>,
  ) => React.ReactNode;
}

function AttachmentListWrapper<TAttachment>({
  attachments,
  attachmentItems,
  attachmentAdapter,
  onRemove,
  onItemClick,
  onItemSelect,
  renderAttachmentList,
}: AttachmentListWrapperProps<TAttachment>) {
  const items = attachmentItems ?? attachments.map(attachmentAdapter);
  if (items.length === 0) return null;

  if (renderAttachmentList) {
    return (
      <>
        {renderAttachmentList({
          attachments,
          items,
          onRemove,
          onItemClick,
          onItemSelect,
        })}
      </>
    );
  }

  return (
    <AttachmentListComposed
      items={items}
      onRemove={onRemove}
      onItemClick={onItemClick}
      onItemSelect={onItemSelect}
    />
  );
}

/**
 * @public
 */
export interface SenderCanSendContext<TAttachment> {
  value: string;
  attachments: TAttachment[];
  sendDisabled?: boolean;
  generating?: boolean;
}

export type SenderSubmitReason =
  | "empty"
  | "disabled"
  | "generating"
  | "invalid"
  | "unknown";

export interface SenderSubmitContext<
  TAttachment,
> extends SenderCanSendContext<TAttachment> {
  canSend: boolean;
  reason?: SenderSubmitReason;
  event?: React.SyntheticEvent;
}

export interface SenderAttachContext<TAttachment> {
  attachments: TAttachment[];
  maxAttachments?: number;
  attachmentsCount: number;
  accept?: string;
  sizeLimit?: number;
}

export interface ResponsiveSenderInputRenderContext<
  TAttachment,
> extends SenderCanSendContext<TAttachment> {
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isOverflow: boolean;
}

export interface ResponsiveSenderActionRenderContext<
  TAttachment,
> extends SenderCanSendContext<TAttachment> {
  canSend: boolean;
  sendDisabledReason?: SenderSubmitReason;
  attachmentsCount: number;
  maxAttachments?: number;
  canAttach: boolean;
  accept?: string;
  sizeLimit?: number;
  onAttachRequest?: () => void;
  isOverflow: boolean;
}

/**
 * @public
 */
export interface ResponsiveSenderProps<TAttachment = Attachment> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  quoteContent?: React.ReactNode;
  inputDisabled?: boolean;
  onInputKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  renderInput?: (
    context: ResponsiveSenderInputRenderContext<TAttachment>,
  ) => React.ReactNode;

  attachments?: TAttachment[];
  attachmentItems?: AttachmentItem[];
  attachmentAdapter?: AttachmentAdapter<TAttachment>;
  onAttachmentRemove?: (id: string) => void;
  onAttachmentClick?: (item: AttachmentItem) => void;
  onAttachmentSelect?: (item: AttachmentItem) => void;
  renderAttachmentList?: (
    context: AttachmentListRenderContext<TAttachment>,
  ) => React.ReactNode;

  onAttach?: () => void;
  onAttachRequest?: (context: SenderAttachContext<TAttachment>) => void;
  onAttachLimitExceed?: (context: SenderAttachContext<TAttachment>) => void;
  maxAttachments?: number;
  accept?: string;
  sizeLimit?: number;
  onSend?: () => void;
  onSubmit?: (context: SenderSubmitContext<TAttachment>) => void;
  sendDisabled?: boolean;
  generating?: boolean;
  getCanSend?: (context: SenderCanSendContext<TAttachment>) => boolean;
  getSendDisabledReason?: (
    context: SenderCanSendContext<TAttachment>,
  ) => SenderSubmitReason | undefined;
  submitOnEnter?: boolean;

  className?: string;
  maxWidth?: string;
  forceSingleLine?: boolean;
  onOverflowChange?: (isOverflow: boolean) => void;
  renderActionBar?: (
    context: ResponsiveSenderActionRenderContext<TAttachment>,
  ) => React.ReactNode;
  renderActions?: (
    context: ResponsiveSenderActionRenderContext<TAttachment>,
  ) => React.ReactNode;
  /**
   * 自定义按钮组的内容，会作为 SenderResponsiveButtonGroup 的子元素渲染
   * 当 renderActionBar 或 renderActions 未提供时生效
   */
  buttonGroupChildren?: React.ReactNode;
}

/**
 * @public
 */
function defaultCanSend<TAttachment>(
  context: SenderCanSendContext<TAttachment>,
): boolean {
  return !!context.value.trim() && !context.sendDisabled && !context.generating;
}

const getDefaultSendDisabledReason = (
  context: SenderCanSendContext<unknown>,
  usesCustomCanSend: boolean,
): SenderSubmitReason => {
  if (usesCustomCanSend) return "invalid";
  if (context.generating) return "generating";
  if (context.sendDisabled) return "disabled";
  if (!context.value.trim()) return "empty";
  return "unknown";
};

function ResponsiveSenderInner<TAttachment = Attachment>(
  props: ResponsiveSenderProps<TAttachment>,
  ref: React.ForwardedRef<HTMLFormElement>,
) {
  const {
    value,
    onChange,
    placeholder = "Type your message...",
    quoteContent,
    inputDisabled,
    onInputKeyDown,
    renderInput,
    attachments = [],
    attachmentItems,
    attachmentAdapter,
    onAttachmentRemove,
    onAttachmentClick,
    onAttachmentSelect,
    renderAttachmentList,
    onAttach,
    onAttachRequest,
    onAttachLimitExceed,
    maxAttachments,
    accept,
    sizeLimit,
    onSend,
    onSubmit,
    sendDisabled,
    generating = false,
    getCanSend,
    getSendDisabledReason,
    submitOnEnter = false,
    className,
    maxWidth = "100%",
    forceSingleLine = false,
    onOverflowChange,
    renderActionBar,
    renderActions,
    buttonGroupChildren,
  } = props;

  const [isOverflow, setIsOverflow] = React.useState(false);

  const resolvedAttachmentAdapter =
    (attachmentAdapter as AttachmentAdapter<TAttachment>) ??
    (defaultAttachmentAdapter as AttachmentAdapter<TAttachment>);
  const baseContext: SenderCanSendContext<TAttachment> = {
    value,
    attachments,
    sendDisabled,
    generating,
  };
  const usesCustomCanSend = Boolean(getCanSend);
  const canSend =
    (
      getCanSend as
        | ((context: SenderCanSendContext<TAttachment>) => boolean)
        | undefined
    )?.(baseContext) ?? defaultCanSend(baseContext);
  const defaultReason = getDefaultSendDisabledReason(
    baseContext,
    usesCustomCanSend,
  );
  const sendDisabledReason = !canSend
    ? (getSendDisabledReason?.(baseContext) ?? defaultReason)
    : undefined;
  const attachmentsCount = attachmentItems?.length ?? attachments.length;
  const canAttach =
    typeof maxAttachments === "number"
      ? attachmentsCount < maxAttachments
      : true;

  const attachContext: SenderAttachContext<TAttachment> = {
    attachments,
    maxAttachments,
    attachmentsCount,
    accept,
    sizeLimit,
  };

  const handleOverflowChange = (overflow: boolean) => {
    setIsOverflow(overflow);
    onOverflowChange?.(overflow);
  };

  const handleSubmit = (event?: React.SyntheticEvent) => {
    onSubmit?.({
      ...baseContext,
      canSend,
      reason: sendDisabledReason,
      event,
    });
    if (canSend) {
      onSend?.();
    }
  };

  const handleAttachRequest = () => {
    if (!canAttach) {
      onAttachLimitExceed?.(attachContext);
      return;
    }
    if (onAttachRequest) {
      onAttachRequest(attachContext);
      return;
    }
    onAttach?.();
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    onInputKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (!submitOnEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.altKey || event.metaKey || event.ctrlKey)
      return;
    if ((event.nativeEvent as { isComposing?: boolean })?.isComposing) return;
    event.preventDefault();
    handleSubmit(event);
  };

  const inputContext: ResponsiveSenderInputRenderContext<TAttachment> = {
    ...baseContext,
    placeholder,
    disabled: inputDisabled,
    onChange,
    onKeyDown: handleInputKeyDown,
    isOverflow,
  };

  const actionContext: ResponsiveSenderActionRenderContext<TAttachment> = {
    ...baseContext,
    canSend,
    sendDisabledReason,
    attachmentsCount,
    maxAttachments,
    canAttach,
    accept,
    sizeLimit,
    onAttachRequest: handleAttachRequest,
    isOverflow,
  };

  return (
    <SenderResponsiveContainer
      ref={ref}
      className={className}
      maxWidth={maxWidth}
      forceSingleLine={forceSingleLine}
      onOverflowChange={handleOverflowChange}
      aria-label="Message sender"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      {quoteContent}

      {(attachments.length > 0 || (attachmentItems?.length ?? 0) > 0) && (
        <AttachmentListWrapper
          attachments={attachments}
          attachmentItems={attachmentItems}
          attachmentAdapter={resolvedAttachmentAdapter}
          onRemove={onAttachmentRemove}
          onItemClick={onAttachmentClick}
          onItemSelect={onAttachmentSelect}
          renderAttachmentList={renderAttachmentList}
        />
      )}

      <SenderResponsiveInputRow isOverflow={isOverflow}>
        {renderInput?.(inputContext) ?? (
          <SenderResponsiveTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={inputDisabled}
            onKeyDown={handleInputKeyDown}
            isOverflow={isOverflow}
            onOverflowChange={handleOverflowChange}
          />
        )}

        {renderActionBar?.(actionContext) ??
          renderActions?.(actionContext) ??
          buttonGroupChildren ?? (
            <SenderResponsiveButtonGroup isOverflow={isOverflow}>
              {(onAttachRequest || onAttach) && (
                <SenderResponsiveAttachmentButton
                  type="button"
                  onClick={handleAttachRequest}
                  aria-label="Attach file"
                  disabled={!canAttach}
                >
                  <Paperclip className="size-4" />
                </SenderResponsiveAttachmentButton>
              )}
              {onSend && (
                <SenderResponsiveSendButton
                  type="submit"
                  disabled={sendDisabled}
                  generating={generating}
                  generatingContent={
                    <Loader2 className="size-4 text-white animate-spin" />
                  }
                />
              )}
            </SenderResponsiveButtonGroup>
          )}
      </SenderResponsiveInputRow>
    </SenderResponsiveContainer>
  );
}

export const ResponsiveSender = React.forwardRef(ResponsiveSenderInner) as <
  TAttachment = Attachment,
>(
  props: ResponsiveSenderProps<TAttachment> &
    React.RefAttributes<HTMLFormElement>,
) => React.ReactElement | null;
(ResponsiveSender as { displayName?: string }).displayName = "ResponsiveSender";
