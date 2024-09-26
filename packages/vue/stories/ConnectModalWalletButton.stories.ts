import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalWalletButton from "../src/ui/connect-modal-wallet-button/connect-modal-wallet-button.vue";
import { store } from "../src/models/store";
import { wallets, WalletPluginSystem } from "./stub/connectWalletData";

const meta: Meta<typeof ConnectModalWalletButton> = {
  component: ConnectModalWalletButton,
  title: "ConnectModal/ConnectModalWalletButton",
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    logo: { control: "text" },
    variant: { control: "select", options: ["list", "square"] },
    btmLogo: { control: "text" },
    subLogo: { control: "text" },
    badge: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalWalletButton>;

const wallet = wallets[0];

export const Primary: Story = {
  args: {
    name: wallet.name,
    logo: wallet.logo,
    variant: "list",
  },
  render: (args) => ({
    components: { ConnectModalWalletButton },
    setup() {
      const theme = ref(store.getState().theme);
      const overrideManager = ref(store.getState().overrideStyleManager);

      store.subscribe((newState) => {
        theme.value = newState.theme;
        overrideManager.value = newState.overrideStyleManager;
      });

      return {
        args,
        theme,
        overrideManager,
      };
    },
    template: `
      <ConnectModalWalletButton
        v-bind="args"
        :theme="theme"
        :overrideManager="overrideManager"
      />
    `,
  }),
};

export const SquareVariant: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: "square",
  },
};

export const WithBadge: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    badge: "New",
  },
};

export const WithSubLogo: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    subLogo: "walletConnect",
  },
};

export const WithBottomLogo: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    btmLogo: wallet.extends
      ? WalletPluginSystem[wallet.extends].logo
      : wallet.logo,
  },
};
