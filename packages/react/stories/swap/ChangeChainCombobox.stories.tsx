import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import ChangeChainCombobox from "../../src/ui/change-chain-combobox";
import { getChainSwapComboboxOptions } from "../stub/chainSwapComboboxData";

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

    const options = React.useMemo(
      () =>
        getChainSwapComboboxOptions().map((i) => ({
          iconUrl: i.iconUrl,
          chainName: i.tokenName,
        })),
      []
    );

    return (
      <Box maxWidth="350px">
        <ChangeChainCombobox
          maxHeight={350}
          valueItem={selectedChain ? selectedChain : undefined}
          size="sm"
          onItemSelected={(item) => {
            console.log("[Story] Selected Item", item);
            setSelectedChain(item);
          }}
          options={options}
        />
      </Box>
    );
  },
};
