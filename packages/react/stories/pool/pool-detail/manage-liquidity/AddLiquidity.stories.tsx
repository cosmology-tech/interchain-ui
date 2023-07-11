import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AddLiquidity } from "../../../../src";

const meta: Meta<typeof AddLiquidity> = {
  component: AddLiquidity,
  title: "Pool/PoolDetail/ManageLiquidity/AddLiquidity",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary AddLiquidity */
export const Primary: Story = {
  args: {
    token1: {
      denom: "Cosmos Hub Atom",
      symbol: "ATOM",
      available: 0.00633,
      imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    },
    token2: {
      denom: "Osmosis",
      symbol: "OSMO",
      available: 0.696252,
      imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    },
  },
};
