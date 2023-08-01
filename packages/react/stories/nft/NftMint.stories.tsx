import type { Meta, StoryObj } from "@storybook/react";

import { NftMint } from "../../src";

const meta: Meta<typeof NftMint> = {
  component: NftMint,
  title: "nft/NftMint",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tag: "NOW LIVE",
    name: "Bipz",
    description:
      "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus.",
    quantity: 5000,
    royalties: 10,
    minted: 46,
    available: 2948,
    priceDisplayAmount: 64,
    limited: 50,
    imgSrc: "https://res.cloudinary.com/stargaze/image/upload/f_auto,w_700/ighabxq1rjqr5xblblue",
    starsPrice: 0.01063943,
  },
};
