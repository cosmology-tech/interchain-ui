import type { Meta, StoryObj } from "@storybook/vue3";
import Callout from "../src/ui/callout/callout.vue";

const meta: Meta<typeof Callout> = {
  component: Callout,
  title: "Callout",
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "error", "warning", "none"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    title: "Visually important content",
    intent: "info",
    iconName: "lock",
    attributes: {
      width: "600px",
    },
  },
  render: (args) => ({
    components: { Callout },
    setup() {
      return { args };
    },
    template: `
      <Callout v-bind="args">
        You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.
      </Callout>
    `,
  }),
};

// Add more stories for other callout intents...
