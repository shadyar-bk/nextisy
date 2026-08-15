import type { MetadataRoute } from "next";

import { applicationName } from "@/app/site-metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fafafa",
    description:
      "A clean, internationalized Next.js template with accessible components and light, dark, and system themes.",
    display: "standalone",
    icons: [{ purpose: "any", sizes: "any", src: "/icon.svg", type: "image/svg+xml" }],
    id: "/",
    name: applicationName,
    short_name: applicationName,
    start_url: "/",
    theme_color: "#0a0a0a",
  };
}
