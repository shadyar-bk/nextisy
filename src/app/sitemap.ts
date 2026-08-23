import type { MetadataRoute } from "next";

import { applicationUrl, localizedHomePaths } from "@/app/site-metadata";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = routing.locales.map((locale) => ({
    locale,
    url: new URL(localizedHomePaths[locale], applicationUrl).href,
  }));
  const languages = Object.fromEntries(entries.map(({ locale, url }) => [locale, url]));

  return entries.map(({ url }) => ({ alternates: { languages }, url }));
}
