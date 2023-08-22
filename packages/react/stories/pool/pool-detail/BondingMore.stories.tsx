import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingMore } from "../../../src";

const meta: Meta<typeof BondingMore> = {
  component: BondingMore,
  title: "Pool/PoolDetail/BondingMore",
  tags: ["autodocs"],
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    available: "2.1792",
    bondingName: "ATOM / OSMO",
    onBond() {
      console.log("onBond");
    },
    onChange(value) {
      console.log("onChange", value);
    },
  },
};
