/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { writeResourceCatalog } from "./scripts/export-resources";

const env = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

function exportResourceCatalogPlugin(): Plugin {
  const write = () => {
    writeResourceCatalog();
  };
  return {
    name: "export-resource-catalog",
    buildStart: write,
    configureServer: write,
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), exportResourceCatalogPlugin()],
  base: env.process?.env?.GITHUB_PAGES === "true" ? "/next-move/" : "/",
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
