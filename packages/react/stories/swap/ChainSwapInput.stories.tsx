import type { Meta, StoryObj } from "@storybook/react";

import ChainSwapInput from "../../src/ui/chain-swap-input";

const meta: Meta<typeof ChainSwapInput> = {
  component: ChainSwapInput,
  title: "swap/ChainSwapInput",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    size: "sm",
    value: "ATOM",
    label: "Cosmos",
    iconUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
    placeholder: "Choose a token",
    amount: "0.79824",
    notionalValue: "$0.69",
  },
};
