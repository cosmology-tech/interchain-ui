import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from "../../src/ui/stack";
import Box from "../../src/ui/box";

// ==== Noble components
import NobleProvider from "../../src/ui/noble/noble-provider";
import NobleTxProgressBar from "../../src/ui/noble/noble-tx-progress-bar";
import NobleTxDirectionCard from "../../src/ui/noble/noble-tx-direction-card";
import NobleTxStepItem from "../../src/ui/noble/noble-tx-step-item";

const meta: Meta<typeof NobleProvider> = {
  component: NobleProvider,
  title: "noble/NobleTransactionStatus",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {},
  render: (props) => {
    return (
      <NobleProvider>
        <NobleTxDirectionCard
          direction="From"
          chainName="Osmosis"
          address="osmo1ja4n6sd5sbpkl9ze27ejsllen8hx42l2dz752d"
          logoUrl="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png"
        />
        <Box bg="$cardBg" p="$12" borderRadius="$2xl" my="$10">
          <NobleTxProgressBar progress={50} width="600px" mb="$10" />
          <Stack direction="vertical" space="14px">
            <NobleTxStepItem status="completed" step="Burn on Ethereum" />
            <NobleTxStepItem status="processing" step="Mint on Noble" />
            <NobleTxStepItem status="pending" step="Transfer to Osmosis" />
          </Stack>
        </Box>
      </NobleProvider>
    );
  },
};
