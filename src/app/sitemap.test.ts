import { describe, expect, it } from "vitest";

describe("sitemap", () => {
  it("lists every localized home page", async () => {
    process.env.APP_ORIGIN = "https://example.com";
    const { default: generateSitemap } = await import("@/app/sitemap");
    const entries = generateSitemap();

    expect(entries.map(({ url }) => new URL(url).pathname)).toStrictEqual(["/", "/ar", "/en"]);
  });
});
