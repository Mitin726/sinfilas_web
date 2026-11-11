import { defineConfig, devices } from "@playwright/test";

// Carpeta que se sirve durante las pruebas (el sitio publicado).
const SITE_DIR = process.env.SITE_DIR ?? "dist";
const PORT = 4321;

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "tests/__screenshots__/{arg}-{projectName}{ext}",
  expect: {
    // La web debe verse exactamente igual: sin tolerancia.
    toHaveScreenshot: { maxDiffPixels: 0 },
  },
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `node tests/serve.mjs ${SITE_DIR} ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "movil", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } } },
  ],
});
