import Stack from "../stack";
import Button from '../button';
import Text from "../text";
import * as styles from "./bonding-list-item.css";
import { BondingListItemProps } from "./bonding-list-item.types";

export default function BondingListItem(props: BondingListItemProps) {
  return (
    <Stack align="center">
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
      <Button size="xs" variant="unstyled"  onClick={(e) => props.onUnbond(e)}>Unbond All</Button>
    </Stack>
  );
}
