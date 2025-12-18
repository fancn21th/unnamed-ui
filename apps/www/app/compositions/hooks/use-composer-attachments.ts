"use client";

import * as React from "react";

export type ComposerAttachment = {
  id: string;
  name: string;
  fileType?: string;
  fileSize?: string;
  isImage?: boolean;
  thumbnail?: string; // runtime only (objectURL)
  loading?: boolean;
};

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0B";
  const units = ["B", "KB", "MB", "GB"];
  const idx = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / Math.pow(1024, idx);
  const fixed = idx === 0 ? 0 : value < 10 ? 1 : 0;
  return `${value.toFixed(fixed)}${units[idx]}`;
}

function guessFileTypeFromName(name: string | undefined): string | undefined {
  const ext = name?.split(".").pop()?.trim();
  if (!ext) return undefined;
  return ext.toUpperCase();
}

export function useComposerAttachments() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const timeoutsRef = React.useRef<Map<string, number>>(new Map());
  const attachmentsRef = React.useRef<ComposerAttachment[]>([]);
  const retainedThumbnailsRef = React.useRef<string[]>([]);

  const [attachments, setAttachments] = React.useState<ComposerAttachment[]>([]);

  React.useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  const isUploading = React.useMemo(
    () => attachments.some((a) => a.loading),
    [attachments],
  );

  const openFileDialog = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeAttachment = React.useCallback((id: string) => {
    setAttachments((prev) => {
      const next = prev.filter((a) => a.id !== id);
      const removed = prev.find((a) => a.id === id);
      if (removed?.thumbnail) {
        try {
          URL.revokeObjectURL(removed.thumbnail);
        } catch {
          // ignore
        }
      }
      return next;
    });

    const t = timeoutsRef.current.get(id);
    if (t != null) {
      window.clearTimeout(t);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const clearAll = React.useCallback((opts?: { revokeThumbnails?: boolean }) => {
    const revokeThumbnails = opts?.revokeThumbnails ?? true;
    setAttachments((prev) => {
      for (const a of prev) {
        if (a.thumbnail) {
          if (revokeThumbnails) {
            try {
              URL.revokeObjectURL(a.thumbnail);
            } catch {
              // ignore
            }
          } else {
            retainedThumbnailsRef.current.push(a.thumbnail);
          }
        }
      }
      return [];
    });
    for (const t of timeoutsRef.current.values()) window.clearTimeout(t);
    timeoutsRef.current.clear();
  }, []);

  const onFileInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      // allow selecting same file again
      e.currentTarget.value = "";
      if (files.length === 0) return;

      const now = Date.now();
      const newItems: ComposerAttachment[] = files.map((file, idx) => {
        const isImage = file.type.startsWith("image/");
        const thumbnail = isImage ? URL.createObjectURL(file) : undefined;
        const fileType = guessFileTypeFromName(file.name);
        const fileSize = formatBytes(file.size);
        return {
          id: `att-${now}-${idx}`,
          name: file.name || `file-${now}-${idx}`,
          fileType,
          fileSize,
          isImage,
          thumbnail,
          loading: true,
        };
      });

      setAttachments((prev) => [...prev, ...newItems]);

      // simulate upload complete
      for (const item of newItems) {
        const ms = 800 + Math.floor(Math.random() * 900);
        const t = window.setTimeout(() => {
          timeoutsRef.current.delete(item.id);
          setAttachments((prev) =>
            prev.map((a) => (a.id === item.id ? { ...a, loading: false } : a)),
          );
        }, ms);
        timeoutsRef.current.set(item.id, t);
      }
    },
    [],
  );

  React.useEffect(() => {
    return () => {
      // cleanup
      for (const t of timeoutsRef.current.values()) window.clearTimeout(t);
      timeoutsRef.current.clear();
      for (const a of attachmentsRef.current) {
        if (a.thumbnail) {
          try {
            URL.revokeObjectURL(a.thumbnail);
          } catch {
            // ignore
          }
        }
      }
      for (const url of retainedThumbnailsRef.current) {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      }
      retainedThumbnailsRef.current = [];
    };
  }, []);

  return {
    attachments,
    setAttachments,
    isUploading,
    fileInputRef,
    openFileDialog,
    onFileInputChange,
    removeAttachment,
    clearAll,
  };
}


