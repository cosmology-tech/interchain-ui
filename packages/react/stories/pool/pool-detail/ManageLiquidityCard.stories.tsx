import type { Meta, StoryObj } from "@storybook/react";

import { ManageLiquidityCard } from "../../../src";

const meta: Meta<typeof ManageLiquidityCard> = {
  component: ManageLiquidityCard,
  title: "Pool/pool-detail/manage-liquidity-card",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
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
  },
};
