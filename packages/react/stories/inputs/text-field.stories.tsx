import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "../../src";

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "TextField",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is Default FieldLabel */
export const Default: Story = {
  args: {
    id: "amount",
    label: "Select amount",
    placeholder: "Please enter amount",
  },
  render: (props) => {
    const [val, setVal] = useState("");
    const handleChange = (e) => {
      console.log(e)
      setVal(e.target.value)
    };
    return <TextField  {...props} onChange={handleChange} value={val} />;
  },
};
