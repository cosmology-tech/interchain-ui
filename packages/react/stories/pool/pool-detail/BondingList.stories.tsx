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
        onUnbond() {
          console.log("onUnbond======");
          return new Promise(function (resolve) {
            setTimeout(() => {
              resolve({
                type: "success",
                title: "bond success",
              });
            }, 2000);
          });
        },
      },
      {
        title: "7 days",
        totalApr: "2.43",
        amount: 59075,
        superfluidApr: "24",
        onUnbond() {
          console.log("onUnbond======");
          return new Promise(function (resolve) {
            setTimeout(() => {
              resolve({
                type: "success",
                title: "bond success",
              });
            }, 2000);
          });
        },
      },
      {
        title: "14 days",
        totalApr: "2.43",
        amount: 59075,
        superfluidApr: "24",
        onUnbond() {
          console.log("onUnbond======");
          return new Promise(function (resolve) {
            setTimeout(() => {
              resolve({
                type: "success",
                title: "bond success",
              });
            }, 2000);
          });
        },
      },
    ],
  },
  render: (props) => (
    <div style={{ minWidth: 720 }}>
      <BondingList list={props.list} />
    </div>
  ),
};
