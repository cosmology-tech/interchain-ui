import type { Meta, StoryObj } from "@storybook/react";

import { SwapPrice } from "../../src";

const meta: Meta<typeof SwapPrice> = {
  component: SwapPrice,
  title: "swap/SwapPrice",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapPrice */
export const Primary: Story = {
  args: {
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
};
