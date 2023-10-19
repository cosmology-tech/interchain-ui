import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import CircularProgressBar from "../src/ui/circular-progress-bar";

const meta: Meta<typeof CircularProgressBar> = {
  component: CircularProgressBar,
  title: "CircularProgressBar",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary CircularProgressBar */
export const Primary: Story = {
  args: {
    progress: 50,
  },
};
