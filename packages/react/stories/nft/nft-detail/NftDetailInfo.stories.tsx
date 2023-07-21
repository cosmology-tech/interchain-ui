import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { NftDetailInfo } from "../../../src";

const meta: Meta<typeof NftDetailInfo> = {
  component: NftDetailInfo,
  title: "nft/nft-detail/NftDetailInfo",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary NftDetailInfo */
export const Primary: Story = {
  args: {
    price: 200,
    // lastSale: 1000,
    owner: "shane.stars",
    topOffer: 5,
    floorPrice: 149,
    isNameVerified: true,
  },
};
