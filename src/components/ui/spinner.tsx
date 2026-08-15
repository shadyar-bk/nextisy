"use client";

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- An SVG loading icon is a status indicator; replacing it with output would misrepresent it as a calculation result. */

import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { HugeiconsIconProps } from "@hugeicons/react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  label = "Loading",
  ...props
}: Omit<HugeiconsIconProps, "icon"> & { label?: string }) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
