import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetItemTransfer, BasicModal, Button, Stack } from "../../src";

const meta: Meta<typeof AssetItemTransfer> = {
  component: AssetItemTransfer,
  title: "Asset/AssetItemTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fromSymbol: "UMEE",
    fromDenom: "Umee",
    fromAddress: "umee1lqsq...pv4axdaxk",
    fromImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
    toDenom: "Osmosis",
    toAddress: "osmo1lqsq...pv48trj5k",
    toImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    available: "25.89",
    amount: "",
    priceDisplayAmount: 0.5,
    onChange: (value) => {
      console.log("onChange", value);
    },
    onTransfer: () => {
      console.log("onTransfer");
    },
    onCancel: () => {
      console.log("onCancel");
    },
  },
  render: (props) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    return (
      <>
        <Stack space="$10">
          <Button onClick={() => setIsDepositOpen(true)}>Deposit</Button>
          <Button onClick={() => setIsWithdrawOpen(true)}>Withdraw</Button>
        </Stack>
        <BasicModal
          isOpen={isDepositOpen}
          title="Deposit"
          onClose={() => setIsDepositOpen(false)}
        >
          <AssetItemTransfer {...props} />
        </BasicModal>
        <BasicModal
          isOpen={isWithdrawOpen}
          title="Withdraw"
          onClose={() => setIsWithdrawOpen(false)}
        >
          <AssetItemTransfer {...props} />
        </BasicModal>
      </>
    );
  },
};
