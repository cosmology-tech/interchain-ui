import type { Meta, StoryObj } from "@storybook/react";

import { SingleChain } from "../../src";

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
      isSingle: true,
      total: "144.23",
      totalOnAll: "732.16",
      canDeposit: true,
      canWithdraw: true,
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
    ],
  },
};
