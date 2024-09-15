import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "../src/ui/tooltip/tooltip.vue";
import Button from "../src/ui/button/button.vue";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Tooltip",
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    title: "This is a tooltip",
    placement: "top",
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `,
  }),
};
