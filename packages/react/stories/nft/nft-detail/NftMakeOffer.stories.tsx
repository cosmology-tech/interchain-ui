import type { Meta, StoryObj } from "@storybook/react";

import { NftMakeOffer } from "../../../src";

const meta: Meta<typeof NftMakeOffer> = {
  component: NftMakeOffer,
  title: "nft/nft-detail/NftMakeOffer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/erom1wypzaxaratnm7dg.jpg",
    tokenName: "KUJIRANS #763",
  },
};
