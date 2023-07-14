import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingMore } from "../../../../src";

const meta: Meta<typeof BondingMore> = {
  component: BondingMore,
  title: "Pool/PoolDetail/ManageLiquidity/BondingMore",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    symbol1: "USDC",
    symbol2: "OSMO",
    available: 0.012705705041054069,
  },
};
