"use client";

import { useState } from "react";
import { ComposedSender } from "@/registry/wuhan/examples/sender/sender-composed-demo";
import { Search, Brain, FileText, Image } from "lucide-react";

export default function SenderDemo() {
  const [value, setValue] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [attachments, setAttachments] = useState([
    {
      id: "attachment-1",
      name: "screenshot.png",
      thumbnail: "https://via.placeholder.com/64",
      size: "2.3 MB",
      icon: Image,
    },
    {
      id: "attachment-2",
      name: "document.pdf",
      size: "1.5 MB",
      icon: FileText,
    },
    {
      id: "attachment-3",
      name: "presentation.pptx",
      size: "5.8 MB",
      icon: FileText,
    },
    {
      id: "attachment-4",
      name: "spreadsheet.xlsx",
      size: "892 KB",
      icon: FileText,
    },
    {
      id: "attachment-5",
      name: "video-demo.mp4",
      size: "15.2 MB",
      icon: FileText,
    },
    {
      id: "attachment-6",
      name: "design-mockup.fig",
      size: "3.4 MB",
      icon: FileText,
    },
    {
      id: "attachment-7",
      name: "code-archive.zip",
      size: "1.2 MB",
      icon: FileText,
    },
    {
      id: "attachment-8",
      name: "meeting-notes.docx",
      size: "456 KB",
      icon: FileText,
    },
    {
      id: "attachment-9",
      name: "image.jpg",
      size: "1.2 MB",
      icon: Image,
    },
  ]);

  const modes = [
    // { id: "web-search", label: "联网搜索", icon: Search },
    { id: "deep-think", label: "深度思考", icon: Brain },
  ];

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="w-full max-w-2xl text-sm text-muted-foreground mb-2">
        示例：使用组合组件构建的 Sender
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
