import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import AssetWithdrawTokens from "../../src/ui/asset-withdraw-tokens";
import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";
import Stack from "../../src/ui/stack";
import { useMockData } from "../stub/mock-data-client";

const meta: Meta<typeof AssetWithdrawTokens> = {
  component: AssetWithdrawTokens,
  title: "Asset/WithdrawTokens",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fromSymbol: "UMEE",
    fromName: "Umee",
    fromAddress: "umee1lqsq...pv4axdaxk",
    fromImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
    toName: "Osmosis",
    toAddress: "osmo1lqsq...pv48trj5k",
    toImgSrc:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    available: 25.89,
    amount: "",
    priceDisplayAmount: 0.5,
    timeEstimateLabel: "20 seconds",
    onChange: (value) => {
      console.log("onChange", value);
    },
    onTransfer: () => {
      console.log("onTransfer");
    },
    onCancel: () => {
      console.log("onCancel");
    },
    onAddressChange: (value: string) => {
      console.log("onAddressChange", value);
    },
    onAddressConfirm: () => {
      console.log("onAddressConfirm");
    },
  },
  render: (props) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const { isReady, assets } = useMockData();

    const [fromData, setFromData] = useState({});
    const [toData, setToData] = useState({});

    useEffect(() => {
      if (!isReady) return;

      const fromItem = assets.find((item) => item.symbol === "ATOM");
      const toItem = assets.find((item) => item.symbol === "STRD");
      setFromData({
        fromSymbol: fromItem?.symbol,
        fromDenom: fromItem?.name,
        fromAddress: fromItem?.address,
        fromImgSrc: fromItem?.imgSrc,
      });
      setToData({
        toDenom: toItem?.name,
        toAddress:
          toItem?.address || "osmo1qx6kgrla69wmz90tn379p4kaux5prdkuzly2tw",
        toImgSrc: toItem?.imgSrc,
      });
    }, [isReady, assets]);

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
          <AssetWithdrawTokens {...props} />
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
          <AssetWithdrawTokens {...Object.assign(props, fromData, toData)} />
        </BasicModal>
      </Stack>
    );
  },
};
