import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { NftProfileCardList } from "../../src";

const meta: Meta<typeof NftProfileCardList> = {
  component: NftProfileCardList,
  title: "nft/NftProfileCardList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary NftProfileCardList */
export const Primary: Story = {
  args: {
    list: [
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/m4sxagqpu98z76lcggyj.jpg",
        name: "Bad Kid #9501",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/wnfkydgxvp2vf0fqq277.jpg",
        name: "Bad Kid #9502",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/zkmiu7m7jelttu6ewrvu.jpg",
        name: "Bad Kid #9505",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/yisqceq5imrkgrzml02b.jpg",
        name: "Bad Kid #9506",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/benc6jvttlv9nbemyxch.jpg",
          name: "Bad Kid #9508",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/ndkbjpwtgys09w1xxwny.jpg",
          name: "Bad Kid #9509",
        highestOffer: "450",
        listPrice: "373",
      },
    ],
  },
};
