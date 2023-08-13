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
    unbondedBalance: "0.338654",
    unbondedShares: "2.2098786",
    myLiquidityCoins: [
      {
        symbol: "ATOM",
        displayAmount: "0.01949381023874581",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      },
      {
        symbol: "OSMO",
        displayAmount: "0.365385514677405108",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      },
    ],
    onRemoveLiquidity(percent) {
      console.log("onRemoveLiquidity====", percent);
      return {
        type: "success",
        title: "Remove liquidity success"
      }
    }
  },
};
