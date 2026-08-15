"use client";

import { ProgressProvider } from "@bprogress/next/app";
import type { ReactNode } from "react";

import type { TextDirection } from "@/i18n/locale";

interface NavigationProgressProviderProps {
  children: ReactNode;
  direction: TextDirection;
}

export function NavigationProgressProvider({
  children,
  direction,
}: NavigationProgressProviderProps) {
  return (
    <ProgressProvider
      color="var(--primary)"
      height="2px"
      options={{ direction, showSpinner: false }}
    >
      {children}
    </ProgressProvider>
  );
}
