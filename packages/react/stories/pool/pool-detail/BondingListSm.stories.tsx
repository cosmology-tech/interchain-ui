import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BondingListSm from "../../../src/ui/bonding-list-sm";

const meta: Meta<typeof BondingListSm> = {
  component: BondingListSm,
  title: "Pool/PoolDetail/BondingListSm",
  tags: ["autodocs"],
  argTypes: {},
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
        bondedValue: 0.33,
        bondedShares: 0.58,
        totalApr: "2.46",
        onBond() {
          console.log("onBond");
        },
        onUnbond() {
          console.log("onUnbond");
        },
      },
      {
        title: "Bonded 7 days",
        bondedValue: 1.33,
        bondedShares: 1.58,
        totalApr: "1.46",
        onBond() {
          console.log("onBond");
        },
        onUnbond() {
          console.log("onUnbond");
        },
      },
      {
        title: "Bonded 14 days",
        bondedValue: 3.33,
        bondedShares: 3.58,
        totalApr: "3.46",
        onBond() {
          console.log("onBond");
        },
        onUnbond() {
          console.log("onUnbond");
        },
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
