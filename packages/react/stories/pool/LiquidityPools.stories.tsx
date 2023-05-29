import type { Meta, StoryObj } from "@storybook/react";

import { PoolsHeader, PoolList, PoolCardList, ShowMore } from "../../src";

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
    ];
    const cardList = [
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
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
        fees: 59075,
        apr: 24,
        yourLiquidity: 1329.32,
        bonded: 600.0,
      },
    ];
    return (
      <div style={{ padding: 20, maxWidth: 800, boxSizing: "border-box" }}>
        <ShowMore initialHeightPercent={0.6}>
          <PoolsHeader price={0.98} rewards={12.87} $rewards={12.87} />
          <PoolList title="Your Pools" list={list} />
          <PoolCardList list={cardList} />
          <PoolList title="All Pools" list={list} />
        </ShowMore>
      </div>
    );
  },
};
