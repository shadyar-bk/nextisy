import { env } from "@/env";
import { getPathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export const applicationName = "Nextisy";
export const applicationUrl = new URL(env.APP_ORIGIN);

export const localizedHomePaths = {
  "ar-IQ": getPathname({ href: "/", locale: "ar-IQ" }),
  "en-US": getPathname({ href: "/", locale: "en-US" }),
  "ku-IQ": getPathname({ href: "/", locale: "ku-IQ" }),
} satisfies Record<AppLocale, string>;
