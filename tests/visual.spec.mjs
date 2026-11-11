import { test, expect } from "@playwright/test";

// Compara la página completa contra las capturas de referencia guardadas
// en tests/__screenshots__. Si algo cambia visualmente, la prueba falla.
test("la landing se ve igual que la referencia", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("landing.png", { fullPage: true, animations: "disabled" });
});

test("el estado hover/focus de la navegación se mantiene", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("link", { name: "Conoce a Alba" }).first().focus();
  await expect(page.locator("header")).toHaveScreenshot("header-focus.png");
});
