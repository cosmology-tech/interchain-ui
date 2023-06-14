import type { Meta, StoryObj } from "@storybook/react";

import { CrossChain } from "../../src";

const meta: Meta<typeof CrossChain> = {
  component: CrossChain,
  title: "Asset/cross-chain",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: {
      isSingle: false,
      total: "144.23",
      totalOnAll: "732.16",
      canWithdraw: true,
      canDeposit: true,
    },
    list: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        amount: "102.614224",
        dollarAmount: "101.02",
        chainName: "Juno",
        canDeposit: true,
        canWithdraw: false,
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        amount: "102.614224",
        dollarAmount: "101.02",
        chainName: "Juno",
        canDeposit: false,
        canWithdraw: true,
      },
    ],
    otherList: [
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        amount: "102.614224",
        dollarAmount: "101.02",
        chainName: "Juno",
        canDeposit: false,
        canWithdraw: true,
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        amount: "102.614224",
        dollarAmount: "101.02",
        chainName: "Juno",
        canDeposit: true,
        canWithdraw: true,
      },
      {
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        symbol: "OSMO",
        denom: "Osmosis",
        amount: "102.614224",
        dollarAmount: "101.02",
        chainName: "Juno",
        canDeposit: true,
        canWithdraw: false,
      },
    ],
  },
};
