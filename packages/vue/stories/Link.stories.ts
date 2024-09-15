import type { Meta, StoryObj } from "@storybook/vue3";
import Link from "../src/ui/link/link.vue";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Link",
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text" },
    target: {
      control: "select",
      options: ["_blank", "_self", "_parent", "_top"],
    },
    underline: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    underline: true,
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: '<Link v-bind="args">Click me</Link>',
  }),
};
