import type { Meta, StoryObj } from "@storybook/react";

import { TransferItem } from "../src";

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
    dropDownList: [
      {
        available: 713.32,
        symbol: "UMEE",
        denom: "Umee",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
        priceDisplayAmount: 0.5,
      },
    ],
  },
};
