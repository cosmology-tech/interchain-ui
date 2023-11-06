import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Box from "../../src/ui/box";
import Stack from "../../src/ui/stack";
import Icon from "../../src/ui/icon";
import Link from "../../src/ui/link";
import GovernanceVoteForm from "../../src/ui/governance/governance-vote-form";
import GovernanceVoteBreakdown from "../../src/ui/governance/governance-vote-breakdown";
import GovernanceResultCard from "../../src/ui/governance/governance-result-card";

const meta: Meta<typeof BasicModal> = {
  component: BasicModal,
  title: "Governance/GovernanceVoteProposalModal",
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
      <div>
        <BasicModal
          renderTrigger={(triggerProps = {}) => (
            <Button {...triggerProps} onClick={() => setIsOpen(true)}>
              open
            </Button>
          )}
          isOpen={isOpen}
          title="#120 Signaling Proposal: Ion 🧿 DAO & Treasury"
          onClose={() => setIsOpen(false)}
        >
          <Box minWidth="640px">
            {/* Form */}
            <Box py="$12">
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

            {/* Details title */}
            <Stack
              direction="vertical"
              space="$6"
              attributes={{
                marginBottom: "$12",
              }}
            >
              <Text
                color="$textSecondary"
                fontSize="$lg"
                fontWeight="$semibold"
              >
                Vote Details
              </Text>
              <Text
                color="$textSecondary"
                fontSize="$xs"
                fontWeight="$normal"
                attributes={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="informationLine"
                  color="$textSecondary"
                  size="$sm"
                  attributes={{
                    marginRight: "$2",
                  }}
                />
                Minimum of staked
                <Text
                  as="span"
                  color="inherit"
                  fontWeight="$semibold"
                  fontSize="$xs"
                  attributes={{
                    px: "$2",
                  }}
                >
                  51307581.582378 OSMO (20%)
                </Text>
                need to vote for this proposal to pass.
              </Text>
            </Stack>

            {/* Details */}
            <Box display="flex" gap="$17" marginBottom="$12">
              <Box display="flex" flex="1" flexDirection="column" gap="$4">
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
              <Box display="flex" flexDirection="column" gap="$12">
                <GovernanceResultCard
                  resultType="passed"
                  label="Passed"
                  votePercentage={62.77}
                />
                <GovernanceResultCard
                  resultType="info"
                  label="Turnout"
                  votePercentage={23.55}
                />
              </Box>
            </Box>

            {/* Description */}
            <Box>
              <Text
                color="$textSecondary"
                fontSize="$lg"
                fontWeight="$semibold"
                attributes={{
                  marginBottom: "$8",
                }}
              >
                Description
              </Text>

              <Stack
                direction="horizontal"
                space="$8"
                attributes={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "$8",
                }}
              >
                <Text
                  color="$textSecondary"
                  fontSize="$sm"
                  fontWeight="$semibold"
                >
                  Commonwealth Discussion Thread:
                </Text>

                <Link
                  background
                  underline
                  href={"https://gov.osmosis.zone"}
                  target="_blank"
                  color={{
                    base: "$textSecondary",
                    hover: "$linkHover",
                  }}
                  attributes={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: "1",
                  }}
                >
                  <span>https://gov.osmosis.zone/discussion/5126...</span>
                  <Icon
                    name="externalLinkLine"
                    color="inherit"
                    size="$sm"
                    attributes={{
                      marginLeft: "$4",
                    }}
                  />
                </Link>
              </Stack>

              <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
                At the moment, an ION Dao does not yet exist, as there is no
                coder for this mechanism...
              </Text>

              <Box width="100%" display="flex" justifyContent="center">
                <Button intent="secondary" variant="ghost">
                  Read more
                </Button>
              </Box>
            </Box>
          </Box>
        </BasicModal>
      </div>
    );
  },
};
