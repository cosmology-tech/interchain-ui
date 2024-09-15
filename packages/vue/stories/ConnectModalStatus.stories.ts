import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalStatus from "../src/ui/connect-modal-status/connect-modal-status.vue";

const meta: Meta<typeof ConnectModalStatus> = {
  component: ConnectModalStatus,
  title: "ConnectModalStatus",
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["Connected", "Connecting", "Error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalStatus>;

export const Primary: Story = {
  args: {
    status: "Connected",
    connectedInfo: {
      avatar: "https://example.com/avatar.jpg",
      name: "John Doe",
      address: "0x1234...5678",
    },
    wallet: {
      name: "Example Wallet",
      logo: "https://example.com/wallet-logo.png",
      mobileDisabled: false,
    },
  },
  render: (args) => ({
    components: { ConnectModalStatus },
    setup() {
      return { args };
    },
    template: '<ConnectModalStatus v-bind="args" />',
  }),
};
