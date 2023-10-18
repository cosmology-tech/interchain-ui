import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getTransferList } from "./stub/assetData";

import TransferItem from "../src/ui/transfer-item";

const meta: Meta<typeof TransferItem> = {
  component: TransferItem,
  title: "TransferItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary TransferItem */
export const Primary: Story = {
  args: {
    title: "From",
    maxBtn: true,
    hasAvailable: true,
    // dropDownList: [
    //   {
    //     available: 713.32,
    //     symbol: "UMEE",
    //     denom: "Umee",
    //     imgSrc:
    //       "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
    //     priceDisplayAmount: 0.5,
    //   },
    //   {
    //     available: 89.66,
    //     symbol: "USTC",
    //     denom: "Terra Classic",
    //     imgSrc:
    //       "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
    //     priceDisplayAmount: 10,
    //   },
    //   {
    //     available: 102.61,
    //     symbol: "TORI",
    //     denom: "Teritori",
    //     imgSrc:
    //       "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
    //     priceDisplayAmount: 5,
    //   },
    // ],
  },
  render: (props) => {
    return <TransferItem {...props} dropDownList={getTransferList()} />;
  },
};
