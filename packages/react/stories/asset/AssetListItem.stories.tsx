import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import AssetListItem from "../../src/ui/asset-list-item";
import { useMockData } from "../stub/mock-data-client";

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
  render: (props) => {
    const { assets } = useMockData();
    const item = assets.find((i) => i.symbol === "ATOM");

    return (
      <AssetListItem
        {...props}
        imgSrc={item?.imgSrc ?? ""}
        symbol={item?.symbol ?? ""}
        name={item?.name ?? ""}
      />
    );
  },
};
