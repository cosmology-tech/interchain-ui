import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolCard } from "../../src";

const meta: Meta<typeof PoolCard> = {
  component: PoolCard,
  title: "Pool/PoolCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    token1: {
      name: "ATOM",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
    },
    token2: {
      name: "OSOM",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    },
    poolLiquidity: 168767639,
    volume: 3288612,
    fees: 59075,
    apr: 24,
    yourLiquidity: 1329.32,
    bonded: 600.00,
  },
};
