import type { Meta, StoryObj } from "@storybook/vue3";
import Text from "../src/ui/text/text.vue";

const meta: Meta<typeof Text> = {
  component: Text,
  title: "Core/Text",
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
    fontSize: {
      control: "select",
      options: ["$xs", "$sm", "$md", "$lg", "$xl", "$2xl", "$3xl", "$4xl"],
    },
    fontWeight: {
      control: "select",
      options: ["$normal", "$medium", "$semibold", "$bold"],
    },
    color: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    as: "p",
    fontSize: "$md",
    fontWeight: "$normal",
    color: "$text",
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a text component</Text>',
  }),
};
