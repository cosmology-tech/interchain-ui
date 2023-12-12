import { dirname, join } from "path";
import { mergeConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*mdx", "../stories/**/*.stories.@(jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-viewport"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {},
  features: {
    buildStoriesJson: true,
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    if (configType === "PRODUCTION") {
      return mergeConfig(config, {
        // customize the Vite config here
        plugins: [react(), splitVendorChunkPlugin(), vanillaExtractPlugin()],
        build: {
          rollupOptions: {
            output: {
              manualChunks(id: string) {
                // creating a chunk for mock data
                if (id.includes("stub/")) {
                  return "stub";
                }
              },
            },
          },
        },
      });
    }

    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
