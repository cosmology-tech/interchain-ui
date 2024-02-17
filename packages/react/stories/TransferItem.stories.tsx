import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useMockData } from "./stub/mock-data-client";

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
    halfBtn: true,
    hasAvailable: true,
  },
  render: (props) => {
    const { assets } = useMockData();
    const [amountStaked, setAmountStaked] = React.useState<number>(0);

    return (
      <TransferItem
        {...props}
        placeholder="Select chain"
        dropdownList={assets}
        amount={amountStaked}
        onChange={(item, amount) => {
          setAmountStaked(amount);
        }}
      />
    );
  },
};
