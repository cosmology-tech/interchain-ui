import type { Meta, StoryObj } from "@storybook/react";

import { PoolList } from "../../src";

const meta: Meta<typeof PoolList> = {
  component: PoolList,
  title: "Pool/PoolList",
  tags: ["autodocs"],
  argTypes: {
    list: {
      description: "List of pool item",
      table: {
        type: {
          summary: "PoolListItemProps []",
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
    poolLiquidity: number,
    volume: number,
    fees: number,
    apr: number,
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
        volume: 3288612,
        fees: 59075,
        apr: 24,
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
        volume: 3288612,
        fees: 59075,
        apr: 24,
      },
    ],
  },
};
