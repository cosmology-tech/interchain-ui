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
          "https://res.cloudinary.com/stargaze/image/upload/w_700/ghyneomrx2kjtmgz2mpq.jpg",
        name: "CAA - COSMOS APES #3590",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_512/chtruiywubdbw0w6xsxs.jpg",
        name: "CAA - COSMOS APES #789",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_512/e0445qpobuya6okuk1uw.jpg",
        name: "CAA - COSMOS APES #3457",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_512/ia6pmsymxosxqfxcdiwu.jpg",
        name: "CAA - COSMOS APES #2257",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_512/rdrhiqx22lay0gq5rvsq.jpg",
        name: "CAA - COSMOS APES #145",
        highestOffer: "450",
        listPrice: "373",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/stargaze/image/upload/w_512/obfshfx0hrqqjc78cdgm.jpg",
        name: "CAA - COSMOS APES #576",
        highestOffer: "450",
        listPrice: "373",
      },
    ],
  },
};
