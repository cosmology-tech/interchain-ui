import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AssetListHeader } from "../../src";
import { AvailableItem } from "../../src/ui/transfer-item/transfer-item.types";

const meta: Meta<typeof AssetListHeader> = {
  component: AssetListHeader,
  title: "Asset/AssetListHeader",
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
    onDeposit: () => {
      console.log("onDeposit");
    },
    onWithdraw: () => {
      console.log("onWithdraw");
    },
  },
};
