import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "ku-IQ",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "ar-IQ": "/ar",
      "en-US": "/en",
      "ku-IQ": "/ku",
    },
  },
  locales: ["ku-IQ", "ar-IQ", "en-US"],
});

export type AppLocale = (typeof routing.locales)[number];
