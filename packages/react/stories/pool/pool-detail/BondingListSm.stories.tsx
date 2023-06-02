import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingListSm } from "../../../src";

const meta: Meta<typeof BondingListSm> = {
  component: BondingListSm,
  title: "Pool/pool-detail/bonding-list-sm",
  tags: ["autodocs"],
  argTypes: {
    list: {
      description: "List of sm bonding item",
      table: {
        type: {
          summary: "BondingListSmItem []",
          detail: `{
      title: string;
      amount: number;
      poolShares: number;
      apr: string;
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
    unbondedAmt: 0.4,
    unbondedShares: 2.1792,
    list: [
      {
        title: "Bonded 1 day",
        amount: 0.33,
        poolShares: 0,
        apr: "2.46%",
      },
      {
        title: "Bonded 7 days",
        amount: 0.33,
        poolShares: 0,
        apr: "2.46%",
      },
      {
        title: "Bonded 14 days",
        amount: 0.33,
        poolShares: 0,
        apr: "2.46%",
      },
    ],
  },
  render: (props) => (
    <div style={{ maxWidth: 382 }}>
      <BondingListSm
        list={props.list}
        unbondedAmt={props.unbondedAmt}
        unbondedShares={props.unbondedShares}
      />
    </div>
  ),
};
