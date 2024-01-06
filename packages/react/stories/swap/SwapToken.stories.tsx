import React, { useMemo, useState } from "react";
import { useMockData } from "../stub/mock-data-client";

import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import SwapToken from "../../src/ui/swap-token";
import { SwapTokenProps } from "../../src/ui/swap-token/swap-token.types";

const meta: Meta<typeof SwapToken> = {
  component: SwapToken,
  title: "swap/SwapToken",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    swapPrice: {
      hasRoute: true,
      priceImpact: "< 0.001%",
      swapFee: {
        percentage: "0.2%",
        value: "< $0.01",
      },
      routeDisabled: false,
      minimumReceived: 250.4,
    },
    onSwap: () => {
      console.log("Swap");
    },
    onToggleDirection: () => {
      console.log("ToggleDirection");
    },
    onToleranceChange: (percent) => {
      console.log("onToleranceChange", percent);
    },
  },
  render: (props) => {
    const [to, setTo] = useState<SwapTokenProps["to"] | null>(null);

    const [from, setFrom] = useState<SwapTokenProps["to"] | null>(null);

    const { assets, isReady } = useMockData({
      onReady: (assets) => {
        setFrom({
          label: "From",
          options: assets,
          selected: assets[5],
          amount: 0,
          onItemSelected: (selectedItem) => {
            console.log("From: onItemSelected", selectedItem);
            setFrom((prev) => ({ ...prev, selected: selectedItem }));
          },
          onAmountChange: (selectedItem, amount) => {
            setFrom((prev) => ({ ...prev, amount }));
          },
        });
        setTo({
          label: "To",
          options: assets,
          selected: assets[0],
          amount: 0,
          onItemSelected: (selectedItem) => {
            console.log("To: onItemSelected", selectedItem);
            setTo((prev) => ({ ...prev, selected: selectedItem }));
          },
          onAmountChange: (selectedItem, amount) => {
            setTo((prev) => ({ ...prev, amount }));
          },
        });
      },
    });

    if (!isReady || !to || !from) return <div>Loading ...</div>;

    return (
      <Box display="flex" justifyContent="center">
        <SwapToken {...props} from={from} to={to} />
      </Box>
    );
  },
};
