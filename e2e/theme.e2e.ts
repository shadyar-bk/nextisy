import { expect, test } from "@playwright/test";

test("theme preference persists and follows system changes", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "theme",
      url: "http://localhost:3000",
      value: "dark",
    },
  ]);

  await page.goto("/en");
  await expect(page.locator("html")).toHaveClass(/dark/u);

  await page.getByRole("button", { name: "Change appearance" }).click();
  await page.getByRole("menuitemradio", { name: "Light" }).click();
  await expect(page.locator("html")).toHaveClass(/light/u);

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/u);

  await page.emulateMedia({ colorScheme: "dark" });
  await page.getByRole("button", { name: "Change appearance" }).click();
  await page.getByRole("menuitemradio", { name: "System" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/u);
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveClass(/light/u);
});
