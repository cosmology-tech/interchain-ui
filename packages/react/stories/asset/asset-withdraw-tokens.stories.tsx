import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import useAssetList from "../stub/hooks/useAssetList";
import AssetWithdrawTokens from "../../src/ui/asset-withdraw-tokens";
import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";
import Stack from "../../src/ui/stack";

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
    const { assetList } = useAssetList({});
    const [fromData, setFromData] = useState({});
    const [toData, setToData] = useState({});

    useEffect(() => {
      const fromItem = assetList.find((item) => item.symbol === "IBCX");
      const toItem = assetList.find((item) => item.symbol === "OSMO");
      setFromData({
        fromSymbol: fromItem?.symbol,
        fromDenom: fromItem?.name,
        fromAddress: fromItem?.address,
        fromImgSrc:
          fromItem?.logo_URIs?.jpeg ||
          fromItem?.logo_URIs?.png ||
          fromItem?.logo_URIs?.svg,
      });
      setToData({
        toDenom: toItem?.name,
        toAddress:
          toItem?.address || "osmo1qx6kgrla69wmz90tn379p4kaux5prdkuzly2tw",
        toImgSrc:
          toItem?.logo_URIs?.jpeg ||
          toItem?.logo_URIs?.png ||
          toItem?.logo_URIs?.svg,
      });
    }, []);

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
