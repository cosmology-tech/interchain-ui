import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetList } from "../../src";

const meta: Meta<typeof AssetList> = {
  component: AssetList,
  title: "Asset/AssetList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOtherChains: false,
    list: [
      {
        isOtherChains: false,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        tokenAmount: "102.614224",
        tokenAmountPrice: "101.02",
        canDeposit: true,
        canWithdraw: true,
        chainName: "Juno",
      },
      {
        isOtherChains: false,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        tokenAmount: "102.614224",
        tokenAmountPrice: "101.02",
        canDeposit: true,
        canWithdraw: true,
        chainName: "Juno",
      },
    ],
  },
};
