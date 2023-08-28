import type { Meta, StoryObj } from "@storybook/react";


import { StakingAssetHeader, Stack, Text, StakingClaimHeader, ValidatorList } from "../../src";

const meta: Meta = {
  title: "staking/Staking",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    assetHeader: {
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
      symbol: "JUNO",
      totalAmount: 232.2898,
      totalPrice: 1013,
      available: 89.231,
    },
    claimHeader: {
      stakedAmount: 232.2898,
      rewardsAmount: 232.2898,
      symbol: "JUNO",
    },
    selfValidators: [
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
    allValidators: [
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
  render: (props) => {
    return <Stack  direction="vertical" attributes={{maxWidth: "634px"}}>
    <Text fontSize="$xl" fontWeight="$semibold" >
      Staking
    </Text>
    <StakingAssetHeader {...props.assetHeader}
    />
    <StakingClaimHeader {...props.claimHeader}
    />
    <Text
      color="$textSecondary"
      fontSize="$lg"
      fontWeight="$semibold"
      attributes={{ marginBottom: "$9" }}
    >
      Your Validators
    </Text>
    <ValidatorList list={props.selfValidators} selfValidator={true} />
    <Text
      color="$textSecondary"
      fontSize="$lg"
      fontWeight="$semibold"
      attributes={{ my: "$12" }}
    >
      All Validators
    </Text>
    <ValidatorList list={props.allValidators} selfValidator={false} />
  </Stack>

  }
};

