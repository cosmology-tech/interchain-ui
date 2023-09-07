import type { Meta, StoryObj } from "@storybook/react";

import { ValidatorList } from "../../src";

const meta: Meta<typeof ValidatorList> = {
  component: ValidatorList,
  title: "staking/ValidatorList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    selfValidator: false,
    list: [
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
      {
        validatorName: "PUPMØS",
        validatorImg:
          "https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/osmosis/moniker/osmovaloper1zlymlax05tg9km9jyw496jx60v86m454a3xf3m.png",
        stakedAmount: 154.757,
        rewardsAmount: 0.21,
        symbol: "JUNO",
      },
    ],
  },
};
