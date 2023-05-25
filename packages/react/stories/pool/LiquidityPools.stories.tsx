import type { Meta, StoryObj } from "@storybook/react";

import { PoolsHeader, PoolList, PoolListItem } from "../../src";

const meta: Meta<typeof PoolList> = {
  component: PoolList,
  title: "Pool/LiquidityPools",
  // tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  render: () => {
    const list = [
      {
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
    ]
    return (
      <div style={{ padding: 20 }}>
        <PoolsHeader price={0.98} rewards={12.87} $rewards={12.87} />
        <PoolList list={list}  />
      </div>
    );
  },
};
