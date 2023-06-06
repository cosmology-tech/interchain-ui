import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TokenInput } from "../src";

const meta: Meta<typeof TokenInput> = {
  component: TokenInput,
  title: "TokenInput",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary TokenInput */
export const Primary: Story = {
  args: {
    progress: 50,
    symbol: "OMSO",
    denom: "Osmosis",
    available: 0.71263,
    amount: 10,
    imgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
  },
};
