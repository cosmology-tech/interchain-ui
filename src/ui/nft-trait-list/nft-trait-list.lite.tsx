import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import NftTraitListItem from "../nft-trait-list-item";
import * as styles from "./nft-trait-list.css";
import { NftTraitListItemProps } from "../nft-trait-list-item/nft-trait-list-item.types";
import { NftTraitListProps } from "./nft-trait-list.types";

export default function NftTraitList(props: NftTraitListProps) {
  return (
    <Stack
      className={styles.container}
      space="$0"
      attributes={{ flexWrap: "wrap" }}
    >
      <For each={props?.list}>
        {(item: NftTraitListItemProps, index: number) => (
          <Box key={index} className={styles.traitItemBox} paddingRight="$14">
            <NftTraitListItem
              key={item?.name}
              name={item?.name}
              value={item?.value}
              rarityPercent={item?.rarityPercent}
            />
          </Box>
        )}
      </For>
    </Stack>
  );
}
