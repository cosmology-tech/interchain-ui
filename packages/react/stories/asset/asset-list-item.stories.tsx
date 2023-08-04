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
      return {
        fromSymbol: "UMEE",
        fromDenom: "Umee",
        fromAddress: "umee1lqsq...pv4axdaxk",
        fromImgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
        toDenom: "Osmosis",
        toAddress: "osmo1lqsq...pv48trj5k",
        toImgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        avaliable: "25.89",
        amount: "",
        priceDisplayAmount: 0.5,
        onTransfer: (detail) => {
          console.log("onTransfer", detail);
        },
      };
    },
    onWithdraw: () => {
      return {
        fromSymbol: "UMEE",
        fromDenom: "Umee",
        fromAddress: "umee1lqsq...pv4axdaxk",
        fromImgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
        toDenom: "Osmosis",
        toAddress: "osmo1lqsq...pv48trj5k",
        toImgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
        avaliable: "25.89",
        amount: "",
        priceDisplayAmount: 0.5,
        onTransfer: (detail) => {
          console.log("onTransfer", detail);
        },
      };
    },
  },
};
