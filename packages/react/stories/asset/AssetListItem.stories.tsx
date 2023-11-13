import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import AssetListItem from "../../src/ui/asset-list-item";
import { getTransferList } from "../stub/assetData";

const meta: Meta<typeof AssetListItem> = {
  component: AssetListItem,
  title: "Asset/AssetListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const item = getTransferList().find((i) => i.symbol === "ATOM");

export const Primary: Story = {
  args: {
    isOtherChains: false,
    imgSrc: item.imgSrc,
    symbol: item.symbol,
    name: item.name,
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
};
