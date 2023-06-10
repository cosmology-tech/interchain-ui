import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolCardList } from "../../src";

const meta: Meta<typeof PoolCardList> = {
  component: PoolCardList,
  title: "Pool/PoolCardList",
  tags: ["autodocs"],
  argTypes: {
    list: {
      description: "List of pool item",
      table: {
        type: {
          summary: "PoolCardProps []",
          detail:
  `{
    id: string;
    /**
     * Token1
     */
    token1: {
      name: string
      imgSrc: string,
    },
    /**
      * Token2
      */
    token2: {
      name: string,
      imgSrc: string,
    },
    poolLiquidity: number;
    fees: number;
    apr: number;
    yourLiquidity: number;
    bonded: number;
}
`,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    list: [
      {
        id: "1",
        token1: {
          name: "ATOM",
          imgSrc:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
        },
        token2: {
          name: "OSOM",
          imgSrc:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        },
        poolLiquidity: 168767639,
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
      },
      {
        id: "2",
        token1: {
          name: "ATOM",
          imgSrc:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
        },
        token2: {
          name: "OSOM",
          imgSrc:
            "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        },
        poolLiquidity: 168767639,
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
      },
    ],
  },
};
