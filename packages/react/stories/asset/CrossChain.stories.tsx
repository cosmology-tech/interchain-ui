import type { Meta, StoryObj } from "@storybook/react";

import CrossChain from "../../src/ui/cross-chain/cross-chain";

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
    title: "Your assets",
    multiChainHeader: [
      {
        label: "Total on Osmosis",
        value: "144.23",
      },
      {
        label: "Total across all chains",
        value: "732.16",
      },
    ],
    onDeposit: () => {
      console.log("onDeposit");
    },
    onWithdraw: () => {
      console.log("onWithdraw");
    },
    listTitle: "On Osmosis",
    otherListTitle: "On other chains",
    list: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        name: "Terra Classic",
        tokenAmount: "89.66",
        tokenAmountPrice: "10",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        symbol: "TORI",
        name: "Teritori",
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
    ],
    otherList: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        name: "Terra Classic",
        tokenAmount: "89.66",
        tokenAmountPrice: "10",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        symbol: "TORI",
        name: "Teritori",
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        chainName: "Juno",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      },
    ],
  },
};
