import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ChangeChainCombobox, Box } from "../../src";

const meta: Meta<typeof ChangeChainCombobox> = {
  component: ChangeChainCombobox,
  title: "swap/ChangeChainCombobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [selectedChain, setSelectedChain] = React.useState<{
      iconUrl?: string;
      chainName: string;
    } | null>(null);

    return (
      <Box maxWidth="350px">
        <ChangeChainCombobox
          valueItem={selectedChain ? selectedChain : undefined}
          size="sm"
          onItemSelected={(item) => {
            console.log("[Story] Selected Item", item);
          }}
          options={[
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "ATOM",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "ZIL",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "BTC",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "ETH",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "LTC",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "RAR",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "AR",
            },
            {
              iconUrl:
                "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
              chainName: "BOZ",
            },
          ]}
        />
      </Box>
    );
  },
};
