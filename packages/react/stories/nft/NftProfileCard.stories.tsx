import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { NftProfileCard } from "../../src";

const meta: Meta<typeof NftProfileCard> = {
  component: NftProfileCard,
  title: "nft/NftProfileCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary NftProfileCard */
export const Primary: Story = {
  args: {
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/w_700/ndkbjpwtgys09w1xxwny.jpg",
    name: "Bad Kid #9509",
    highestOffer: "450",
    listPrice: "373",
    onClick() {
      console.log("onClick");
    },
  },
};
