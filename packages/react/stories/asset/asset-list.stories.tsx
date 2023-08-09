import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetList } from "../../src";
import { AssetListItemProps } from "../../src/ui/asset-list-item/asset-list-item.types";

const meta: Meta<typeof AssetList> = {
  component: AssetList,
  title: "Asset/AssetList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOtherChains: false,
  },
  render: (props) => {
    const defaultList: AssetListItemProps[] = [
      {
        isOtherChains: false,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        denom: "Terra Classic",
        tokenAmount: "89.66",
        tokenAmountPrice: "10",
        chainName: "Juno",
      },
      {
        isOtherChains: false,
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        symbol: "TORI",
        denom: "Teritori",
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        chainName: "Juno",
      },
    ];
    let assetList: AssetListItemProps[] = defaultList.map((item) => {
      return {
        ...item,
        onDeposit: () => {
          return {
            fromSymbol: item.symbol,
            fromDenom: item.denom,
            fromImgSrc: item.imgSrc,
            toDenom: "Osmosis",
            fromAddress: "umee1lqsq...pv4axdaxk",
            toAddress: "osmo1lqsq...pv48trj5k",
            toImgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
            avaliable: "25.89",
            amount: "",
            priceDisplayAmount: 0.5,

            onTransfer: (amount) => {
              console.log("onTransfer", amount);
            },
          };
        },
        onWithdraw: () => {
          return {
            fromSymbol: item.symbol,
            fromDenom: item.denom,
            fromImgSrc: item.imgSrc,
            fromAddress: "umee1lqsq...pv4axdaxk",
            toDenom: "Osmosis",
            toAddress: "osmo1lqsq...pv48trj5k",
            toImgSrc:
              "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
            avaliable: "25.89",
            amount: "",
            priceDisplayAmount: 0.5,
            onTransfer: (amount) => {
              console.log("onTransfer", amount);
            },
          };
        },
      };
    });
    return <AssetList {...props} list={assetList} />;
  },
};
