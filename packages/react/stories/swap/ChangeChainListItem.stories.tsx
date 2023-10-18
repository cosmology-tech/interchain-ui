import type { Meta, StoryObj } from "@storybook/react";

import ChangeChainListItem from "../../src/ui/change-chain-list-item";

const meta: Meta<typeof ChangeChainListItem> = {
  component: ChangeChainListItem,
  title: "swap/ChangeChainListItem",
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
    chainName: "Atom",
  },
};
