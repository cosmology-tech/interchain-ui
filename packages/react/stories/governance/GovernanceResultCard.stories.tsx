import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import GovernanceResultCard from "../../src/ui/governance/governance-result-card";

const meta: Meta<typeof GovernanceResultCard> = {
  component: GovernanceResultCard,
  title: "Governance/GovernanceResultCard",
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
        <GovernanceResultCard
          resultType="passed"
          label="Passed"
          votePercentage={62.77}
        />
        <GovernanceResultCard
          resultType="rejected"
          label="Rejected"
          votePercentage={62.77}
        />
        <GovernanceResultCard
          resultType="info"
          label="Turnout"
          votePercentage={23.55}
        />
      </Box>
    );
  },
};
