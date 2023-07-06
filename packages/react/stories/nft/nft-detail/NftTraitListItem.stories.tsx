import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { NftTraitListItem } from "../../../src";

const meta: Meta<typeof NftTraitListItem> = {
  component: NftTraitListItem,
  title: "nft/nft-detail/NftTraitListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary NftTraitListItem */
export const Primary: Story = {
  args: {
    name: "Base",
    value: "Waffle",
    rarityPercent: 1.15,
  },
};
