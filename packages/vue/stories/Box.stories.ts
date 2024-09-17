import type { Meta, StoryObj } from "@storybook/vue3";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Box> = {
  component: Box,
  title: "Core/Box",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    bg: "$background",
    color: "$text",
    p: "$4",
    borderRadius: "$md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$divider",
  },
  render: (args) => ({
    components: { Box },
    setup() {
      const handleClick = () => {
        alert("Box clicked");
      };
      return { args, handleClick };
    },
    template: `
      <Box v-bind="args" @click="handleClick">
        This is a Box component
      </Box>
    `,
  }),
};
