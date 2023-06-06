import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "../src";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "ProgressBar",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary ProgressBar */
export const Primary: Story = {
  args: {
    progress: 50,
  },
};
