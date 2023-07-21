import type { Meta, StoryObj } from "@storybook/react";

import { NftTraitList } from "../../../src";

const meta: Meta<typeof NftTraitList> = {
  component: NftTraitList,
  title: "nft/nft-detail/NftTraitList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    list: [
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
  },
};
