import type { Meta, StoryObj } from "@storybook/react";

import { CrossChain, ShowMore } from "../../src";
import { CrossChainListItemProps } from "../../src/ui/cross-chain/cross-chain.types";

const meta: Meta<typeof CrossChain> = {
  component: CrossChain,
  title: "Asset/CrossChain",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: {
      total: "144.23",
      totalOnAll: "732.16",
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
      onDeposit: (detail) => {
        console.log("onDeposit", detail);
      },
      onWithdraw: (detail) => {
        console.log("onWithdraw", detail);
      },
    },
  },
  render: (props) => {
    const defaultList: CrossChainListItemProps[] = [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        denom: "Terra Classic",
        tokenAmount: "89.66",
        tokenAmountPrice: "10",
        chainName: "Juno",
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        symbol: "TORI",
        denom: "Teritori",
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        chainName: "Juno",
      },
    ];
    let assetList: CrossChainListItemProps[] = defaultList.map((item) => {
      return {
        ...item,
        onDeposit: () => {
          console.log("on deposit");
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
    return (
      <ShowMore heightToShowMore={800}>
        <CrossChain
          header={props.header}
          list={assetList}
          otherList={assetList}
        />
      </ShowMore>
    );
  },
};
