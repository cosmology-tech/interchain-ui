import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import GovernanceVoteForm from "../../src/ui/governance/governance-vote-form";

const meta: Meta<typeof GovernanceVoteForm> = {
  component: GovernanceVoteForm,
  title: "Governance/GovernanceVoteForm",
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
        <GovernanceVoteForm
          status="pending"
          timepoints={[
            {
              label: "Submit Time",
              timestamp: "2022-01-07 03:04:27",
            },
            {
              label: "Voting Starts",
              timestamp: "2022-01-07 03:04:27",
            },
            {
              label: "Voting Ends",
              timestamp: "2022-01-07 03:04:27",
            },
          ]}
          radioLabels={{
            yes: "Yes",
            abstain: "Abstain",
            no: "No",
            noWithVeto: "No with veto",
          }}
          confirmButtonLabels={{
            pending: "Submit your vote",
            needsConfirm: "Confirm vote",
            expired: "Proposal expired",
            voted: "You already voted",
          }}
          onConfirmVote={(vote) => {
            console.log("you just voted: ", vote);
          }}
        />
      </Box>
    );
  },
};
