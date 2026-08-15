import type { MetadataRoute } from "next";

import { applicationUrl, localizedHomePaths } from "@/app/site-metadata";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: new URL(localizedHomePaths[locale], applicationUrl).href,
  }));
}
