import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import NftProfileCard from "../../src/ui/nft-profile-card";

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
  render(props) {
    return (
      <Box maxWidth="250px">
        <NftProfileCard {...props} />
      </Box>
    );
  },
};
