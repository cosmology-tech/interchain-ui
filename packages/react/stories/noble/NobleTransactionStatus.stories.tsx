import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

// ==== Noble components
import NobleProvider from "../../src/ui/noble/noble-provider";
import NobleTxProgressBar from "../../src/ui/noble/noble-tx-progress-bar";
import NobleTxDirectionCard from "../../src/ui/noble/noble-tx-direction-card";

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
        <NobleTxProgressBar progress={50} width="600px" my="$10" />
      </NobleProvider>
    );
  },
};
