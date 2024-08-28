import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig, optimizeDeps } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        // Vue({
        //   include: [/\.vue$/, /\.md$/],
        //   template: {
        //     compilerOptions: {
        //       isCustomElement: (tag) => tag.includes("-"),
        //     },
        //   },
        // }),
        // VueJsx(),
        vanillaExtractPlugin(),
      ],
    });
  },
};
export default config;
