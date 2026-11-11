import { test, expect } from "@playwright/test";

// Compara la página completa contra las capturas de referencia guardadas
// en tests/__screenshots__. Si algo cambia visualmente, la prueba falla.
// Recorre la página para que carguen las imágenes diferidas (loading="lazy").
async function cargarImagenes(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() =>
    Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
  );
}

test("la landing se ve igual que la referencia", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await cargarImagenes(page);
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("landing.png", { fullPage: true, animations: "disabled" });
});

test("el estado hover/focus de la navegación se mantiene", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("link", { name: "Cómo funciona" }).first().focus();
  await expect(page.locator("header")).toHaveScreenshot("header-focus.png");
});

// Estado hover de cada botón de llamada a la acción.
const botones = [
  { seccion: "#hero", nombre: "Escribirle a Alba en Telegram" },
  { seccion: "#alba", nombre: "Escribirle a Alba en Telegram" },
  { seccion: "#llamado-accion", nombre: "Escribirle a Alba en Telegram" },
];

for (const { seccion, nombre } of botones) {
  test(`hover del botón «${nombre}» en ${seccion}`, async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const boton = page.locator(seccion).getByRole("link", { name: nombre, exact: true });
    await boton.scrollIntoViewIfNeeded();
    await boton.hover();
    await page.waitForTimeout(300); // fin de la transición
    // Se captura solo el botón: capturar la sección entera puede hacer scroll
    // y sacar el botón de debajo del cursor, perdiendo el hover.
    await expect(boton).toHaveScreenshot(`hover-${seccion.slice(1)}.png`, {
      animations: "disabled",
    });
  });
}
