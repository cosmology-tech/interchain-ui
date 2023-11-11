import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import AssetList from "../../src/ui/asset-list";

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
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        name: "Terra Classic",
        tokenAmount: "89.66",
        tokenAmountPrice: "10",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
      {
        isOtherChains: false,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        symbol: "TORI",
        name: "Teritori",
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
    ],
  },
};
