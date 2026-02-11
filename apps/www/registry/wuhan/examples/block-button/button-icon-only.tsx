"use client";

import { Button } from "@/registry/wuhan/composed/block-button/block-button";
import { Download, Heart, Search, Settings, Star, Trash2 } from "lucide-react";

export default function ButtonIconOnlyDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          纯图标按钮（不同尺寸）
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="solid"
            color="primary"
            size="sm"
            icon={<Search className="size-4" />}
          />
          <Button
            variant="solid"
            color="primary"
            size="md"
            icon={<Heart className="size-4" />}
          />
          <Button
            variant="solid"
            color="primary"
            size="lg"
            icon={<Star className="size-5" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          纯图标按钮（不同变体）
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="solid"
            color="primary"
            icon={<Download className="size-4" />}
          />
          <Button
            variant="outline"
            color="primary"
            icon={<Download className="size-4" />}
          />
          <Button
            variant="text"
            color="primary"
            icon={<Download className="size-4" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          纯图标按钮（不同颜色）
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="solid"
            color="primary"
            icon={<Settings className="size-4" />}
          />
          <Button
            variant="solid"
            color="secondary"
            icon={<Settings className="size-4" />}
          />
          <Button
            variant="solid"
            color="danger"
            icon={<Trash2 className="size-4" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          纯图标按钮（禁用状态）
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="solid"
            color="primary"
            icon={<Settings className="size-4" />}
            disabled
          />
          <Button
            variant="outline"
            color="primary"
            icon={<Settings className="size-4" />}
            disabled
          />
          <Button
            variant="text"
            color="primary"
            icon={<Settings className="size-4" />}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
