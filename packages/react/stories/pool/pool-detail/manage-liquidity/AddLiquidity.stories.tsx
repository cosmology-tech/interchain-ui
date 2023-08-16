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
    // isLoading: true,
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
    onAddLiquidity: () => {
      console.log("onAddLiquidity");
    },
    onChange: (values) => {
      console.log("values", values);
    },
  },
};
