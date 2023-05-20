import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolsHeader } from "../src";

const meta: Meta<typeof PoolsHeader> = {
  component: PoolsHeader,
  title: "PoolsHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    // children: "Button",
  },
};