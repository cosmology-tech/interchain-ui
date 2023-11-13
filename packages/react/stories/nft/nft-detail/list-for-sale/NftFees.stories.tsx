import type { Meta, StoryObj } from "@storybook/react";

import NftFees from "../../../../src/ui/nft-fees";

const meta: Meta<typeof NftFees> = {
  component: NftFees,
  title: "nft/nft-detail/list-for-sale/NftFees",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    symbol: "STARS",
    title: "Fee",
    listFee: 0.5,
    royalities: 0.5,
    fairBurn: 0.5,
    proceeds: -0.5,
  },
};
