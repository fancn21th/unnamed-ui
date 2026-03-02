"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import {
  ButtonPrimitive,
  type ButtonPrimitiveProps,
} from "@/components/wuhan/blocks/block-button-01";

export type { ButtonPrimitiveProps };

export type ButtonIcon =
  | React.ReactNode
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface ButtonProps extends ButtonPrimitiveProps {
  asChild?: boolean;
  block?: boolean;
  icon?: ButtonIcon;
  iconRight?: ButtonIcon;
  className?: string;
}

const renderIcon = (icon: ButtonIcon, loading: boolean): React.ReactNode => {
  if (!icon || loading) return null;

  if (React.isValidElement(icon)) {
    return (
      <span className="size-4 shrink-0 flex items-center justify-center">
        {icon}
      </span>
    );
  }

  const IconComponent = icon as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  if (
    typeof IconComponent === "function" ||
    typeof IconComponent === "object"
  ) {
    return <IconComponent className="size-4 shrink-0" aria-hidden="true" />;
  }

  return null;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      asChild = false,
      block = false,
      icon,
      iconRight,
      className,
      disabled,
      loading,
      progress,
      progressValue,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : ButtonPrimitive;
    const isDisabled = Boolean(disabled || loading || progress);
    const combinedClassName = block ? cn(className, "w-full") : className;
    const hasChildren = children != null && children !== "";

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={combinedClassName}
        data-slot="button"
        variant={props.variant}
        color={props.color}
        size={props.size}
        loading={Boolean(loading)}
        progress={Boolean(progress)}
        progressValue={progressValue}
        {...props}
      >
        <div
          className={cn(
            "flex items-center",
            hasChildren && "gap-[var(--gap-md)]",
          )}
        >
          {renderIcon(icon, Boolean(loading))}
          <span className="whitespace-nowrap">{children}</span>
          {renderIcon(iconRight, Boolean(loading))}
        </div>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button as ButtonComposed };
