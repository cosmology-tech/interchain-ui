import type { Meta, StoryObj } from "@storybook/react";

import ValidatorListItem from "../../src/ui/validator-list-item";

const meta: Meta<typeof ValidatorListItem> = {
  component: ValidatorListItem,
  title: "staking/ValidatorListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    validatorName: "PUPMØS",
    validatorImg:
      "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
    stakedAmount: 154.757,
    rewardsAmount: 0.21,
    symbol: "JUNO",
  },
};
