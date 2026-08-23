import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "ckb-IQ",
  localeDetection: false,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "ar-IQ": "/ar",
      "en-US": "/en",
    },
  },
  locales: ["ckb-IQ", "ar-IQ", "en-US"],
});

export type AppLocale = (typeof routing.locales)[number];
