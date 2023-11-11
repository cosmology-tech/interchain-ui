import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getTransferList } from "./stub/assetData";

import TransferItem from "../src/ui/transfer-item";

const meta: Meta<typeof TransferItem> = {
  component: TransferItem,
  title: "TransferItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary TransferItem */
export const Primary: Story = {
  args: {
    title: "From",
    maxBtn: true,
    hasAvailable: true,
  },
  render: (props) => {
    return <TransferItem {...props} dropDownList={getTransferList()} />;
  },
};
