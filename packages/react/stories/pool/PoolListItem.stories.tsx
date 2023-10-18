import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import PoolListItem from "../../src/ui/pool-list-item";

const meta: Meta<typeof PoolListItem> = {
  component: PoolListItem,
  title: "Pool/PoolListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    id: "1",
    poolAssets: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        symbol: "ATOM",
        denom: "Cosmos Hub",
        priceDisplayAmount: 8.35,
        available: "15.868",
      },
      {
        available: "57.61",
        symbol: "OSMO",
        denom: "Osmosis",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        priceDisplayAmount: 0.4671,
      },
    ],
    apr: "7.46",
    liquidity: "29422809",
    volume24H: 3288612,
    fees7D: 59075,
    onClick: () => {
      console.log("onClick");
    },
  },
};
