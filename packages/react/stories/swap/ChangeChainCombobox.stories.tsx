import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import ChangeChainCombobox from "../../src/ui/change-chain-combobox";
import { useMockData } from "../stub/mock-data-client";

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
      label: string;
      value: string;
    } | null>(null);

    const { isReady, comboboxAssets } = useMockData();

    const options = React.useMemo(
      () =>
        comboboxAssets.map((i) => ({
          iconUrl: i.iconUrl,
          label: i.tokenName,
          value: i.tokenName,
        })),
      [comboboxAssets, isReady]
    );

    if (!isReady) {
      return <div>Loading...</div>;
    }

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

export const Bold: Story = {
  args: {},
  render: (props) => {
    const [selectedChain, setSelectedChain] = React.useState<{
      iconUrl?: string;
      label: string;
      value: string;
    } | null>(null);

    const { isReady, comboboxAssets } = useMockData();

    const options = React.useMemo(
      () =>
        comboboxAssets.map((i) => ({
          iconUrl: i.iconUrl,
          label: i.tokenName,
          value: i.tokenName,
        })),
      [comboboxAssets, isReady]
    );

    if (!isReady) {
      return <div>Loading...</div>;
    }

    return (
      <Box maxWidth="350px">
        <ChangeChainCombobox
          appearance="bold"
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
