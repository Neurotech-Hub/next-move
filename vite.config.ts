import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const env = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: env.process?.env?.GITHUB_PAGES === "true" ? "/InnovationNavigator/" : "/",
});
