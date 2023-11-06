import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import GovernanceVoteBreakdown from "../../src/ui/governance/governance-vote-breakdown";

const meta: Meta<typeof GovernanceVoteBreakdown> = {
  component: GovernanceVoteBreakdown,
  title: "Governance/GovernanceVoteBreakdown",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    return (
      <Box display="flex" flexDirection="column" gap="$4">
        <GovernanceVoteBreakdown
          voteType="yes"
          title="Yes"
          votePercentage={62.77}
          description="37925656.25 OSMO"
        />
        <GovernanceVoteBreakdown
          voteType="abstain"
          title="Abstain"
          votePercentage={24.47}
          description="14787405.06 OSMO"
        />
        <GovernanceVoteBreakdown
          voteType="no"
          title="No"
          votePercentage={12.43}
          description="7510335.74 OSMO"
        />
        <GovernanceVoteBreakdown
          voteType="noWithVeto"
          title="No with veto"
          votePercentage={0.33}
          description="7510335.74 OSMO"
        />
      </Box>
    );
  },
};
