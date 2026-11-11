// @ts-check
import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://sinfilas.netlify.app",
  // Los estilos de cada componente se aíslan con :where(), que no suma
  // especificidad: un selector pesa lo mismo dentro y fuera del componente.
  scopedStyleStrategy: "where",
});
