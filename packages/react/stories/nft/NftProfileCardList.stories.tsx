import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NftProfileCardList from "../../src/ui/nft-profile-card-list";

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
          "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeibl5rrhfola4m2gxyzfji63fxyboeic36pjxjmrnmgablqhy3mnvy/3054.png",
        name: "Bad Kid #9501",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
        onClick: () => {
          console.log("NFT #1");
        },
      },
      {
        imgSrc:
          "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeibl5rrhfola4m2gxyzfji63fxyboeic36pjxjmrnmgablqhy3mnvy/6.png",
        name: "Bad Kid #9502",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
      },
      {
        imgSrc:
          "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeicf6q3az6bk4fyilhgk7ytgkctxjb3jsm4542cxtb6r4xsb35zoni/images/608.png",
        name: "Bad Kid #9505",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
      },
      {
        imgSrc:
          "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeicf6q3az6bk4fyilhgk7ytgkctxjb3jsm4542cxtb6r4xsb35zoni/images/444.png",
        name: "Bad Kid #9506",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
      },
      {
        imgSrc:
          "https://ipfs-gw.stargaze-apis.com/ipfs/bafybeicf6q3az6bk4fyilhgk7ytgkctxjb3jsm4542cxtb6r4xsb35zoni/images/668.png",
        name: "Bad Kid #9508",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_700/ndkbjpwtgys09w1xxwny.jpg",
        name: "Bad Kid #9509",
        priceItems: [
          {
            label: "Highest offer",
            value: "450",
          },
          {
            label: "Listing price",
            value: "373",
          },
        ],
      },
    ],
  },
};
