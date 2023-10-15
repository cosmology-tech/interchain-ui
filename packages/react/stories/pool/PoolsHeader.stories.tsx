import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PoolsHeader } from "../../src";
import { getTransferList } from "../stub/assetData";

const meta: Meta<typeof PoolsHeader> = {
  component: PoolsHeader,
  title: "Pool/PoolsHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    tokenData: {
      title: "ATOM Price",
      price: "10.34",
      iconUrl: getTransferList().find((item) => item.symbol === "ATOM").imgSrc,
    },
    rewardCountdownData: {
      title: "Reward distribution in",
      hours: "12",
      minutes: "19",
      seconds: "48",
    },
    rewardData: {
      title: "Yesterday rewards",
      rewardAmount: "12.87",
      rewardTokenName: "ATOM",
      rewardNotionalValue: "120",
    },
  },
};
