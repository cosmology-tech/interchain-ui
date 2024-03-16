import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

console.log("dirname", __dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vanillaExtractPlugin(), vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "InterchainUIVue",
      fileName: "interchain-ui-vue",
    },
    rollupOptions: {
      external: ["vue", "@formkit/auto-animate"],
      output: {
        globals: {
          vue: "Vue",
          "@formkit/auto-animate": "autoAnimate",
        },
      },
    },
  },
});
