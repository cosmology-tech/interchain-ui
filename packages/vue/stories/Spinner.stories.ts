import type { Meta, StoryObj } from "@storybook/vue3";
import Spinner from "../src/ui/spinner/spinner.vue";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Spinner",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: {
    size: "md",
  },
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template: '<Spinner v-bind="args" />',
  }),
};
