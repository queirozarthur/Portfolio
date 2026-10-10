import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Publicado em https://queirozarthur.github.io/Portfolio/
export default defineConfig({
  base: "/Portfolio/",
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 600 },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
