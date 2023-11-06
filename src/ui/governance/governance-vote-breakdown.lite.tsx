import { useStore, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import type { Sprinkles } from "../../styles/rainbow-sprinkles.css";
import type {
  GovernanceVoteBreakdownProps,
  GovernanceVoteType,
} from "./governance.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function GovernanceVoteBreakdown(
  props: GovernanceVoteBreakdownProps
) {
  const state = useStore({
    getMeterColor() {
      const COLORS: Record<GovernanceVoteType, Sprinkles["color"]> = {
        yes: "$green200",
        no: "#FE4A4A",
        abstain: "#486A94",
        noWithVeto: "#8F2828",
      };
      return COLORS[props.voteType];
    },
  });
  return (
    <Box
      className={props.className}
      {...props.attributes}
      display="flex"
      flexDirection="column"
      width="100%"
    >
      {/* Titles */}
      <Stack
        direction="horizontal"
        attributes={{
          justifyContent: "space-between",
          marginBottom: "$6",
        }}
      >
        <Text color="$text" fontSize="$md" fontWeight="$semibold">
          {props.title}
        </Text>
        <Text color="$text" fontSize="$md" fontWeight="$semibold">
          {`${props.votePercentage}%`}
        </Text>
      </Stack>

      {/* Meter */}
      <Box
        backgroundColor="$inputBg"
        width="100%"
        height="$4"
        borderRadius="$base"
        marginBottom="$4"
      >
        <Box
          backgroundColor={state.getMeterColor()}
          height="$4"
          width={`${props.votePercentage}%`}
          borderTopLeftRadius="4px"
          borderBottomLeftRadius="4px"
          borderTopRightRadius={props.votePercentage === 100 ? "4px" : "0px"}
          borderBottomRightRadius={props.votePercentage === 100 ? "4px" : "0px"}
        />
      </Box>

      {/* Description */}
      <Text fontSize="$xs" fontWeight="$normal" color="$textSecondary">
        {props.description}
      </Text>
    </Box>
  );
}
