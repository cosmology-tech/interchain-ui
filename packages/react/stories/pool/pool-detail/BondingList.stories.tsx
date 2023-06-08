import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingList } from "../../../src";

const meta: Meta<typeof BondingList> = {
  component: BondingList,
  title: "Pool/pool-detail/bonding-list",
  tags: ["autodocs"],
  argTypes: {
    list: {
      description: "List of bonding item",
      table: {
        type: {
          summary: "BondingListItem []",
          detail: `{
    title: string;
    apr: string;
    amount: number;
    per: string;
}
`,
        },
      },
    },
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
        apr: "2.43%",
        amount: 59075,
        per: "24%",
      },
      {
        title: "7 days",
        apr: "2.43%",
        amount: 59075,
        per: "24%",
      },
      {
        title: "14 days",
        apr: "2.43%",
        amount: 59075,
        per: "24%",
      },
    ],
  },
  render: (props) => (
    <div style={{ minWidth: 720 }}>
      <BondingList list={props.list} />
    </div>
  ),
};
