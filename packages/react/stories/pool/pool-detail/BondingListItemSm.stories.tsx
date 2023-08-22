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
    title: "Bonded 1 day",
    bondedValue: 0.33,
    bondedShares: 0.58,
    totalApr: "2.46",
    onBond() {
      console.log("onBond");;
    },
    onUnbond() {
      console.log("onUnbond");
    },
  },
};
