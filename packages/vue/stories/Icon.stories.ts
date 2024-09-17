import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "../src/ui/icon/icon.vue";

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Core/Icon",
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["copy", "walletFilled", "chevronRight", "closeFilled"], // Add more icon names as needed
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    name: "copy",
    size: "md",
  },
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};
