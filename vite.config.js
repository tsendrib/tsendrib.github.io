import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tailwindcss()],
});
