import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalInstallButton from "../src/ui/connect-modal-install-button/connect-modal-install-button.vue";

const meta: Meta<typeof ConnectModalInstallButton> = {
  component: ConnectModalInstallButton,
  title: "ConnectModalInstallButton",
  tags: ["autodocs"],
  argTypes: {
    walletName: { control: "text" },
    walletUrl: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalInstallButton>;

export const Primary: Story = {
  args: {
    walletName: "Example Wallet",
    walletUrl: "https://example.com/wallet",
  },
  render: (args) => ({
    components: { ConnectModalInstallButton },
    setup() {
      return { args };
    },
    template: '<ConnectModalInstallButton v-bind="args" />',
  }),
};
