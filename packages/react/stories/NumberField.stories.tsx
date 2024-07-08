import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NumberField from "../src/ui/number-field";

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: "NumberField",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <NumberField
        id="my-num-input1"
        label="My Amount"
        minValue={0}
        maxValue={2000}
        textAlign="right"
        value={value}
        onChange={(value) => {
          console.log("[sb1] Change", value);
          setValue(value);
        }}
      />
    );
  },
};

export const DisabledClampValueOnBlur: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <NumberField
        id="my-num-input2"
        label="My Amount"
        textAlign="right"
        value={value}
        clampValueOnBlur={false}
        onChange={(value) => {
          console.log("[sb2] Change", value);
          setValue(value);
        }}
      />
    );
  },
};
