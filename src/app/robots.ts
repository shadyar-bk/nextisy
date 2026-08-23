import type { MetadataRoute } from "next";

import { applicationUrl } from "@/app/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: "/api/",
      userAgent: "*",
    },
    sitemap: new URL("/sitemap.xml", applicationUrl).href,
  };
}
