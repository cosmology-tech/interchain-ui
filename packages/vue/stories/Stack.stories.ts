import type { Meta, StoryObj } from "@storybook/vue3";
import Stack from "../src/ui/stack/stack.vue";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Stack> = {
  component: Stack,
  title: "Core/Stack",
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    space: {
      control: "select",
      options: ["$2", "$4", "$6", "$8"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Primary: Story = {
  args: {
    direction: "vertical",
    space: "$4",
  },
  render: (args) => ({
    components: { Stack, Box },
    setup() {
      return { args };
    },
    template: `
      <Stack v-bind="args">
        <Box bg="$primary" p="$4" borderRadius="$md">Item 1</Box>
        <Box bg="$secondary" p="$4" borderRadius="$md">Item 2</Box>
        <Box bg="$tertiary" p="$4" borderRadius="$md">Item 3</Box>
      </Stack>
    `,
  }),
};
