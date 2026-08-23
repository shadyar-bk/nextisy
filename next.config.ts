import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  serverExternalPackages: ["@takumi-rs/core"],
};

export default createNextIntlPlugin()(nextConfig);
