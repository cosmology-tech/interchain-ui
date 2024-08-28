import path from "node:path";
import { copyFileSync } from "node:fs";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import VueComplexTypes from "@vue.ts/complex-types/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { globbySync } from "globby";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import pkg from "./package.json";

export default defineConfig({
  logLevel: "warn",
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
    VueComplexTypes({
      tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
      exclude: [/\.css\.ts$/],
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    VueJsx({
      include: [/\.vue$/, /\.md$/],
      exclude: [/\.css\.ts$/],
    }),
    vanillaExtractPlugin({
      identifiers: "short",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".vue"],
  },
  build: {
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
});
