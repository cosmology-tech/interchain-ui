import Stack from "../stack";
import Text from "../text";

import * as styles from "./nft-trait-list-item.css";
import { NftTraitListItemProps } from "./nft-trait-list-item.types";

export default function NftTraitListItem(props: NftTraitListItemProps) {
  return (
    <Stack
      className={styles.nftTraitListItem}
      justify="space-between"
      align="center"
    >
      <Stack direction="column">
        <Text color="textSecondary" size="xs">
          {props?.name}
        </Text>
        <Text weight="semibold">{props?.value}</Text>
      </Stack>
      <Text size="xl" weight="semibold">
        {props?.rarityPercent}%
      </Text>
    </Stack>
  );
}
