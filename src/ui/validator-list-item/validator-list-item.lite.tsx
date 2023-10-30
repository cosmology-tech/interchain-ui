import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";

import * as styles from "./validator-list-item.css";
import { formatNumeric } from "../../helpers/number";

import type { ValidatorListItemProps } from "./validator-list-item.types";

export default function ValidatorListItem(props: ValidatorListItemProps) {
  return (
    <Stack className={styles.container} attributes={{ alignItems: "center" }}>
      <Stack
        className={styles.itemContainer}
        attributes={{ alignItems: "center" }}
      >
        <img className={styles.img} src={props.validatorImg} />
        <Text fontWeight="$semibold">{props.validatorName}</Text>
      </Stack>
      <Stack
        className={styles.itemContainer}
        attributes={{ justifyContent: "flex-end" }}
      >
        <Text fontWeight="$semibold" attributes={{ marginRight: "$5" }}>
          {formatNumeric(`${props.stakedAmount}`, 4)}
        </Text>
        <Text color="$textSecondary" fontWeight="$semibold">
          {props.symbol}
        </Text>
      </Stack>
      <Stack
        className={styles.itemContainer}
        attributes={{ justifyContent: "flex-end" }}
      >
        <Text fontWeight="$semibold" attributes={{ marginRight: "$5" }}>
          {formatNumeric(props.rewardsAmount, 4)}
        </Text>
        <Text color="$textSecondary" fontWeight="$semibold">
          {props.symbol}
        </Text>
      </Stack>
      <Stack attributes={{ width: "$21", justifyContent: "flex-end" }}>
        <IconButton
          variant="unstyled"
          icon="settingFill"
          size="lg"
          onClick={() => props?.onSetting?.()}
        />
      </Stack>
    </Stack>
  );
}
