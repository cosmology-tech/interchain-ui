import type { Meta, StoryObj } from "@storybook/react";

import PoolInfoHeader from "../../../src/ui/pool-info-header";

const meta: Meta<typeof PoolInfoHeader> = {
  component: PoolInfoHeader,
  title: "Pool/PoolDetail/PoolInfoHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    id: "1",
    coins: [
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
    liquidity: "29422809",
    swapFee: 0.2,
    volume24H: 3288612,
  },
};
