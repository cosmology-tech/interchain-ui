import type { Meta, StoryObj } from "@storybook/vue3";
import Skeleton from "../src/ui/skeleton/skeleton.vue";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Skeleton",
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    borderRadius: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  args: {
    width: "200px",
    height: "20px",
    borderRadius: "4px",
  },
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template: '<Skeleton v-bind="args" />',
  }),
};
