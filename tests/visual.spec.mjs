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

// Estado hover de cada botón de llamada a la acción.
const botones = [
  { seccion: "#hero", nombre: "Conoce a Alba" },
  { seccion: "#alba", nombre: "Habla con Alba" },
  { seccion: "#llamado-accion", nombre: "Habla con Alba ahora" },
];

for (const { seccion, nombre } of botones) {
  test(`hover del botón «${nombre}»`, async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const boton = page.locator(seccion).getByRole("link", { name: nombre, exact: true });
    await boton.scrollIntoViewIfNeeded();
    await boton.hover();
    await page.waitForTimeout(300); // fin de la transición
    await expect(page.locator(seccion)).toHaveScreenshot(`hover-${seccion.slice(1)}.png`, { animations: "disabled" });
  });
}
