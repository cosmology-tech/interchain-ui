import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BondingCardList } from "../../../src";

const meta: Meta<typeof BondingCardList> = {
  component: BondingCardList,
  title: "Pool/PoolDetail/BondingCardList",
  tags: ["autodocs"],
  argTypes: {
    list: {
      description: "List of pool item",
      table: {
        type: {
          summary: "BondingCardProps []",
          detail: `{
              title: string;
              value: string;
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
        title: "a day bonding",
        value: "20.24",
      },
      {
        title: "7 days",
        value: "32.39",
      },
      {
        title: "14 days",
        value: "40.49",
      },
    ],
  },
  render: (props) => (
    <div style={{ minWidth: 720 }}>
      <BondingCardList list={props.list} />
    </div>
  ),
};
