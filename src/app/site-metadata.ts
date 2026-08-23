import { env } from "@/env";
import { getPathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export const applicationName = "Nextisy";
export const applicationUrl = new URL(env.APP_ORIGIN);

export const localizedHomePaths = {
  "ar-IQ": getPathname({ href: "/", locale: "ar-IQ" }),
  "ckb-IQ": getPathname({ href: "/", locale: "ckb-IQ" }),
  "en-US": getPathname({ href: "/", locale: "en-US" }),
} satisfies Record<AppLocale, string>;
