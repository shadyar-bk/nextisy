import { expect, test } from "@playwright/test";

test("locale routes follow the prefix, direction, and font contract", async ({ page, request }) => {
  const root = await request.get("/", {
    headers: { "Accept-Language": "en-US" },
    maxRedirects: 0,
  });
  expect(root.status()).toBe(200);

  const oldKurdishRoute = await request.get("/ku", { maxRedirects: 0 });
  expect(oldKurdishRoute.status()).toBe(404);

  for (const [path, locale, direction] of [
    ["/", "ckb-IQ", "rtl"],
    ["/ar", "ar-IQ", "rtl"],
    ["/en", "en-US", "ltr"],
  ] as const) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", direction);
  }

  await page.goto("/en");
  await page.getByRole("button", { name: "Change language" }).press("Enter");

  for (const [locale, font] of [
    ["ckb-IQ", /Noto Kufi Arabic/u],
    ["ar-IQ", /Noto Kufi Arabic/u],
    ["en-US", /Geist/u],
  ] as const) {
    await expect(page.locator(`[role="menuitemradio"] [lang="${locale}"]`)).toHaveCSS(
      "font-family",
      font
    );
  }
});

test("locale switching preserves the query and hash", async ({ page }) => {
  await page.goto("/en?view=compact#preview");
  await page.getByRole("button", { name: "Change language" }).press("Enter");
  await page.getByRole("menuitemradio", { name: "العربية" }).press("Enter");
  await expect(page).toHaveURL(/\/ar\?view=compact#preview$/u);
});
