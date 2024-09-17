import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalWalletButton from "../src/ui/connect-modal-wallet-button/connect-modal-wallet-button.vue";

const meta: Meta<typeof ConnectModalWalletButton> = {
  component: ConnectModalWalletButton,
  title: "ConnectModal/ConnectModalWalletButton",
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    logo: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalWalletButton>;

export const Primary: Story = {
  args: {
    name: "Example Wallet",
    logo: "https://example.com/wallet-logo.png",
  },
  render: (args) => ({
    components: { ConnectModalWalletButton },
    setup() {
      return { args };
    },
    template: '<ConnectModalWalletButton v-bind="args" />',
  }),
};
