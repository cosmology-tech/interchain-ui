import type { Meta, StoryObj } from "@storybook/vue3";
import QRCode from "../src/ui/qrcode/qrcode.vue";

const meta: Meta<typeof QRCode> = {
  component: QRCode,
  title: "Core/QRCode",
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    size: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof QRCode>;

export const Primary: Story = {
  args: {
    value: "https://example.com",
    size: 200,
  },
  render: (args) => ({
    components: { QRCode },
    setup() {
      return { args };
    },
    template: '<QRCode v-bind="args" />',
  }),
};
