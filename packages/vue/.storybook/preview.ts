import type { Preview } from "@storybook/vue3";
import WithThemeDecorator from "./WithThemeDecorator.vue";

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
    (story) => ({
      components: { WithThemeDecorator, story: story as any },
      template: "<WithThemeDecorator><story /></WithThemeDecorator>",
    }),
  ],
};

export default preview;
