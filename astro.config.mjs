import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@lib": path.resolve("./src/lib"),
        "@layouts": path.resolve("./src/layouts"),
        "@components": path.resolve("./src/components"),
      },
    },
  },
});
