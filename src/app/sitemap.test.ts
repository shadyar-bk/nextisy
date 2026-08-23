import { describe, expect, it } from "vitest";

describe("sitemap", () => {
  it("lists every localized home page", async () => {
    process.env["APP_ORIGIN"] = "https://example.com";
    const { default: generateSitemap } = await import("@/app/sitemap");
    const entries = generateSitemap();

    expect(entries.map(({ url }) => new URL(url).pathname)).toStrictEqual(["/", "/ar", "/en"]);
    expect(entries[0]?.alternates?.languages).toStrictEqual({
      "ar-IQ": "https://example.com/ar",
      "ckb-IQ": "https://example.com/",
      "en-US": "https://example.com/en",
    });
  });
});
