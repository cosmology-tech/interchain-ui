import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from '../box'
import Text from "../text";
import { NftDetailActivityListItemProps } from "../nft-detail-activity-list-item/nft-detail-activity-list-item.types";
import NftDetailActivityListItem from "../nft-detail-activity-list-item";

import * as styles from "./nft-detail-activity-list.css";
import { NftDetailActivityListProps } from "./nft-detail-activity-list.types";

export default function NftDetailActivityList(
  props: NftDetailActivityListProps
) {
  return (
    <Box className={styles.container}>
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "10" }}>
        Activity
      </Text>
      <Stack direction="vertical" space="10">
        <For each={props?.list}>
          {(item: NftDetailActivityListItemProps, index: number) => (
            <NftDetailActivityListItem
              key={index}
              event={item?.event}
              price={item?.price}
              from={item?.from}
              to={item?.to}
              date={item?.date}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
