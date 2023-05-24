import type { Meta, StoryObj } from "@storybook/react";

import { PoolsHeader, PoolList, PoolListItem } from "@cosmology-ui/react";

const meta: Meta<typeof PoolList> = {
  component: PoolList,
  title: "Pool/LiquidityPools",
  // tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  render: () => {
    return (
      <div style={{padding: 20}}>
        <PoolsHeader />
        <PoolList />
      </div>
    )
  }
};
