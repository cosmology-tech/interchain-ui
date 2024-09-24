import { useMetadata, useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import type { StakingClaimHeaderProps } from "./staking-claim-header.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StakingClaimHeaderProps>>({
  stakedLabel: "Staked",
  claimRewardsLabel: "Claimable Rewards",
  claimLabel: "Claim",
});

export default function StakingClaimHeader(props: StakingClaimHeaderProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        mobile: "repeat(1, 1fr)",
        tablet: "repeat(2, minmax(310px, 1fr))",
        desktop: "repeat(2, minmax(310px, 1fr))",
      }}
      gap="$8"
      className={props.className}
      {...props.attributes}
    >
      <Stack
        direction="vertical"
        attributes={{
          minHeight: "$19",
          px: "$8",
          py: "$7",
          backgroundColor: "$cardBg",
          borderRadius: "$lg",
        }}
      >
        <Stack space="$4">
          <Icon name="lock" color="$textSecondary" />
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.stakedLabel}
          </Text>
        </Stack>
        <Text
          fontSize="$lg"
          fontWeight="$semibold"
          attributes={{ marginTop: "$5", marginBottom: "$2" }}
        >
          {props.stakedAmount}
        </Text>
        <Text color="$textSecondary" fontWeight="$semibold">
          {props.symbol}
        </Text>
      </Stack>

      <Stack
        direction="horizontal"
        attributes={{
          minHeight: "$19",
          justifyContent: "space-between",
          alignItems: "flex-end",
          px: "$8",
          py: "$7",
          backgroundColor: "$rewardBg",
          borderRadius: "$lg",
        }}
      >
        <Stack direction="vertical">
          <Stack space="$4">
            <Icon name="bardFill" color="$rewardContent" />
            <Text color="$rewardContent" fontWeight="$semibold">
              {props.claimRewardsLabel}
            </Text>
          </Stack>
          <Text
            fontSize="$lg"
            fontWeight="$semibold"
            color="$rewardContent"
            attributes={{ marginTop: "$5", marginBottom: "$2" }}
          >
            {props.rewardsAmount}
          </Text>
          <Text color="$rewardContent" fontWeight="$semibold">
            {props.symbol}
          </Text>
        </Stack>

        <Button
          variant="secondary"
          disabled={props.isDisabled}
          isLoading={props.isLoading}
          onClick={() => {
            if (props.isDisabled) return;
            props?.onClaim?.();
          }}
        >
          <Box as="span" minWidth="$19">
            {props.claimLabel}
          </Box>
        </Button>
      </Stack>
    </Box>
  );
}
