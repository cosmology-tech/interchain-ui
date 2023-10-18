import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BondingCard from "../../../src/ui/bonding-card";

const meta: Meta<typeof BondingCard> = {
  component: BondingCard,
  title: "Pool/PoolDetail/BondingCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    title: "a day bonding",
    value: "20.24%",
  },
};
