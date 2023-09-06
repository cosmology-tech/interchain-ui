import React, { useState } from "react";
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
    symbol: "OMSO",
    denom: "Osmosis",
    available: 0.71263,
    priceDisplayAmount: 0.5,
    tokenIcon:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    onAmountChange: (value) => {
      console.log("onAmountChange", value);
    },
  },
  render: (props) => {
    const [progress, setProgress] = useState(50);

    const onProgressChange = (value) => {
      console.log("onProgressChange", value);
      setProgress(value);
    };
    return (
      <TokenInput
        {...props}
        progress={progress}
        onProgressChange={onProgressChange}
      />
    );
  },
};
