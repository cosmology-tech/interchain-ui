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
    fromItem: {
      available: 15.9576,
      symbol: "ATOM",
      denom: "Cosmos Hub",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      priceDisplayAmount: 8.3502,
    },
    toItem: {
      available: 102.61,
      symbol: "TORI",
      denom: "Teritori",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
      priceDisplayAmount: 0.0104,
    },
    disabled: false,
    minimumReceived: "2458.091209",
    fromAmount: "3.222633",
    toAmount: "2587.46443",
    hasRoute: true,
    priceImpact: "< 0.001%",
    swapFee: {
      percentage: "0.2%",
      value: "< $0.01",
    },
  },
};
