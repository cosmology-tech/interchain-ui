import React, { useMemo, useState } from "react";
import { useMockData } from "../stub/mock-data-client";

import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import SwapToken from "../../src/ui/swap-token";
import {
  SwapTokenProps,
  SwapItem,
} from "../../src/ui/swap-token/swap-token.types";

const meta: Meta<typeof SwapToken> = {
  component: SwapToken,
  title: "swap/SwapToken",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

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

    const [from, setFrom] = useState<SwapTokenProps["from"] | null>(null);

    const onToggleDirection = () => {
      const prevTo = to;
      const prevFrom = from;

      setTo({ ...prevFrom, label: "To" });
      setFrom({ ...prevTo, label: "From" });
    };

    const { assets, isReady } = useMockData({
      onReady: (assets) => {
        setFrom({
          label: "From",
          options: assets ?? [],
          selected: assets[5],
          amount: 0,
          onItemSelected: (selectedItem) => {
            console.log("From: onItemSelected", selectedItem);
            setFrom((prev) => ({
              ...prev,
              selected: selectedItem,
              options: prev?.options ?? [],
              amount: prev?.amount ?? 0,
              label: prev?.label ?? "",
              onItemSelected: prev?.onItemSelected ?? noop,
              onAmountChange: prev?.onAmountChange ?? noop,
              onAmountInput: prev?.onAmountInput ?? noop,
            }));
          },
          onAmountChange: (selectedItem, amount) => {
            setFrom((prev) => ({
              ...prev,
              selected: selectedItem,
              options: prev?.options ?? [],
              amount: amount ?? 0,
              label: prev?.label ?? "",
              onItemSelected: prev?.onItemSelected ?? noop,
              onAmountChange: prev?.onAmountChange ?? noop,
              onAmountInput: prev?.onAmountInput ?? noop,
            }));
          },
        });
        setTo({
          label: "To",
          options: assets ?? [],
          selected: assets[0],
          amount: 0,
          onItemSelected: (selectedItem) => {
            console.log("To: onItemSelected", selectedItem);
            setTo((prev) => ({
              ...prev,
              selected: selectedItem,
              options: prev?.options ?? [],
              amount: prev?.amount ?? 0,
              label: prev?.label ?? "",
              onItemSelected: prev?.onItemSelected ?? noop,
              onAmountChange: prev?.onAmountChange ?? noop,
              onAmountInput: prev?.onAmountInput ?? noop,
            }));
          },
          onAmountChange: (selectedItem, amount: number) => {
            setTo((prev) => ({
              ...prev,
              selected: selectedItem,
              options: prev?.options ?? [],
              amount: amount ?? 0,
              label: prev?.label ?? "",
              onItemSelected: prev?.onItemSelected ?? noop,
              onAmountChange: prev?.onAmountChange ?? noop,
              onAmountInput: prev?.onAmountInput ?? noop,
            }));
          },
        });
      },
    });

    if (!isReady || !to || !from) return <div>Loading ...</div>;

    return (
      <SwapToken
        {...props}
        from={from}
        to={to}
        onToggleDirection={onToggleDirection}
      />
    );
  },
};
