import type { AppLocale } from "@/i18n/routing";

export type TextDirection = "ltr" | "rtl";

export const localeOptions: readonly {
  direction: TextDirection;
  label: string;
  locale: AppLocale;
}[] = [
  { direction: "rtl", label: "کوردی", locale: "ku-IQ" },
  { direction: "rtl", label: "العربية", locale: "ar-IQ" },
  { direction: "ltr", label: "English", locale: "en-US" },
];

const localeDirections = {
  "ar-IQ": "rtl",
  "en-US": "ltr",
  "ku-IQ": "rtl",
} satisfies Record<AppLocale, TextDirection>;

export function getLocaleDirection(locale: AppLocale): TextDirection {
  return localeDirections[locale];
}
