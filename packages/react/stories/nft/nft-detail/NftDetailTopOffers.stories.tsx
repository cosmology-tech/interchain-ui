import type { Meta, StoryObj } from "@storybook/react";

import NftDetailTopOffers from "../../../src/ui/nft-detail-top-offers";

const meta: Meta<typeof NftDetailTopOffers> = {
  component: NftDetailTopOffers,
  title: "nft/nft-detail/NftDetailTopOffers",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    price: 5,
    floorPrice: "-97% below",
    expires: "in 3 months",
    from: "stars15w...mw0j",
  },
};
