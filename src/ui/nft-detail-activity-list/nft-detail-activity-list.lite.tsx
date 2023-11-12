import { For, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { NftDetailActivityListItemProps } from "../nft-detail-activity-list-item/nft-detail-activity-list-item.types";
import NftDetailActivityListItem from "../nft-detail-activity-list-item";

import type { NftDetailActivityListProps } from "./nft-detail-activity-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetailActivityList(
  props: NftDetailActivityListProps
) {
  return (
    <Stack direction="vertical" space="0">
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        Activity
      </Text>

      <Box
        overflowX={{
          mobile: "scroll",
          tablet: "auto",
          desktop: "auto",
        }}
        pb="$4"
      >
        <Stack direction="vertical" space="$10">
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
    </Stack>
  );
}
