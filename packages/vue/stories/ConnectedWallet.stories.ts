import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectedWallet from "../src/ui/connected-wallet/connected-wallet.vue";

const meta: Meta<typeof ConnectedWallet> = {
  component: ConnectedWallet,
  title: "ConnectModal/ConnectedWallet",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ConnectedWallet>;

export const Primary: Story = {
  args: {
    avatar: "",
    name: "Name",
    address: "stars1lqsqpnga3c7fyjfnrxv7jdt9zmjvgpv4mv8lf4",
  },
  render: (args) => ({
    components: { ConnectedWallet },
    setup() {
      const onCopied = () => {
        console.log("onCopied");
      };
      return { args, onCopied };
    },
    template: `
      <ConnectedWallet
        v-bind="args"
        @copied="onCopied"
      />
    `,
  }),
};
