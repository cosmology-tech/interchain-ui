import type { Meta, StoryObj } from "@storybook/react";

import { BondingArea } from "../../../src";

const meta: Meta<typeof BondingArea> = {
  component: BondingArea,
  title: "Pool/PoolDetail/BondingArea",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    bondingCardList: [
      {
        title: "a day bonding",
        value: "20.24%",
      },
      {
        title: "7 days",
        value: "32.39%",
      },
      {
        title: "14 days",
        value: "40.49%",
      },
    ],
    bondingList: [
      {
        title: "A day",
        apr: "2.43",
        amount: 59075,
        per: "24%",
      },
      {
        title: "7 days",
        apr: "2.43",
        amount: 59075,
        per: "24%",
      },
      {
        title: "14 days",
        apr: "2.43",
        amount: 59075,
        per: "24%",
      },
    ],
    bondingListSm: {
      unbondedAmt: 0.4,
      unbondedShares: 2.1792,
      list: [
        {
          title: "Bonded 1 day",
          amount: 0.33,
          poolShares: 0,
          apr: "2.46",
        },
        {
          title: "Bonded 7 days",
          amount: 0.33,
          poolShares: 0,
          apr: "2.46",
        },
        {
          title: "Bonded 14 days",
          amount: 0.33,
          poolShares: 0,
          apr: "2.46",
        },
      ],
    },
  },
};
