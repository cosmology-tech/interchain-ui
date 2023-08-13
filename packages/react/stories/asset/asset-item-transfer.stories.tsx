import type { Meta, StoryObj } from "@storybook/react";

import { AssetItemTransfer } from "../../src";

const meta: Meta<typeof AssetItemTransfer> = {
  component: AssetItemTransfer,
  title: "Asset/AssetItemTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "withdraw",
    fromSymbol: "UMEE",
    fromDenom: "Umee",
    fromAddress: "umee1lqsq...pv4axdaxk",
    fromImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
    toDenom: "Osmosis",
    toAddress: "osmo1lqsq...pv48trj5k",
    toImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    available: "25.89",
    amount: "",
    priceDisplayAmount: 0.5,
    onTransfer: (amount) => {
      console.log("onTransfer", amount)
    }
  },
};
