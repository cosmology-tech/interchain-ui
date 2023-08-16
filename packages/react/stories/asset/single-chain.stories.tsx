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
      onDeposit: () => {
        console.log("onDeposit");
      },
      onWithdraw: () => {
        console.log("onWithdraw");
      },
    },
    list: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        symbol: "USTC",
        denom: "Terra Classic",
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
        denom: "Teritori",
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
