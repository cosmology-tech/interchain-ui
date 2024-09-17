import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModalQRCode from "../src/ui/connect-modal-qrcode/connect-modal-qrcode.vue";

const meta = {
  component: ConnectModalQRCode,
  title: "ConnectModal/ConnectModalQRCode",
  tags: ["autodocs"],
  argTypes: {
    description: { control: "text" },
    status: {
      control: "select",
      options: ["Pending", "Done", "Error", "Expired"],
    },
    link: { control: "text" },
    qrCodeSize: { control: "number" },
    onRefresh: { action: "refreshed" },
    errorTitle: { control: "text" },
    errorDesc: { control: "text" },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="max-width: 300px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ConnectModalQRCode>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { ConnectModalQRCode },
    setup() {
      return { args };
    },
    template: '<ConnectModalQRCode v-bind="args" />',
  }),
};

export const Pending: Story = {
  ...Template,
  args: {
    description: "Scan this QR code with your wallet",
    status: "Pending",
    qrCodeSize: 230,
  },
};

export const Done: Story = {
  ...Template,
  args: {
    description: "Scan this QR code with your wallet",
    status: "Done",
    link: "https://example.com/qr",
    qrCodeSize: 230,
  },
};

export const Error: Story = {
  ...Template,
  args: {
    description: "Scan this QR code with your wallet",
    status: "Error",
    qrCodeSize: 230,
    errorTitle: "Error occurred",
    errorDesc:
      "An error occurred while generating the QR code. Please try again.",
  },
};

export const Expired: Story = {
  ...Template,
  args: {
    description: "Scan this QR code with your wallet",
    status: "Expired",
    qrCodeSize: 230,
    errorTitle: "QR Code Expired",
    errorDesc: "The QR code has expired. Please refresh to generate a new one.",
  },
};
