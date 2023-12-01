import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NftDetail from "../../../src/ui/nft-detail";
import type { NftDetailProps } from "../../../src/ui/nft-detail/nft-detail.types";

const meta: Meta<NftDetailProps> = {
  component: NftDetail,
  title: "nft/nft-detail/NftDetail",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<NftDetailProps>;

export const Primary: Story = {
  args: {
    type: "listForSale",
    imgSrc:
      "https://i.stargaze-apis.com/d0jFShn3t5aytKZw5OkUa1uuscynGjUNDYD5pg14p4w/f:jpg/resize:fit:700:::/dpr:2/plain/ipfs://QmbGvE3wmxex8KiBbbvMjR8f9adR28s3XkiZSTuGmHoMHV/3924.jpg",
    collectionName: "Shnubbles Breakfast Drop #2",
    name: "Bad Kid #9509",
    creatorName: "stars1ducj...vl342f",
    collectionDesc:
      "The tastiest NFT-heroes of the interchain Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend.",
    mintPrice: "300",
    rarityOrder: 2864,
    tokensCount: 10000,
    ownerName: "shane.stars",
    price: 670,
    detailInfo: {
      price: 400,
      lastSale: 385,
      owner: 100,
      topOffer: 400,
      floorPrice: 400,
      isNameVerified: true,
    },
    traits: [
      {
        name: "Accessories",
        value: "Oval Gadget",
        rarityPercent: 19.8,
      },
      {
        name: "Head",
        value: "Snowman Hat",
        rarityPercent: 16.71,
      },
      {
        name: "Eyes",
        value: "Teal Predator",
        rarityPercent: 10.05,
      },
      {
        name: "Mouth",
        value: "Bashed",
        rarityPercent: 9.69,
      },
      {
        name: "Background",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Skin",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Costumes",
        value: "Vshok",
        rarityPercent: 6.45,
      },
    ],
    onDownload() {
      console.log("onDownload");
    },
    onShare() {
      console.log("onShare");
    },
    onTransfer() {
      console.log("onTransfer");
    },
    onBurn() {
      console.log("onBurn");
    },
    onListForSale() {
      console.log("onListForSale");
    },
  },
};

export const MakeOffer: Story = {
  args: {
    type: "makeOffer",
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/w_700/ndkbjpwtgys09w1xxwny.jpg",
    collectionName: "Shnubbles Breakfast Drop #2",
    name: "Breakfast Shnubble #127",
    creatorName: "stars1ducj...vl342f",
    collectionDesc:
      "The tastiest NFT-heroes of the interchain Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend.",
    mintPrice: "300",
    rarityOrder: 2864,
    tokensCount: 10000,
    ownerName: "shane.stars",
    traits: [
      {
        name: "Accessories",
        value: "Oval Gadget",
        rarityPercent: 19.8,
      },
      {
        name: "Head",
        value: "Snowman Hat",
        rarityPercent: 16.71,
      },
      {
        name: "Eyes",
        value: "Teal Predator",
        rarityPercent: 10.05,
      },
      {
        name: "Mouth",
        value: "Bashed",
        rarityPercent: 9.69,
      },
      {
        name: "Background",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Skin",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Costumes",
        value: "Vshok",
        rarityPercent: 6.45,
      },
    ],
    detailInfo: {
      price: 200,
      lastSale: 1000,
      owner: "shane.stars",
      topOffer: 5,
      floorPrice: 149,
      isNameVerified: true,
    },
    detailTopOffer: {
      price: 5,
      floorPrice: "-97% below",
      expires: "in 3 months",
      from: "stars15w...mw0j",
    },
    detailActivity: {
      list: [
        {
          price: 200,
          event: "List",
          from: "shane.stars",
          date: "12 days ago",
        },
        {
          price: 200,
          event: "List",
          from: "shane.stars",
          to: "shane",
          date: "12 days ago",
        },
      ],
    },
    onDownload() {
      console.log("onDownload");
    },
    onShare() {
      console.log("onShare");
    },
    onMakeOffer() {
      console.log("onMakeOffer");
    },
  },
};

export const BuyNow: Story = {
  args: {
    type: "buyNow",
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/w_700/ndkbjpwtgys09w1xxwny.jpg",
    collectionName: "Shnubbles Breakfast Drop #2",
    name: "Breakfast Shnubble #127",
    creatorName: "stars1ducj...vl342f",
    collectionDesc:
      "The tastiest NFT-heroes of the interchain Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend.",
    mintPrice: "300",
    rarityOrder: 2864,
    tokensCount: 10000,
    ownerName: "shane.stars",
    traits: [
      {
        name: "Accessories",
        value: "Oval Gadget",
        rarityPercent: 19.8,
      },
      {
        name: "Head",
        value: "Snowman Hat",
        rarityPercent: 16.71,
      },
      {
        name: "Eyes",
        value: "Teal Predator",
        rarityPercent: 10.05,
      },
      {
        name: "Mouth",
        value: "Bashed",
        rarityPercent: 9.69,
      },
      {
        name: "Background",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Skin",
        value: "Navy Blue",
        rarityPercent: 10.44,
      },
      {
        name: "Costumes",
        value: "Vshok",
        rarityPercent: 6.45,
      },
    ],
    onDownload() {
      console.log("onDownload");
    },
    onShare() {
      console.log("onShare");
    },
    onBuyNow() {
      console.log("onBuyNow");
    },
    onMakeOffer() {
      console.log("onMakeOffer");
    },
  },
};
