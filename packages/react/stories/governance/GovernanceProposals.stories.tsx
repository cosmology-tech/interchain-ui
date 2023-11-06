import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Tabs from "../../src/ui/tabs";
import Text from "../../src/ui/text";
import GovernanceProposalList from "../../src/ui/governance/governance-proposal-list";
import type { GovernanceProposalList as GovernanceProposalListData } from "../../src/ui/governance/governance.types";

const meta: Meta<typeof GovernanceProposalList> = {
  component: GovernanceProposalList,
  title: "Governance/GovernanceProposals",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const proposalListData: GovernanceProposalListData = [
  {
    title: "May",
    proposals: [
      {
        status: "passed",
        title: "Signaling Proposal: Ion 🧿 DAO & Treasury",
        id: "#00121",
        endTime: "2022-01-11 10:48",
        votes: {
          yes: 650,
          no: 200,
          abstain: 400,
          noWithVeto: 34,
        },
      },
    ],
  },
  {
    title: "June",
    proposals: [
      {
        status: "pending",
        title: "Signaling Proposal: Ion 🧿 DAO & Treasury",
        id: "#00120",
        endTime: "2022-01-11 10:48",
        votes: {
          yes: 500,
          no: 678,
          abstain: 45,
          noWithVeto: 34,
        },
      },
      {
        status: "passed",
        title: "Signaling Proposal: Ion 🧿 DAO & Treasury",
        id: "#00121",
        endTime: "2022-01-11 10:48",
        votes: {
          yes: 650,
          no: 200,
          abstain: 400,
          noWithVeto: 34,
        },
      },
      {
        status: "rejected",
        title: "Signaling Proposal: Ion 🧿 DAO & Treasury",
        id: "#00122",
        endTime: "2022-01-11 10:48",
        votes: {
          yes: 245,
          no: 777,
          abstain: 100,
          noWithVeto: 560,
        },
      },
    ],
  },
];

export const Primary: Story = {
  args: {},
  render: (props) => {
    const proposalsRender = React.useMemo(
      () => <GovernanceProposalList list={proposalListData} />,
      [proposalListData]
    );

    return (
      <Box display="flex" flexDirection="column">
        <Text
          color="$text"
          fontSize="$lg"
          fontWeight="$semibold"
          attributes={{
            marginBottom: "$10",
          }}
        >
          Proposals
        </Text>

        <Tabs
          tabs={[
            {
              label: "All",
              Component: () => proposalsRender,
            },
            {
              label: "Pending",
              Component: () => proposalsRender,
            },
            {
              label: "Passed",
              Component: () => proposalsRender,
            },
            {
              label: "Rejected",
              Component: () => proposalsRender,
            },
          ]}
        />
      </Box>
    );
  },
};
