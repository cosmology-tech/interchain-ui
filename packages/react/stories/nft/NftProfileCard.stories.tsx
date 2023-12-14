import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import NftProfileCard from "../../src/ui/nft-profile-card";
import badkid1 from "../../static/nft/badkid-3543.jpeg";

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
    imgSrc: badkid1,
    name: "Bad Kid #3543",
    priceItems: [
      {
        label: "Highest offer",
        value: "450.55",
      },
      {
        label: "Listing price",
        value: "373.66",
      },
    ],
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
