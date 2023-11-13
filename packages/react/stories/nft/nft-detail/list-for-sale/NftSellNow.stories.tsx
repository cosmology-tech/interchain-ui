import type { Meta, StoryObj } from "@storybook/react";

import NftSellNow from "../../../../src/ui/nft-sell-now";

const meta: Meta<typeof NftSellNow> = {
  component: NftSellNow,
  title: "nft/nft-detail/list-for-sale/NftSellNow",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    bestOffer: 120,
    offerToFloorPriceRatio: "0.05X",
    floorPrice: 99,
    onList() {
      console.log("onList");
    },
    onCancel() {
      console.log("onCancel");
    },
    fees: {
      listFee: 0.5,
      royalities: 0.5,
      fairBurn: 0.5,
      proceeds: -0.5,
    },
  },
};
