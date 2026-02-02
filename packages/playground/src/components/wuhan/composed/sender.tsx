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
} from "@/components/wuhan/blocks/sender-01";
import {
  AttachmentListComposed,
  type AttachmentItem,
} from "@/components/wuhan/composed/attachment-list";
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

const defaultAttachmentAdapter: AttachmentAdapter<Attachment> = (attachment) => {
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

export interface ModeAdapterResult {
  id: string;
  label: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type ModeAdapter<TMode> = (mode: TMode) => ModeAdapterResult;

export interface ModeRenderContext<TMode> {
  mode: TMode;
  selected: boolean;
  toggle: () => void;
}

export type ModeSelectionStrategy = "multiple" | "single" | "exclusive";

export interface ModeChangeContext<TMode> {
  modeId: string;
  mode?: TMode;
  selected: boolean;
  nextSelectedModes: string[];
}

const defaultModeAdapter: ModeAdapter<Mode> = (mode) => ({
  id: mode.id,
  label: mode.label,
  icon: mode.icon,
});

interface ModeSelectorProps<TMode> {
  modes: TMode[];
  selectedModes: string[];
  onToggle?: (modeId: string, mode: TMode) => void;
  modeAdapter: ModeAdapter<TMode>;
  renderMode?: (context: ModeRenderContext<TMode>) => React.ReactNode;
}

function ModeSelector<TMode>({
  modes,
  selectedModes,
  onToggle,
  modeAdapter,
  renderMode,
}: ModeSelectorProps<TMode>) {
  if (modes.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {modes.map((mode) => {
        const { id, label, icon: Icon } = modeAdapter(mode);
        const isActive = selectedModes.includes(id);
        const handleToggle = () => onToggle?.(id, mode);

        if (renderMode) {
          return (
            <React.Fragment key={id}>
              {renderMode({
                mode,
                selected: isActive,
                toggle: handleToggle,
              })}
            </React.Fragment>
          );
        }

        return (
          <SenderModeButton
            key={id}
            selected={isActive}
            type="button"
            onClick={handleToggle}
          >
            {Icon && <Icon className="size-4" />}
            {label}
          </SenderModeButton>
        );
      })}
    </div>
  );
}

/**
 * @public
 */
export interface SenderCanSendContext<TAttachment, TMode> {
  value: string;
  attachments: TAttachment[];
  modes: TMode[];
  selectedModes: string[];
  sendDisabled?: boolean;
  generating?: boolean;
}

export type SenderSubmitReason =
  | "empty"
  | "disabled"
  | "generating"
  | "invalid"
  | "unknown";

export interface SenderSubmitContext<TAttachment, TMode>
  extends SenderCanSendContext<TAttachment, TMode> {
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

export interface SenderInputRenderContext<TAttachment, TMode>
  extends SenderCanSendContext<TAttachment, TMode> {
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface SenderActionRenderContext<TAttachment, TMode>
  extends SenderCanSendContext<TAttachment, TMode> {
  canSend: boolean;
  sendDisabledReason?: SenderSubmitReason;
  attachmentsCount: number;
  maxAttachments?: number;
  canAttach: boolean;
  accept?: string;
  sizeLimit?: number;
  onAttachRequest?: () => void;
}

export interface ComposedSenderProps<TAttachment = Attachment, TMode = Mode> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  quoteContent?: React.ReactNode;
  inputDisabled?: boolean;
  onInputKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  renderInput?: (
    context: SenderInputRenderContext<TAttachment, TMode>,
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

  modes?: TMode[];
  modeAdapter?: ModeAdapter<TMode>;
  selectedModes?: string[];
  modeSelection?: ModeSelectionStrategy;
  allowEmptySelection?: boolean;
  onModeToggle?: (modeId: string) => void;
  onModeChange?: (nextSelectedModes: string[], context: ModeChangeContext<TMode>) => void;
  renderMode?: (context: ModeRenderContext<TMode>) => React.ReactNode;

  onAttach?: () => void;
  onAttachRequest?: (context: SenderAttachContext<TAttachment>) => void;
  onAttachLimitExceed?: (context: SenderAttachContext<TAttachment>) => void;
  maxAttachments?: number;
  accept?: string;
  sizeLimit?: number;
  onSend?: () => void;
  onSubmit?: (context: SenderSubmitContext<TAttachment, TMode>) => void;
  sendDisabled?: boolean;
  generating?: boolean;
  getCanSend?: (context: SenderCanSendContext<TAttachment, TMode>) => boolean;
  getSendDisabledReason?: (
    context: SenderCanSendContext<TAttachment, TMode>,
  ) => SenderSubmitReason | undefined;
  submitOnEnter?: boolean;

  className?: string;
  maxWidth?: string;
  renderActionBar?: (
    context: SenderActionRenderContext<TAttachment, TMode>,
  ) => React.ReactNode;
  renderActionsLeft?: (
    context: SenderActionRenderContext<TAttachment, TMode>,
  ) => React.ReactNode;
  renderActionsRight?: (
    context: SenderActionRenderContext<TAttachment, TMode>,
  ) => React.ReactNode;
}

/**
 * @public
 */
const defaultCanSend = <TAttachment, TMode>(
  context: SenderCanSendContext<TAttachment, TMode>,
) => !!context.value.trim() && !context.sendDisabled && !context.generating;

const getDefaultSendDisabledReason = (
  context: SenderCanSendContext<unknown, unknown>,
  usesCustomCanSend: boolean,
): SenderSubmitReason => {
  if (usesCustomCanSend) return "invalid";
  if (context.generating) return "generating";
  if (context.sendDisabled) return "disabled";
  if (!context.value.trim()) return "empty";
  return "unknown";
};

function ComposedSenderInner<TAttachment = Attachment, TMode = Mode>(
  {
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
    modes = [],
    modeAdapter,
    selectedModes = [],
    modeSelection = "multiple",
    allowEmptySelection,
    onModeToggle,
    onModeChange,
    renderMode,
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
    renderActionBar,
    renderActionsLeft,
    renderActionsRight,
  }: ComposedSenderProps<TAttachment, TMode>,
  ref: React.ForwardedRef<HTMLFormElement>,
) {
  const resolvedAttachmentAdapter =
    (attachmentAdapter as AttachmentAdapter<TAttachment>) ??
    (defaultAttachmentAdapter as AttachmentAdapter<TAttachment>);
  const resolvedModeAdapter =
    (modeAdapter as ModeAdapter<TMode>) ??
    (defaultModeAdapter as ModeAdapter<TMode>);
  const baseContext: SenderCanSendContext<TAttachment, TMode> = {
    value,
    attachments,
    modes,
    selectedModes,
    sendDisabled,
    generating,
  };
  const usesCustomCanSend = Boolean(getCanSend);
  const canSend =
    (getCanSend as
      | ((context: SenderCanSendContext<TAttachment, TMode>) => boolean)
      | undefined)?.(baseContext) ?? defaultCanSend(baseContext);
  const defaultReason = getDefaultSendDisabledReason(
    baseContext,
    usesCustomCanSend,
  );
  const sendDisabledReason =
    !canSend
      ? getSendDisabledReason?.(baseContext) ?? defaultReason
      : undefined;
  const attachmentsCount = attachmentItems?.length ?? attachments.length;
  const canAttach =
    typeof maxAttachments === "number"
      ? attachmentsCount < maxAttachments
      : true;
  const allowEmpty =
    allowEmptySelection ?? (modeSelection === "multiple");

  const attachContext: SenderAttachContext<TAttachment> = {
    attachments,
    maxAttachments,
    attachmentsCount,
    accept,
    sizeLimit,
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

  const handleModeToggle = (modeId: string, mode: TMode) => {
    if (onModeToggle) {
      onModeToggle(modeId);
      return;
    }
    if (!onModeChange) return;
    const isSelected = selectedModes.includes(modeId);
    let nextSelectedModes = selectedModes;

    if (modeSelection === "multiple") {
      nextSelectedModes = isSelected
        ? selectedModes.filter((id) => id !== modeId)
        : [...selectedModes, modeId];
    } else {
      if (isSelected) {
        nextSelectedModes = allowEmpty ? [] : selectedModes;
      } else {
        nextSelectedModes = [modeId];
      }
    }

    onModeChange(nextSelectedModes, {
      modeId,
      mode,
      selected: isSelected,
      nextSelectedModes,
    });
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    onInputKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (!submitOnEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) return;
    if ((event.nativeEvent as { isComposing?: boolean })?.isComposing) return;
    event.preventDefault();
    handleSubmit(event);
  };

  const actionContext: SenderActionRenderContext<TAttachment, TMode> = {
    ...baseContext,
    canSend,
    sendDisabledReason,
    attachmentsCount,
    maxAttachments,
    canAttach,
    accept,
    sizeLimit,
    onAttachRequest: handleAttachRequest,
  };

  return (
    <SenderContainer
      ref={ref}
      className={cn(maxWidth, className)}
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

      <SenderInputRegion>
        {renderInput?.({
          ...baseContext,
          placeholder,
          disabled: inputDisabled,
          onChange,
          onKeyDown: handleInputKeyDown,
        }) ?? (
          <SenderTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={inputDisabled}
            onKeyDown={handleInputKeyDown}
          />
        )}
      </SenderInputRegion>

      {renderActionBar?.(actionContext) ?? (
        <SenderActionBar
          className={cn(
            "flex items-center",
            modes.length > 0 || onAttachRequest || onAttach
              ? "justify-between"
              : "justify-end",
          )}
        >
          <div className="flex items-center gap-2">
            {renderActionsLeft?.(actionContext) ??
              (onAttachRequest || onAttach ? (
                <SenderAttachmentButton
                  type="button"
                  onClick={handleAttachRequest}
                  aria-label="Attach file"
                  disabled={!canAttach}
                >
                  <Paperclip className="size-4" />
                </SenderAttachmentButton>
              ) : null)}
            {modes.length > 0 && (
              <ModeSelector
                modes={modes}
                selectedModes={selectedModes}
                onToggle={handleModeToggle}
                modeAdapter={resolvedModeAdapter}
                renderMode={renderMode}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {renderActionsRight?.(actionContext) ??
              (onSend && (
                <SenderSendButton
                  type="submit"
                  disabled={sendDisabled}
                  generating={generating}
                  generatingContent={
                    <Loader2 className="size-4 text-white animate-spin" />
                  }
                />
              ))}
          </div>
        </SenderActionBar>
      )}
    </SenderContainer>
  );
}

export const ComposedSender = React.forwardRef(ComposedSenderInner) as <
  TAttachment = Attachment,
  TMode = Mode,
>(
  props: ComposedSenderProps<TAttachment, TMode> &
    React.RefAttributes<HTMLFormElement>,
) => React.ReactElement | null;
(ComposedSender as { displayName?: string }).displayName = "ComposedSender";
