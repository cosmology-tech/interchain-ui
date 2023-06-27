import type { Meta, StoryObj } from "@storybook/react";

import { AssetItemTransfer } from "../../src";

const meta: Meta<typeof AssetItemTransfer> = {
  component: AssetItemTransfer,
  title: "Asset/AssetItemTransfer",
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
