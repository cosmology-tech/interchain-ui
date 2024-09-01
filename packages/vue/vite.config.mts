import { globbySync } from "globby";
import { copyFileSync } from "node:fs";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import ViteVueComplexTypes from "@vue.ts/complex-types/vite";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      staticImport: true,
      exclude: [
        "**/*.stories.*",
        "**/*.test.*",
        "**/tests/*",
        "**/examples/*",
        "**/setup-test.ts",
      ],
      afterBuild: () => {
        globbySync(["dist/**/*.d.ts", "dist/**.d.ts"]).map((file) => {
          copyFileSync(file, file.replace(/\.d\.ts$/, ".d.cts"));
        });
      },
    }),
    ViteVueComplexTypes(),
    vanillaExtractPlugin(),
    vue(),
  ],
  build: {
    outDir: "dist",
    target: "esnext",
    minify: false,
    lib: {
      entry: globbySync("src/**/index.ts"),
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: [
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].cjs",
        },
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
  resolve: {
    conditions: ["source"],
  },
});
