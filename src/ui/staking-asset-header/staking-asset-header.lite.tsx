import Stack from "../stack";
import Text from "../text";
import * as styles from "./staking-asset-header.css";
import { StakingAssetHeaderProps } from "./staking-asset-header.types";
import { store } from "../../models/store";

export default function StakingAssetHeader(props: StakingAssetHeaderProps) {
  return (
    <Stack className={styles.container}>
      <Stack
        className={styles.cardContainer}
        attributes={{ width: "50%", p: "$5" }}
      >
        <img className={styles.img} src={props.imgSrc} />
        <Stack direction="vertical">
          <Text color="$textSecondary" fontWeight="$semibold">
            Total
          </Text>
          <Stack
            space="$5"
            attributes={{
              marginTop: "$2",
              marginBottom: "$3",
              alignItems: "center",
            }}
          >
            <Text fontWeight="$semibold" fontSize="$3xl">
              {props.totalAmount}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              {props.symbol}
            </Text>
          </Stack>
          <Stack attributes={{ alignItems: "center" }}>
            <Text fontSize="$xs" color="$rewardContent" fontWeight="$medium">
              ≈ $
              {store.getState().formatNumber({ value: props.totalPrice })}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="vertical"
        className={styles.cardContainer}
        space="$2"
        attributes={{ width: "1/2", p: "$5" }}
      >
        <Text color="$textSecondary" fontWeight="$semibold">
          Available
        </Text>
        <Stack space="$5" attributes={{ alignItems: "center" }}>
          <Text fontSize="$3xl" fontWeight="$semibold">
            {props.available}
          </Text>
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.symbol}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
