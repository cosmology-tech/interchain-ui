import {
  Show,
  useDefaultProps,
  useStore,
  useMetadata,
} from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import Divider from "../divider";
import Tooltip from "../tooltip";
import type {
  GovernanceProposalItemProps,
  GovernanceProposalStatus,
  GovernanceVoteType,
} from "./governance.types";

useMetadata({
  scaffolds: ["governance-checkbox"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<GovernanceProposalItemProps>>({
  endTimeLabel: "Voting end time",
});

export default function GovernanceProposalItem(
  props: GovernanceProposalItemProps
) {
  const state = useStore({
    getStatusLabel: () => {
      if (typeof props.statusLabel === "string") {
        return props.statusLabel;
      }
      const defaultLabels: Record<GovernanceProposalStatus, string> = {
        pending: "Pending",
        passed: "Passed",
        rejected: "Rejected",
      };

      return defaultLabels[props.status];
    },
    getWidthFor: (voteKind: GovernanceVoteType) => {
      const total =
        props.votes.abstain +
        props.votes.no +
        props.votes.noWithVeto +
        props.votes.yes;
      return `${(props.votes[voteKind] / total) * 100}%`;
    },
  });

  return (
    <Box
      className={props.className}
      {...props.attributes}
      borderRadius="$lg"
      borderColor="$inputBorder"
      borderStyle="$solid"
      borderWidth="$sm"
      minHeight={{
        tablet: "104px",
      }}
      px={{
        mobile: "$9",
        tablet: "$12",
      }}
      py={{
        mobile: "$6",
        tablet: "$10",
      }}
      attributes={{
        "data-part-id": "root",
      }}
    >
      <Box
        display="flex"
        flexDirection={{
          mobile: "column",
          tablet: "row",
          desktop: "row",
        }}
        justifyContent="flex-start"
        alignItems={{
          mobile: "flex-start",
          tablet: "center",
          desktop: "center",
        }}
        gap="$10"
        height="100%"
        minWidth="$0"
        attributes={{
          "data-part-id": "content",
        }}
      >
        {/* Desktop Checkbox */}
        <Box
          display={{
            mobile: "none",
            tablet: "block",
            desktop: "block",
          }}
          flexShrink="0"
          width="84px"
          attributes={{
            "data-part-id": "checkboxes",
          }}
        >
          <Show when={props.status === "pending"}>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceCheckbox isIndeterminate>
              {state.getStatusLabel()}
              {/* @ts-expect-error */}
            </ScaffoldGovernanceCheckbox>
          </Show>

          <Show when={props.status === "passed"}>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceCheckbox isSelected>
              {state.getStatusLabel()}
              {/* @ts-expect-error */}
            </ScaffoldGovernanceCheckbox>
          </Show>

          <Show when={props.status === "rejected"}>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceCheckbox isRejected>
              {state.getStatusLabel()}
              {/* @ts-expect-error */}
            </ScaffoldGovernanceCheckbox>
          </Show>
        </Box>

        {/* Mid info section */}
        <Stack
          direction="horizontal"
          space="$10"
          attributes={{
            width: {
              mobile: "100%",
              tablet: "auto",
              desktop: "auto",
            },
            flex: 1,
            overflow: "hidden",
            justifyContent: "flex-start",
            alignItems: {
              mobile: "flex-start",
              tablet: "center",
              desktop: "center",
            },
            // @ts-expect-error
            "data-part-id": "mid",
          }}
        >
          <Stack
            direction="vertical"
            space="$2"
            attributes={{
              display: {
                mobile: "flex",
                tablet: "none",
                desktop: "none",
              },
            }}
          >
            {/* Mobile Checkbox */}
            <Box flexShrink="0" width="84px">
              <Show when={props.status === "pending"}>
                {/* @ts-expect-error */}
                <ScaffoldGovernanceCheckbox isIndeterminate>
                  {state.getStatusLabel()}
                  {/* @ts-expect-error */}
                </ScaffoldGovernanceCheckbox>
              </Show>

              <Show when={props.status === "passed"}>
                {/* @ts-expect-error */}
                <ScaffoldGovernanceCheckbox isSelected>
                  {state.getStatusLabel()}
                  {/* @ts-expect-error */}
                </ScaffoldGovernanceCheckbox>
              </Show>

              <Show when={props.status === "rejected"}>
                {/* @ts-expect-error */}
                <ScaffoldGovernanceCheckbox isRejected>
                  {state.getStatusLabel()}
                  {/* @ts-expect-error */}
                </ScaffoldGovernanceCheckbox>
              </Show>
            </Box>

            {/* Mobile voting end time */}
            <Stack
              direction="vertical"
              space="$1"
              attributes={{
                flexGrow: "0",
              }}
            >
              <Text color="$textSecondary" fontSize="$2xs" fontWeight="$normal">
                {props.endTime}
              </Text>
            </Stack>
          </Stack>

          {/* Vertical Divider */}
          <Box
            display={{
              mobile: "none",
              tablet: "flex",
              desktop: "flex",
            }}
            alignItems="center"
            justifyContent="center"
            height="44px"
          >
            <Divider orientation="vertical" />
          </Box>

          {/* Titles */}
          <Stack
            direction="vertical"
            space="$4"
            attributes={{
              width: "100%",
            }}
          >
            <Text
              as={typeof props.title === "string" ? "p" : "div"}
              color="$text"
              fontSize="$sm"
              fontWeight="$normal"
              attributes={{
                whiteSpace: "pre-wrap",
              }}
            >
              {props.title}
            </Text>

            <Show when={props.id}>
              <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
                {props.id}
              </Text>
            </Show>

            {/* Vote structure meter */}
            <Box
              backgroundColor="transparent"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1px"
              height="$2"
              width="100%"
            >
              <Box
                height="$2"
                backgroundColor="$green200"
                width={state.getWidthFor("yes")}
                borderTopLeftRadius="4px"
                borderBottomLeftRadius="4px"
              >
                <Tooltip title="Yes" placement="bottom">
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
              <Box
                height="$2"
                backgroundColor="#486A94"
                width={state.getWidthFor("abstain")}
              >
                <Tooltip title="Abstain" placement="bottom">
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>

              <Box
                height="$2"
                backgroundColor="$red600"
                width={state.getWidthFor("no")}
              >
                <Tooltip title="No" placement="bottom">
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>

              <Box
                height="$2"
                backgroundColor="$inputBorder"
                width={state.getWidthFor("noWithVeto")}
                borderTopRightRadius="4px"
                borderBottomRightRadius="4px"
              >
                <Tooltip title="No with veto" placement="bottom">
                  <Box backgroundColor="transparent" width="100%" height="$2" />
                </Tooltip>
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* Desktop voting end time */}
        <Stack
          direction="vertical"
          space="$1"
          attributes={{
            display: {
              mobile: "none",
              tablet: "flex",
              desktop: "flex",
            },
            flexGrow: "0",
          }}
        >
          <Text color="$textSecondary" fontSize="$sm" fontWeight="$semibold">
            {props.endTimeLabel}
          </Text>
          <Text color="$textSecondary" fontSize="$xs" fontWeight="$normal">
            {props.endTime}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
