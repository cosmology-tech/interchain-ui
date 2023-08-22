import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetListItem } from "../../src";

const meta: Meta<typeof AssetListItem> = {
  component: AssetListItem,
  title: "Asset/AssetListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOtherChains: false,
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    symbol: "OSMO",
    denom: "Osmosis",
    tokenAmount: "102.61",
    tokenAmountPrice: "101.02",
    chainName: "Juno",
    onDeposit: () => {
      console.log("onDeposit")
    },
    onWithdraw: () => {
      console.log("onWithdraw")
    },
  },
};
