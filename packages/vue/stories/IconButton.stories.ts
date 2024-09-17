import type { Meta, StoryObj } from "@storybook/vue3";
import IconButton from "../src/ui/icon-button/icon-button.vue";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Core/IconButton",
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    intent: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: "copy",
    size: "md",
    intent: "primary",
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args" />',
  }),
};
