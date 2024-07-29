import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import ChainSwapCombobox from "../../src/ui/chain-swap-combobox";
import { useMockData } from "../stub/mock-data-client";
import { ChainSwapComboboxProps } from "../../src/ui/chain-swap-combobox/chain-swap-combobox";

const meta: Meta<typeof ChainSwapCombobox> = {
  component: ChainSwapCombobox,
  title: "swap/ChainSwapCombobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

function useChainSwapState() {
  const [selected, setSelected] = React.useState<
    ChainSwapComboboxProps["valueItem"] | null
  >(null);

  const { isReady, comboboxAssets } = useMockData({
    onReady(assets, comboboxAssets) {
      setSelected(comboboxAssets[5]);
    },
  });

  const options = React.useMemo(
    () => (isReady ? comboboxAssets : []),
    [isReady, comboboxAssets],
  );

  return {
    isReady,
    selected,
    setSelected,
    options,
  };
}

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const { selected, setSelected, options, isReady } = useChainSwapState();

    if (!isReady || !selected) {
      return <div>Loading...</div>;
    }

    // console.log("options", options);

    return (
      <ChainSwapCombobox
        size="md"
        maxHeight={350}
        valueItem={selected}
        onItemSelected={setSelected}
        options={options}
        defaultSelected={selected}
      />
    );
  },
};

export const Small: Story = {
  args: {},
  render: (props) => {
    const { selected, setSelected, options, isReady } = useChainSwapState();

    if (!isReady || !selected) {
      return <div>Loading...</div>;
    }

    return (
      <Box maxWidth="260px">
        <ChainSwapCombobox
          size="sm"
          maxHeight={350}
          valueItem={selected}
          onItemSelected={setSelected}
          options={options}
          defaultSelected={selected}
        />
      </Box>
    );
  },
};
