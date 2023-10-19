import type { Meta, StoryObj } from "@storybook/react";

import NftMinimumOffer from "../../../../src/ui/nft-minimum-offer";

const meta: Meta<typeof NftMinimumOffer> = {
  component: NftMinimumOffer,
  title: "nft/nft-detail/list-for-sale/NftMinimumOffer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    floorPrice: 300,
    highestOffer: 189,
    onList() {
      console.log("onList");
    },
    onCancel() {
      console.log("onCancel");
    },
    onChange(value) {
      console.log("onChange", value);
    },
    fees: {
      listFee: 0.5,
      royalities: 0.5,
      fairBurn: 0.5,
      proceeds: -0.5,
    },
  },
};
