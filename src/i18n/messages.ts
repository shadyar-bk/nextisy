import type { AppLocale } from "@/i18n/routing";
import arabicMessages from "@/locales/ar-IQ.json";
import kurdishMessages from "@/locales/ckb-IQ.json";
import englishMessages from "@/locales/en-US.json";

export const messagesByLocale = {
  "ar-IQ": arabicMessages,
  "ckb-IQ": kurdishMessages,
  "en-US": englishMessages,
} satisfies Record<AppLocale, typeof englishMessages>;
