import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ChainSwapCombobox, Box } from "../../src";
import { getChainSwapComboboxOptions } from "../stub/chainSwapComboboxData";

const meta: Meta<typeof ChainSwapCombobox> = {
  component: ChainSwapCombobox,
  title: "swap/ChainSwapCombobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

function useChainSwapState() {
  const options = React.useMemo(() => getChainSwapComboboxOptions(), []);
  const [selected, setSelected] = React.useState(options[0]);

  return {
    selected,
    setSelected,
    options,
  };
}

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const { selected, setSelected, options } = useChainSwapState();

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
    const { selected, setSelected, options } = useChainSwapState();

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
