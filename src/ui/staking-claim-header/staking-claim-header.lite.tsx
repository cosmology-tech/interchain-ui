import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import * as styles from "./staking-claim-header.css";
import { StakingClaimHeaderProps } from "./staking-claim-header.types";

export default function StakingClaimHeader(props: StakingClaimHeaderProps) {
  return (
    <Stack
      className={styles.container}
      space="$8"
      attributes={{ marginBottom: "$14" }}
    >
      <Stack
        direction="vertical"
        className={styles.cardContainer}
        attributes={{
          px: "$8",
          py: "$7",
          backgroundColor: "$cardBg",
          borderRadius: "$lg",
        }}
      >
        <Stack space="$4">
          <Icon name="lock" color="$textSecondary" />
          <Text color="$textSecondary" fontWeight="$semibold">
            Staked
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
        className={styles.cardContainer}
        attributes={{
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
              Claimable Rewards
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
        <Button intent="tertiary" onClick={() => props?.onClaim?.()}>
          Claim
        </Button>
      </Stack>
    </Stack>
  );
}
