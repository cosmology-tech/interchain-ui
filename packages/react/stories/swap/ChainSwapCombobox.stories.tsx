import type { Meta, StoryObj } from "@storybook/react";

import { ChainSwapCombobox } from "../../src";

const meta: Meta<typeof ChainSwapCombobox> = {
  component: ChainSwapCombobox,
  title: "swap/ChainSwapCombobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    size: "md",
    options: [
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Cosmos",
        tokenName: "ATOM",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Zil",
        tokenName: "ZIL",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Bitcoin",
        tokenName: "BTC",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Ethereum",
        tokenName: "ETH",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Litecoin",
        tokenName: "LTC",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "RArar",
        tokenName: "RAR",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Areo",
        tokenName: "AR",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
      {
        iconUrl:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
        name: "Bozo",
        tokenName: "BOZ",
        amount: "0.79824",
        notionalValue: "$0.69",
      },
    ],
  },
};
