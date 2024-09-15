import type { Meta, StoryObj } from "@storybook/vue3";
import ThemeProvider from "../src/ui/theme-provider/theme-provider.vue";
import Box from "../src/ui/box/box.vue";
import Text from "../src/ui/text/text.vue";

const meta: Meta<typeof ThemeProvider> = {
  component: ThemeProvider,
  title: "ThemeProvider",
  tags: ["autodocs"],
  argTypes: {
    themeMode: {
      control: "select",
      options: ["light", "dark"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

export const Primary: Story = {
  args: {
    themeMode: "light",
  },
  render: (args) => ({
    components: { ThemeProvider, Box, Text },
    setup() {
      return { args };
    },
    template: `
      <ThemeProvider v-bind="args">
        <Box p="$4" bg="$background" borderRadius="$md">
          <Text>This content is wrapped in a ThemeProvider</Text>
        </Box>
      </ThemeProvider>
    `,
  }),
};
