import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ChangeChainInput from "../../src/ui/change-chain-input";

const meta: Meta<typeof ChangeChainInput> = {
  component: ChangeChainInput,
  title: "swap/ChangeChainInput",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    size: "sm",
    isLoading: false,
    value: "",
    label: "Select chain",
    iconUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
    placeholder: "Choose a token",
    isClearable: false,
    chainName: "ATOM",
  },
};
