import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RemoveLiquidity } from "../../../../src";

const meta: Meta<typeof RemoveLiquidity> = {
  component: RemoveLiquidity,
  title: "Pool/PoolDetail/ManageLiquidity/RemoveLiquidity",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary RemoveLiquidity */
export const Primary: Story = {
  args: {
    myLiquidity: 0.2,
    unbondedShares: "1.104915742185",
    token1: {
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
      amount: 0.009798,
      symbol: "ATOM",
    },
    token2: {
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
      amount: 0.180368,
      symbol: "OSOM",
    },
  },
};
