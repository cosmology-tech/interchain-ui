import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NumberInput from "../src/ui/number-input";

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
  title: "NumberInput",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState("0");

    return (
      <NumberInput
        id="my-num-input"
        label="My Amount"
        min={0}
        max={2000}
        textAlign="right"
        value={value}
        onChange={(details) => {
          console.log("Change", details.value);
          setValue(details.value);
        }}
      />
    );
  },
};
