import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalStatus from "../src/ui/connect-modal-status/connect-modal-status.vue";
import { wallets, qrCodeProps } from "./stub/connectWalletData";
import type { ConnectModalStatusProps } from "../src/ui/connect-modal-status/connect-modal-status.types";

const meta = {
  component: ConnectModalStatus,
  title: "ConnectModal/ConnectModalStatus",
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "Disconnected",
        "Connecting",
        "Connected",
        "NotExist",
        "Rejected",
        "Error",
      ],
    },
    onConnect: { action: "onConnect" },
    onDisconnect: { action: "onDisconnect" },
    onChangeWallet: { action: "onChangeWallet" },
    onInstall: { action: "onInstall" },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width: 250px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ConnectModalStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultWallet = {
  name: wallets[0].name,
  prettyName: wallets[0].prettyName,
  logo: wallets[0].logo,
  mobileDisabled: false,
};

// Template for all stories
// @ts-ignore
const Template: Story = {
  render: (args) => ({
    components: { ConnectModalStatus },
    setup() {
      return { args };
    },
    template: '<ConnectModalStatus v-bind="args" />',
  }),
};

export const Disconnected: Story = {
  ...Template,
  args: {
    status: "Disconnected",
    wallet: defaultWallet,
    bottomLink: "https://example.com/get-wallet",
  },
};

export const Connecting: Story = {
  ...Template,
  args: {
    status: "Connecting",
    wallet: defaultWallet,
    contentHeader: "Connecting to Wallet",
    contentDesc: "Please approve the connection in your wallet.",
  },
};

export const Connected: Story = {
  ...Template,
  args: {
    status: "Connected",
    wallet: defaultWallet,
    connectedInfo: {
      avatar: "https://picsum.photos/500",
      name: "John Doe",
      address: "0x1234...5678",
    },
  },
};

export const NotExist: Story = {
  ...Template,
  args: {
    status: "NotExist",
    wallet: {
      ...defaultWallet,
      name: "Keplr",
      prettyName: "Keplr",
    },
    contentHeader: "Wallet Not Installed",
    contentDesc: "Please install the wallet to continue.",
    disableInstall: false,
    installIcon: "🔧",
  },
};

export const Rejected: Story = {
  ...Template,
  args: {
    status: "Rejected",
    wallet: defaultWallet,
    contentHeader: "Connection Rejected",
    contentDesc: "You rejected the connection request. Please try again.",
  },
};

export const Error: Story = {
  ...Template,
  args: {
    status: "Error",
    wallet: defaultWallet,
    contentHeader: "Connection Error",
    contentDesc:
      "An error occurred while connecting to the wallet. Please try again or choose a different wallet.",
  },
};
