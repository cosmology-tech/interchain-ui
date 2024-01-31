import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { getAssetByDenom } from "@chain-registry/utils";
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
const OSMO = getAssetByDenom(osmosisAssets, "uosmo");

/* This is primary TokenInput */
export const Primary: Story = {
  args: {
    symbol: OSMO.symbol,
    name: OSMO.name,
    available: 0.71263,
    priceDisplayAmount: 0.5,
    tokenIcon: OSMO.logo_URIs?.png,
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
