import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { Asset as OsmosisAsset } from "@chain-registry/types";

import TokenInput from "../src/ui/token-input";

const meta: Meta<typeof TokenInput> = {
  component: TokenInput,
  title: "TokenInput",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const osmosisAssets: OsmosisAsset[] = [...assets.assets, ...asset_list.assets];
const OSMO = osmosisAssets.find((asset) => asset.symbol === "OSMO")!;

/* This is primary TokenInput */
export const Primary: Story = {
  args: {
    symbol: OSMO.symbol,
    name: OSMO.name,
    available: 23345.44,
    priceDisplayAmount: 0.5,
    tokenIcon: OSMO.logo_URIs?.png,
    onAmountChange: (value) => {
      console.log("onAmountChange", value);
    },
  },
  render: (props) => {
    const [progress, setProgress] = useState(50);
    const [amount, setAmount] = useState(0);

    const onProgressChange = (value) => {
      console.log("onProgressChange", value);
      setProgress(value);
    };

    return (
      <TokenInput
        {...props}
        amount={amount}
        onAmountChange={(value) => {
          setAmount(value);
        }}
        progress={progress}
        onProgressChange={onProgressChange}
      />
    );
  },
};
