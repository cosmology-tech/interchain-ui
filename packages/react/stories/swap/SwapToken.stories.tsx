import type { Meta, StoryObj } from "@storybook/react";

import { SwapToken } from "../../src";

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
      price: {
        priceRate: 1.6432,
        dollarValue: "1,013",
      },
      priceImpact: "< 0.001%",
      swapFee: {
        percentage: "0.2%",
        value: "< $0.01",
      },
      expectedOutput: "0.018795",
      tokenOutSymbol: "ATOM",
      minimumReceived: "0.018607",
      routeDetail: {
        tokenIn: {
          logoUrl:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
          symbol: "USDC",
        },
        tokenOut: {
          logoUrl:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          symbol: "ATOM",
        },
        routes: [
          {
            poolId: "1",
            swapFee: "0.1%",
            baseLogo:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdc.png",
            baseSymbol: "USDC",
            quoteLogo:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
            quoteSymbol: "OSMO",
          },
          {
            poolId: "2",
            swapFee: "0.1%",
            baseLogo:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
            baseSymbol: "OSMO",
            quoteLogo:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
            quoteSymbol: "ATOM",
          },
        ],
      },
    },
    dropDownList: [
      {
        available: 713.32,
        symbol: "UMEE",
        denom: "Umee",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
        priceDisplayAmount: 0.5,
      },
      {
        available: 89.66,
        symbol: "USTC",
        denom: "Terra Classic",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        priceDisplayAmount: 10,
      },
      {
        available: 102.61,
        symbol: "TORI",
        denom: "Teritori",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        priceDisplayAmount: 5,
      },
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
        priceDisplayAmount: 8.6744,
      },
    ],
    onSwap: () => {
      console.log("onSwap")
    }
  },
};
