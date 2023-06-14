import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetListHeader } from "../../src";

const meta: Meta<typeof AssetListHeader> = {
  component: AssetListHeader,
  title: "Asset/asset-list-header",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isSingle: false,
    total: "144.23",
    totalOnAll: "732.16",
    canDeposit: true,
    canWithdraw: true,
  },
};
