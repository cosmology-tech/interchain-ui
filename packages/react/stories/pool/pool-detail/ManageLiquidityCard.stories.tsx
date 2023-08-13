import type { Meta, StoryObj } from "@storybook/react";

import { ManageLiquidityCard } from "../../../src";

const meta: Meta<typeof ManageLiquidityCard> = {
  component: ManageLiquidityCard,
  title: "Pool/PoolDetail/ManageLiquidityCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    totalBalanceCoins: [
      {
        symbol: "ATOM",
        displayAmount: "0.02052506381023874581",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      },
      {
        symbol: "OSMO",
        displayAmount: "0.3824102514677405108",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      },
    ],
    totalBalance: "1228.02",
    totalShares: "212.0432",
    lpTokenBalance: "22.51",
    lpTokenShares: "12.02",
  },
};
