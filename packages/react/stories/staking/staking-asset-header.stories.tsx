import type { Meta, StoryObj } from "@storybook/react";

import StakingAssetHeader from "../../src/ui/staking-asset-header";

const meta: Meta<typeof StakingAssetHeader> = {
  component: StakingAssetHeader,
  title: "staking/StakingAssetHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
    symbol: "JUNO",
    totalAmount: 232.2898,
    totalPrice: 1013,
    available: 89.231,
  },
};
