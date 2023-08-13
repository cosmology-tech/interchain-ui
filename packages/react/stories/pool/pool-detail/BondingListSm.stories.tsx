import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingListSm } from "../../../src";

const meta: Meta<typeof BondingListSm> = {
  component: BondingListSm,
  title: "Pool/PoolDetail/BondingListSm",
  tags: ["autodocs"],
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    unbondedBalance: "0.4",
    unbondedShares: "2.1792",
    list: [
      {
        title: "Bonded 1 day",
        bondedValue: 0,
        bondedShares: 1.57,
        totalApr: "2.46",
      },
      {
        title: "Bonded 7 days",
        bondedValue: 2.68,
        bondedShares: 3.89,
        totalApr: "8.46",
      },
      {
        title: "Bonded 14 days",
        bondedValue: 5.33,
        bondedShares: 9.76,
        totalApr: "7.46",
      },
    ],
  },
  render: (props) => (
    <div style={{ maxWidth: 382 }}>
      <BondingListSm
        list={props.list}
        unbondedBalance={props.unbondedBalance}
        unbondedShares={props.unbondedShares}
      />
    </div>
  ),
};
