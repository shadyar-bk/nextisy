import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

type IconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "strokeWidth"> & {
  strokeWidth?: number;
};

export function Icon({
  size = 16,
  strokeWidth = 1.5,
  color = "currentColor",
  focusable = false,
  "aria-hidden": ariaHidden = true,
  className,
  ...rest
}: IconProps) {
  return (
    <HugeiconsIcon
      aria-hidden={ariaHidden}
      className={className}
      size={size}
      color={color}
      focusable={focusable}
      strokeWidth={strokeWidth}
      {...rest}
    />
  );
}
