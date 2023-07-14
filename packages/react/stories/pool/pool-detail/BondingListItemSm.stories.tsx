import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingListItemSm } from "../../../src";

const meta: Meta<typeof BondingListItemSm> = {
  component: BondingListItemSm,
  title: "Pool/PoolDetail/BondingListItemSm",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    title: 'Bonded 1 day',
    amount: 0.33,
    poolShares: 0,
    apr: "2.46",
  },
};
