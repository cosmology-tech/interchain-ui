import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalQRCodeError from "../src/ui/connect-modal-qrcode-error/connect-modal-qrcode-error.vue";

const meta: Meta<typeof ConnectModalQRCodeError> = {
  component: ConnectModalQRCodeError,
  title: "ConnectModalQRCodeError",
  tags: ["autodocs"],
  argTypes: {
    errorTitle: { control: "text" },
    errorDesc: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectModalQRCodeError>;

export const Primary: Story = {
  args: {
    errorTitle: "Error",
    errorDesc: "Failed to generate QR code",
  },
  render: (args) => ({
    components: { ConnectModalQRCodeError },
    setup() {
      return { args };
    },
    template: '<ConnectModalQRCodeError v-bind="args" />',
  }),
};
