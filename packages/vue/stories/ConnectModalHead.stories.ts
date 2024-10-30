import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalHead from "../src/ui/connect-modal-head/connect-modal-head.vue";

const meta: Meta<typeof ConnectModalHead> = {
  component: ConnectModalHead,
  title: "ConnectModal/ConnectModalHead",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    hasCloseButton: { control: "boolean" },
    hasBackButton: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalHead>;

export const Primary: Story = {
  args: {
    title: "Connect Wallet",
    id: "connect-modal-head-title",
    hasCloseButton: true,
    hasBackButton: false,
  },
  render: (args) => ({
    components: { ConnectModalHead },
    setup() {
      return { args };
    },
    template: '<ConnectModalHead v-bind="args" />',
  }),
};
