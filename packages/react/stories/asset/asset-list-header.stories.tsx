import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetListHeader } from "../../src";

const meta: Meta<typeof AssetListHeader> = {
  component: AssetListHeader,
  title: "Asset/AssetListHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isSingle: false,
    total: "144.23",
    totalOnAll: "732.16",
    dropDownList: [
      {
        available: "713.32",
        symbol: "UMEE",
        denom: "Umee",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
        priceDisplayAmount: 0.5,
      },
      {
        available: "89.66",
        symbol: "USTC",
        denom: "Terra Classic",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        priceDisplayAmount: 10,
      },
      {
        available: "102.61",
        symbol: "TORI",
        denom: "Teritori",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        priceDisplayAmount: 5,
      },
    ],
    onDeposit: (detail) => {
      console.log("onDeposit", detail)
    },
    onWithdraw: (detail) => {
      console.log("onWithdraw", detail)
    }
  },
};
