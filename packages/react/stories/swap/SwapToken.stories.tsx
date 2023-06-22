import type { Meta, StoryObj } from "@storybook/react";

import { SwapToken } from "../../src";

const meta: Meta<typeof SwapToken> = {
  component: SwapToken,
  title: "swap/SwapToken",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
  },
};
