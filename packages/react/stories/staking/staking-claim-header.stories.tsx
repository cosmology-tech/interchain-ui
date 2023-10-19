import type { Meta, StoryObj } from "@storybook/react";

import StakingClaimHeader from "../../src/ui/staking-claim-header";

const meta: Meta<typeof StakingClaimHeader> = {
  component: StakingClaimHeader,
  title: "staking/StakingClaimHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    stakedAmount: 232.2898,
    rewardsAmount: 232.2898,
    symbol: "JUNO",
  },
};
