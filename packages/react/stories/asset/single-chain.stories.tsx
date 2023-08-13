import type { Meta, StoryObj } from "@storybook/react";

import { SingleChain, ShowMore } from "../../src";
import { SingleChainListItemProps } from "../../src/ui/single-chain/single-chain.types";
import { AvailableItem } from "../../src/ui/transfer-item/transfer-item.types";

const meta: Meta<typeof SingleChain> = {
  component: SingleChain,
  title: "Asset/SingleChain",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: {
      total: "144.23",
      // totalOnAll: "732.16",
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
      onDeposit: (item: AvailableItem, value: string) => {
        console.log("onDeposit item", item, "value", value);
      },
      onWithdraw: (item: AvailableItem, value: string) => {
        console.log("onWithdraw item", item, "value", value);
      },
    },
  },

  render: (props) => {
    const defaultList: SingleChainListItemProps[] = [
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
    let assetList: SingleChainListItemProps[] = defaultList.map((item) => {
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
            available: "25.89",
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
            available: "25.89",
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
        <SingleChain header={props.header} list={assetList} />
      </ShowMore>
    );
  },
};
