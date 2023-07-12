import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingListItem } from "../../../src";

const meta: Meta<typeof BondingListItem> = {
  component: BondingListItem,
  title: "Pool/PoolDetail/BondingListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    title: "A day",
    apr: "2.43%",
    amount: 59075,
    per: "24%",
    onUnbond: () => console.log("unbond"),
  },
};
