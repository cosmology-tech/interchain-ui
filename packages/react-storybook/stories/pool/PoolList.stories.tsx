import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolList } from "@cosmology-ui/react";

const meta: Meta<typeof PoolList> = {
  component: PoolList,
  title: "Pool/PoolList",
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
