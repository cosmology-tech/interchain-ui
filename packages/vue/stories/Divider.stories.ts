import type { Meta, StoryObj } from "@storybook/vue3";
import Divider from "../src/ui/divider/divider.vue";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: "Core/Divider",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { Divider, Box },
    setup() {
      return { args };
    },
    template: `
      <Box>
        <Box p="$4">Content above</Box>
        <Divider v-bind="args" />
        <Box p="$4">Content below</Box>
      </Box>
    `,
  }),
};
