import type { Meta, StoryObj } from "@storybook/react";

import { SwapPrice } from "../../src";

const meta: Meta<typeof SwapPrice> = {
  component: SwapPrice,
  title: "swap/SwapPrice",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapPrice */
export const Primary: Story = {
  args: {
  },
};
