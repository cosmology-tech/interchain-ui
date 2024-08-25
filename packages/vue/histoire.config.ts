import { HstVue } from "@histoire/plugin-vue";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "histoire";

const aliases = ["ui", "styles", "models", "helpers"];

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ["**/*.stories.vue"],
  vite(config, env) {
    let finalConfig = {
      ...config,
      plugins: config.plugins ?? [],
      resolve: config.resolve ?? {},
    };

    finalConfig.plugins.push(vue(), vanillaExtractPlugin());
    finalConfig.resolve.alias = aliases.map((alias) => ({
      find: `@/${alias}`,
      replacement: path.resolve(__dirname, `src/${alias}`),
    }));

    return finalConfig;
  }
  },
  // setupFile: ".storybook/main.ts",
});
