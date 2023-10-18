import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../../src/ui/button";
import BasicModal from "../../src/ui/basic-modal";
import Stack from "../../src/ui/stack";
import OverviewTransfer from "../../src/ui/overview-transfer";

const meta: Meta<typeof OverviewTransfer> = {
  component: OverviewTransfer,
  title: "Asset/OverviewTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "withdraw",
    dropDownList: [
      {
        available: "713.32",
        symbol: "UMEE",
        denom: "Umee",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
        priceDisplayAmount: 0.5,
      },
      {
        available: "89.66",
        symbol: "USTC",
        denom: "Terra Classic",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        priceDisplayAmount: 10,
      },
      {
        available: "102.61",
        symbol: "TORI",
        denom: "Teritori",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        priceDisplayAmount: 5,
      },
    ],
    onTransfer() {
      console.log("onTransfer");
    },
    onCancel() {
      console.log("onCancel");
    },
    onChange(selectedItem, value) {
      console.log("onChange", selectedItem, value);
    },
  },
  render: (props) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    return (
      <Stack space="$10">
        <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsDepositOpen(true)}>
              Deposit
            </Button>
          )}
          isOpen={isDepositOpen}
          title="Deposit"
          onClose={() => setIsDepositOpen(false)}
        >
          <OverviewTransfer {...props} />
        </BasicModal>
        <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsWithdrawOpen(true)}>
              Withdraw
            </Button>
          )}
          isOpen={isWithdrawOpen}
          title="Withdraw"
          onClose={() => setIsWithdrawOpen(false)}
        >
          <OverviewTransfer {...props} />
        </BasicModal>
      </Stack>
    );
  },
};
