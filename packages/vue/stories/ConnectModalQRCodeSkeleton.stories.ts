import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalQRCodeSkeleton from "../src/ui/connect-modal-qrcode-skeleton/connect-modal-qrcode-skeleton.vue";

const meta: Meta<typeof ConnectModalQRCodeSkeleton> = {
  component: ConnectModalQRCodeSkeleton,
  title: "ConnectModal/ConnectModalQRCodeSkeleton",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ConnectModalQRCodeSkeleton>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { ConnectModalQRCodeSkeleton },
    setup() {
      return { args };
    },
    template: '<ConnectModalQRCodeSkeleton v-bind="args" />',
  }),
};
