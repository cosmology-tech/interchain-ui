import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RemoveLiquidity, BasicModal, Button } from "../../../../src";

const meta: Meta<typeof RemoveLiquidity> = {
  component: RemoveLiquidity,
  title: "Pool/PoolDetail/ManageLiquidity/RemoveLiquidity",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary RemoveLiquidity */
export const Primary: Story = {
  args: {
    unbondedBalance: "0.338654",
    unbondedShares: "2.2098786",
    myLiquidityCoins: [
      {
        symbol: "ATOM",
        displayAmount: "0.01949381023874581",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      },
      {
        symbol: "OSMO",
        displayAmount: "0.365385514677405108",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      },
    ],
    onRemoveLiquidity() {
      console.log("onRemoveLiquidity");
    },
    onChange(progress) {
      console.log("onChange", progress);
    },
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Remove Liquidity</Button>
        <BasicModal
          isOpen={isOpen}
          title="Remove Liquidity"
          onClose={() => setIsOpen(false)}
        >
          <RemoveLiquidity {...props} />
        </BasicModal>
      </>
    );
  },
};
