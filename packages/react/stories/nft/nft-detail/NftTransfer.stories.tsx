import type { Meta, StoryObj } from "@storybook/react";

import NftTransfer from "../../../src/ui/nft-transfer";

const meta: Meta<typeof NftTransfer> = {
  component: NftTransfer,
  title: "nft/nft-detail/NftTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange(value) {
      console.log("onChange", value);
    },
    onTransfer() {
      console.log("onTransfer");
    },
    onCancel() {
      console.log("onCancel");
    },
  },
};
