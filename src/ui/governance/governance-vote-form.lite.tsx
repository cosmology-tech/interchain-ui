import { For, useStore, useMetadata } from "@builder.io/mitosis";
import { noop } from "lodash";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import Button from "../button";
import { fullWidth } from "../shared/shared.css";
import type {
  GovernanceVoteFormProps,
  GovernanceVoteType,
} from "./governance.types";

useMetadata({
  scaffolds: ["governance-radio", "governance-radio-group"],
  rsc: {
    componentType: "client",
  },
});

export default function GovernanceVoteForm(props: GovernanceVoteFormProps) {
  const state = useStore<{
    showRadios: boolean;
    selectedVote: GovernanceVoteType | undefined;
    getButtonLabel: () => string;
    getIsDisabled: () => boolean;
    shouldShowRadios: () => boolean;
    handleShowRadios: () => void;
    handleConfirm: () => void;
    handleVoteChange: (vote: GovernanceVoteType) => void;
  }>({
    showRadios: false,
    selectedVote: undefined,
    shouldShowRadios() {
      if (props.status === "expired" || props.status === "voted") {
        return true;
      }
      return state.showRadios;
    },
    getIsDisabled() {
      return (
        props.isDisabled ||
        props.status === "expired" ||
        props.status === "voted"
      );
    },
    getButtonLabel() {
      if (props.status === "pending" && state.showRadios) {
        return props.confirmButtonLabels.needsConfirm;
      }
      return props.confirmButtonLabels[props.status];
    },
    handleShowRadios() {
      state.showRadios = true;
    },
    handleConfirm() {
      if (!state.selectedVote) return;
      props.onConfirmVote(state.selectedVote);
    },
    handleVoteChange(vote: GovernanceVoteType) {
      state.selectedVote = vote;
    },
  });

  return (
    <Box
      className={props.className}
      {...props.attributes}
      backgroundColor="$cardBg"
      display="flex"
      flexDirection="column"
      gap="$10"
      p={{
        mobile: "$9",
        tablet: "$10",
        desktop: "$10",
      }}
      borderRadius="$lg"
    >
      {/* Time items */}
      <Box display="flex" justifyContent="space-between">
        <For each={props.timepoints}>
          {(timepoint) => (
            <Stack direction="vertical" space="$1">
              <Text
                color="$textSecondary"
                fontSize="$sm"
                fontWeight="$semibold"
              >
                {timepoint.label}
              </Text>
              <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
                {timepoint.timestamp}
              </Text>
            </Stack>
          )}
        </For>
      </Box>

      {/* Radios */}
      <Box display={state.shouldShowRadios() ? "block" : "none"}>
        {/* @ts-expect-error */}
        <GovernanceRadioGroup
          value={state.selectedVote}
          defaultValue={props.defaultVote}
          isDisabled={state.getIsDisabled()}
          onChange={(selected: GovernanceVoteType) =>
            state.handleVoteChange(selected as GovernanceVoteType)
          }
        >
          <Box
            display="flex"
            flexDirection={{
              mobile: "column",
              tablet: "row",
              desktop: "row",
            }}
            justifyContent={{
              mobile: "flex-start",
              tablet: "space-between",
              desktop: "flex-start",
            }}
            gap="$6"
          >
            {/* @ts-expect-error */}
            <ScaffoldGovernanceRadio value="yes">Yes</ScaffoldGovernanceRadio>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceRadio value="no">No</ScaffoldGovernanceRadio>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceRadio value="noWithVeto">
              No with veto
              {/* @ts-expect-error */}
            </ScaffoldGovernanceRadio>
            {/* @ts-expect-error */}
            <ScaffoldGovernanceRadio value="abstain">
              Abstain
              {/* @ts-expect-error */}
            </ScaffoldGovernanceRadio>
          </Box>
          {/* @ts-expect-error */}
        </GovernanceRadioGroup>
      </Box>

      {/* Submit button */}
      <Button
        variant="secondary"
        className={fullWidth}
        disabled={state.getIsDisabled()}
        onClick={() => {
          if (
            props.isDisabled ||
            props.status === "expired" ||
            props.status === "voted"
          ) {
            return noop();
          }

          if (props.status === "pending" && !state.showRadios) {
            return state.handleShowRadios();
          }

          if (state.showRadios) {
            return state.handleConfirm();
          }
        }}
      >
        {state.getButtonLabel()}
      </Button>
    </Box>
  );
}
