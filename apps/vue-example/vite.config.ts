import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      vueTsc: true,
    }),
    vanillaExtractPlugin(),
    vue(),
  ],
});
