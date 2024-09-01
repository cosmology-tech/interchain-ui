import type { Preview } from "@storybook/vue3";
import ThemeProvider from "../src/ui/theme-provider/theme-provider.vue";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      return {
        components: { themeProvider: ThemeProvider, story },
        template: "<themeProvider><story /></themeProvider>",
      };
    },
  ],
};

export default preview;
