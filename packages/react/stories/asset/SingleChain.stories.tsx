import type { Meta, StoryObj } from "@storybook/react";

import SingleChain from "../../src/ui/single-chain";

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
    title: "Your asset",
    listTitle: "On Osmosis",
    onDeposit: () => {
      console.log("onDeposit");
    },
    onWithdraw: () => {
      console.log("onWithdraw");
    },
    singleChainHeader: {
      label: "Total on Osmosis",
      value: "144.23",
    },
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
  },
};
