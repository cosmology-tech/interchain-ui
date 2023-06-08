import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import * as styles from "./bonding-list-item.css";
import { BondingListItemProps } from "./bonding-list-item.types";

export default function BondingListItem(props: BondingListItemProps) {
  return (
    <Stack>
      <Text className={styles.item} color="textSecondary" weight="semibold" size="xs">
        {props.title}
      </Text>
      <Text className={styles.item}  color="textSecondary" size="xs">
        {props.apr}
      </Text>
      <Text className={styles.item}  color="textSecondary" size="xs">
        {props.amount}
      </Text>
      <Text className={styles.item}  color="textSecondary" size="xs">
        {props.per}
      </Text>
      <div className={styles.unbond} onClick={(e) => props.onUnbond(e)}>
        <Text className={styles.item}  weight="semibold" size="xs">
          Unbond All
        </Text>
      </div>
    </Stack>
  );
}
