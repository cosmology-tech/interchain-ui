import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import useAssetList from "../stub/hooks/useAssetList";
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
    // fromSymbol: "UMEE",
    // fromDenom: "Umee",
    // fromAddress: "umee1lqsq...pv4axdaxk",
    // fromImgSrc:
    //   "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg",
    // toDenom: "Osmosis",
    // toAddress: "osmo1lqsq...pv48trj5k",
    // toImgSrc:
    //   "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
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
    const { assetList } = useAssetList({});
    console.log(assetList)
    const [fromData, setFromData] = useState({});
    const [toData, setToData] = useState({});

    useEffect(() => {
      const fromItem = assetList.find((item) => item.symbol === "IBCX");
      const toItem = assetList.find((item) => item.symbol === "OSMO");
      console.log("fromitem", fromItem, toItem)
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
        toAddress: toItem?.address || "osmo1qx6kgrla69wmz90tn379p4kaux5prdkuzly2tw",
        toImgSrc:
          toItem?.logo_URIs?.jpeg ||
          toItem?.logo_URIs?.png ||
          toItem?.logo_URIs?.svg,
      });
    }, []);
    console.log("from to", fromData, toData)
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
          <AssetItemTransfer {...Object.assign(props, fromData, toData)} />
        </BasicModal>
      </>
    );
  },
};
