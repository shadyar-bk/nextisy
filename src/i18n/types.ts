import type { AppLocale } from "@/i18n/routing";
import type messages from "@/locales/en-US.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof messages;
  }
}
