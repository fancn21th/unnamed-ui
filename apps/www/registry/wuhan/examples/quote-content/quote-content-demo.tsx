"use client";

import { useState } from "react";
import {
  QuoteContent,
  QuoteContentLeading,
  QuoteContentContent,
  QuoteContentText,
  QuoteContentCloseButton,
} from "@/registry/wuhan/blocks/quote-content/quote-content-01";
import { CornerDownLeft, X } from "lucide-react";

export default function QuoteContentDemo() {
  const [showQuote1, setShowQuote1] = useState(true);
  const [showQuote2, setShowQuote2] = useState(true);
  const [showQuote3, setShowQuote3] = useState(true);

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* 基础用法 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          基础用法
        </h3>
        <QuoteContent>
          <QuoteContentLeading>
            <CornerDownLeft className="w-4 h-4" />
          </QuoteContentLeading>
          <QuoteContentContent>
            <QuoteContentText>这是一段引用内容</QuoteContentText>
          </QuoteContentContent>
          <QuoteContentCloseButton
            onClick={() => {
              console.log("关闭引用");
            }}
          >
            <X className="w-4 h-4" />
          </QuoteContentCloseButton>
        </QuoteContent>
      </div>

      {/* 带关闭功能 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          带关闭功能
        </h3>
        {showQuote1 && (
          <QuoteContent>
            <QuoteContentLeading>
              <CornerDownLeft className="w-4 h-4" />
            </QuoteContentLeading>
            <QuoteContentContent>
              <QuoteContentText>
                点击右侧关闭按钮可以关闭这条引用
              </QuoteContentText>
            </QuoteContentContent>
            <QuoteContentCloseButton
              onClick={(e) => {
                e.stopPropagation();
                setShowQuote1(false);
              }}
            >
              <X className="w-4 h-4" />
            </QuoteContentCloseButton>
          </QuoteContent>
        )}
        {!showQuote1 && (
          <button
            onClick={() => setShowQuote1(true)}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            重新显示引用
          </button>
        )}
      </div>

      {/* 长文本溢出 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          长文本溢出处理
        </h3>
        {showQuote2 && (
          <QuoteContent>
            <QuoteContentLeading>
              <CornerDownLeft className="w-4 h-4" />
            </QuoteContentLeading>
            <QuoteContentContent>
              <QuoteContentText>
                这是一段非常长的引用内容，当内容超出容器宽度时会自动截断并显示省略号，确保布局不会被破坏
              </QuoteContentText>
            </QuoteContentContent>
            <QuoteContentCloseButton
              onClick={(e) => {
                e.stopPropagation();
                setShowQuote2(false);
              }}
            >
              <X className="w-4 h-4" />
            </QuoteContentCloseButton>
          </QuoteContent>
        )}
      </div>

      {/* 自定义内容 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          自定义内容
        </h3>
        {showQuote3 && (
          <QuoteContent>
            <QuoteContentLeading>
              <CornerDownLeft className="w-4 h-4" />
            </QuoteContentLeading>
            <QuoteContentContent>
              <QuoteContentText>可以引用消息、回复或其他内容</QuoteContentText>
            </QuoteContentContent>
            <QuoteContentCloseButton
              onClick={(e) => {
                e.stopPropagation();
                setShowQuote3(false);
              }}
            >
              <X className="w-4 h-4" />
            </QuoteContentCloseButton>
          </QuoteContent>
        )}
      </div>

      {/* 无关闭按钮 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          无关闭按钮
        </h3>
        <QuoteContent>
          <QuoteContentLeading>
            <CornerDownLeft className="w-4 h-4" />
          </QuoteContentLeading>
          <QuoteContentContent>
            <QuoteContentText>
              不提供关闭按钮时，引用内容会一直显示
            </QuoteContentText>
          </QuoteContentContent>
        </QuoteContent>
      </div>
    </div>
  );
}
