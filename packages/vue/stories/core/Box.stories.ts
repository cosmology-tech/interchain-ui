import type { Meta, StoryObj } from "@storybook/vue3";
import Box from "../../src/ui/box/box.vue";

const meta = {
  title: "Core/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: { control: "text" },
    className: { control: "text" },
    backgroundColor: { control: "color" },
    padding: { control: "text" },
    margin: { control: "text" },
    borderRadius: { control: "text" },
    rawCSS: { control: "object" },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: "div",
    backgroundColor: "$background",
    padding: "$10",
    margin: "$10",
    fontSize: "$2xl",
    fontFamily: "$body",
    color: "$primary400",
    borderRadius: "$sm",
  },
  render: (args) => ({
    components: { Box },
    setup() {
      const handleClick = () => {
        console.log("Box clicked");
      };
      const handleMouseEnter = () => {
        console.log("Box mouse enter");
      };
      const handleMouseLeave = () => {
        console.log("Box mouse up");
      };
      return { args, handleClick, handleMouseEnter, handleMouseLeave };
    },
    template: `<Box
        v-bind="args"
        @click="handleClick"
        :onMouseEnter="handleMouseEnter"
        :onMouseLeave="handleMouseLeave"
      >
        This is a Box component
      </Box>`,
  }),
};

export const CustomElement: Story = {
  args: {
    as: "span",
    backgroundColor: "$background",
    padding: "$10",
    margin: "$10",
    fontSize: "$2xl",
    fontFamily: "$body",
    color: "$accent",
    borderRadius: "$sm",
  },
  render: (args) => ({
    components: { Box },
    setup() {
      return { args };
    },
    template: '<Box v-bind="args">This is a Box as a span</Box>',
  }),
};
