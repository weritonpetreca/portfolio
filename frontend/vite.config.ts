import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// defineConfig vem de "vitest/config" (não de "vite") propositalmente:
// esse pacote reexporta o defineConfig do Vite já com os tipos do Vitest
// mesclados, então o campo "test" abaixo tem autocomplete e checagem de tipo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    css: true,
  },
});
