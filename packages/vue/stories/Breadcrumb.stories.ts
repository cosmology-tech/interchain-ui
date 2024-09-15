import type { Meta, StoryObj } from "@storybook/vue3";
import Breadcrumb from "../src/ui/breadcrumb/breadcrumb.vue";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: "Breadcrumb",
  tags: ["autodocs"],
  argTypes: {
    children: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Primary: Story = {
  args: {
    children: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Current Page" },
    ],
  },
  render: (args) => ({
    components: { Breadcrumb },
    setup() {
      return { args };
    },
    template: '<Breadcrumb v-bind="args" />',
  }),
};
