import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import PoolsHeader from "../../src/ui/pools-header";
import { useMockData } from "../stub/mock-data-client";

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
  render: (props) => {
    const { isReady, assets } = useMockData();
    const item = assets.find((i) => i.symbol === "ATOM");

    if (!isReady) return <div>Loading ...</div>;

    return (
      <PoolsHeader
        {...props}
        tokenData={{
          title: "ATOM Price",
          price: "10.34",
          iconUrl: item?.imgSrc ?? "",
        }}
      />
    );
  },
};
