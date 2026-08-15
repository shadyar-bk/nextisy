import { afterEach, describe, expect, it, vi } from "vitest";

describe("APP_ORIGIN", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it.each(["https://example.com/path", "https://example.com?preview=true"])(
    "rejects a URL that is not an origin: %s",
    async (origin) => {
      vi.stubEnv("APP_ORIGIN", origin);

      await expect(import("@/env")).rejects.toThrow("Invalid environment variables");
    }
  );

  it.each(["https://example.com", "http://localhost:3000"])(
    "accepts an HTTP(S) origin: %s",
    async (origin) => {
      vi.stubEnv("APP_ORIGIN", origin);

      const { env } = await import("@/env");

      expect(env.APP_ORIGIN).toBe(origin);
    }
  );
});
