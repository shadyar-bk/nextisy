import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  forbidOnly: true,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
  ],
  reporter: "html",
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm dev",
    env: { APP_ORIGIN: "http://localhost:3000" },
    reuseExistingServer: process.env["CI"] === undefined,
    url: "http://localhost:3000",
  },
});
