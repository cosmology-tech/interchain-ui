import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetListItem } from "../../src";

const meta: Meta<typeof AssetListItem> = {
  component: AssetListItem,
  title: "Asset/asset-list-item",
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
    amount: "102.614224",
    dollarAmount: "101.02",
    canDeposit: true,
    canWithdraw: true,
    chainName: "Juno",
  },
};
