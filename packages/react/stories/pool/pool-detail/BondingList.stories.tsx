import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingList } from "../../../src";

const meta: Meta<typeof BondingList> = {
  component: BondingList,
  title: "Pool/PoolDetail/BondingList",
  tags: ["autodocs"],
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    list: [
      {
        title: "A day",
        totalApr: "2.43",
        amount: 59075,
        superfluidApr: "24",
        onUnbond: () => console.log("unbond - a day")
      },
      {
        title: "7 days",
        totalApr: "2.43",
        amount: 59075,
        superfluidApr: "24",
        onUnbond: () => console.log("unbond - 7 days")
      },
      {
        title: "14 days",
        totalApr: "2.43",
        amount: 59075,
        superfluidApr: "24",
        onUnbond: () => console.log("unbond - 14 days")
      },
    ],
  },
  render: (props) => (
    <div style={{ minWidth: 720 }}>
      <BondingList list={props.list} />
    </div>
  ),
};
