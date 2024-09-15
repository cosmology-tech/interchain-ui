import type { Meta, StoryObj } from "@storybook/vue3";
import Center from "../src/ui/center/center.vue";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Center> = {
  component: Center,
  title: "Center",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Center>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { Center, Box },
    setup() {
      return { args };
    },
    template: `
      <Center v-bind="args" style="height: 200px; border: 1px solid #ccc;">
        <Box bg="$primary" p="$4" borderRadius="$md">Centered Content</Box>
      </Center>
    `,
  }),
};
