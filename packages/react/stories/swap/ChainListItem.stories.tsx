import type { Meta, StoryObj } from "@storybook/react";

import { ChainListItem } from "../../src";

const meta: Meta<typeof ChainListItem> = {
  component: ChainListItem,
  title: "swap/ChainListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    isActive: false,
    size: "md",
    iconUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
    name: "Cosmos",
    tokenName: "ATOM",
    amount: "0.79824",
    notionalValue: "$0.69",
  },
};
