import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Sin animaciones: el chat del inicio se muestra completo de inmediato.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("cumple WCAG 2.2 AA y el contraste AAA (axe)", async ({ page }) => {
  await page.goto("/");
  const wcag = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(wcag.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);

  // Contraste reforzado (7:1), pensado para personas mayores.
  const contraste = await new AxeBuilder({ page }).withRules(["color-contrast-enhanced"]).analyze();
  expect(
    contraste.violations.flatMap((v) => v.nodes.map((n) => `${n.target}: ${n.any[0]?.message}`)),
  ).toEqual([]);
});

for (const tamano of ["normal", "grande", "muy-grande"]) {
  test(`sin scroll horizontal con letra ${tamano}`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem("tamano-texto", t), tamano);
    await page.goto("/");
    const [anchoPagina, anchoVentana] = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      window.innerWidth,
    ]);
    expect(anchoPagina).toBeLessThanOrEqual(anchoVentana);
  });
}

test("el tamaño de letra cambia y se recuerda al recargar", async ({ page }) => {
  await page.goto("/");
  const tamanoBase = () =>
    page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
  const normal = await tamanoBase();

  await page.getByRole("button", { name: "Letra muy grande" }).click();
  expect(await tamanoBase()).toBeCloseTo(normal * 1.25, 1);
  await expect(page.getByRole("button", { name: "Letra muy grande" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.reload();
  expect(await tamanoBase()).toBeCloseTo(normal * 1.25, 1);
  await expect(page.getByRole("button", { name: "Letra muy grande" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("«Escuchar esta sección» lee el texto en español y se puede detener", async ({ page }) => {
  // Se reemplaza la voz del navegador por una que anota lo que se leería.
  await page.addInitScript(() => {
    window.__leido = [];
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        speak: (u) => window.__leido.push({ texto: u.text, idioma: u.lang }),
        cancel: () => {},
        getVoices: () => [],
      },
    });
    window.SpeechSynthesisUtterance = function (texto) {
      this.text = texto;
    };
  });
  await page.goto("/");

  const boton = page.locator("#respuestas [data-escuchar]");
  await boton.click();
  await expect(boton).toHaveAttribute("aria-pressed", "true");
  await expect(boton).toContainText("Detener lectura");

  const leido = await page.evaluate(() => window.__leido);
  const texto = leido.map((l) => l.texto).join(" ");
  expect(leido[0].idioma).toMatch(/^es/);
  expect(texto).toContain("Qué te responde Alba");
  expect(texto).toContain("Alba responde: Sí, tenemos Ibuprofeno 400mg disponible.");
  expect(texto).not.toMatch(/a\. m\./); // no lee las horas del chat
  expect(texto).not.toMatch(/\p{Extended_Pictographic}/u); // ni los emojis

  await boton.click();
  await expect(boton).toHaveAttribute("aria-pressed", "false");
});

test("el primer Tab lleva al enlace «Saltar al contenido principal»", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const enlace = page.getByRole("link", { name: "Saltar al contenido principal" });
  await expect(enlace).toBeFocused();
  await expect(enlace).toHaveAttribute("href", "#contenido");
  await expect(page.locator("main#contenido")).toHaveCount(1);
});
