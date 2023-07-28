import Stack from "../stack";
import Button from "../button";
import Text from "../text";
import * as styles from "./bonding-list-item.css";
import { BondingListItemProps } from "./bonding-list-item.types";

export default function BondingListItem(props: BondingListItemProps) {
  return (
    <Stack
      attributes={{
        alignItems: "center",
      }}
    >
      <Text
        className={styles.item}
        color="$textSecondary"
        fontWeight="$semibold"
        fontSize="$xs"
      >
        {props.title}
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        {props.apr}
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        {props.amount}
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        {props.per}
      </Text>

      <Button size="xs" variant="unstyled" onClick={(e) => props.onUnbond(e)}>
        Unbond All
      </Button>
    </Stack>
  );
}
