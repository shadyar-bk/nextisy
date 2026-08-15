"use client";

/* oxlint-disable tailwindcss/no-unknown-classes -- --gap is a typed CSS custom property consumed by Tailwind's spacing expression. */

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import type { CSSProperties } from "react";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  orientation: "horizontal",
  size: "default",
  spacing: 2,
  variant: "default",
});

type ToggleGroupStyle = CSSProperties & {
  "--gap": number;
};

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  const contextValue = { orientation, size, spacing, variant };
  const style: ToggleGroupStyle = { "--gap": spacing };

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={style}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[spacing=0]:data-[variant=outline]:rounded-3xl data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-2.5 first:group-data-horizontal/toggle-group:data-[spacing=0]:rounded-s-3xl first:group-data-vertical/toggle-group:data-[spacing=0]:rounded-t-3xl last:group-data-horizontal/toggle-group:data-[spacing=0]:rounded-e-3xl last:group-data-vertical/toggle-group:data-[spacing=0]:rounded-b-3xl data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 first:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s first:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t",
        toggleVariants({
          size: context.size ?? size,
          variant: context.variant ?? variant,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
