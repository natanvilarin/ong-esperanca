
import { resolve } from "node:path";
import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";

export default defineConfig({
  plugins: [
    htmlMinifier({
  minify: true
})
  ],
  build: {
    minify: true,
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        projetos: resolve(import.meta.dirname, "projetos.html"),
        cadastro: resolve(import.meta.dirname, "cadastro.html")
      }
    }
  }
});