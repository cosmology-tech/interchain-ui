import type { Meta, StoryObj } from "@storybook/react";

import { OverviewTransfer } from "../../src";

const meta: Meta<typeof OverviewTransfer> = {
  component: OverviewTransfer,
  title: "Asset/OverviewTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  type: "Withdraw"
  },
};
