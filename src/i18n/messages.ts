import type { AppLocale } from "@/i18n/routing";
import arabicMessages from "@/locales/ar-IQ.json";
import englishMessages from "@/locales/en-US.json";
import kurdishMessages from "@/locales/ku-IQ.json";

export const messagesByLocale = {
  "ar-IQ": arabicMessages,
  "en-US": englishMessages,
  "ku-IQ": kurdishMessages,
} satisfies Record<AppLocale, typeof englishMessages>;
