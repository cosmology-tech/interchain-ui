import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SwapToken, BasicModal, Button } from "../../src";

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
    },
    dropDownList: [
      {
        available: 57.61,
        symbol: "OSMO",
        denom: "Osmosis",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        priceDisplayAmount: 0.4671,
      },
      {
        available: 15.9576,
        symbol: "ATOM",
        denom: "Cosmos Hub",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        priceDisplayAmount: 8.3502,
      },
      {
        available: 713.32,
        symbol: "USDC",
        denom: "Axelar",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
        priceDisplayAmount: 1,
      },
      {
        available: 89.66,
        symbol: "USTC",
        denom: "Terra Classic",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        priceDisplayAmount: 0.0144,
      },
      {
        available: 102.61,
        symbol: "TORI",
        denom: "Teritori",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        priceDisplayAmount: 0.0104,
      },
    ],
    onSwap: () => {
      console.log("onSwap");
    },
    onChange: () => {
      console.log("onChange");
    },
    onToteranceChange: (percent) => {
      console.log("onToteranceChange", percent);
    },
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Swap</Button>
        <BasicModal
          isOpen={isOpen}
          title="Swap"
          onClose={() => setIsOpen(false)}
        >
          <SwapToken {...props} />
        </BasicModal>
      </>
    );
  },
};
