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
      "https://res.cloudinary.com/stargaze/image/upload/w_700/ghyneomrx2kjtmgz2mpq.jpg",
    name: "CAA - COSMOS APES #3590",
    highestOffer: "450",
    listPrice: "373",
  },
};
