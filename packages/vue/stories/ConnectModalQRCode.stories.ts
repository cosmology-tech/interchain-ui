import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalQRCode from "../src/ui/connect-modal-qrcode/connect-modal-qrcode.vue";

const meta: Meta<typeof ConnectModalQRCode> = {
  component: ConnectModalQRCode,
  title: "ConnectModal/ConnectModalQRCode",
  tags: ["autodocs"],
  argTypes: {
    uri: { control: "text" },
    status: { control: "select", options: ["loading", "done", "error"] },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalQRCode>;

export const Primary: Story = {
  args: {
    uri: "https://example.com/qr",
    status: "loading",
  },
  render: (args) => ({
    components: { ConnectModalQRCode },
    setup() {
      return { args };
    },
    template: '<ConnectModalQRCode v-bind="args" />',
  }),
};
