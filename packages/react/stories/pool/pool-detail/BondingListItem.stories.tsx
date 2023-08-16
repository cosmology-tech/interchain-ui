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
    // isLoading: true,
    title: "A day",
    totalApr: "2.43",
    amount: 59075,
    superfluidApr: "24",
    onUnbond() {
      console.log("onUnbond");
    },
  },
};
