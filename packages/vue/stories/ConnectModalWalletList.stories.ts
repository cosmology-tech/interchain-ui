import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalWalletList from "../src/ui/connect-modal-wallet-list/connect-modal-wallet-list.vue";
import { Wallet } from "../src/ui/connect-modal-wallet-list/connect-modal-wallet-list.types";

const meta: Meta<typeof ConnectModalWalletList> = {
  component: ConnectModalWalletList,
  title: "ConnectModal/ConnectModalWalletList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ConnectModalWalletList>;

export const Primary: Story = {
  args: {
    wallets: [
      {
        name: "Wallet 1",
        logo: "https://example.com/wallet1-logo.png",
        mobileDisabled: false,
      },
      {
        name: "Wallet 2",
        logo: "https://example.com/wallet2-logo.png",
        mobileDisabled: false,
      },
      {
        name: "Wallet 3",
        logo: "https://example.com/wallet3-logo.png",
        mobileDisabled: false,
      },
    ] as Wallet[],
  },
  render: (args) => ({
    components: { ConnectModalWalletList },
    setup() {
      return { args };
    },
    template: '<ConnectModalWalletList v-bind="args" />',
  }),
};
