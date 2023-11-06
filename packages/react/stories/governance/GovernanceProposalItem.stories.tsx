import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import GovernanceProposalItem from "../../src/ui/governance/governance-proposal-item";

const meta: Meta<typeof GovernanceProposalItem> = {
  component: GovernanceProposalItem,
  title: "Governance/GovernanceProposalItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Box display="flex" flexDirection="column" gap="$4">
        <GovernanceProposalItem
          status="pending"
          title="Signaling Proposal: Ion 🧿 DAO & Treasury"
          id="#00120"
          endTime="2022-01-11 10:48"
          votes={{
            yes: 500,
            no: 678,
            abstain: 45,
            noWithVeto: 34,
          }}
        />
        <GovernanceProposalItem
          status="passed"
          title="Signaling Proposal: Ion 🧿 DAO & Treasury"
          id="#00120"
          endTime="2022-01-11 10:48"
          votes={{
            yes: 650,
            no: 200,
            abstain: 400,
            noWithVeto: 34,
          }}
        />
        <GovernanceProposalItem
          status="rejected"
          title="Signaling Proposal: Ion 🧿 DAO & Treasury"
          id="#00120"
          endTime="2022-01-11 10:48"
          votes={{
            yes: 245,
            no: 777,
            abstain: 100,
            noWithVeto: 560,
          }}
        />
      </Box>
    );
  },
};
