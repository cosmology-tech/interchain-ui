import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolInfoHeader, ManageLiquidityCard, BondingArea } from "../../../src";

const meta: Meta<typeof BondingArea> = {
  component: BondingArea,
  title: "Pool/pool-detail/pool-detail-modal",
  // tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  render: () => {
    const poolHeaderData = {
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
      poolLiquidity: 70055692,
      swapFee: 0.2,
      volume24H: 70055692,
    };
    const liquidityCardData = {
      token1: {
        name: "ATOM",
        asset: 0,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
      },
      token2: {
        name: "OSOM",
        asset: 0,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
      },
      pollBalance: 0,
      poolShares: 0,
      lpTokens: 0,
      tokenShares: 0,
    };
    const bondingAreaData = {
      bondingCardList: [
        {
          title: "a day bonding",
          value: "20.24%",
        },
        {
          title: "7 days",
          value: "32.39%",
        },
        {
          title: "14 days",
          value: "40.49%",
        },
      ],
      bondingList: [
        {
          title: "A day",
          apr: "2.43%",
          amount: 59075,
          per: "24%",
        },
        {
          title: "7 days",
          apr: "2.43%",
          amount: 59075,
          per: "24%",
        },
        {
          title: "14 days",
          apr: "2.43%",
          amount: 59075,
          per: "24%",
        },
      ],
      bondingListSm: {
        unbondedAmt: 0.4,
        unbondedShares: 2.1792,
        list: [
          {
            title: "Bonded 1 day",
            amount: 0.33,
            poolShares: 0,
            apr: "2.46%",
          },
          {
            title: "Bonded 7 days",
            amount: 0.33,
            poolShares: 0,
            apr: "2.46%",
          },
          {
            title: "Bonded 14 days",
            amount: 0.33,
            poolShares: 0,
            apr: "2.46%",
          },
        ],
      },
    };
    return (
      <div style={{ padding: 20, maxWidth: 800, boxSizing: "border-box" }}>
        <PoolInfoHeader {...poolHeaderData} />
        <ManageLiquidityCard {...liquidityCardData} />
        <BondingArea {...bondingAreaData} />
      </div>
    );
  },
};
