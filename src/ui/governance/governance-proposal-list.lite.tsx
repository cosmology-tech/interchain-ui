import { For, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import GovernanceProposalItem from "./governance-proposal-item.lite";
import type { GovernanceProposalListProps } from "./governance.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function GovernanceProposalList(
  props: GovernanceProposalListProps
) {
  return (
    <For each={props.list}>
      {(proposalItem) => (
        <Box
          display="flex"
          flexDirection="column"
          gap={{
            mobile: "$10",
            tablet: "$12",
            desktop: "$12",
          }}
          paddingBottom={{
            mobile: "$10",
            tablet: "$12",
            desktop: "$12",
          }}
        >
          <Text
            color="$textSecondary"
            fontSize={{
              mobile: "$md",
              tablet: "$lg",
              desktop: "$lg",
            }}
            fontWeight="$semibold"
          >
            {proposalItem.title}
          </Text>
          <For each={proposalItem.proposals}>
            {(proposal) => (
              <GovernanceProposalItem
                status={proposal.status}
                title={proposal.title}
                id={proposal.id}
                endTime={proposal.endTime}
                endTimeLabel={proposal.endTimeLabel}
                votes={proposal.votes}
              />
            )}
          </For>
        </Box>
      )}
    </For>
  );
}
