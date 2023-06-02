import type { Meta, StoryObj } from "@storybook/react";

import { PoolInfoHeader } from "../../../src";

const meta: Meta<typeof PoolInfoHeader> = {
  component: PoolInfoHeader,
  title: "Pool/pool-detail/pool-info-header",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
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
  },
};
