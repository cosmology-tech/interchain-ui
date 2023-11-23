import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NftProfile from "../../src/ui/nft-profile";
import type { NftProfileCardProps } from "../../src/ui/nft-profile-card/nft-profile-card.types";

const meta: Meta<typeof NftProfile> = {
  component: NftProfile,
  title: "nft/NftProfile",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const list1: NftProfileCardProps[] = [
  {
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/w_700/m4sxagqpu98z76lcggyj.jpg",
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
  },
  {
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/w_700/wnfkydgxvp2vf0fqq277.jpg",
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
      "https://res.cloudinary.com/stargaze/image/upload/w_700/zkmiu7m7jelttu6ewrvu.jpg",
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
      "https://res.cloudinary.com/stargaze/image/upload/w_700/yisqceq5imrkgrzml02b.jpg",
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
      "https://res.cloudinary.com/stargaze/image/upload/w_700/benc6jvttlv9nbemyxch.jpg",
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
];

const list2: NftProfileCardProps[] = [
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
];

/* This is primary NftProfile */
export const Primary: Story = {
  args: {
    title: "Profile",
    thumbnailBehavior: "contain",
    headerButtonLabel: "View on Stargaze",
    meta: [
      {
        label: "Collections",
        value: "1",
      },
      {
        label: "NFTs",
        value: "6",
      },
      {
        label: "Listed on marketplace",
        value: "12",
      },
    ],
    name: "shane.stars",
    isVerified: true,
    onView() {
      console.log("onView");
    },
    list: list2,
  },
};
