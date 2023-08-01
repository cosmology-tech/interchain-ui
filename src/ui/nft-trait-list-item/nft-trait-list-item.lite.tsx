import Stack from "../stack";
import Text from "../text";

import * as styles from "./nft-trait-list-item.css";
import { NftTraitListItemProps } from "./nft-trait-list-item.types";

export default function NftTraitListItem(props: NftTraitListItemProps) {
  return (
    <Stack
      className={styles.nftTraitListItem}
      attributes={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "$8",
      }}
      space="$0"
    >
      <Stack direction="vertical" space="$0">
        <Text color="$textSecondary" fontSize="$xs">
          {props?.name}
        </Text>
        <Text fontWeight="$semibold">{props?.value}</Text>
      </Stack>
      <Text fontSize="$xl" fontWeight="$semibold">
        {props?.rarityPercent}%
      </Text>
    </Stack>
  );
}
